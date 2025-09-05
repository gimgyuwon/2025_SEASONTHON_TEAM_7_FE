import React from 'react';

const UserCardSkeleton: React.FC = () => {
  return (
    <div className="user-card-skeleton">
      <div className="skeleton-profile">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-info">
          <div className="skeleton-name"></div>
          <div className="skeleton-age"></div>
          <div className="skeleton-tea-score"></div>
        </div>
      </div>
      <div className="skeleton-introduction">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
      <div className="skeleton-hashtags">
        <div className="skeleton-hashtag"></div>
        <div className="skeleton-hashtag"></div>
        <div className="skeleton-hashtag"></div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
