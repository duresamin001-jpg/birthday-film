import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/portfolio';
import { LetterByLetterHeading } from './LetterByLetterHeading';
import { GlassCard } from './GlassCard';
import { Constellations } from './Constellations';

interface ScenesProps {
  filmProgress: number; // 0 to 1
}

export const Scenes: React.FC<ScenesProps> = ({ filmProgress }) => {
  const p = filmProgress;
  const d = BIRTHDAY_DATA;

  // Scene Visibility Booleans
  const showIntro = p >= 0.0 && p <= 0.035;
  const showHappyBirthday = p >= 0.04 && p <= 0.11;
  const showChapter1 = p >= 0.115 && p <= 0.205;
  const showStarring = p >= 0.209 && p <= 0.266;
  const showMemoriesIntro = p >= 0.27 && p <= 0.395;
  const showChapter2Title = p >= 0.397 && p <= 0.452;
  const showConstellations = p >= 0.448 && p <= 0.605;
  const showChapter3Title = p >= 0.60 && p <= 0.652;
  const showMoment1 = p >= 0.648 && p < 0.698;
  const showMoment2 = p >= 0.698 && p < 0.749;
  const showMoment3 = p >= 0.749 && p <= 0.800;
  const showChapter4 = p >= 0.803 && p <= 0.858;
  const showChapter5 = p >= 0.862 && p <= 0.922;
  const showEpilogue = p >= 0.93; // stays on screen to end

  // Base animation config:
  // "drifts in from blur (16px to 0) with a slight rise and scale 0.97 to 1, holds, then floats up past the camera and blurs out"
  const sceneDriftVariants = {
    initial: {
      opacity: 0,
      y: 24,
      scale: 0.97,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      y: -24,
      scale: 1.02,
      transition: {
        duration: 0.45,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* 1. SCENE 0–0.035: Keep only ‘Scroll to begin’ */}
        {showIntro && (
          <motion.div
            key="scene-intro"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center px-4 max-w-xl relative flex flex-col items-center justify-center"
          >
            <div className="absolute -inset-16 shadow-pool-radial -z-10" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-cinzel text-sm sm:text-base md:text-lg tracking-[0.4em] uppercase text-gold glow-gold font-medium"
            >
              Scroll to begin
            </motion.p>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-7 mt-4 rounded-full border border-gold/40 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-gradient-to-b from-rose to-gold rounded-full" />
            </motion.div>
          </motion.div>
        )}

        {/* 2. SCENE 0.04–0.11: Lower centre ‘Happy Birthday’ + her first name, huge, in gold */}
        {showHappyBirthday && (
          <motion.div
            key="scene-happy-birthday"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-12 sm:bottom-16 inset-x-0 mx-auto text-center px-4 max-w-5xl"
          >
            <div className="absolute -inset-20 shadow-pool-radial -z-10" />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-rose font-bold mb-3 glow-rose">
              Today We Celebrate You
            </p>
            <div>
              <LetterByLetterHeading
                text="Happy Birthday"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                delay={0.08}
              />
            </div>
            <div className="mt-1 sm:mt-2">
              <LetterByLetterHeading
                text={d.friend.firstName}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-light glow-gold"
                delay={0.25}
              />
            </div>
          </motion.div>
        )}

        {/* 3. SCENE 0.115–0.205: Left ‘Chapter I’ + ‘About You’ heading, heartfelt intro, 3 key stats */}
        {showChapter1 && (
          <motion.div
            key="scene-chapter-1"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-30 left-4 sm:left-12 lg:left-20 bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-xl text-left px-2 sm:px-0"
          >
            <div className="absolute -inset-16 shadow-pool-radial-lg -z-10" />
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold font-bold mb-2 inline-block glow-gold-subtle">
              Chapter I
            </span>
            <h2 className="font-decorative text-3xl sm:text-5xl text-gold glow-gold tracking-wide mb-4">
              About You
            </h2>
            <p className="font-garamond text-lg sm:text-xl text-white/95 leading-relaxed font-light mb-8 glow-gold-subtle">
              {d.memoriesIntro.lines[1]}
            </p>

            {/* Glowing row of 3 key stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-gold/25">
              {d.stats.map((stat, i) => (
                <div key={i} className="relative">
                  <div className="font-decorative text-2xl sm:text-3xl text-gold-light glow-gold font-bold">
                    {stat.value}
                  </div>
                  <div className="font-cinzel text-[11px] sm:text-xs text-rose tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                  <div className="font-garamond italic text-[11px] sm:text-xs text-white/80 mt-0.5 hidden sm:block">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4. SCENE 0.209–0.266: Top-left ‘Starring’ + her full name */}
        {showStarring && (
          <motion.div
            key="scene-starring"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-30 left-6 sm:left-14 lg:left-24 top-20 sm:top-28 max-w-lg text-left"
          >
            <div className="absolute -inset-16 shadow-pool-radial -z-10" />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-rose font-bold mb-2 glow-rose">
              Starring
            </p>
            <LetterByLetterHeading
              text={d.friend.fullName}
              className="text-4xl sm:text-6xl md:text-7xl block text-gold-light"
              delay={0.1}
            />
            <p className="font-garamond italic text-base sm:text-lg text-white/90 mt-3 glow-gold-subtle">
              In a journey woven of kindness, grace and starlight
            </p>
          </motion.div>
        )}

        {/* 5. SCENE 0.27–0.395: Right ‘Memories’ heading, 3 memory lines, pills, closing line.
            Right placement keeps left-center character completely untouched! */}
        {showMemoriesIntro && (
          <motion.div
            key="scene-memories"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-30 right-4 sm:right-10 lg:right-16 bottom-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-lg lg:max-w-xl text-right px-2 sm:px-0"
          >
            <div className="absolute -inset-16 shadow-pool-radial-lg -z-10" />
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-rose font-bold mb-2 inline-block glow-rose">
              Reflections
            </span>
            <h2 className="font-decorative text-3xl sm:text-5xl text-gold glow-gold tracking-wide mb-5">
              {d.memoriesIntro.title}
            </h2>

            {/* Three short memory lines */}
            <div className="space-y-3 mb-6">
              {d.memoriesIntro.lines.map((line, i) => (
                <p
                  key={i}
                  className="font-garamond text-base sm:text-lg text-white/95 leading-relaxed font-light glow-gold-subtle"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Frosted-glass pills for dates or places */}
            <div className="flex flex-wrap justify-end gap-2 mb-5">
              {d.memoriesIntro.pills.map((pill, i) => (
                <span
                  key={i}
                  className="glass-pill px-3.5 py-1 text-xs font-cinzel tracking-wider text-gold-light rounded-full"
                >
                  ✦ {pill}
                </span>
              ))}
            </div>

            {/* One closing line of love */}
            <p className="font-garamond italic text-base sm:text-lg text-rose-light glow-rose">
              {d.memoriesIntro.closingLine}
            </p>
          </motion.div>
        )}

        {/* 6. SCENE 0.397–0.452: Centre ‘Chapter II’ + ‘Why You’re Special’, huge.
            Placed in the upper sky so character below is 100% UNTOUCHED! */}
        {showChapter2Title && (
          <motion.div
            key="scene-chapter-2-title"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-16 sm:top-24 inset-x-0 mx-auto text-center px-4 max-w-3xl"
          >
            <div className="absolute -inset-20 shadow-pool-radial-lg -z-10" />
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-rose font-bold mb-3 inline-block glow-rose">
              Chapter II
            </span>
            <LetterByLetterHeading
              text="Why You’re Special"
              className="text-4xl sm:text-6xl md:text-8xl block"
              delay={0.08}
            />
            <p className="font-garamond italic text-lg sm:text-2xl text-gold-light/95 mt-4 glow-gold-subtle">
              Constellations of warmth, loyalty and laughter
            </p>
          </motion.div>
        )}

        {/* 7. SCENE 0.448–0.605: Floating constellations */}
        {showConstellations && (
          <div key="scene-constellations" className="w-full h-full">
            <Constellations progress={p} />
          </div>
        )}

        {/* 8. SCENE 0.6–0.652: Centre ‘Chapter III’ + ‘Our Moments’, huge.
            Placed in upper sky so character boarding carriage below is clear! */}
        {showChapter3Title && (
          <motion.div
            key="scene-chapter-3-title"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-16 sm:top-24 inset-x-0 mx-auto text-center px-4 max-w-3xl"
          >
            <div className="absolute -inset-20 shadow-pool-radial-lg -z-10" />
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-gold font-bold mb-3 inline-block glow-gold-subtle">
              Chapter III
            </span>
            <LetterByLetterHeading
              text="Our Moments"
              className="text-4xl sm:text-6xl md:text-8xl block"
              delay={0.08}
            />
            <p className="font-garamond italic text-lg sm:text-2xl text-rose-light mt-4 glow-rose">
              Etched forever into the sky of our journey
            </p>
          </motion.div>
        )}

        {/* 9. SCENE 0.648–0.8: Three special memories (Glass cards) */}
        {showMoment1 && (
          <GlassCard
            key="moment-1"
            number={d.moments[0].number}
            kicker={d.moments[0].kicker}
            title={d.moments[0].title}
            story={d.moments[0].story}
            tags={d.moments[0].tags}
            link={d.moments[0].link}
            placement="right-middle"
            scrollProgress={p}
          />
        )}

        {showMoment2 && (
          <GlassCard
            key="moment-2"
            number={d.moments[1].number}
            kicker={d.moments[1].kicker}
            title={d.moments[1].title}
            story={d.moments[1].story}
            tags={d.moments[1].tags}
            link={d.moments[1].link}
            placement="top-right"
            scrollProgress={p}
          />
        )}

        {showMoment3 && (
          <GlassCard
            key="moment-3"
            number={d.moments[2].number}
            kicker={d.moments[2].kicker}
            title={d.moments[2].title}
            story={d.moments[2].story}
            tags={d.moments[2].tags}
            link={d.moments[2].link}
            placement="bottom-right"
            scrollProgress={p}
          />
        )}

        {/* 10. SCENE 0.803–0.858: Top-left ‘Chapter IV’ + ‘Birthday Wishes’ on single line + giant age + wish lines */}
        {showChapter4 && (
          <motion.div
            key="scene-chapter-4"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-30 left-4 sm:left-12 lg:left-20 top-14 sm:top-20 max-w-xl lg:max-w-2xl text-left px-2 sm:px-0"
          >
            <div className="absolute -inset-16 shadow-pool-radial-lg -z-10" />
            <div className="flex items-center gap-3 mb-2">
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold font-bold glow-gold-subtle">
                Chapter IV
              </span>
              <span className="text-gold/40">✦</span>
              <h2 className="font-decorative text-xl sm:text-2xl text-gold-light glow-gold whitespace-nowrap">
                {d.wishes.title}
              </h2>
            </div>

            <div className="flex items-baseline gap-3 my-3">
              <span className="font-decorative text-3xl sm:text-4xl font-bold text-gold glow-gold select-none">
                ✦
              </span>
              <span className="font-garamond italic text-lg sm:text-2xl text-rose-light glow-rose">
                May All Your Duas Be Answered
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {d.wishes.lines.map((wish, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-1 text-xs">✦</span>
                  <p className="font-garamond text-base sm:text-lg text-white/95 leading-relaxed font-light glow-gold-subtle">
                    {wish}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 11. SCENE 0.862–0.922: Right ‘Chapter V’ + ‘My Promises’ flowing credits line */}
        {showChapter5 && (
          <motion.div
            key="scene-chapter-5"
            variants={sceneDriftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-30 right-4 sm:right-10 lg:right-16 bottom-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-lg lg:max-w-xl text-right px-2 sm:px-0"
          >
            <div className="absolute -inset-16 shadow-pool-radial-lg -z-10" />
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-rose font-bold mb-2 inline-block glow-rose">
              Chapter V
            </span>
            <h2 className="font-decorative text-3xl sm:text-5xl text-gold glow-gold tracking-wide mb-6">
              {d.promises.title}
            </h2>

            <div className="space-y-4">
              {d.promises.lines.map((promise, i) => (
                <p
                  key={i}
                  className="font-garamond text-base sm:text-lg text-white/95 leading-relaxed font-light glow-gold-subtle"
                >
                  {promise}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* 12. SCENE 0.93–end: Centre ‘Epilogue’ + ‘Happy Birthday’, huge, make a wish, personal message, pills, sender, tiny AI credit.
            Placed in the UPPER HALF of the viewport so character on balcony below is 100% UNTOUCHED! */}
        {showEpilogue && (
          <motion.div
            key="scene-epilogue"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed z-40 inset-x-0 top-10 sm:top-14 max-w-3xl mx-auto text-center px-4"
          >
            <div className="absolute -inset-20 shadow-pool-radial-lg -z-10" />
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-rose font-bold mb-2 inline-block glow-rose">
              Epilogue
            </span>
            <LetterByLetterHeading
              text={d.epilogue.heading}
              className="text-4xl sm:text-6xl md:text-7xl block mb-3"
              delay={0.08}
            />

            <p className="font-garamond italic text-lg sm:text-2xl text-gold-light mb-4 glow-gold-subtle">
              {d.epilogue.invitation}
            </p>

            {/* Glowing personal message */}
            <p className="font-garamond text-base sm:text-lg text-white/95 leading-relaxed font-normal max-w-2xl mx-auto mb-6 glow-gold">
              "{d.epilogue.personalMessage}"
            </p>

            {/* Optional Links Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-5 pointer-events-auto">
              {d.epilogue.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="glass-pill px-5 py-2 text-xs font-cinzel tracking-wider text-gold hover:text-white hover:border-gold transition flex items-center gap-2 shadow-sm"
                >
                  <span>✦</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Sender Name */}
            <p className="font-cinzel text-xs sm:text-sm tracking-widest text-gold-light mb-2">
              With endless love and prayers, <br />
              <span className="font-decorative text-xl sm:text-2xl font-bold text-gold glow-gold mt-1 inline-block">
                {d.sender.name}
              </span>
            </p>

            {/* Tiny Google Gemini Credit */}
            <p className="font-manrope text-[10px] tracking-widest uppercase text-white/50 mt-4">
              {d.epilogue.creditsAI}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
