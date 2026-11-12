import React, { useEffect, useState, useMemo } from 'react';
import Lenis from 'lenis';
import { FilmCanvas } from './components/FilmCanvas';
import { Scenes } from './components/Scenes';
import { SparkleDust } from './components/SparkleDust';
import { ProgressBar } from './components/ProgressBar';
import { ScrollHint } from './components/ScrollHint';
import { scrollProgressToFilmProgress, FILM_SCENES } from './data/film';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    (window as any).lenis = lenis;

    let animId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    };
    animId = requestAnimationFrame(raf);

    lenis.on('scroll', (e: { progress: number }) => {
      setScrollProgress(Math.max(0, Math.min(1, e.progress)));
    });

    const handleNativeScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        setScrollProgress(p);
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Apply Dwell Remap:
  // While content is visible, film advances 3.2x slower
  const filmProgress = useMemo(() => {
    return scrollProgressToFilmProgress(scrollProgress);
  }, [scrollProgress]);

  // Determine if any chapter content is actively on screen
  const isContentActive = useMemo(() => {
    // Check if filmProgress is within any scene's active visible range
    for (const scene of FILM_SCENES) {
      if (filmProgress >= scene.start && filmProgress <= scene.end) {
        return true;
      }
    }
    return false;
  }, [filmProgress]);

  return (
    <div className="relative w-full bg-[#080a24] text-white select-none">
      {/* FIXED VIEWPORT LAYER */}
      <FilmCanvas filmProgress={filmProgress} isContentActive={isContentActive} />
      <SparkleDust />
      <Scenes filmProgress={filmProgress} />
      <ScrollHint progress={scrollProgress} />
      <ProgressBar progress={scrollProgress} />

      {/* INVISIBLE SCROLL TRACK
          "Scroll track 5200vh on desktop and 4200vh on phones" */}
      <div
        className={`w-full pointer-events-none opacity-0 ${
          isMobile ? 'h-[4200vh]' : 'h-[5200vh]'
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

export default App;
