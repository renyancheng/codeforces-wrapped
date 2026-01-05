import { CFUser, CFSubmission, CFRatingChange } from '../types';

const CACHE_PREFIX = 'cf_cache_';
const CACHE_EXPIRY_MS = 10 * 60 * 1000; // 10 分钟

interface CachedData {
  userInfo: CFUser;
  submissions: CFSubmission[];
  ratingHistory: CFRatingChange[];
  timestamp: number;
}

export const getCachedData = (handle: string): CachedData | null => {
  try {
    const key = `${CACHE_PREFIX}${handle.toLowerCase()}`;
    console.log('[Cache] Getting cache for key:', key);
    const cached = localStorage.getItem(key);
    if (!cached) {
      console.log('[Cache] No cache found');
      return null;
    }

    const data: CachedData = JSON.parse(cached);
    const now = Date.now();
    const age = now - data.timestamp;

    // 检查是否过期
    if (age > CACHE_EXPIRY_MS) {
      console.log('[Cache] Cache expired, age:', Math.round(age / 1000), 'seconds');
      localStorage.removeItem(key);
      return null;
    }

    console.log('[Cache] Cache hit! Age:', Math.round(age / 1000), 'seconds');
    return data;
  } catch (e) {
    console.error('[Cache] Error reading cache:', e);
    return null;
  }
};

export const setCachedData = (
  handle: string,
  userInfo: CFUser,
  submissions: CFSubmission[],
  ratingHistory: CFRatingChange[]
): void => {
  try {
    const key = `${CACHE_PREFIX}${handle.toLowerCase()}`;
    const data: CachedData = {
      userInfo,
      submissions,
      ratingHistory,
      timestamp: Date.now()
    };
    const jsonStr = JSON.stringify(data);
    console.log('[Cache] Saving cache for key:', key, 'size:', Math.round(jsonStr.length / 1024), 'KB');
    localStorage.setItem(key, jsonStr);
    console.log('[Cache] Cache saved successfully');
  } catch (e) {
    console.error('[Cache] Error saving cache:', e);
  }
};

export const clearCache = (handle?: string): void => {
  if (handle) {
    localStorage.removeItem(`${CACHE_PREFIX}${handle.toLowerCase()}`);
  } else {
    // 清除所有缓存
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};
