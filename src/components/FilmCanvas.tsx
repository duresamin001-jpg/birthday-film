import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 536;
const STRIDES = [64, 32, 16, 8, 4, 2, 1];
const MAX_CONCURRENT_DOWNLOADS = 6;

interface FilmCanvasProps {
  filmProgress: number; // 0 to 1
  isContentActive: boolean; // whether text/content is visible
}

export const FilmCanvas: React.FC<FilmCanvasProps> = ({ filmProgress, isContentActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingQueueRef = useRef<Set<number>>(new Set());
  const activeDownloadsRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(1);
  const isHdRef = useRef<boolean>(true);
  const [posterLoaded, setPosterLoaded] = useState<boolean>(false);
  const posterImgRef = useRef<HTMLImageElement | null>(null);

  // Determine HD vs SD: hd when screen width * devicePixelRatio > 1400
  useEffect(() => {
    const checkResolution = () => {
      const dpr = window.devicePixelRatio || 1;
      const screenMetric = window.innerWidth * dpr;
      isHdRef.current = screenMetric > 1400;
    };
    checkResolution();
    window.addEventListener('resize', checkResolution);
    return () => window.removeEventListener('resize', checkResolution);
  }, []);

  // Preload poster image immediately
  useEffect(() => {
    const poster = new Image();
    poster.src = '/film/poster.webp';
    poster.onload = () => {
      posterImgRef.current = poster;
      setPosterLoaded(true);
    };
  }, []);

  // Helper to get frame path
  const getFramePath = useCallback((frameIdx: number) => {
    const padded = String(frameIdx).padStart(4, '0');
    const folder = isHdRef.current ? 'hd' : 'sd';
    return `/film/${folder}/f${padded}.webp`;
  }, []);

  // Nearest loaded frame finder
  const getNearestLoadedFrame = useCallback((targetFrame: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images.has(targetFrame)) {
      return images.get(targetFrame)!;
    }

    let closestDist = Infinity;
    let closestFrame: HTMLImageElement | null = null;

    // Search outward
    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      const up = targetFrame + delta;
      if (up <= TOTAL_FRAMES && images.has(up)) {
        return images.get(up)!;
      }
      const down = targetFrame - delta;
      if (down >= 1 && images.has(down)) {
        return images.get(down)!;
      }
    }

    return posterImgRef.current;
  }, []);

  // Render current frame to canvas
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const targetFrame = currentFrameRef.current;
    const img = getNearestLoadedFrame(targetFrame);

    if (img && img.complete && img.naturalWidth > 0) {
      const fw = img.naturalWidth;
      const fh = img.naturalHeight;
      const scale = Math.max(cw / fw, ch / fh);
      const dw = fw * scale;
      const dh = fh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    } else if (posterImgRef.current && posterImgRef.current.complete) {
      const pimg = posterImgRef.current;
      const fw = pimg.naturalWidth;
      const fh = pimg.naturalHeight;
      const scale = Math.max(cw / fw, ch / fh);
      const dw = fw * scale;
      const dh = fh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(pimg, dx, dy, dw, dh);
    } else {
      // Midnight navy fallback before frames load
      ctx.fillStyle = '#080a24';
      ctx.fillRect(0, 0, cw, ch);
    }
  }, [getNearestLoadedFrame]);

  // Handle Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Progressive coarse-to-fine loader with queue prioritizing frames near current viewer
  const pumpQueue = useCallback(() => {
    while (
      activeDownloadsRef.current < MAX_CONCURRENT_DOWNLOADS &&
      loadingQueueRef.current.size > 0
    ) {
      // Find the item in queue closest to currentFrameRef.current
      const cur = currentFrameRef.current;
      let bestFrame = -1;
      let minDistance = Infinity;

      for (const frameIdx of loadingQueueRef.current) {
        const dist = Math.abs(frameIdx - cur);
        if (dist < minDistance) {
          minDistance = dist;
          bestFrame = frameIdx;
        }
      }

      if (bestFrame === -1) break;

      loadingQueueRef.current.delete(bestFrame);

      if (imagesRef.current.has(bestFrame)) {
        continue;
      }

      activeDownloadsRef.current++;
      const img = new Image();
      img.src = getFramePath(bestFrame);
      img.onload = () => {
        imagesRef.current.set(bestFrame, img);
        activeDownloadsRef.current--;
        // If current frame is close or matches, re-render
        if (Math.abs(bestFrame - currentFrameRef.current) <= 2) {
          renderFrame();
        }
        pumpQueue();
      };
      img.onerror = () => {
        activeDownloadsRef.current--;
        pumpQueue();
      };
    }
  }, [getFramePath, renderFrame]);

  // Schedule frames coarse to fine
  useEffect(() => {
    // Generate order: strides 64 down to 1
    const seen = new Set<number>();
    for (const stride of STRIDES) {
      for (let i = 1; i <= TOTAL_FRAMES; i += stride) {
        if (!seen.has(i)) {
          seen.add(i);
          loadingQueueRef.current.add(i);
        }
      }
    }
    // Also ensure frame 1 and TOTAL_FRAMES
    loadingQueueRef.current.add(1);
    loadingQueueRef.current.add(TOTAL_FRAMES);

    pumpQueue();
  }, [pumpQueue]);

  // When filmProgress changes, update current frame and re-render
  useEffect(() => {
    const rawFrame = 1 + Math.round(filmProgress * (TOTAL_FRAMES - 1));
    const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, rawFrame));

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      renderFrame();
      pumpQueue();
    }
  }, [filmProgress, renderFrame, pumpQueue]);

  // Initial draw once poster loaded
  useEffect(() => {
    if (posterLoaded) {
      renderFrame();
    }
  }, [posterLoaded, renderFrame]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#080a24]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
      {/* Film dim overlay while content is active on screen */}
      <div
        className="absolute inset-0 bg-[#080a24] transition-opacity duration-700 ease-out pointer-events-none"
        style={{
          opacity: isContentActive ? 0.38 : 0.0,
        }}
      />
    </div>
  );
};
