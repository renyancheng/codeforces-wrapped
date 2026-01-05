import React from 'react';
import { getRankColor } from '../../types';
import { PageProps } from './types';
import NumberTicker from '../magicui/number-ticker';

export const RatingPage: React.FC<PageProps> = ({ user, stats, strings }) => {
  const change = stats.ratingChange;
  const isPositive = change >= 0;

  return (
    <div className="story-page">
      <p className="section-label">{strings.sectionRating.toUpperCase()}</p>

      <div className="rating-display">
        <div className="rating-current" style={{ color: getRankColor(user.rank) }}>
          <NumberTicker value={user.rating} />
        </div>

        <div className={`rating-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} <NumberTicker value={Math.abs(change)} />
        </div>

        <p className="rating-peak">
          {strings.peakRatingLabel}: {user.maxRating}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-box-value">{stats.contestCount || 0}</div>
          <div className="stat-box-label">{strings.contestsJoined}</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">#{stats.maxContestRank || '-'}</div>
          <div className="stat-box-label">{strings.bestRank}</div>
        </div>
      </div>
    </div>
  );
};
