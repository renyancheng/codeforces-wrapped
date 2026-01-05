import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faMountain, faExclamationTriangle, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { PageProps } from './types';

export const HighlightsPage: React.FC<PageProps> = ({ stats, strings }) => {
  const fastestAC = stats.fastestACSeconds
    ? stats.fastestACSeconds < 60
      ? `${stats.fastestACSeconds}s`
      : `${Math.floor(stats.fastestACSeconds / 60)}m${stats.fastestACSeconds % 60}s`
    : '-';

  return (
    <div className="story-page">
      <p className="section-label">{strings.sectionHighlights.toUpperCase()}</p>

      <h2 className="page-title">{strings.highlightTitle}</h2>
      <p className="page-subtitle">{strings.highlightSubtitle}</p>

      <div className="highlight-grid">
        <div className="highlight-card">
          <div className="highlight-icon"><FontAwesomeIcon icon={faBolt} /></div>
          <div className="highlight-value">{fastestAC}</div>
          <div className="highlight-label">{strings.fastestAC}</div>
        </div>

        <div className="highlight-card">
          <div className="highlight-icon"><FontAwesomeIcon icon={faMountain} /></div>
          <div className="highlight-value">{stats.hardestProblemRating || '-'}</div>
          <div className="highlight-label">{strings.hardestSolved}</div>
        </div>

        <div className="highlight-card full-width">
          <div className="highlight-icon"><FontAwesomeIcon icon={faCalendarDay} /></div>
          <div className="highlight-value">{stats.mostProductiveDay || '-'}</div>
          <div className="highlight-label">
            {strings.mostProductiveDay} ({stats.mostProductiveDayCount} AC)
          </div>
        </div>

        <div className="highlight-card full-width">
          <div className="highlight-icon"><FontAwesomeIcon icon={faExclamationTriangle} /></div>
          <div className="highlight-value">{(stats as any).gotHacked || 0}</div>
          <div className="highlight-label">{strings.gotHacked}</div>
        </div>
      </div>
    </div>
  );
};
