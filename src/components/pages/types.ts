import { CFUser, YearStats, BadgeId } from '../../types';
import { I18nStrings } from '../../i18n';

export interface PageProps {
  user: CFUser;
  stats: YearStats;
  ratingHistory: any[];
  strings: I18nStrings;
  lang: 'zh' | 'en';
  year: number;
}

export const getRankClass = (rank: string): string => {
  const r = rank?.toLowerCase() || '';
  if (r.includes('legendary')) return 'rank-legendary';
  if (r.includes('international grandmaster')) return 'rank-grandmaster';
  if (r.includes('grandmaster')) return 'rank-grandmaster';
  if (r.includes('international master')) return 'rank-master';
  if (r.includes('candidate master')) return 'rank-candidate';
  if (r.includes('master')) return 'rank-master';
  if (r.includes('expert')) return 'rank-expert';
  if (r.includes('specialist')) return 'rank-specialist';
  if (r.includes('pupil')) return 'rank-pupil';
  return 'rank-newbie';
};

export const getBadgeName = (badgeId: BadgeId, strings: I18nStrings): string => {
  const nameMap: Record<BadgeId, keyof I18nStrings> = {
    nightOwl: 'badgeNightOwl',
    earlyBird: 'badgeEarlyBird',
    consistent: 'badgeConsistent',
    marathon: 'badgeMarathon',
    centurion: 'badgeCenturion',
    speedster: 'badgeSpeedster',
    hardWorker: 'badgeHardWorker',
    polyglot: 'badgePolyglot',
    specialist: 'badgeSpecialist',
    explorer: 'badgeExplorer',
    climber: 'badgeClimber',
    peakHunter: 'badgePeakHunter',
    contestant: 'badgeContestant',
    perfectDay: 'badgePerfectDay',
    survivor: 'badgeSurvivor',
    rising: 'badgeRising',
  };
  return strings[nameMap[badgeId]] as string;
};

export const getBadgeDesc = (badgeId: BadgeId, strings: I18nStrings): string => {
  const descMap: Record<BadgeId, keyof I18nStrings> = {
    nightOwl: 'badgeNightOwlDesc',
    earlyBird: 'badgeEarlyBirdDesc',
    consistent: 'badgeConsistentDesc',
    marathon: 'badgeMarathonDesc',
    centurion: 'badgeCenturionDesc',
    speedster: 'badgeSpeedsterDesc',
    hardWorker: 'badgeHardWorkerDesc',
    polyglot: 'badgePolyglotDesc',
    specialist: 'badgeSpecialistDesc',
    explorer: 'badgeExplorerDesc',
    climber: 'badgeClimberDesc',
    peakHunter: 'badgePeakHunterDesc',
    contestant: 'badgeContestantDesc',
    perfectDay: 'badgePerfectDayDesc',
    survivor: 'badgeSurvivorDesc',
    rising: 'badgeRisingDesc',
  };
  return strings[descMap[badgeId]] as string;
};
