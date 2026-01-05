
import { CFUser, CFSubmission, CFRatingChange, YearStats, BadgeId } from '../types';

const BASE_URL = 'https://codeforces.com/api';

// UTC+8 时区偏移（毫秒）
const UTC8_OFFSET = 8 * 60 * 60 * 1000;

// 将时间戳转换为 UTC+8 的日期字符串 (YYYY-MM-DD)
const toUTC8DateStr = (timestampSeconds: number): string => {
  const utc8Time = new Date(timestampSeconds * 1000 + UTC8_OFFSET);
  return utc8Time.toISOString().split('T')[0];
};

// 获取 UTC+8 时区的小时
const getUTC8Hour = (timestampSeconds: number): number => {
  const utc8Time = new Date(timestampSeconds * 1000 + UTC8_OFFSET);
  return utc8Time.getUTCHours();
};

// 获取 UTC+8 时区的月份 (0-11)
const getUTC8Month = (timestampSeconds: number): number => {
  const utc8Time = new Date(timestampSeconds * 1000 + UTC8_OFFSET);
  return utc8Time.getUTCMonth();
};

export const fetchUserInfo = async (handle: string): Promise<CFUser> => {
  const response = await fetch(`${BASE_URL}/user.info?handles=${handle}`);
  const data = await response.json();
  if (data.status !== 'OK') throw new Error(data.comment || '未找到该用户');
  return data.result[0];
};

export const fetchUserSubmissions = async (handle: string): Promise<CFSubmission[]> => {
  const response = await fetch(`${BASE_URL}/user.status?handle=${handle}`);
  const data = await response.json();
  if (data.status !== 'OK') throw new Error(data.comment || '无法获取提交记录');
  return data.result;
};

export const fetchUserRatingHistory = async (handle: string): Promise<CFRatingChange[]> => {
  const response = await fetch(`${BASE_URL}/user.rating?handle=${handle}`);
  const data = await response.json();
  if (data.status !== 'OK') throw new Error(data.comment || '无法获取 Rating 历史');
  return data.result;
};

