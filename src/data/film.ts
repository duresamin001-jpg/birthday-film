export interface SceneTiming {
  id: string;
  start: number;
  end: number;
  dwellPeakStart?: number;
  dwellPeakEnd?: number;
}

export const FILM_SCENES: SceneTiming[] = [
  {
    id: 'intro',
    start: 0.0,
    end: 0.035,
    dwellPeakStart: 0.008,
    dwellPeakEnd: 0.028,
  },
  {
    id: 'happy-birthday-name',
    start: 0.04,
    end: 0.11,
    dwellPeakStart: 0.055,
    dwellPeakEnd: 0.095,
  },
  {
    id: 'chapter-1-about',
    start: 0.115,
    end: 0.205,
    dwellPeakStart: 0.13,
    dwellPeakEnd: 0.19,
  },
  {
    id: 'starring',
    start: 0.209,
    end: 0.266,
    dwellPeakStart: 0.22,
    dwellPeakEnd: 0.255,
  },
  {
    id: 'memories-intro',
    start: 0.27,
    end: 0.395,
    dwellPeakStart: 0.29,
    dwellPeakEnd: 0.375,
  },
  {
    id: 'chapter-2-title',
    start: 0.397,
    end: 0.452,
    dwellPeakStart: 0.41,
    dwellPeakEnd: 0.44,
  },
  {
    id: 'constellations',
    start: 0.448,
    end: 0.605,
    dwellPeakStart: 0.47,
    dwellPeakEnd: 0.585,
  },
  {
    id: 'chapter-3-title',
    start: 0.60,
    end: 0.652,
    dwellPeakStart: 0.612,
    dwellPeakEnd: 0.642,
  },
  {
    id: 'moments-cards',
    start: 0.648,
    end: 0.80,
    dwellPeakStart: 0.665,
    dwellPeakEnd: 0.785,
  },
  {
    id: 'chapter-4-wishes',
    start: 0.803,
    end: 0.858,
    dwellPeakStart: 0.815,
    dwellPeakEnd: 0.848,
  },
  {
    id: 'chapter-5-promises',
    start: 0.862,
    end: 0.922,
    dwellPeakStart: 0.875,
    dwellPeakEnd: 0.912,
  },
  {
    id: 'epilogue',
    start: 0.93,
    end: 1.0,
    dwellPeakStart: 0.945,
    dwellPeakEnd: 1.0,
  },
];

// Precompute Dwell Remap Table: 1000 sample points
const NUM_SAMPLES = 1000;
const DWELL_MULTIPLIER = 3.2; // film advances 3.2x slower while content is visible

function computeDwellWeight(filmFrac: number): number {
  for (const scene of FILM_SCENES) {
    const pStart = scene.dwellPeakStart ?? (scene.start + 0.01);
    const pEnd = scene.dwellPeakEnd ?? (scene.end - 0.01);
    if (filmFrac >= pStart && filmFrac <= pEnd) {
      return DWELL_MULTIPLIER;
    }
    // smooth ramp in/out of dwell
    if (filmFrac >= scene.start && filmFrac < pStart) {
      const t = (filmFrac - scene.start) / Math.max(0.001, pStart - scene.start);
      return 1.0 + (DWELL_MULTIPLIER - 1.0) * t;
    }
    if (filmFrac > pEnd && filmFrac <= scene.end) {
      const t = (scene.end - filmFrac) / Math.max(0.001, scene.end - pEnd);
      return 1.0 + (DWELL_MULTIPLIER - 1.0) * t;
    }
  }
  return 1.0;
}

// Build cumulative scroll table s(f)
const sTable: number[] = new Array(NUM_SAMPLES);
const fTable: number[] = new Array(NUM_SAMPLES);

let cumS = 0;
sTable[0] = 0;
fTable[0] = 0;

for (let i = 1; i < NUM_SAMPLES; i++) {
  const f = i / (NUM_SAMPLES - 1);
  fTable[i] = f;
  const weight = computeDwellWeight(f);
  cumS += weight * (1 / (NUM_SAMPLES - 1));
  sTable[i] = cumS;
}

// Normalize sTable so sTable[NUM_SAMPLES - 1] === 1.0
for (let i = 0; i < NUM_SAMPLES; i++) {
  sTable[i] /= cumS;
}

/**
 * Given user scroll fraction s in [0, 1], returns the film progress fraction f in [0, 1].
 * Monotonic binary search + linear interpolation.
 */
export function scrollProgressToFilmProgress(s: number): number {
  const clampedS = Math.max(0, Math.min(1, s));

  // Binary search in sTable
  let low = 0;
  let high = NUM_SAMPLES - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (sTable[mid] < clampedS) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const i0 = Math.max(0, Math.min(NUM_SAMPLES - 2, high));
  const i1 = i0 + 1;

  const s0 = sTable[i0];
  const s1 = sTable[i1];
  const t = s1 === s0 ? 0 : (clampedS - s0) / (s1 - s0);

  const f0 = fTable[i0];
  const f1 = fTable[i1];

  return Math.max(0, Math.min(1, f0 + t * (f1 - f0)));
}
