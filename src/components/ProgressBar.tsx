import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-black/30 backdrop-blur-sm">
      <div
        className="h-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(241,207,134,0.8)]"
        style={{
          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
          background: 'linear-gradient(to right, #f6b6d6, #f1cf86, #fff3cf)',
        }}
      />
    </div>
  );
};
