import { useEffect, useState } from "react";
import { useLayout } from "@/services/hooks/useLayout";
import { getMyProfile } from "@/services/member/myProfileService";
import type { MyProfileData } from "@/interfaces/user";
import rightIcon from "@/assets/My/right-icon.svg";
import { MySkeleton } from "./_components";

const My = () => {
  const { setLayoutConfig } = useLayout();
  const [profile, setProfile] = useState<MyProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLayoutConfig({
      type: "profile",
      showHeader: true,
      showBottomBar: true,
      onNotification: () => console.log('알림 기능 추후 구현'),
    });
  }, [setLayoutConfig]);

  // 프로필 데이터 조회
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profileData = await getMyProfile();
        setProfile(profileData);
      } catch (err) {
        console.error('프로필 조회 실패:', err);
        setError(err instanceof Error ? err.message : '프로필을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    console.log('프로필 수정 기능 추후 구현');
  };

  const handleViewWarmth = () => {
    console.log('받은 온기 보기 기능 추후 구현');
  };

  if (isLoading) {
    return <MySkeleton />;
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="my-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>다시 시도</button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="wrapper">
        <div className="my-container">
          <div className="error-message">
            <p>프로필 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (  
      <div className="my-container">
        {/* 프로필 카드 */}
        <div className="chat-request-profile-card">
          <div className="chat-request-user-profile">
            <div className="chat-request-profile-image">
              {profile.profileImageUrl ? (
                <img src={profile.profileImageUrl} alt={`${profile.nickname} 프로필`} />
              ) : (
                <div className="chat-request-profile-placeholder">
                  <span>{profile.nickname?.charAt(0) || '?'}</span>
                </div>
              )}
            </div>
            <div className="chat-request-user-info">
              <span className="chat-request-user-name">
                {profile.nickname || '익명'}
                <span className="chat-request-user-name-suffix">님</span>
                <span className="chat-request-user-age">{profile.memberAge}</span>
              </span>
              {profile.mannerScore === null ? (
                <span className="chat-request-tea-score no-score">첫 대화 대기중</span>
              ) : (
                <span className="chat-request-tea-score">
                  찻잔지수
                  <span className="chat-request-tea-score-number">
                    {profile.mannerScore}잔
                  </span>
                </span>
              )}
              <div className="chat-request-user-hashtags">
                {profile.interests.map((tag, index) => (
                  <span key={index} className="chat-request-hashtag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 자기소개 */}
        <div className="my-introduction-section">
          <p className="my-introduction-text">
            {profile.introduceMySelf}
          </p>
        </div>

        {/* 프로필 수정 버튼 */}
        <div className="my-button-section">
          <button
            className="btn btn-primary my-edit-btn"
            onClick={handleEditProfile}
          >
            프로필 수정하기
          </button>
        </div>

        {/* 받은 온기 섹션 */}
        <div className="my-warmth-section">
          <div className="my-warmth-header" onClick={handleViewWarmth}>
            <span className="my-section-title">내가 받은 온기 ({profile.reviews.length})</span>
            <img src={rightIcon} alt="더보기" className="my-arrow" />
          </div>
          <div className="my-warmth-list">
            {/* API 데이터 사용 */}
            {profile.reviews.length > 0 ? (
              profile.reviews.map((review, index) => (
                <div key={index} className="my-warmth-item">
                  <div className="my-warmth-left">
                    <div className="my-warmth-profile">
                      {review.reviewerProfileImageUrl ? (
                        <img src={review.reviewerProfileImageUrl} alt="리뷰어 프로필" />
                      ) : (
                        <div className="my-warmth-profile-placeholder">
                          <span>{review.reviewerName?.charAt(0) || '?'}</span>
                        </div>
                      )}
                    </div>
                    <div className="my-warmth-content">
                      <div className="my-warmth-name">{review.reviewerName}</div>
                      <div className="my-warmth-message">
                        {review.reviewerComment}
                      </div>
                    </div>
                  </div>
                  <div className="my-warmth-date">
                    {new Date(review.reviewDate).toLocaleDateString('ko-KR', {
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-warmth">

              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default My;
