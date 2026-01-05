export type Language = 'zh' | 'en';

export interface I18nStrings {
  // App
  appTitle: string;
  appSubtitle: string;
  inputPlaceholder: string;
  generateButton: string;
  loadingText: string;
  errorNotFound: string;

  // Navigation
  backToHome: string;
  saveReport: string;
  shareReport: string;
  back: string;

  // Page 1: Welcome
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeDescription: string;
  swipeUp: string;

  // Page 2: Overview / Days Active
  overviewTitle: string;
  overviewSubtitle: string;
  totalSubmissions: string;
  acceptedCount: string;
  problemsSolved: string;
  activeDays: string;
  sectionDaysActive: string;
  daysActiveDesc: string;
  unitDays: string;

  // Page 3: Problems Solved
  sectionProblems: string;
  uniqueProblemsSolvedDesc: string;
  unitProblems: string;
  difficultyEasy: string;
  difficultyMedium: string;
  difficultyHard: string;

  // Page 3.5: Languages
  languagesTitle: string;
  languagesSubtitle: string;
  mostUsedLanguage: string;
  totalLanguages: string;
  unitLanguages: string;
  timesUsed: string;
  times: string;

  // Page 4: Activity Heatmap
  heatmapTitle: string;
  heatmapSubtitle: string;
  longestStreak: string;
  days: string;
  mostActiveMonth: string;
  nightOwlSessions: string;
  nightOwlDesc: string;
  heatmapLess: string;
  heatmapMore: string;

  // Page 5: Rating Journey
  ratingTitle: string;
  ratingSubtitle: string;
  currentRating: string;
  peakRating: string;
  ratingChange: string;
  contestsJoined: string;
  bestRank: string;
  sectionRating: string;
  peakRatingLabel: string;

  // Page 6: Problem Analysis / Tags
  problemTitle: string;
  problemSubtitle: string;
  favoriteTag: string;
  hardestSolved: string;
  difficultyBreakdown: string;
  avgDifficulty: string;
  sectionTags: string;
  yourFavoriteTagIs: string;
  tagProblemsCount: string;

  // Page 7: Verdict Story / Accept Rate
  verdictTitle: string;
  verdictSubtitle: string;
  acceptRate: string;
  totalWA: string;
  totalTLE: string;
  neverGiveUp: string;
  sectionAcceptRate: string;

  // Page 8: Highlights
  highlightTitle: string;
  highlightSubtitle: string;
  fastestAC: string;
  fastestACDesc: string;
  hardestProblem: string;
  hardestProblemDesc: string;
  mostProductiveDay: string;
  mostProductiveDayDesc: string;
  sectionHighlights: string;
  gotHacked: string;

  // Page 9: Summary Card
  summaryTitle: string;
  summarySubtitle: string;
  yearInReview: string;
  certificate: string;
  goalNext: string;
  contests: string;
  topLang: string;
  topTag: string;
  acRate: string;
  submissions: string;
  saveImage: string;
  generating: string;
  downloadImage: string;
  yourYearInReview: string;
  generatingImage: string;
  longPressToSave: string;

  // Badges
  badgeLegend: string;
  badgeNightOwl: string;
  badgeEarlyBird: string;
  badgeConsistent: string;
  badgeMarathon: string;
  badgeCenturion: string;
  badgeSpeedster: string;
  badgeHardWorker: string;
  badgePolyglot: string;
  badgeSpecialist: string;
  badgeExplorer: string;
  badgeClimber: string;
  badgePeakHunter: string;
  badgeContestant: string;
  badgePerfectDay: string;
  badgeSurvivor: string;
  badgeRising: string;
  badgeDefault: string;

