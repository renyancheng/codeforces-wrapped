import React from 'react';
import TypingAnimation from '../magicui/typing-animation';
import NumberTicker from '../magicui/number-ticker';
import { PageProps } from './types';

export const LanguagesPage: React.FC<PageProps> = ({ stats, strings }) => {
  const languages = Object.entries(stats.languageDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const mostUsed = languages[0];
  const totalLanguages = Object.keys(stats.languageDistribution).length;
  const maxCount = mostUsed ? mostUsed[1] : 1;

  const getFontSize = (count: number) => {
    const ratio = count / (maxCount as number);
    return 14 + ratio * 32;
  };

  const getColor = (index: number) => {
    const colors = [
      '#60a5fa', '#34d399', '#fbbf24', '#f87171',
      '#a78bfa', '#fb923c', '#22d3ee', '#fb7185',
      '#4ade80', '#facc15'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="story-page">
      <p className="section-label">
        <TypingAnimation text={strings.languagesTitle.toUpperCase()} duration={40} />
      </p>

      <div className="stat-hero">
        <div className="hero-number">
          <NumberTicker value={totalLanguages} />
          <span className="hero-unit">{strings.unitLanguages}</span>
        </div>
        <p className="hero-label">
          <TypingAnimation text={strings.languagesSubtitle} duration={30} />
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 px-8 py-6 max-w-2xl mx-auto">
        {languages.map(([langName, count], index) => {
          const fontSize = getFontSize(count as number);
          const color = getColor(index);
          const truncatedName = langName.length > 20 ? langName.slice(0, 20) + '...' : langName;

          return (
            <div
              key={langName}
              className="cursor-default"
              style={{
                fontSize: `${fontSize}px`,
                color: color,
                fontWeight: 600,
                textShadow: `0 0 20px ${color}40`,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                transition: 'transform 0.3s ease, text-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.textShadow = `0 0 30px ${color}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = `0 0 20px ${color}40`;
              }}
              title={`${langName}: ${count} ${strings.times}`}
            >
              {truncatedName}
            </div>
          );
        })}
      </div>

      <div className="stat-row mt-8">
        <div className="stat-box">
          <div className="stat-box-value">{mostUsed ? mostUsed[0] : 'N/A'}</div>
          <div className="stat-box-label">{strings.mostUsedLanguage}</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">
            <NumberTicker value={mostUsed ? (mostUsed[1] as number) : 0} />
          </div>
          <div className="stat-box-label">{strings.timesUsed}</div>
        </div>
      </div>
    </div>
  );
};
