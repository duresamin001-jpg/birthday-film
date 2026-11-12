import React from 'react';
import { BIRTHDAY_DATA } from '../data/portfolio';

interface ConstellationsProps {
  progress: number;
}

export const Constellations: React.FC<ConstellationsProps> = () => {
  const { constellations } = BIRTHDAY_DATA;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none p-4 sm:p-6 md:p-10 overflow-hidden">
      {/* Soft blurred radial shadow pool to keep text readable without any boxes */}
      <div className="absolute inset-0 shadow-pool-radial-lg pointer-events-none opacity-80" />

      {/* DESKTOP CONSTELLATIONS: Three overlapping waves keeping center character clear */}
      <div className="hidden md:block w-full h-full relative">
        {/* WAVE 1: LEFT SIDE (Her Core Qualities) */}
        <div className="absolute left-6 lg:left-12 top-16 w-80 lg:w-96 text-left">
          <div className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 pb-1 border-b border-gold/30 glow-gold-subtle inline-block">
            ✦ {constellations.group1.label}
          </div>

          <div className="flex flex-col gap-4">
            {constellations.group1.words.map((w, i) => (
              <div
                key={i}
                className={`font-garamond ${w.size} font-normal text-gold-light glow-gold whitespace-nowrap`}
                style={{
                  transform: `translateX(${(i % 3) * 16}px)`,
                  animation: `driftSlow ${5 + w.depth * 1.5}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <span className="relative z-10">{w.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WAVE 2: RIGHT SIDE (Inside Whispers & Joy) */}
        <div className="absolute right-6 lg:right-12 top-16 w-80 lg:w-96 text-right">
          <div className="font-cinzel text-xs tracking-[0.3em] uppercase text-rose font-bold mb-4 pb-1 border-b border-rose/30 glow-rose inline-block">
            ✦ {constellations.group2.label}
          </div>

          <div className="flex flex-col gap-4 items-end">
            {constellations.group2.words.map((w, i) => (
              <div
                key={i}
                className={`font-garamond ${w.size} font-normal text-rose-light glow-rose whitespace-nowrap`}
                style={{
                  transform: `translateX(-${(i % 3) * 16}px)`,
                  animation: `driftSlow ${5.5 + w.depth * 1.5}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.35}s`,
                }}
              >
                <span className="relative z-10">{w.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WAVE 3: LOWER BAND (Treasured Wonders) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-full max-w-5xl text-center">
          <div className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold font-bold mb-3 pb-1 border-b border-gold/30 glow-gold-subtle inline-block">
            ✦ {constellations.group3.label}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
            {constellations.group3.words.map((w, i) => (
              <div
                key={i}
                className={`font-garamond ${w.size} font-normal text-gold-light glow-gold whitespace-nowrap`}
                style={{
                  animation: `driftSlow ${6 + (i % 3) * 1.2}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.25}s`,
                }}
              >
                <span className="relative z-10">{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE CONSTELLATIONS:
          Evenly spaced zig-zag positioned in the lower portion so character's face is 100% UNTOUCHED! */}
      <div className="block md:hidden w-full h-full overflow-y-auto pt-52 pb-20 flex flex-col gap-6">
        {/* Mobile Group 1 */}
        <div className="w-full">
          <div className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-gold font-bold mb-2 border-b border-gold/30 pb-0.5">
            ✦ {constellations.group1.label}
          </div>
          <div className="flex flex-col gap-2.5">
            {constellations.group1.words.map((w, i) => (
              <div
                key={i}
                className={`font-garamond text-xl text-gold-light glow-gold ${
                  i % 2 === 0 ? 'text-left pl-2' : 'text-right pr-2'
                }`}
              >
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Group 2 */}
        <div className="w-full">
          <div className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-rose font-bold mb-2 border-b border-rose/30 pb-0.5">
            ✦ {constellations.group2.label}
          </div>
          <div className="flex flex-col gap-2.5">
            {constellations.group2.words.map((w, i) => (
              <div
                key={i}
                className={`font-garamond text-xl text-rose-light glow-rose ${
                  i % 2 === 0 ? 'text-right pr-2' : 'text-left pl-2'
                }`}
              >
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Group 3 */}
        <div className="w-full">
          <div className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-gold-light font-bold mb-2 border-b border-gold/30 pb-0.5">
            ✦ {constellations.group3.label}
          </div>
          <div className="flex flex-col gap-2.5">
            {constellations.group3.words.map((w, i) => (
              <div
                key={i}
                className={`font-garamond text-xl text-gold-light glow-gold ${
                  i % 2 === 0 ? 'text-left pl-2' : 'text-right pr-2'
                }`}
              >
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
