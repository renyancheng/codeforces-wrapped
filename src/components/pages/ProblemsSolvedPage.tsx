import React from 'react';
import TypingAnimation from '../magicui/typing-animation';
import NumberTicker from '../magicui/number-ticker';
import { PageProps } from './types';

export const ProblemsSolvedPage: React.FC<PageProps> = ({ stats, strings }) => {
  const totalSolved = stats.uniqueProblemsSolved;
  const difficulties = Object.entries(stats.difficultyDistribution)
    .sort((a, b) => Number(a[0]) - Number(b[0]));

  let easy = 0, medium = 0, hard = 0;
  difficulties.forEach(([rating, count]) => {
    const r = Number(rating);
    if (r <= 1200) easy += count as number;
    else if (r <= 1800) medium += count as number;
    else hard += count as number;
  });

  const total = easy + medium + hard || 1;

  return (
    <div className="story-page">
      <p className="section-label">
        <TypingAnimation text={strings.sectionProblems.toUpperCase()} duration={40} />
      </p>

      <div className="stat-hero">
        <div className="hero-number">
          <NumberTicker value={totalSolved} />
          <span className="hero-unit">{strings.unitProblems}</span>
        </div>
        <p className="hero-label">
          <TypingAnimation text={strings.uniqueProblemsSolvedDesc} duration={30} />
        </p>
      </div>

      <div className="difficulty-bars">
        <div className="difficulty-item">
          <span className="difficulty-label">{strings.difficultyEasy}</span>
          <div className="difficulty-bar-bg">
            <div
              className="difficulty-bar-fill"
              style={{
                width: `${(easy / total) * 100}%`,
                background: 'linear-gradient(90deg, #4ade80, #22c55e)'
              }}
            />
          </div>
          <span className="difficulty-count"><NumberTicker value={easy} /></span>
        </div>

        <div className="difficulty-item">
          <span className="difficulty-label">{strings.difficultyMedium}</span>
          <div className="difficulty-bar-bg">
            <div
              className="difficulty-bar-fill"
              style={{
                width: `${(medium / total) * 100}%`,
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b)'
              }}
            />
          </div>
          <span className="difficulty-count"><NumberTicker value={medium} /></span>
        </div>

        <div className="difficulty-item">
          <span className="difficulty-label">{strings.difficultyHard}</span>
          <div className="difficulty-bar-bg">
            <div
              className="difficulty-bar-fill"
              style={{
                width: `${(hard / total) * 100}%`,
                background: 'linear-gradient(90deg, #f87171, #ef4444)'
              }}
            />
          </div>
          <span className="difficulty-count"><NumberTicker value={hard} /></span>
        </div>
      </div>
    </div>
  );
};
