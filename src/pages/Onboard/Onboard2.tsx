import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '@/services/hooks/useLayout';
import { onboardService } from '@/services/onboard/onboardService';
import Onboard2Svg from '@/assets/Onboard/onboard2.svg';

const Onboard2 = () => {
  const navigate = useNavigate();
  const { setLayoutConfig } = useLayout();

  // 레이아웃 설정 (헤더, 바텀바 숨김)
  useEffect(() => {
    setLayoutConfig({
      type: 'close',
      showHeader: false,
      showBottomBar: false,
      onClose: () => handleStart(),
    });
  }, [setLayoutConfig]);

  const handleStart = () => {
    // 온보딩 완료 처리
    onboardService.setOnboarded();
    // 홈으로 이동
    navigate('/login');
  };

  return (
    <div className="onboard-container">
      <div className="onboard-content">
        <img src={Onboard2Svg} alt="온보딩 2" className="onboard-image" />
        <button 
          className="start-button"
          onClick={handleStart}
        >
          시작하기 →
        </button>
      </div>
    </div>
  );
};

export default Onboard2;
