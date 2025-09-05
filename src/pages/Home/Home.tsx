import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLayout } from '@/services/hooks/useLayout';
import { INTEREST_CATEGORIES } from '@/interfaces/interests';
import { mockUsers } from '@/data/mockUsers';
import UserCard from './_components/UserCard';
import UserCardSkeleton from './_components/UserCardSkeleton';

const Home = () => {
  const [searchParams] = useSearchParams();
  const { setLayoutConfig } = useLayout();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 레이아웃 설정
  useEffect(() => {
    setLayoutConfig({
      type: 'home',
      showHeader: true,
      showBottomBar: true,
      onNotification: () => console.log('알림 혹은 다른 로직 추후 구현'),
    });
  }, [setLayoutConfig]);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken) {
    // console.log('액세스 토큰 받음:', accessToken);
    sessionStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
      // console.log('리프레시 토큰도 저장됨:', refreshToken);
    }
    // URL에서 토큰 파라미터 제거
    window.history.replaceState({}, document.title, window.location.pathname);
    // console.log('토큰이 sessionStorage에 저장되었습니다.');
    }
  }, [searchParams]);

  // 로딩 시뮬레이션 (실제 API 호출 시 교체)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  // 관심사 클릭 핸들러
  const handleInterestClick = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        // 이미 선택된 경우 제거
        return prev.filter(id => id !== interestId);
      } else {
        // 선택되지 않은 경우 추가
        return [...prev, interestId];
      }
    });
  };

  // 유저 카드 클릭 핸들러
  const handleUserCardClick = (userId: string) => {
    console.log('유저 카드 클릭:', userId);
    // 추후 상세 페이지로 이동하거나 모달 열기 등
  };
  
  return (
    <div className="wrapper">
      <div className="home-container">
        <div className="home-title">어떤 이야기로 차 한잔 하시겠어요?</div>
        <div className="home-interests">
          {INTEREST_CATEGORIES.map((interest) => (
            <span 
              key={interest.id} 
              className={`home-interest-item ${selectedInterests.includes(interest.id) ? 'active' : ''}`}
              onClick={() => handleInterestClick(interest.id)}
            >
              {interest.label}
            </span>
          ))}
        </div>
        
        {/* 유저 카드 그리드 */}
        <div className="user-cards-grid">
          {isLoading ? (
            // 로딩 중: 스켈레톤 UI
            Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))
          ) : (
            // 로딩 완료: 실제 데이터
            mockUsers.map((user) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onClick={handleUserCardClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
