import { useEffect, useState } from "react";
import { useLayout } from "@/services/hooks/useLayout";
import { getMyProfile } from "@/services/member/myProfileService";
import type { MyProfileData } from "@/interfaces/user";
import { useNavigate } from "react-router-dom";

const MyReview = () => {
  const { setLayoutConfig } = useLayout();
  const [profile, setProfile] = useState<MyProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLayoutConfig({
      type: "back-only",
      showHeader: true,
      showBottomBar: false,
      title: `내가 받은 온기 (${profile?.reviews.length || 0})`,
      onBack: () => navigate(-1),
    });
  }, [setLayoutConfig, profile?.reviews.length, navigate]);

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

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="my-review-container">
          <div className="my-warmth-list">
            {/* 스켈레톤 UI */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="my-warmth-item">
                <div className="my-warmth-left">
                  <div className="my-skeleton-warmth-profile"></div>
                  <div className="my-skeleton-warmth-content">
                    <div className="my-skeleton-warmth-header">
                      <div className="my-skeleton-warmth-name"></div>
                      <div className="my-skeleton-warmth-date"></div>
                    </div>
                    <div className="my-skeleton-warmth-message"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="my-review-container">
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
        <div className="my-review-container">
          <div className="error-message">
            <p>프로필 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="my-review-container">
        <div className="my-warmth-list">
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
                    <div className="my-warmth-header">
                      <div className="my-warmth-name">{review.reviewerName}</div>
                      <div className="my-warmth-date">
                        {new Date(review.reviewDate).toLocaleDateString('ko-KR', {
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="my-warmth-message">
                      {review.reviewerComment}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-warmth">
              <p>아직 받은 온기가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReview;
