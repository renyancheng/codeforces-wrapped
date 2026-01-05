import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faCalendarAlt, faTrophy, faChartBar, faChartLine, faCrown, faSync } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { fetchUserInfo, fetchUserSubmissions, fetchUserRatingHistory, processYearData, getAvailableYears, getYearSummary, YearSummary } from './services/cfService';
import { getCachedData, setCachedData, clearCache } from './services/cacheService';
import { parseRoute, navigateTo, replaceTo } from './services/routerService';
import { CFUser, CFSubmission, CFRatingChange, YearStats, getRatingBackground, getRankColor } from './types';
import { getStrings, Language } from './i18n';
import { LanguageSwitch, LoadingSpinner } from './components/ui';
import {
  WelcomePage,
  DaysActivePage,
  ProblemsSolvedPage,
  LanguagesPage,
  HeatmapPage,
  AcceptRatePage,
  RatingPage,
  TagsPage,
  HighlightsPage,
  SummaryPage,
  ProgressBar
} from './components/pages';

const TOTAL_PAGES = 10;

const App: React.FC = () => {
  const [handle, setHandle] = useState('');
  const [user, setUser] = useState<CFUser | null>(null);
  const [allSubmissions, setAllSubmissions] = useState<CFSubmission[]>([]);
  const [allRatingHistory, setAllRatingHistory] = useState<CFRatingChange[]>([]);
  const [stats, setStats] = useState<YearStats | null>(null);
  const [yearRatingHistory, setYearRatingHistory] = useState<CFRatingChange[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [yearSummaries, setYearSummaries] = useState<YearSummary[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'year-select' | 'report'>('home');
  const [lang, setLang] = useState<Language>('zh');
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const strings = useMemo(() => getStrings(lang), [lang]);

  // 加载用户数据的核心函数
  const loadUserData = useCallback(async (targetHandle: string, forceRefresh = false): Promise<{
    userInfo: CFUser;
    submissions: CFSubmission[];
    ratingHistory: CFRatingChange[];
  } | null> => {
    // 检查缓存
    if (!forceRefresh) {
      const cached = getCachedData(targetHandle);
      if (cached) {
        return {
          userInfo: cached.userInfo,
          submissions: cached.submissions,
          ratingHistory: cached.ratingHistory
        };
      }
    }

    // 从 API 获取
    const userInfo = await fetchUserInfo(targetHandle);
    const submissions = await fetchUserSubmissions(targetHandle);
    const ratingHistory = await fetchUserRatingHistory(targetHandle);

    // 保存到缓存
    setCachedData(targetHandle, userInfo, submissions, ratingHistory);

    return { userInfo, submissions, ratingHistory };
  }, []);

  // 设置用户数据到状态
  const setUserDataToState = useCallback((
    userInfo: CFUser,
    submissions: CFSubmission[],
    ratingHistory: CFRatingChange[]
  ) => {
    setUser(userInfo);
    setAllSubmissions(submissions);
    setAllRatingHistory(ratingHistory);

    const years = getAvailableYears(submissions, ratingHistory, userInfo.registrationTimeSeconds);
    setAvailableYears(years);
    const summaries = years.map(year => getYearSummary(year, submissions, ratingHistory));
    setYearSummaries(summaries);
  }, []);

  // 选择年份并生成报告
  const applyYear = useCallback((year: number, submissions: CFSubmission[], ratingHistory: CFRatingChange[]) => {
    setSelectedYear(year);
    const yearData = processYearData(year, submissions, ratingHistory);
    setStats(yearData);

    const startOfYear = new Date(year, 0, 1).getTime() / 1000;
    const endOfYear = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;
    const yearRatings = ratingHistory.filter(
      r => r.ratingUpdateTimeSeconds >= startOfYear && r.ratingUpdateTimeSeconds <= endOfYear
    );
    setYearRatingHistory(yearRatings);
    setCurrentPage(0);
  }, []);

  // 初始化：解析 URL 并加载数据
  useEffect(() => {
    const initFromRoute = async () => {
      const { handle: routeHandle, year: routeYear } = parseRoute();

      if (!routeHandle) {
        setView('home');
        return;
      }

      setHandle(routeHandle);
      setLoading(true);
      setError(null);

      try {
        const data = await loadUserData(routeHandle);
        if (!data) throw new Error('Failed to load data');

        setUserDataToState(data.userInfo, data.submissions, data.ratingHistory);

        const years = getAvailableYears(data.submissions, data.ratingHistory, data.userInfo.registrationTimeSeconds);

        if (routeYear && years.includes(routeYear)) {
          // 有年份参数且有效，直接进入报告页
          applyYear(routeYear, data.submissions, data.ratingHistory);
          setView('report');
        } else if (routeYear) {
          // 年份无效，重定向到年份选择页
          replaceTo(routeHandle);
          setView('year-select');
        } else {
          // 没有年份参数，进入年份选择页
          setView('year-select');
        }
      } catch (err) {
        setError(strings.errorNotFound);
        setView('home');
        replaceTo();
      } finally {
        setLoading(false);
      }
    };

    initFromRoute();
  }, []); // 只在挂载时执行一次

  // 监听浏览器前进/后退
  useEffect(() => {
    const handlePopState = async () => {
      const { handle: routeHandle, year: routeYear } = parseRoute();

      if (!routeHandle) {
        // 返回主页
        setView('home');
        setUser(null);
        setStats(null);
        setHandle('');
        return;
      }

      // 如果用户不同，需要重新加载
      if (!user || user.handle.toLowerCase() !== routeHandle.toLowerCase()) {
        setLoading(true);
        try {
          const data = await loadUserData(routeHandle);
          if (data) {
            setHandle(routeHandle);
            setUserDataToState(data.userInfo, data.submissions, data.ratingHistory);

            if (routeYear) {
              applyYear(routeYear, data.submissions, data.ratingHistory);
              setView('report');
            } else {
              setView('year-select');
            }
          }
        } catch {
          setView('home');
        } finally {
          setLoading(false);
        }
      } else {
        // 同一用户，只切换视图
        if (routeYear) {
          applyYear(routeYear, allSubmissions, allRatingHistory);
          setView('report');
        } else {
          setView('year-select');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user, allSubmissions, allRatingHistory, loadUserData, setUserDataToState, applyYear]);

  // 监听滚动来更新当前页面
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollTop = container.scrollTop;
    const pageHeight = container.clientHeight;
    const newPage = Math.round(scrollTop / pageHeight);
    setCurrentPage(Math.min(newPage, TOTAL_PAGES - 1));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || view !== 'report') return;
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [view, handleScroll]);

  // 查询用户数据（从主页输入框触发）
  const fetchUserData = async (forceRefresh = false) => {
    if (!handle.trim()) return;
    setLoading(true);
    setError(null);

    const trimmedHandle = handle.trim();

    try {
      const data = await loadUserData(trimmedHandle, forceRefresh);
      if (!data) throw new Error('Failed to load data');

      setUserDataToState(data.userInfo, data.submissions, data.ratingHistory);
      setView('year-select');
      navigateTo(data.userInfo.handle); // 使用 API 返回的正确大小写
    } catch (err: any) {
      setError(strings.errorNotFound);
    } finally {
      setLoading(false);
    }
  };

  // 选择年份并生成报告
  const selectYear = (year: number) => {
    applyYear(year, allSubmissions, allRatingHistory);
    setView('report');
    if (user) {
      navigateTo(user.handle, year);
    }

    if ((window as any).confetti) {
      (window as any).confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // 返回年份选择页
  const backToYearSelect = () => {
    setView('year-select');
    setCurrentPage(0);
    if (user) {
      navigateTo(user.handle);
    }
  };

  // 返回主页
  const backToHome = () => {
    setView('home');
    setUser(null);
    setStats(null);
    setAllSubmissions([]);
    setAllRatingHistory([]);
    setAvailableYears([]);
    setYearSummaries([]);
    setHandle('');
    navigateTo();
  };

  // 计算最大解题数（用于活跃度条）
  const maxProblems = useMemo(() => {
    if (yearSummaries.length === 0) return 1;
    return Math.max(...yearSummaries.map(s => s.problemsSolved), 1);
  }, [yearSummaries]);

  // ==================== 主页 ====================
  if (view === 'home') {
    return (
      <div className="app-container">
        <div className="glass-panel">
          <div className="animated-bg">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
          <div className="home-page">
            <a
              href="https://github.com/renyancheng/codeforces-wrapped"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <LanguageSwitch lang={lang} onChange={setLang} />
            
            {/* Codeforces Official Logo */}
            <img
              src="https://s2.loli.net/2026/01/05/wxaIFib5ujMoq7K.png"
              alt="Codeforces Wrapped"
              className="home-logo-img"
            />
            <h1 className="home-title">{strings.appTitle}</h1>
            <p className="home-subtitle">{strings.appSubtitle}</p>
            
            <div className="home-input-group">
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder={strings.inputPlaceholder}
                className="home-input"
                onKeyDown={(e) => e.key === 'Enter' && fetchUserData()}
                disabled={loading}
              />
              <button
                onClick={() => fetchUserData()}
                disabled={loading || !handle.trim()}
                className="btn btn-primary btn-large"
              >
                {loading ? <LoadingSpinner /> : strings.generateButton}
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
            
            <p className="home-hint">
              {lang === 'zh' 
                ? '输入你的 Codeforces 用户名，查看历年回顾' 
                : 'Enter your Codeforces handle to view your yearly reports'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 年份选择页 ====================
  if (view === 'year-select' && user) {
    const ratingTheme = getRatingBackground(user.rating);
    const panelStyle = {
      '--blob-color-1': ratingTheme.accent,
      '--blob-color-2': ratingTheme.accent2,
      '--blob-color-3': ratingTheme.accent3
    } as React.CSSProperties;

    return (
      <div className="app-container">
        <div className="glass-panel" style={panelStyle}>
          <div className="animated-bg">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
          <div className="year-select-page">
            <LanguageSwitch lang={lang} onChange={setLang} />

            {/* 返回按钮 */}
            <button className="back-button" onClick={backToHome}>
              <span className="back-arrow">←</span>
              <span>{lang === 'zh' ? '返回' : 'Back'}</span>
            </button>

            {/* 用户信息卡片 */}
            <div className="user-profile-card">
              <div className="user-avatar-wrapper">
                <img
                  src={user.avatar}
                  alt={user.handle}
                  className="user-avatar"
                />
                <button
                  className="refresh-button-small"
                  onClick={() => fetchUserData(true)}
                  disabled={loading}
                  title={lang === 'zh' ? '刷新数据' : 'Refresh data'}
                >
                  <FontAwesomeIcon icon={faSync} />
                </button>
              </div>
              <h2
                className="user-handle"
                style={{ color: getRankColor(user.rank) }}
              >
                {user.handle}
              </h2>
              <p className="user-rank">{user.rank}</p>
              <div className="user-meta">
                <span><FontAwesomeIcon icon={faMedal} /> Rating: {user.rating}</span>
                {user.registrationTimeSeconds && (
                  <span><FontAwesomeIcon icon={faCalendarAlt} /> {lang === 'zh' ? '注册于' : 'Since'} {new Date(user.registrationTimeSeconds * 1000).getFullYear()}</span>
                )}
              </div>
            </div>

            {/* 年份选择标题 */}
            <h3 className="year-select-title">
              {lang === 'zh' ? '选择要回顾的年份' : 'Select a year to review'}
            </h3>

            {/* 年份列表 */}
            <div className="year-list">
              {yearSummaries.map((summary, index) => (
                <button
                  key={summary.year}
                  className={`year-card ${!summary.hasActivity ? 'inactive' : ''}`}
                  onClick={() => summary.hasActivity && selectYear(summary.year)}
                  disabled={!summary.hasActivity}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="year-card-header">
                    <span className="year-number">{summary.year}</span>
                    <span className="year-arrow">→</span>
                  </div>
                  
                  {summary.hasActivity ? (
                    <>
                      <div className="year-progress-bar">
                        <div 
                          className="year-progress-fill"
                          style={{ 
                            width: `${(summary.problemsSolved / maxProblems) * 100}%`,
                            background: ratingTheme.accent
                          }}
                        ></div>
                      </div>
                      <div className="year-stats">
                        <span><FontAwesomeIcon icon={faTrophy} /> {summary.problemsSolved} {lang === 'zh' ? '题' : 'solved'}</span>
                        <span><FontAwesomeIcon icon={faChartBar} /> {summary.contestCount} {lang === 'zh' ? '场比赛' : 'contests'}</span>
                        {summary.ratingChange !== 0 && (
                          <span className={summary.ratingChange > 0 ? 'positive' : 'negative'}>
                            <FontAwesomeIcon icon={faChartLine} /> {summary.ratingChange > 0 ? '+' : ''}{summary.ratingChange}
                          </span>
                        )}
                        {summary.bestRank && (
                          <span><FontAwesomeIcon icon={faCrown} /> #{summary.bestRank}</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="year-no-activity">
                      {lang === 'zh' ? '这一年没有活动记录' : 'No activity this year'}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 年度报告页 ====================
  if (!user || !stats) return null;

  const pageProps = {
    user,
    stats,
    ratingHistory: yearRatingHistory,
    strings,
    lang,
    year: selectedYear
  };

  // 根据用户 rating 获取背景光斑颜色
  const ratingTheme = getRatingBackground(user.rating);
  const panelStyle = {
    '--blob-color-1': ratingTheme.accent,
    '--blob-color-2': ratingTheme.accent2,
    '--blob-color-3': ratingTheme.accent3
  } as React.CSSProperties;

  return (
    <div className="app-container">
      <div className="glass-panel" style={panelStyle}>
        <div className="animated-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <ProgressBar current={currentPage} total={TOTAL_PAGES} />
        <div className="report-container" ref={scrollRef}>
          <LanguageSwitch lang={lang} onChange={setLang} />
          
          <WelcomePage {...pageProps} />
          <DaysActivePage {...pageProps} />
          <ProblemsSolvedPage {...pageProps} />
          <LanguagesPage {...pageProps} />
          <HeatmapPage {...pageProps} />
          <AcceptRatePage {...pageProps} />
          <RatingPage {...pageProps} />
          <TagsPage {...pageProps} />
          <HighlightsPage {...pageProps} />
          <SummaryPage {...pageProps} onBack={backToYearSelect} />
        </div>
      </div>
    </div>
  );
};

export default App;