  // Badge descriptions
  badgeNightOwlDesc: string;
  badgeEarlyBirdDesc: string;
  badgeConsistentDesc: string;
  badgeMarathonDesc: string;
  badgeCenturionDesc: string;
  badgeSpeedsterDesc: string;
  badgeHardWorkerDesc: string;
  badgePolyglotDesc: string;
  badgeSpecialistDesc: string;
  badgeExplorerDesc: string;
  badgeClimberDesc: string;
  badgePeakHunterDesc: string;
  badgeContestantDesc: string;
  badgePerfectDayDesc: string;
  badgeSurvivorDesc: string;
  badgeRisingDesc: string;
  allBadges: string;

  // Months
  months: string[];

  // Ranks
  rankNewbie: string;
  rankPupil: string;
  rankSpecialist: string;
  rankExpert: string;
  rankCandidateMaster: string;
  rankMaster: string;
  rankInternationalMaster: string;
  rankGrandmaster: string;
  rankInternationalGrandmaster: string;
  rankLegendaryGrandmaster: string;
}

export const zhCN: I18nStrings = {
  // App
  appTitle: 'Codeforces 年度回顾',
  appSubtitle: '回顾你的编程之旅',
  inputPlaceholder: '输入你的 Codeforces ID',
  generateButton: '生成我的年度报告',
  loadingText: '正在分析你的编程足迹...',
  errorNotFound: '未找到该用户，请检查ID是否正确',

  // Navigation
  backToHome: '返回首页',
  saveReport: '保存报告',
  shareReport: '分享',
  back: '返回',

  // Page 1: Welcome
  welcomeTitle: '你好',
  welcomeSubtitle: '这一年，辛苦了',
  welcomeDescription: '无论结果如何，你始终在路上。让我们一起回顾这段旅程。',
  swipeUp: '向上滑动',

  // Page 2: Overview / Days Active
  overviewTitle: '年度概览',
  overviewSubtitle: '这一年，你的付出有目共睹',
  totalSubmissions: '总提交次数',
  acceptedCount: '通过数量',
  problemsSolved: '解决题目',
  activeDays: '活跃天数',
  sectionDaysActive: '你来过的日子',
  daysActiveDesc: '你在 Codeforces 上活跃的日子',
  unitDays: '天',

  // Page 3: Problems Solved
  sectionProblems: '题目攻克',
  uniqueProblemsSolvedDesc: '独立解决的题目',
  unitProblems: '道',
  difficultyEasy: '简单',
  difficultyMedium: '中等',
  difficultyHard: '困难',

  // Page 3.5: Languages
  languagesTitle: '编程语言',
  languagesSubtitle: '你用这些语言，讲述自己的故事',
  mostUsedLanguage: '最常用语言',
  totalLanguages: '使用语言数',
  unitLanguages: '种',
  timesUsed: '使用次数',
  times: '次',

  // Page 4: Activity Heatmap
  heatmapTitle: '你来过的日子',
  heatmapSubtitle: '每一个亮起的格子，都是你认真生活的证明',
  longestStreak: '最长连续天数',
  days: '天',
  mostActiveMonth: '最活跃月份',
  nightOwlSessions: '深夜编程',
  nightOwlDesc: '那些夜深人静时，只有你和代码相伴',
  heatmapLess: '少',
  heatmapMore: '多',

  // Page 5: Rating Journey
  ratingTitle: 'Rating 之旅',
  ratingSubtitle: '涨涨跌跌都是风景，重要的是你一直在走',
  currentRating: '当前 Rating',
  peakRating: '最高 Rating',
  ratingChange: '年度变化',
  contestsJoined: '参加比赛',
  bestRank: '最佳排名',
  sectionRating: '分数变化',
  peakRatingLabel: '最高分',

  // Page 6: Problem Analysis / Tags
  problemTitle: '题目分析',
  problemSubtitle: '慢慢地，你找到了自己擅长的事',
  favoriteTag: '你的拿手好戏',
  hardestSolved: '攻克最高难度',
  difficultyBreakdown: '难度分布',
  avgDifficulty: '你的舒适圈',
  sectionTags: '擅长领域',
  yourFavoriteTagIs: '你最爱的标签是',
  tagProblemsCount: '共解决 {count} 道相关题目',

  // Page 7: Verdict Story / Accept Rate
  verdictTitle: '提交故事',
  verdictSubtitle: '失败不可怕，可怕的是不再尝试',
  acceptRate: '通过率',
  totalWA: 'Wrong Answer',
  totalTLE: '超时次数',
  neverGiveUp: '你没有放弃',
  sectionAcceptRate: '通过率',

  // Page 8: Highlights
  highlightTitle: '高光时刻',
  highlightSubtitle: '这些时刻，值得你为自己骄傲',
  fastestAC: '最速通过',
  fastestACDesc: '灵光乍现的那一刻',
  hardestProblem: '最难突破',
  hardestProblemDesc: '你曾翻越的最高山峰',
  mostProductiveDay: '最高产的一天',
  mostProductiveDayDesc: '那天的你，状态真好',
  sectionHighlights: '高光时刻',
  gotHacked: '被 Hack 次数',

  // Page 9: Summary Card
  summaryTitle: '年度证书',
  summarySubtitle: '感谢这一年，你没有辜负自己',
  yearInReview: '年度回顾',
  certificate: '特此认证',
  goalNext: '新的一年，继续做喜欢的事',
  contests: '场比赛',
  topLang: '最常用',
  topTag: '最擅长',
  acRate: '通过率',
  submissions: '次提交',
  saveImage: '保存图片',
  generating: '生成中...',
  downloadImage: '下载图片',
  yourYearInReview: '你的年度总结',
  generatingImage: '正在生成图片...',
  longPressToSave: '长按图片可保存到相册',

  // Badges
  badgeLegend: '传奇大师',
  badgeNightOwl: '夜猫子',
  badgeEarlyBird: '早起鸟',
  badgeConsistent: '细水长流',
  badgeMarathon: '马拉松',
  badgeCenturion: '百题斩',
  badgeSpeedster: '闪电侠',
  badgeHardWorker: '肝帝',
  badgePolyglot: '多语言者',
  badgeSpecialist: '专精者',
  badgeExplorer: '探索者',
  badgeClimber: '攀登者',
  badgePeakHunter: '巅峰猎手',
  badgeContestant: '比赛达人',
  badgePerfectDay: '完美一天',
  badgeSurvivor: '不屈者',
  badgeRising: '进步飞快',
  badgeDefault: '一直在路上',

  // Badge descriptions
  badgeNightOwlDesc: '深夜提交 ≥ 100 次',
  badgeEarlyBirdDesc: '早起提交 ≥ 50 次',
  badgeConsistentDesc: '连续活跃 ≥ 50 天',
  badgeMarathonDesc: '连续活跃 ≥ 100 天',
  badgeCenturionDesc: '解决 ≥ 100 道题',
  badgeSpeedsterDesc: '最快 AC ≤ 1 分钟',
  badgeHardWorkerDesc: '总提交 ≥ 500 次',
  badgePolyglotDesc: '使用 ≥ 5 种语言',
  badgeSpecialistDesc: '某标签 ≥ 100 题',
  badgeExplorerDesc: '涉猎 ≥ 10 种标签',
  badgeClimberDesc: '年初 rating ≥ 1200 且涨幅 ≥ 200',
  badgePeakHunterDesc: '攻克 ≥ 2400 难度题目',
  badgeContestantDesc: '参加 ≥ 30 场比赛',
  badgePerfectDayDesc: '单日 AC ≥ 20 题',
  badgeSurvivorDesc: 'WA ≥ 100 次但仍有解题',
  badgeRisingDesc: '一个月内 rating 涨 ≥ 200',
  allBadges: '全部勋章',

  // Months
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],

  // Ranks
  rankNewbie: '新手',
  rankPupil: '学徒',
  rankSpecialist: '专家',
  rankExpert: '资深专家',
  rankCandidateMaster: '准大师',
  rankMaster: '大师',
  rankInternationalMaster: '国际大师',
  rankGrandmaster: '特级大师',
  rankInternationalGrandmaster: '国际特级大师',
  rankLegendaryGrandmaster: '传奇特级大师',
};

