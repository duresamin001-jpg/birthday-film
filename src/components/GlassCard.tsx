import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  number: string;
  kicker: string;
  title: string;
  story: string;
  tags: string[];
  link?: { label: string; url: string };
  placement: 'right-middle' | 'top-right' | 'bottom-right';
  scrollProgress: number; // for sheen and subtle parallax
}

export const GlassCard: React.FC<GlassCardProps> = ({
  number,
  kicker,
  title,
  story,
  tags,
  link,
  placement,
  scrollProgress,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    damping: 25,
    stiffness: 120,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 25,
    stiffness: 120,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Placement keeping character face clear:
  // - 'right-middle' positioned in lower-right so upper-right character face in carriage is 100% UNTOUCHED
  // - 'top-right' in open sky
  // - 'bottom-right' wide card below hands
  const placementClasses = {
    'right-middle':
      'md:right-8 lg:right-16 md:bottom-12 md:max-w-md',
    'top-right':
      'md:right-8 lg:right-16 md:top-14 md:max-w-lg',
    'bottom-right':
      'md:right-8 lg:right-16 md:bottom-12 md:max-w-lg',
  }[placement];

  // Specular sheen horizontal offset driven by scroll
  const sheenOffset = ((scrollProgress * 1500) % 250) - 75;

  return (
    <div
      className={`fixed z-30 w-[92vw] mx-auto left-4 right-4 bottom-6 md:left-auto ${placementClasses}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: 'easeOut' as const }}
        className="relative rounded-2xl p-5 sm:p-7 overflow-hidden backdrop-blur-[16px] saturate-150 shadow-2xl"
      >
        {/* Layer 1: Light navy base */}
        <div className="absolute inset-0 bg-[#0c1033]/80 -z-20 rounded-2xl" />

        {/* Layer 2: Faint white-to-violet tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-[#c9b7e9]/[0.06] to-transparent -z-10 rounded-2xl" />

        {/* Layer 3: 1px gradient light edge */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(241,207,134,0.35) 30%, rgba(246,182,214,0.25) 60%, rgba(201,183,233,0.15) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Specular sheen that slides across as you scroll */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          style={{
            background: `radial-gradient(ellipse 60% 120% at ${sheenOffset}% 40%, rgba(255,255,255,0.25) 0%, rgba(241,207,134,0.15) 40%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Outlined Numeral */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="font-decorative text-4xl sm:text-5xl font-black text-transparent tracking-widest select-none"
            style={{
              WebkitTextStroke: '1px rgba(241, 207, 134, 0.85)',
              textShadow: '0 0 18px rgba(241, 207, 134, 0.4)',
            }}
          >
            {number}
          </span>
          <span className="font-garamond italic text-rose-light text-base sm:text-lg tracking-wide glow-rose">
            {kicker}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-gold-light glow-gold-subtle tracking-wide mb-2">
          {title}
        </h3>

        {/* Short Story */}
        <p className="font-garamond text-base sm:text-lg text-white/95 leading-relaxed font-light mb-4 tracking-wide text-shadow-sm">
          {story}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-manrope font-medium tracking-wider text-gold-light bg-black/40 border border-gold/30 rounded-full backdrop-blur-md shadow-sm"
            >
              #{tag.replace(/^#+/, '')}
            </span>
          ))}

          {/* Optional Link */}
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto px-4 py-1.5 text-xs font-cinzel font-semibold tracking-wider text-[#080a24] bg-gradient-to-r from-gold to-rose-soft rounded-full hover:brightness-110 transition shadow-gold-glow flex items-center gap-1"
            >
              <span>{link.label}</span>
              <span>→</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};
