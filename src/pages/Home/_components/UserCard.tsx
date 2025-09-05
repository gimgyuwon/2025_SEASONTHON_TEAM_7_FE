import React from 'react';
import type { UserCardProps } from '@/interfaces/user';

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
              <span>{user.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-age">{user.age}대</span><br/>
          <span className="tea-score">찻잔지수<span className="tea-score-number">{user.teaScore}잔</span></span>
        </div>
      </div>
      <div className="user-introduction">
        {user.introduction}
      </div>
      <div className="user-hashtags">
        {user.hashtags.map((tag, index) => (
          <span key={index} className="hashtag">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
