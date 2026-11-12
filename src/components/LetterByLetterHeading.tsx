import React from 'react';
import { motion } from 'framer-motion';

interface LetterByLetterHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

export const LetterByLetterHeading: React.FC<LetterByLetterHeadingProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)',
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.22,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block font-decorative text-gold glow-gold tracking-wider ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={`${char}-${wordIdx}-${charIdx}`}
              variants={letterVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.h1>
  );
};
