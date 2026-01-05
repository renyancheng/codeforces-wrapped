import React from 'react';
// @ts-ignore - react-fast-marquee 没有官方类型定义
import Marquee from 'react-fast-marquee';
import { PageProps } from './types';

export const TagsPage: React.FC<PageProps> = ({ stats, strings }) => {
  const tags = Object.entries(stats.tagDistribution)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 8);

  const topTag = tags[0]?.[0] || 'N/A';
  const topCount = tags[0]?.[1] || 0;
  const rows = 3;

  return (
    <div className="story-page">
      <p className="section-label">{strings.sectionTags.toUpperCase()}</p>

      <h2 className="page-title">{strings.yourFavoriteTagIs}</h2>
      <p className="page-subtitle" style={{ marginBottom: 24 }}>
        <strong style={{ color: '#fff', fontSize: '1.25rem' }}>{topTag}</strong>
        <br />
        {strings.tagProblemsCount.replace('{count}', String(topCount))}
      </p>

      <div className="tag-cloud">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Marquee
            key={rowIndex}
            className="tag-marquee-row"
            speed={40 + rowIndex * 10}
            pauseOnHover={false}
            autoFill={true}
            gradient={false}
            play={true}
            direction="left"
            style={{ width: 'calc(100% + 48px)', marginLeft: '-24px', padding: '8px 0', boxSizing: 'content-box' }}
          >
            {tags.map(([tag, count], i) => (
              <div key={tag + '-' + rowIndex + '-' + i} className="tag-pill">
                {tag}
                <span className="tag-pill-count">{count as number}</span>
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
};
