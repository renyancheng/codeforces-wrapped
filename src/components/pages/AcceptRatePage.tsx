import React, { useState, useRef, useEffect } from 'react';
import TypingAnimation from '../magicui/typing-animation';
import NumberTicker from '../magicui/number-ticker';
import { PageProps } from './types';

export const AcceptRatePage: React.FC<PageProps> = ({ stats, strings }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  const acceptRate = Math.round((stats.acceptedSubmissions / stats.totalSubmissions) * 100);
  const acCount = stats.acceptedSubmissions;
  const waCount = stats.verdictDistribution['WRONG_ANSWER'] || 0;
  const tleCount = stats.verdictDistribution['TIME_LIMIT_EXCEEDED'] || 0;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const acOffset = circumference * (1 - acCount / stats.totalSubmissions);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ringRef.current) {
      observer.observe(ringRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="story-page">
      <p className="section-label">
        <TypingAnimation text={strings.sectionAcceptRate.toUpperCase()} duration={40} />
      </p>

      <div className="verdict-display">
        <div className="verdict-ring-wrapper" ref={ringRef}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="12"
            />
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="#4ade80"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={isVisible ? acOffset : circumference}
              style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
            />
          </svg>
          <div className="verdict-center">
            <span className="verdict-rate"><NumberTicker value={acceptRate} />%</span>
            <span className="verdict-label">{strings.acceptRate}</span>
          </div>
        </div>

        <div className="verdict-legend">
          <div className="verdict-legend-item">
            <span className="verdict-dot" style={{ background: '#4ade80' }} />
            <span>AC <NumberTicker value={acCount} /></span>
          </div>
          <div className="verdict-legend-item">
            <span className="verdict-dot" style={{ background: '#f87171' }} />
            <span>WA <NumberTicker value={waCount} /></span>
          </div>
          <div className="verdict-legend-item">
            <span className="verdict-dot" style={{ background: '#38bdf8' }} />
            <span>TLE <NumberTicker value={tleCount} /></span>
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-box-value">{stats.totalSubmissions}</div>
          <div className="stat-box-label">{strings.totalSubmissions}</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">{acCount}</div>
          <div className="stat-box-label">{strings.acceptedCount}</div>
        </div>
      </div>
    </div>
  );
};
