const MySkeleton = () => {
  return (
    <div className="my-container">
      {/* 프로필 카드 스켈레톤 */}
      <div className="chat-request-profile-card">
        <div className="chat-request-user-profile">
          <div className="my-skeleton-profile-image"></div>
          <div className="my-skeleton-user-info">
            <div className="my-skeleton-name"></div>
            <div className="my-skeleton-tea-score"></div>
            <div className="my-skeleton-hashtags">
              <div className="my-skeleton-hashtag"></div>
              <div className="my-skeleton-hashtag"></div>
              <div className="my-skeleton-hashtag"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 자기소개 스켈레톤 */}
      <div className="my-introduction-section">
        <div className="my-skeleton-introduction">
          <div className="my-skeleton-line"></div>
        </div>
      </div>

      {/* 프로필 수정 버튼 스켈레톤 */}
      <div className="my-button-section">
        <div className="my-skeleton-button"></div>
      </div>

      {/* 받은 온기 섹션 스켈레톤 */}
      <div className="my-warmth-section">
        <div className="my-warmth-header">
          <div className="my-skeleton-section-title"></div>
          <div className="my-skeleton-arrow"></div>
        </div>
        <div className="my-warmth-list">
          {/* <div className="my-warmth-item">
            <div className="my-skeleton-warmth-profile"></div>
            <div className="my-skeleton-warmth-content">
              <div className="my-skeleton-warmth-name"></div>
              <div className="my-skeleton-warmth-date"></div>
              <div className="my-skeleton-warmth-message"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MySkeleton;