export const enUS: I18nStrings = {
  // App
  appTitle: 'Codeforces Wrapped',
  appSubtitle: 'Your Year in Code',
  inputPlaceholder: 'Enter your Codeforces handle',
  generateButton: 'Generate My Report',
  loadingText: 'Analyzing your coding journey...',
  errorNotFound: 'User not found. Please check your handle.',

  // Navigation
  backToHome: 'Back',
  saveReport: 'Save',
  shareReport: 'Share',
  back: 'Back',

  // Page 1: Welcome
  welcomeTitle: 'Hello',
  welcomeSubtitle: 'You worked hard this year',
  welcomeDescription: 'No matter the results, you kept going. Let\'s look back together.',
  swipeUp: 'Swipe up',

  // Page 2: Overview / Days Active
  overviewTitle: 'Year Overview',
  overviewSubtitle: 'Your dedication in numbers',
  totalSubmissions: 'Total Submissions',
  acceptedCount: 'Accepted',
  problemsSolved: 'Problems Solved',
  activeDays: 'Active Days',
  sectionDaysActive: 'Days You Showed Up',
  daysActiveDesc: 'days active on Codeforces',
  unitDays: '',

  // Page 3: Problems Solved
  sectionProblems: 'Problems Solved',
  uniqueProblemsSolvedDesc: 'unique problems solved',
  unitProblems: '',
  difficultyEasy: 'Easy',
  difficultyMedium: 'Medium',
  difficultyHard: 'Hard',

  // Page 3.5: Languages
  languagesTitle: 'Programming Languages',
  languagesSubtitle: 'The languages you used to tell your story',
  mostUsedLanguage: 'Most Used',
  totalLanguages: 'Languages Used',
  unitLanguages: '',
  timesUsed: 'Times Used',
  times: 'times',

  // Page 4: Activity Heatmap
  heatmapTitle: 'Days You Showed Up',
  heatmapSubtitle: 'Every lit square is proof that you tried',
  longestStreak: 'Longest Streak',
  days: 'days',
  mostActiveMonth: 'Most Active Month',
  nightOwlSessions: 'Night Sessions',
  nightOwlDesc: 'Those quiet nights, just you and your code',
  heatmapLess: 'Less',
  heatmapMore: 'More',

  // Page 5: Rating Journey
  ratingTitle: 'Rating Journey',
  ratingSubtitle: 'Ups and downs are part of the journey',
  currentRating: 'Current Rating',
  peakRating: 'Peak Rating',
  ratingChange: 'Year Change',
  contestsJoined: 'Contests',
  bestRank: 'Best Rank',
  sectionRating: 'Rating Journey',
  peakRatingLabel: 'Peak',

  // Page 6: Problem Analysis / Tags
  problemTitle: 'Problem Analysis',
  problemSubtitle: 'You found what you\'re good at',
  favoriteTag: 'Your Specialty',
  hardestSolved: 'Hardest Solved',
  difficultyBreakdown: 'Difficulty Breakdown',
  avgDifficulty: 'Your Comfort Zone',
  sectionTags: 'Favorite Tags',
  yourFavoriteTagIs: 'Your favorite tag is',
  tagProblemsCount: '{count} problems solved',

  // Page 7: Verdict Story / Accept Rate
  verdictTitle: 'Verdict Story',
  verdictSubtitle: 'Failure isn\'t scary—giving up is',
  acceptRate: 'Accept Rate',
  totalWA: 'Wrong Answers',
  totalTLE: 'Time Limits',
  neverGiveUp: 'You Didn\'t Quit',
  sectionAcceptRate: 'Accept Rate',

  // Page 8: Highlights
  highlightTitle: 'Highlights',
  highlightSubtitle: 'Moments to be proud of',
  fastestAC: 'Fastest AC',
  fastestACDesc: 'That spark of brilliance',
  hardestProblem: 'Hardest Problem',
  hardestProblemDesc: 'The highest peak you climbed',
  mostProductiveDay: 'Most Productive Day',
  mostProductiveDayDesc: 'You were on fire that day',
  sectionHighlights: 'Highlights',
  gotHacked: 'Times Got Hacked',

  // Page 9: Summary Card
  summaryTitle: 'Certificate',
  summarySubtitle: 'Thank you for not giving up on yourself',
  yearInReview: 'Year in Review',
  certificate: 'This certifies that',
  goalNext: 'Keep doing what you love',
  contests: 'Contests',
  topLang: 'Top Lang',
  topTag: 'Top Tag',
  acRate: 'AC Rate',
  submissions: 'submissions',
  saveImage: 'Save Image',
  generating: 'Generating...',
  downloadImage: 'Download',
  yourYearInReview: 'Your Year in Review',
  generatingImage: 'Generating image...',
  longPressToSave: 'Long press to save to gallery',

  // Badges
  badgeLegend: 'Legendary',
  badgeNightOwl: 'Night Owl',
  badgeEarlyBird: 'Early Bird',
  badgeConsistent: 'Steady',
  badgeMarathon: 'Marathon',
  badgeCenturion: 'Centurion',
  badgeSpeedster: 'Speedster',
  badgeHardWorker: 'Hard Worker',
  badgePolyglot: 'Polyglot',
  badgeSpecialist: 'Specialist',
  badgeExplorer: 'Explorer',
  badgeClimber: 'Climber',
  badgePeakHunter: 'Peak Hunter',
  badgeContestant: 'Contestant',
  badgePerfectDay: 'Perfect Day',
  badgeSurvivor: 'Survivor',
  badgeRising: 'Fast Learner',
  badgeDefault: 'Always Moving Forward',

  // Badge descriptions
  badgeNightOwlDesc: 'Night submissions ≥ 100',
  badgeEarlyBirdDesc: 'Morning submissions ≥ 50',
  badgeConsistentDesc: 'Streak ≥ 50 days',
  badgeMarathonDesc: 'Streak ≥ 100 days',
  badgeCenturionDesc: 'Solved ≥ 100 problems',
  badgeSpeedsterDesc: 'Fastest AC ≤ 1 minute',
  badgeHardWorkerDesc: 'Total submissions ≥ 500',
  badgePolyglotDesc: 'Used ≥ 5 languages',
  badgeSpecialistDesc: 'One tag ≥ 100 problems',
  badgeExplorerDesc: 'Explored ≥ 10 tags',
  badgeClimberDesc: 'Start rating ≥ 1200 & gained ≥ 200',
  badgePeakHunterDesc: 'Solved ≥ 2400 rated problem',
  badgeContestantDesc: 'Joined ≥ 30 contests',
  badgePerfectDayDesc: 'AC ≥ 20 in one day',
  badgeSurvivorDesc: 'WA ≥ 100 but kept solving',
  badgeRisingDesc: 'Rating +200 in one month',
  allBadges: 'All Badges',

  // Months
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  // Ranks
  rankNewbie: 'Newbie',
  rankPupil: 'Pupil',
  rankSpecialist: 'Specialist',
  rankExpert: 'Expert',
  rankCandidateMaster: 'Candidate Master',
  rankMaster: 'Master',
  rankInternationalMaster: 'International Master',
  rankGrandmaster: 'Grandmaster',
  rankInternationalGrandmaster: 'International Grandmaster',
  rankLegendaryGrandmaster: 'Legendary Grandmaster',
};

export const i18n = {
  zh: zhCN,
  en: enUS,
};

export const getStrings = (lang: Language): I18nStrings => i18n[lang];