export const processYearData = (
  year: number,
  submissions: CFSubmission[],
  ratingHistory: CFRatingChange[]
): YearStats => {
  const startOfYear = new Date(year, 0, 1).getTime() / 1000;
  const endOfYear = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;

  const yearSubmissions = submissions.filter(
    (s) => s.creationTimeSeconds >= startOfYear && s.creationTimeSeconds <= endOfYear
  );

  const accepted = yearSubmissions.filter((s) => s.verdict === 'OK');
  
  const uniqueSolved = new Set<string>();
  const tagDist: Record<string, number> = {};
  const diffDist: Record<number, number> = {};
  const verdictDist: Record<string, number> = {};
  const langDist: Record<string, number> = {};
  const activityByMonth = new Array(12).fill(0);
  const activityByDay: Record<string, number> = {};
  let fastestAC: number | null = null;
  let hardestRating: number | null = null;
  let hardestProblemName: string | null = null;
  let nightOwlCount = 0;
  let earlyBirdCount = 0;
  let totalDifficulty = 0;
  let difficultyCount = 0;
  let gotHacked = 0;

  yearSubmissions.forEach(s => {
    verdictDist[s.verdict] = (verdictDist[s.verdict] || 0) + 1;
    langDist[s.programmingLanguage] = (langDist[s.programmingLanguage] || 0) + 1;
    const hour = getUTC8Hour(s.creationTimeSeconds);
    if (hour >= 0 && hour <= 5) nightOwlCount++;
    if (hour >= 5 && hour <= 8) earlyBirdCount++;

    // 统计 hack 相关
    // 根据 Codeforces 官方文档，verdict 枚举包含：CHALLENGED（被 hack）
    // 注意：HACK 不在 verdict 枚举中，因此无法通过 verdict 字段统计"我 hack 了别人"
    // hackedByMe 需要额外的 API 支持（如 user.hacks），目前设为 0
    const v = s.verdict || '';
    if (v === 'CHALLENGED') {
      gotHacked++;
    }
    // HACK verdict 不存在，hackedByMe 暂时无法从 user.status 获取
    // 如需统计，需要调用 Codeforces 的 hacks API（如果可用）
  });

  accepted.forEach((s) => {
    const probId = `${s.problem.contestId}${s.problem.index}`;
    if (!uniqueSolved.has(probId)) {
      uniqueSolved.add(probId);
      s.problem.tags.forEach((t) => {
        tagDist[t] = (tagDist[t] || 0) + 1;
      });
      if (s.problem.rating) {
        const roundedRating = Math.floor(s.problem.rating / 100) * 100;
        diffDist[roundedRating] = (diffDist[roundedRating] || 0) + 1;
        totalDifficulty += s.problem.rating;
        difficultyCount++;
        if (!hardestRating || s.problem.rating > hardestRating) {
          hardestRating = s.problem.rating;
          hardestProblemName = s.problem.name;
        }
      }
    }

    if (s.relativeTimeSeconds > 0) {
      if (fastestAC === null || s.relativeTimeSeconds < fastestAC) {
        fastestAC = s.relativeTimeSeconds;
      }
    }

    activityByMonth[getUTC8Month(s.creationTimeSeconds)]++;
    const dateStr = toUTC8DateStr(s.creationTimeSeconds);
    activityByDay[dateStr] = (activityByDay[dateStr] || 0) + 1;
  });

  // 计算最高产的一天
  let mostProductiveDay: string | null = null;
  let mostProductiveDayCount = 0;
  Object.entries(activityByDay).forEach(([date, count]) => {
    if (count > mostProductiveDayCount) {
      mostProductiveDayCount = count;
      mostProductiveDay = date;
    }
  });

  // 计算最长连续天数
  const sortedDates = Object.keys(activityByDay).sort();
  let maxStreak = 0;
  let currentStreak = 0;
  let lastDateStr: string | null = null;

  // 辅助函数：计算两个日期字符串之间的天数差
  const getDaysDiff = (date1: string, date2: string): number => {
    const [y1, m1, d1] = date1.split('-').map(Number);
    const [y2, m2, d2] = date2.split('-').map(Number);
    const t1 = Date.UTC(y1, m1 - 1, d1);
    const t2 = Date.UTC(y2, m2 - 1, d2);
    return Math.round((t2 - t1) / (1000 * 3600 * 24));
  };

  sortedDates.forEach(dateStr => {
    if (lastDateStr) {
      const diff = getDaysDiff(lastDateStr, dateStr);
      if (diff === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    maxStreak = Math.max(maxStreak, currentStreak);
    lastDateStr = dateStr;
  });

  const yearRating = ratingHistory.filter(
    (r) => r.ratingUpdateTimeSeconds >= startOfYear && r.ratingUpdateTimeSeconds <= endOfYear
  );

  let ratingDelta = 0;
  let maxRank = null;
  let bestContest = null;

  if (yearRating.length > 0) {
    // 找年初之前最后一场比赛的 rating 作为起始值
    const prevYearContests = ratingHistory.filter(r => r.ratingUpdateTimeSeconds < startOfYear);
    const startRating = prevYearContests.length > 0
      ? prevYearContests[prevYearContests.length - 1].newRating
      : yearRating[0].oldRating;
    const endRating = yearRating[yearRating.length - 1].newRating;
    ratingDelta = endRating - startRating;

    maxRank = Math.min(...yearRating.map(r => r.rank));
    const bestContestObj = yearRating.find(r => r.rank === maxRank);
    bestContest = bestContestObj ? bestContestObj.contestName : null;
  }

  // 计算勋章（门槛较高，需要真正的努力才能获得）
  const badges: BadgeId[] = [];

  // 夜猫子：深夜提交 >= 100
  if (nightOwlCount >= 100) badges.push('nightOwl');
  // 早起鸟：早起提交 >= 50
  if (earlyBirdCount >= 50) badges.push('earlyBird');
  // 细水长流：连续天数 >= 50
  if (maxStreak >= 50) badges.push('consistent');
  // 马拉松：连续天数 >= 100
  if (maxStreak >= 100) badges.push('marathon');
  // 百题斩：解决 >= 100 题
  if (uniqueSolved.size >= 100) badges.push('centurion');
  // 闪电侠：最快 AC <= 1 分钟
  if (fastestAC !== null && fastestAC <= 60) badges.push('speedster');
  // 肝帝：总提交 >= 500
  if (yearSubmissions.length >= 500) badges.push('hardWorker');
  // 多语言者：使用 >= 5 种语言
  if (Object.keys(langDist).length >= 5) badges.push('polyglot');
  // 专精者：某标签 >= 100 题
  const maxTagCount = Math.max(...Object.values(tagDist), 0);
  if (maxTagCount >= 100) badges.push('specialist');
  // 探索者：涉猎 >= 10 种标签
  if (Object.keys(tagDist).length >= 10) badges.push('explorer');
  // 攀登者：年初 rating >= 1200 且年度上涨 >= 200
  const prevYearContestsForBadge = ratingHistory.filter(r => r.ratingUpdateTimeSeconds < startOfYear);
  const startRatingForBadge = yearRating.length > 0
    ? (prevYearContestsForBadge.length > 0 ? prevYearContestsForBadge[prevYearContestsForBadge.length - 1].newRating : yearRating[0].oldRating)
    : 0;
  if (startRatingForBadge >= 1200 && ratingDelta >= 200) badges.push('climber');
  // 巅峰猎手：攻克 >= 2400 难度
  if (hardestRating !== null && hardestRating >= 2400) badges.push('peakHunter');
  // 比赛达人：参加 >= 30 场比赛
  if (yearRating.length >= 30) badges.push('contestant');
  // 完美一天：单日 AC >= 20 题
  if (mostProductiveDayCount >= 20) badges.push('perfectDay');
  // 不屈者：WA 次数 >= 100 但仍在坚持
  const waCount = verdictDist['WRONG_ANSWER'] || 0;
  if (waCount >= 100 && uniqueSolved.size > 0) badges.push('survivor');
  // 进步飞快：一个月内 rating 上涨 >= 200
  let hasRapidRise = false;
  for (let i = 0; i < yearRating.length && !hasRapidRise; i++) {
    for (let j = i + 1; j < yearRating.length; j++) {
      const timeDiff = yearRating[j].ratingUpdateTimeSeconds - yearRating[i].ratingUpdateTimeSeconds;
      const ratingGain = yearRating[j].newRating - yearRating[i].oldRating;
      if (timeDiff <= 30 * 24 * 3600 && ratingGain >= 200) {
        hasRapidRise = true;
        break;
      }
    }
  }
  if (hasRapidRise) badges.push('rising');

  return {
    year,
    totalSubmissions: yearSubmissions.length,
    acceptedSubmissions: accepted.length,
    uniqueProblemsSolved: uniqueSolved.size,
    ratingChange: ratingDelta,
    contestCount: yearRating.length,
    maxContestRank: maxRank,
    bestContest,
    tagDistribution: tagDist,
    difficultyDistribution: diffDist,
    languageDistribution: langDist,
    activityByMonth,
    activityByDay,
    verdictDistribution: verdictDist,
    fastestACSeconds: fastestAC,
    hardestProblemRating: hardestRating,
    hardestProblemName,
    activeDays: Object.keys(activityByDay).length,
    streak: maxStreak,
    nightOwlCount,
    earlyBirdCount,
    mostProductiveDay,
    mostProductiveDayCount,
    avgDifficulty: difficultyCount > 0 ? Math.round(totalDifficulty / difficultyCount) : 0,
    gotHacked,
    badges
  };
};

// 年份摘要信息（用于年份选择页面显示）
export interface YearSummary {
  year: number;
  problemsSolved: number;
  contestCount: number;
  ratingChange: number;
  bestRank: number | null;
  hasActivity: boolean;
}

// 获取用户有数据的所有年份（只返回已完全结束的年份）
export const getAvailableYears = (
  submissions: CFSubmission[],
  ratingHistory: CFRatingChange[],
  registrationTime?: number
): number[] => {
  const years = new Set<number>();
  const currentYear = new Date().getFullYear();

  // 从提交记录中获取年份
  submissions.forEach(s => {
    const year = new Date(s.creationTimeSeconds * 1000).getFullYear();
    if (year < currentYear) years.add(year);
  });

  // 从rating变化中获取年份
  ratingHistory.forEach(r => {
    const year = new Date(r.ratingUpdateTimeSeconds * 1000).getFullYear();
    if (year < currentYear) years.add(year);
  });

  // 如果有注册时间，添加注册年份到去年的所有年份
  if (registrationTime) {
    const regYear = new Date(registrationTime * 1000).getFullYear();
    for (let y = regYear; y < currentYear; y++) {
      years.add(y);
    }
  }

  // 降序排列（最新年份在前）
  return Array.from(years).sort((a, b) => b - a);
};

// 获取每年的摘要信息
export const getYearSummary = (
  year: number,
  submissions: CFSubmission[],
  ratingHistory: CFRatingChange[]
): YearSummary => {
  const startOfYear = new Date(year, 0, 1).getTime() / 1000;
  const endOfYear = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;
  
  const yearSubmissions = submissions.filter(
    s => s.creationTimeSeconds >= startOfYear && s.creationTimeSeconds <= endOfYear
  );
  
  const accepted = yearSubmissions.filter(s => s.verdict === 'OK');
  const uniqueSolved = new Set<string>();
  accepted.forEach(s => {
    uniqueSolved.add(`${s.problem.contestId}${s.problem.index}`);
  });
  
  const yearRating = ratingHistory.filter(
    r => r.ratingUpdateTimeSeconds >= startOfYear && r.ratingUpdateTimeSeconds <= endOfYear
  );
  
  let ratingChange = 0;
  let bestRank: number | null = null;
  
  if (yearRating.length > 0) {
    // 找年初之前最后一场比赛的 rating 作为起始值
    const prevYearContests = ratingHistory.filter(r => r.ratingUpdateTimeSeconds < startOfYear);
    const startRating = prevYearContests.length > 0
      ? prevYearContests[prevYearContests.length - 1].newRating
      : yearRating[0].oldRating;
    const endRating = yearRating[yearRating.length - 1].newRating;
    ratingChange = endRating - startRating;
    bestRank = Math.min(...yearRating.map(r => r.rank));
  }
  
  return {
    year,
    problemsSolved: uniqueSolved.size,
    contestCount: yearRating.length,
    ratingChange,
    bestRank,
    hasActivity: yearSubmissions.length > 0 || yearRating.length > 0
  };
};
