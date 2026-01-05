import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className="progress-bar">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`progress-segment ${i < current ? 'completed' : ''} ${i === current ? 'active' : ''}`}
      />
    ))}
  </div>
);
