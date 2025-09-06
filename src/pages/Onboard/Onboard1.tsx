import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '@/services/hooks/useLayout';
import Onboard1Svg from '@/assets/Onboard/onboard1.svg';

const Onboard1 = () => {
  const navigate = useNavigate();
  const { setLayoutConfig } = useLayout();

  // 레이아웃 설정 (헤더, 바텀바 숨김)
  useEffect(() => {
    setLayoutConfig({
      type: 'close',
      showHeader: false,
      showBottomBar: false,
      onClose: () => handleNext(),
    });
  }, [setLayoutConfig]);

  const handleNext = () => {
    navigate('/onboard/2');
  };

  return (
    <div className="onboard-container">
      <div className="onboard-content">
        <img src={Onboard1Svg} alt="온보딩 1" className="onboard-image" />
        <button 
          className="next-button"
          onClick={handleNext}
        >
          다음으로 →
        </button>
      </div>
    </div>
  );
};

export default Onboard1;
