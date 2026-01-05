import React from 'react';
import { getRankColor } from '../../types';
import TypingAnimation from '../magicui/typing-animation';
import { PageProps, getRankClass } from './types';

export const WelcomePage: React.FC<PageProps> = ({ user, strings, year }) => (
  <div className="story-page welcome-page">
    <img src={user.avatar} alt={user.handle} className="welcome-avatar" />

    <h1 className="welcome-handle">
      <span className={getRankClass(user.rank)}>{user.handle}</span>
    </h1>

    <div className="welcome-rank" style={{ borderColor: getRankColor(user.rank) }}>
      <span style={{ color: getRankColor(user.rank) }}>{user.rank}</span>
    </div>

    <p className="welcome-intro">
      <TypingAnimation text={strings.welcomeDescription} duration={30} />
    </p>

    <div className="welcome-year">{year}</div>

    <div className="scroll-indicator">
      <span className="scroll-indicator-text">{strings.swipeUp}</span>
      <span className="scroll-indicator-arrow">↑</span>
    </div>
  </div>
);
