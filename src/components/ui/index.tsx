import React from 'react';

// ==================== Section Component ====================
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '' }) => (
  <section className={`scroll-section ${className}`}>
    <div className="section-content">
      {children}
    </div>
  </section>
);

// ==================== Stat Card Component ====================
interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  subValue, 
  icon,
  color = 'white',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const valueSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`stat-card ${sizeClasses[size]}`}>
      {icon && <div className="stat-icon mb-3">{icon}</div>}
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${valueSizes[size]}`} style={{ color }}>
        {value}
      </p>
      {subValue && <p className="stat-sub">{subValue}</p>}
    </div>
  );
};

// ==================== Language Switch Component ====================
interface LanguageSwitchProps {
  lang: 'zh' | 'en';
  onChange: (lang: 'zh' | 'en') => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ lang, onChange }) => (
  <div className="language-switch">
    <button
      className={`lang-btn ${lang === 'zh' ? 'active' : ''}`}
      onClick={() => onChange('zh')}
    >
      中文
    </button>
    <button
      className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
      onClick={() => onChange('en')}
    >
      EN
    </button>
  </div>
);

// ==================== Progress Ring Component ====================
interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#22c55e',
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="progress-ring-bg"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-progress"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ stroke: color }}
        />
      </svg>
      <div className="progress-ring-content">
        {children}
      </div>
    </div>
  );
};

// ==================== Badge Component ====================
interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary' }) => (
  <span className={`badge badge-${variant}`}>
    {text}
  </span>
);

// ==================== Loading Spinner ====================
export const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => (
  <div className="loading-container">
    <div className="loading-spinner" />
    {text && <p className="loading-text">{text}</p>}
  </div>
);

// ==================== Icon Components ====================
export const Icons = {
  Trophy: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 2C13.1 2 14 2.9 14 4V5H16C17.1 5 18 5.9 18 7V9C18 11.21 16.21 13 14 13H13.72C13.36 14.13 12.74 15.14 11.94 16H14V20H16V22H8V20H10V16H12.06C13.17 14.84 13.94 13.41 14.2 11.85C14.72 11.56 15.08 11 15.08 10.33V7H14V4C14 2.9 13.1 2 12 2M10 4V5H8V7H9V10.33C9 11 9.36 11.56 9.88 11.85C10.14 13.41 10.91 14.84 12.02 16H10V4Z"/>
    </svg>
  ),
  Fire: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2Z"/>
    </svg>
  ),
  Lightning: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M11 15H6L13 1V9H18L11 23V15Z"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 3C7.03 3 3 7.03 3 12S7.03 21 12 21C12.83 21 13.62 20.88 14.37 20.67C13.5 19.72 13 18.45 13 17C13 13.69 15.69 11 19 11C19.34 11 19.67 11.03 20 11.08C19.63 6.55 16.15 3 12 3Z"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M16 11.78L20.24 4.45L21.97 5.45L16.74 14.5L10.23 10.75L5.46 19H22V21H2V3H4V17.54L9.5 8L16 11.78Z"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M8 3C6.9 3 6 3.9 6 5V9C6 10.1 5.1 11 4 11H3V13H4C5.1 13 6 13.9 6 15V19C6 20.1 6.9 21 8 21H10V19H8V14C8 12.9 7.1 12 6 12C7.1 12 8 11.1 8 10V5H10V3H8M16 3C17.1 3 18 3.9 18 5V9C18 10.1 18.9 11 20 11H21V13H20C18.9 13 18 13.9 18 15V19C18 20.1 17.1 21 16 21H14V19H16V14C16 12.9 16.9 12 18 12C16.9 12 16 11.1 16 10V5H14V3H16Z"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4M19 20H5V9H19V20Z"/>
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 2C6.49 2 2 6.49 2 12S6.49 22 12 22 22 17.51 22 12 17.51 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6M12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10Z"/>
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 2C14.21 2 16 3.79 16 6C16 8.21 14.21 10 12 10C9.79 10 8 8.21 8 6C8 3.79 9.79 2 12 2M12 12C16.42 12 20 13.79 20 16V22H4V16C4 13.79 7.58 12 12 12Z"/>
    </svg>
  )
};
