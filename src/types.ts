// ==================== User Types ====================
export interface CFUser {
  handle: string;
  avatar: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  organization?: string;
  registrationTimeSeconds?: number;
}

export interface CFSubmission {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    type: string;
    rating?: number;
    tags: string[];
  };
  author: any;
  programmingLanguage: string;
  verdict: string;
  passedTestCount: number;
  timeConsumptionMillis: number;
  memoryConsumptionBytes: number;
}

export interface CFRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

// ==================== Stats Types ====================
export interface YearStats {
  year: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  uniqueProblemsSolved: number;
  ratingChange: number;
  contestCount: number;
  maxContestRank: number | null;
  bestContest: string | null;
  tagDistribution: Record<string, number>;
  difficultyDistribution: Record<number, number>;
  languageDistribution: Record<string, number>;
  activityByMonth: number[];
  activityByDay: Record<string, number>;
  verdictDistribution: Record<string, number>;
  fastestACSeconds: number | null;
  hardestProblemRating: number | null;
  hardestProblemName: string | null;
  activeDays: number;
  streak: number;
  nightOwlCount: number;
  earlyBirdCount: number;
  mostProductiveDay: string | null;
  mostProductiveDayCount: number;
  avgDifficulty: number;
  gotHacked: number;
  badges: BadgeId[];
}

// ==================== Badge Types ====================
export type BadgeId =
  | 'nightOwl' | 'earlyBird' | 'consistent' | 'marathon'
  | 'centurion' | 'speedster' | 'hardWorker' | 'polyglot'
  | 'specialist' | 'explorer' | 'climber' | 'peakHunter'
  | 'contestant' | 'perfectDay' | 'survivor' | 'rising';

export interface BadgeInfo {
  id: BadgeId;
  icon: string;
  color: string;
}

export const BADGE_CONFIG: Record<BadgeId, BadgeInfo> = {
  nightOwl: { id: 'nightOwl', icon: '🦉', color: '#6366f1' },
  earlyBird: { id: 'earlyBird', icon: '🐦', color: '#f59e0b' },
  consistent: { id: 'consistent', icon: '📅', color: '#22c55e' },
  marathon: { id: 'marathon', icon: '🏃', color: '#ef4444' },
  centurion: { id: 'centurion', icon: '💯', color: '#8b5cf6' },
  speedster: { id: 'speedster', icon: '⚡', color: '#eab308' },
  hardWorker: { id: 'hardWorker', icon: '💪', color: '#f97316' },
  polyglot: { id: 'polyglot', icon: '🌐', color: '#06b6d4' },
  specialist: { id: 'specialist', icon: '🎯', color: '#ec4899' },
  explorer: { id: 'explorer', icon: '🧭', color: '#14b8a6' },
  climber: { id: 'climber', icon: '📈', color: '#10b981' },
  peakHunter: { id: 'peakHunter', icon: '🏔️', color: '#6366f1' },
  contestant: { id: 'contestant', icon: '🏆', color: '#f59e0b' },
  perfectDay: { id: 'perfectDay', icon: '✨', color: '#a855f7' },
  survivor: { id: 'survivor', icon: '🔥', color: '#ef4444' },
  rising: { id: 'rising', icon: '🚀', color: '#3b82f6' },
};

// ==================== Theme Types ====================
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  cardBg: string;
  text: string;
  textMuted: string;
  accent: string;
  gradient: string;
}

// ==================== Utility Functions ====================
// Codeforces 官方 rank 颜色（针对深色背景优化）
export const getRankColor = (rank: string): string => {
  const r = rank?.toLowerCase() || '';
  // 注意判断顺序：更具体的 rank 要先判断
  if (r.includes('legendary grandmaster')) return '#FF3333';  // 红色（亮）- 首字母黑色特殊处理需要额外逻辑
  if (r.includes('international grandmaster')) return '#FF3333';
  if (r.includes('grandmaster')) return '#FF5555';
  if (r.includes('international master')) return '#FFBB55';  // 橙色（亮）
  if (r.includes('candidate master')) return '#FF77FF';  // 紫色（亮）- 必须在 master 之前判断！
  if (r.includes('master')) return '#FFCC77';
  if (r.includes('expert')) return '#7777FF';  // 蓝色（亮）
  if (r.includes('specialist')) return '#55DDBB';  // 青色（亮）
  if (r.includes('pupil')) return '#77FF77';  // 绿色（亮）
  if (r.includes('newbie')) return '#AAAAAA';  // 灰色（亮）
  return '#AAAAAA';
};

