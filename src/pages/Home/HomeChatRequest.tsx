import { useLayout } from '@/services/hooks/useLayout';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserCardData } from '@/interfaces/user';

const HomeChatRequest = () => {
  const { setLayoutConfig } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();
  
  // location.state에서 유저 정보 받기
  const user = location.state as UserCardData;

  useEffect(() => {
    setLayoutConfig({
      type: 'close',
      showHeader: true,
      showBottomBar: false,
      onClose: () => navigate(-1),
    });
  }, [setLayoutConfig, navigate]);

  // 유저 정보가 없으면 홈으로 리다이렉트
  if (!user) {
    navigate('/');
    return null;
  }

  const handleChatRequest = () => {
    console.log('채팅 신청:', user.name);
    // 추후 채팅 신청 API 호출
  };

  return (
          <div className="chat-request-container">
        {/* 프로필 카드 */}
        <div className="chat-request-profile-card">
          <div className="chat-request-user-profile">
            <div className="chat-request-profile-image">
              {user.profileImage ? (
                <img src={user.profileImage} alt={`${user.name} 프로필`} />
              ) : (
                <div className="chat-request-profile-placeholder">
                  <span>{user.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="chat-request-user-info">
              <span className="chat-request-user-name">{user.name} 
                <span className="chat-request-user-name-suffix">님</span>
                <span className="chat-request-user-age">{user.age}대</span>
              </span>
              <span className="chat-request-tea-score">찻잔지수<span className="chat-request-tea-score-number">{user.teaScore}잔</span></span>
              <div className="chat-request-user-hashtags">
                {user.hashtags.map((tag, index) => (
                  <span key={index} className="chat-request-hashtag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
          
        </div>

      {/* 자기소개 */}
      <div className="chat-request-introduction-section">
        <h3 className="chat-request-section-title">자기소개</h3>
        <p className="chat-request-introduction-text">{user.introduction}</p>
      </div>

      {/* 채팅 신청 버튼 */}
      <div className="chat-request-button-section">
        {/* <button className="btn btn-secondary chat-request-btn">다음에 한 잔 해요</button> */}
        <button 
          className="btn btn-primary chat-request-btn"
          onClick={handleChatRequest}
        >
          {user.name} 님과 차 한잔 하기
        </button>
      </div>
    </div>
  )
}

export default HomeChatRequest
