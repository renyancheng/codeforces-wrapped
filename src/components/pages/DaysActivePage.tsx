import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import TypingAnimation from '../magicui/typing-animation';
import NumberTicker from '../magicui/number-ticker';
import { PageProps } from './types';

export const DaysActivePage: React.FC<PageProps> = ({ stats, strings }) => (
  <div className="story-page">
    <p className="section-label">
      <TypingAnimation text={strings.sectionDaysActive.toUpperCase()} duration={40} />
    </p>

    <div className="stat-hero">
      <div className="hero-number">
        <NumberTicker value={stats.activeDays} />
        <span className="hero-unit">{strings.unitDays}</span>
      </div>
      <p className="hero-label">
        <TypingAnimation text={strings.daysActiveDesc} duration={30} />
      </p>
    </div>

    <div className="stat-row">
      <div className="stat-box">
        <div className="stat-box-value">
          <FontAwesomeIcon icon={faFire} /> <NumberTicker value={stats.streak} />
        </div>
        <div className="stat-box-label">{strings.longestStreak}</div>
      </div>
      <div className="stat-box">
        <div className="stat-box-value">
          <NumberTicker value={stats.nightOwlCount} />
        </div>
        <div className="stat-box-label">{strings.nightOwlSessions}</div>
      </div>
    </div>
  </div>
);
