import React from 'react';
import type { UserCardProps } from '@/interfaces/user';
import { formatLastActiveTime } from '@/utils/formatTime';

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(user.id);
    }
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="user-profile">
        <div className="profile-image">
          {user.profileImage ? (
            <img src={user.profileImage} alt={`${user.name} 프로필`} />
          ) : (
            <div className="profile-placeholder">
              <span>{user.profileImage || user.name?.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <div className="user-age-container">
            <span className="user-age">{user.age}대</span>
            {user.isActive ? (
              <span className="active-indicator"></span>
            ) : (
              <span className="last-active-time">{formatLastActiveTime(user.lastActiveAt)}</span>
            )}
          </div>
          {user.teaScore === -1 ? (
                <span className="tea-score no-score">첫 대화 대기중</span>
              ) : (
                <span className="tea-score">
                  찻잔지수
                  <span className="tea-score-number">
                    {user.teaScore}잔
                  </span>
                </span>
              )}
        </div>
      </div>
      <div className="user-introduction">
        {user.introduction}
      </div>
      <div className="user-hashtags">
        {user.hashtags.map((tag, index) => (
          <span key={index} className="hashtag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