// 根据 rating 获取背景渐变色 (黑色主题 + 玻璃卡片 + 旋转动画)
export const getRatingBackground = (rating: number): { bg: string; gradient: string; accent: string; accent2: string; accent3: string } => {
  // 外部始终是纯黑色，卡片内通过多个 accent 色提供旋转渐变效果
  const baseBg = '#000000';

  // Legendary Grandmaster (3000+)
  if (rating >= 3000) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#FF3333',
      accent2: '#FF0000',
      accent3: '#CC0000'
    };
  }
  // International Grandmaster (2600-2999)
  if (rating >= 2600) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#FF5555',
      accent2: '#FF3333',
      accent3: '#CC2222'
    };
  }
  // Grandmaster (2400-2599)
  if (rating >= 2400) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#FF7777',
      accent2: '#FF5555',
      accent3: '#DD3333'
    };
  }
  // International Master (2300-2399)
  if (rating >= 2300) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#FFB428',
      accent2: '#FF9500',
      accent3: '#DD8800'
    };
  }
  // Master (2100-2299)
  if (rating >= 2100) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#FFC107',
      accent2: '#FFD700',
      accent3: '#CC9900'
    };
  }
  // Candidate Master (1900-2099)
  if (rating >= 1900) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#BA55D3',
      accent2: '#9932CC',
      accent3: '#8B008B'
    };
  }
  // Expert (1600-1899)
  if (rating >= 1600) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#3B82F6',
      accent2: '#2563EB',
      accent3: '#1D4ED8'
    };
  }
  // Specialist (1400-1599)
  if (rating >= 1400) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#06B6D4',
      accent2: '#0891B2',
      accent3: '#0E7490'
    };
  }
  // Pupil (1200-1399)
  if (rating >= 1200) {
    return {
      bg: baseBg,
      gradient: 'none',
      accent: '#22C55E',
      accent2: '#16A34A',
      accent3: '#15803D'
    };
  }
  // Newbie (0-1199)
  return {
    bg: baseBg,
    gradient: 'none',
    accent: '#6B7280',
    accent2: '#4B5563',
    accent3: '#374151'
  };
};

export const getRankTextClass = (rank: string): string => {
  const r = rank?.toLowerCase() || '';
  if (r.includes('legendary')) return 'text-red-500';
  if (r.includes('grandmaster')) return 'text-red-500';
  if (r.includes('master')) return 'text-orange-500';
  if (r.includes('candidate')) return 'text-purple-500';
  if (r.includes('expert')) return 'text-blue-600';
  if (r.includes('specialist')) return 'text-cyan-500';
  if (r.includes('pupil')) return 'text-green-500';
  if (r.includes('newbie')) return 'text-gray-400';
  return 'text-gray-400';
};

export const getVerdictLabel = (v: string, isEnglish: boolean = false): string => {
  const mapZh: Record<string, string> = {
    'OK': '通过',
    'WRONG_ANSWER': '答案错误',
    'TIME_LIMIT_EXCEEDED': '超时',
    'MEMORY_LIMIT_EXCEEDED': '内存超限',
    'RUNTIME_ERROR': '运行错误',
    'COMPILATION_ERROR': '编译错误',
    'CHALLENGED': '被 Hack',
    'SKIPPED': '跳过',
    'TESTING': '测试中',
    'REJECTED': '拒绝',
  };
  
  const mapEn: Record<string, string> = {
    'OK': 'Accepted',
    'WRONG_ANSWER': 'Wrong Answer',
    'TIME_LIMIT_EXCEEDED': 'TLE',
    'MEMORY_LIMIT_EXCEEDED': 'MLE',
    'RUNTIME_ERROR': 'Runtime Error',
    'COMPILATION_ERROR': 'Compile Error',
    'CHALLENGED': 'Hacked',
    'SKIPPED': 'Skipped',
    'TESTING': 'Testing',
    'REJECTED': 'Rejected',
  };
  
  return isEnglish ? (mapEn[v] || v) : (mapZh[v] || v);
};

export const getVerdictColor = (verdict: string): string => {
  switch (verdict) {
    case 'OK': return '#22c55e';
    case 'WRONG_ANSWER': return '#ef4444';
    case 'TIME_LIMIT_EXCEEDED': return '#3b82f6';
    case 'MEMORY_LIMIT_EXCEEDED': return '#f59e0b';
    case 'RUNTIME_ERROR': return '#a855f7';
    case 'COMPILATION_ERROR': return '#f97316';
    default: return '#6b7280';
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};
