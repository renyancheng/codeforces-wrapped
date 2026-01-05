import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import TypingAnimation from '../magicui/typing-animation';
import NumberTicker from '../magicui/number-ticker';
import { PageProps } from './types';

export const HeatmapPage: React.FC<PageProps> = ({ stats, strings, year }) => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const startDayOfWeek = startDate.getDay();

  const days: { date: string; count: number }[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      count: stats.activityByDay[dateStr] || 0
    });
    current.setDate(current.getDate() + 1);
  }

  const maxCount = Math.max(...days.map(d => d.count), 1);

  const getColor = (count: number) => {
    if (count === 0) return 'rgba(255,255,255,0.05)';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.25) return '#0e4429';
    if (intensity < 0.5) return '#006d32';
    if (intensity < 0.75) return '#26a641';
    return '#39d353';
  };

  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push({ date: '', count: -1 });
  }

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: '', count: -1 });
    }
    weeks.push(currentWeek);
  }

  return (
    <div className="story-page">
      <p className="section-label">
        <TypingAnimation text={strings.heatmapTitle.toUpperCase()} duration={40} />
      </p>

      <p className="page-subtitle" style={{ marginBottom: 16 }}>
        <TypingAnimation text={strings.heatmapSubtitle} duration={25} />
      </p>

      <div className="heatmap-container">
        <div className="heatmap-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`heatmap-cell ${day.count === -1 ? 'empty' : ''}`}
                  style={{
                    backgroundColor: day.count === -1 ? 'transparent' : getColor(day.count),
                  }}
                  title={day.date ? `${day.date}: ${day.count} AC` : ''}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="heatmap-legend">
          <span className="heatmap-legend-label">{strings.heatmapLess}</span>
          <div className="heatmap-legend-colors">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
            <div style={{ backgroundColor: '#0e4429' }} />
            <div style={{ backgroundColor: '#006d32' }} />
            <div style={{ backgroundColor: '#26a641' }} />
            <div style={{ backgroundColor: '#39d353' }} />
          </div>
          <span className="heatmap-legend-label">{strings.heatmapMore}</span>
        </div>
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
            <NumberTicker value={stats.activeDays} />
          </div>
          <div className="stat-box-label">{strings.activeDays}</div>
        </div>
      </div>
    </div>
  );
};
