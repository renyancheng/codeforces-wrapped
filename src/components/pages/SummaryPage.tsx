import React, { useState, useRef, useCallback } from 'react';
import { snapdom } from '@zumer/snapdom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faArrowLeft, faDownload, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { getRankColor, getRatingBackground, BADGE_CONFIG, BadgeId } from '../../types';
import { PageProps, getBadgeName, getBadgeDesc } from './types';
import { badgeImages } from '../../assets/badges';

const ALL_BADGES: BadgeId[] = [
  'nightOwl', 'earlyBird', 'consistent', 'marathon', 'centurion', 'speedster',
  'hardWorker', 'polyglot', 'specialist', 'explorer', 'climber', 'peakHunter',
  'contestant', 'perfectDay', 'survivor', 'rising'
];

interface SummaryPageProps extends PageProps {
  onBack: () => void;
}

export const SummaryPage: React.FC<SummaryPageProps> = ({ user, stats, strings, year, onBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const ratingTheme = getRatingBackground(user.rating);

  const generateImage = useCallback(async () => {
    if (!cardRef.current) return;

    setGenerating(true);
    setShowModal(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = await snapdom(cardRef.current);
      const img = await result.toPng({ scale: 2 });
      setImageUrl(img.src);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setGenerating(false);
    }
  }, []);

  const downloadImage = useCallback(() => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.download = `codeforces-${year}-${user.handle}.png`;
    link.href = imageUrl;
    link.click();
  }, [imageUrl, year, user.handle]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImageUrl(null);
  }, []);

  // Get top language and tag
  const topLang = Object.entries(stats.languageDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const topTag = Object.entries(stats.tagDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const acRate = stats.totalSubmissions > 0 ? Math.round((stats.acceptedSubmissions / stats.totalSubmissions) * 100) : 0;

  return (
    <div className="story-page summary-page">
      <div
        className={`summary-card-wrapper ${generating ? 'for-export' : ''}`}
        ref={cardRef}
        style={generating ? {
          '--export-accent': ratingTheme.accent,
          '--export-accent2': ratingTheme.accent2,
        } as React.CSSProperties : undefined}
      >
        <div className="summary-card-bg">
          <div className="summary-blob blob-1"></div>
          <div className="summary-blob blob-2"></div>
          <div className="summary-blob blob-3"></div>
        </div>
        <div className="summary-card">
          {/* Header: Logo left, Year right */}
          <div className="summary-header">
            <img
              src="https://codeforces.org/s/90979/apple-icon-144x144.png"
              alt="Codeforces"
              className="summary-logo"
            />
            <span className="summary-year-badge">{year}</span>
          </div>

          {/* User info row */}
          <div className="summary-user-row">
            <img
              src={user.avatar}
              alt={user.handle}
              className="summary-avatar"
              crossOrigin="anonymous"
            />
            <div className="summary-user-info">
              <h2 className="summary-handle" style={{ color: getRankColor(user.rank) }}>
                {user.handle}
              </h2>
              <p className="summary-rank">{user.rank}</p>
              <p className="summary-ac-count">
                <span className="ac-highlight">{stats.acceptedSubmissions}</span>
                <span className="ac-separator">/</span>
                <span className="ac-total">{stats.totalSubmissions}</span>
                <span className="ac-label">{strings.submissions}</span>
              </p>
            </div>
          </div>

          {/* Badges - multi-line wrap */}
          {stats.badges && stats.badges.length > 0 && (
            <div className="summary-badges-wrap">
              {stats.badges.map((badgeId) => (
                <span key={badgeId} className="summary-badge-chip" title={getBadgeName(badgeId, strings)}>
                  <img src={badgeImages[badgeId]} alt="" className="badge-icon-img" />
                  <span className="badge-name">{getBadgeName(badgeId, strings)}</span>
                </span>
              ))}
            </div>
          )}

          {/* Stats grid */}
          <div className="summary-stats-grid">
            <div className="summary-stat-item">
              <div className="summary-stat-value">{stats.uniqueProblemsSolved}</div>
              <div className="summary-stat-label">{strings.problemsSolved}</div>
            </div>
            <div className="summary-stat-item">
              <div className="summary-stat-value">{stats.activeDays}</div>
              <div className="summary-stat-label">{strings.activeDays}</div>
            </div>
            <div className="summary-stat-item">
              <div className="summary-stat-value">{stats.contestCount}</div>
              <div className="summary-stat-label">{strings.contests}</div>
            </div>
            <div className="summary-stat-item">
              <div className="summary-stat-value">{acRate}%</div>
              <div className="summary-stat-label">{strings.acRate}</div>
            </div>
          </div>

          {/* Highlights row */}
          <div className="summary-highlights-row">
            <div className="summary-highlight-item">
              <div className="summary-highlight-label">{strings.topLang}</div>
              <div className="summary-highlight-value" title={topLang}>{topLang}</div>
            </div>
            <div className="summary-highlight-item">
              <div className="summary-highlight-label">{strings.topTag}</div>
              <div className="summary-highlight-value" title={topTag}>{topTag}</div>
            </div>
            {stats.ratingChange !== 0 && (
              <div className="summary-highlight-item">
                <div className="summary-highlight-label">Rating</div>
                <div className={`summary-highlight-value rating-delta ${stats.ratingChange > 0 ? 'positive' : 'negative'}`}>
                  {stats.ratingChange > 0 ? '+' : ''}{stats.ratingChange}
                </div>
              </div>
            )}
          </div>

          <p className="summary-footer">Codeforces Year in Review</p>
        </div>
      </div>

      <div className="bottom-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> {strings.back}
        </button>
        <button className="btn btn-secondary" onClick={() => setShowBadgeModal(true)}>
          <FontAwesomeIcon icon={faQuestionCircle} /> {strings.allBadges}
        </button>
        <button className="btn btn-primary" onClick={generateImage} disabled={generating}>
          {generating
            ? strings.generating
            : (<><FontAwesomeIcon icon={faShareAlt} /> {strings.shareReport}</>)}
        </button>
      </div>

      {showModal && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3 className="modal-title">{strings.yourYearInReview}</h3>

            {generating ? (
              <div className="modal-loading">
                <div className="loading-spinner"></div>
                <p>{strings.generatingImage}</p>
              </div>
            ) : imageUrl ? (
              <>
                <div className="modal-image-container">
                  <img src={imageUrl} alt="Summary" className="modal-image" />
                </div>
                <div className="modal-actions">
                  <button className="btn btn-primary btn-large" onClick={downloadImage}>
                    <FontAwesomeIcon icon={faDownload} /> {strings.downloadImage}
                  </button>
                </div>
                <p className="modal-hint">{strings.longPressToSave}</p>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Badge explanation modal */}
      {showBadgeModal && (
        <div className="image-modal-overlay" onClick={() => setShowBadgeModal(false)}>
          <div className="badge-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBadgeModal(false)}>×</button>
            <h3 className="modal-title">{strings.allBadges}</h3>
            <div className="badge-list">
              {ALL_BADGES.map((badgeId) => {
                const earned = stats.badges?.includes(badgeId);
                return (
                  <div key={badgeId} className={`badge-list-item ${earned ? 'earned' : ''}`}>
                    <img src={badgeImages[badgeId]} alt="" className="badge-list-icon-img" />
                    <div className="badge-list-info">
                      <span className="badge-list-name">{getBadgeName(badgeId, strings)}</span>
                      <span className="badge-list-desc">{getBadgeDesc(badgeId, strings)}</span>
                    </div>
                    {earned && <span className="badge-earned-mark">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
