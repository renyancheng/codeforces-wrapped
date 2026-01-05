import React from 'react';

interface HeatmapProps {
  data: Record<string, number>;
  year: number;
  lang: 'zh' | 'en';
}

const Heatmap: React.FC<HeatmapProps> = ({ data, year, lang }) => {
  const days: Date[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  let curr = new Date(startDate);
  while (curr <= endDate) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];
  
  const firstDayOfWeek = days[0].getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  
  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const getColor = (count: number): string => {
    if (!count) return 'var(--heatmap-empty)';
    if (count === 1) return 'var(--heatmap-l1)';
    if (count <= 3) return 'var(--heatmap-l2)';
    if (count <= 6) return 'var(--heatmap-l3)';
    return 'var(--heatmap-l4)';
  };

  const monthLabels = lang === 'zh' 
    ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayLabels = lang === 'zh'
    ? ['日', '一', '二', '三', '四', '五', '六']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        {monthLabels.map((month, i) => (
          <span key={i} className="heatmap-month">{month}</span>
        ))}
      </div>
      
      <div className="heatmap-body">
        <div className="heatmap-day-labels">
          {[1, 3, 5].map(i => (
            <span key={i} className="heatmap-day-label">
              {dayLabels[i]}
            </span>
          ))}
        </div>
        
        <div className="heatmap-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <div key={dayIndex} className="heatmap-cell empty" />;
                }
                const dateStr = day.toISOString().split('T')[0];
                const count = data[dateStr] || 0;
                const tooltip = lang === 'zh' 
                  ? `${dateStr}: ${count} 次提交`
                  : `${dateStr}: ${count} submissions`;
                
                return (
                  <div
                    key={dayIndex}
                    className="heatmap-cell"
                    style={{ backgroundColor: getColor(count) }}
                    title={tooltip}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="heatmap-legend">
        <span className="heatmap-legend-label">{lang === 'zh' ? '少' : 'Less'}</span>
        <div className="heatmap-legend-cells">
          <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} />
          <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-l1)' }} />
          <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-l2)' }} />
          <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-l3)' }} />
          <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-l4)' }} />
        </div>
        <span className="heatmap-legend-label">{lang === 'zh' ? '多' : 'More'}</span>
      </div>
    </div>
  );
};

export default Heatmap;