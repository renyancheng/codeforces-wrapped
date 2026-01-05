# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Codeforces Year in Review application - a React/TypeScript web app that generates personalized annual reports for Codeforces users. Users enter their handle, select a year, and see an animated, paginated review of their coding activity including problems solved, rating changes, contest performance, and activity heatmaps.

## Development Commands

### Setup
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts Vite dev server on `http://localhost:3000` (configured in vite.config.ts)

### Build
```bash
npm run build
```
Creates optimized production build using Vite

### Preview
```bash
npm run preview
```
Preview production build locally

## Environment Configuration

- Create a `.env.local` file with your Gemini API key:
  ```
  GEMINI_API_KEY=your_key_here
  ```
- The Vite config exposes this as `process.env.GEMINI_API_KEY` and `process.env.API_KEY`

## Architecture

### Application Flow

The app has three main views managed by the `view` state:

1. **Home View** (`'home'`): Landing page with handle input
2. **Year Select View** (`'year-select'`): Displays user profile and available years with activity summaries
3. **Report View** (`'report'`): Paginated full-screen report with 8 pages

### State Management

All state is managed locally in `App.tsx` using React hooks:
- `user`: Current user info from Codeforces API
- `allSubmissions`: Complete submission history
- `allRatingHistory`: Complete rating change history
- `stats`: Processed year-specific statistics
- `selectedYear`: Currently selected year
- `currentPage`: Current page index (0-7) in report view

### Data Flow

1. User enters handle → `fetchUserData()` calls Codeforces API endpoints
2. Raw data stored in state (`allSubmissions`, `allRatingHistory`)
3. When year selected → `processYearData()` computes `YearStats` for that year
4. Stats passed down to individual page components via props

### Key Services (`services/cfService.ts`)

- `fetchUserInfo(handle)`: Gets user profile from `/api/user.info`
- `fetchUserSubmissions(handle)`: Gets all submissions from `/api/user.status`
- `fetchUserRatingHistory(handle)`: Gets rating history from `/api/user.rating`
- `processYearData(year, submissions, ratingHistory)`: Core function that computes all statistics for a given year
- `getAvailableYears()`: Determines which years have activity
- `getYearSummary()`: Creates preview data for year selection page

### Page Components (`components/pages.tsx`)

The report consists of 8 full-screen pages rendered in a scrollable container:

1. `WelcomePage`: Introduction with user avatar and year
2. `DaysActivePage`: Activity heatmap showing daily submissions
3. `ProblemsSolvedPage`: Unique problems solved with breakdown
4. `AcceptRatePage`: Acceptance rate statistics
5. `RatingPage`: Rating progression chart
6. `TagsPage`: Problem tag distribution
7. `HighlightsPage`: Unique achievements (fastest solve, hardest problem, etc.)
8. `SummaryPage`: Overall wrap-up with share options

Each page receives consistent props: `{ user, stats, ratingHistory, strings, lang, year }`

### UI Components (`components/ui.tsx`)

Reusable components:
- `LanguageSwitch`: Toggle between Chinese and English
- `LoadingSpinner`: Animated loading indicator
- `StatCard`: Metric display card

### Magic UI Components (`components/magicui/`)

Animation components from Magic UI library:
- `NumberTicker`: Animated number counter
- `OrbitingCircles`: Circular orbiting animation
- `TypingAnimation`: Typewriter text effect

### Theming System (`types.ts`)

- `getRankColor(rank)`: Maps Codeforces rank to display color
- `getRatingBackground(rating)`: Returns theme colors (accent colors for animated blobs) based on rating tier
- Colors follow official Codeforces ranking: Newbie (gray), Pupil (green), Specialist (cyan), Expert (blue), CM (purple), Master (orange), GM+ (red variants)

### Internationalization (`i18n/index.ts`)

- `getStrings(lang)`: Returns all UI strings for Chinese ('zh') or English ('en')
- Stored as structured objects with consistent keys
- Currently supports Chinese and English

### Scroll-based Pagination

- Report container uses CSS `scroll-snap-type: y mandatory` for page snapping
- `handleScroll()` updates `currentPage` based on scroll position
- `ProgressBar` shows current page indicator

## Code Patterns

### API Error Handling
All Codeforces API calls check `data.status === 'OK'` before accessing results. Errors show user-friendly messages via the `error` state.

### Year Filtering
Year boundaries consistently use:
```typescript
const startOfYear = new Date(year, 0, 1).getTime() / 1000;
const endOfYear = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;
```
All times are Unix timestamps (seconds).

### Problem Uniqueness
Problems identified by `contestId` + `index` concatenation:
```typescript
const probId = `${s.problem.contestId}${s.problem.index}`;
```

### Responsive Design
Uses Tailwind CSS classes extensively. The glass morphism effect is achieved through CSS backdrop filters with animated gradient blobs.

## External Dependencies

- **React 19**: Latest React with new features
- **Recharts**: For rating progression charts
- **html2canvas**: Screenshot generation for sharing
- **Framer Motion**: Animation library for page transitions and effects
- **react-fast-marquee**: Scrolling marquee component
- **Tailwind CSS v4**: Utility-first styling
- **Vite**: Build tool and dev server

## Important Notes

- Codeforces API base URL: `https://codeforces.com/api`
- API has rate limits; no caching implemented currently
- All verdict processing uses official Codeforces verdict strings (OK, WRONG_ANSWER, etc.)
- The app does not handle "hacks given by user" as this data isn't available from `user.status` endpoint
- Path aliases: `@/*` resolves to project root (configured in tsconfig.json and vite.config.ts)
