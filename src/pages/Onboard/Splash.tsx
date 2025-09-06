import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '@/services/hooks/useLayout';
import ChzSvg from '@/assets/Onboard/chz.svg';

const Splash = () => {
  const navigate = useNavigate();
  const { setLayoutConfig } = useLayout();

  // 레이아웃 설정 (헤더, 바텀바 숨김)
  useEffect(() => {
    setLayoutConfig({
      type: 'close',
      showHeader: false,
      showBottomBar: false,
      onClose: () => navigate('/onboard/1'),
    });
  }, [setLayoutConfig, navigate]);

  // 2초 후 자동으로 온보딩 1로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboard/1');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={ChzSvg} alt="차한잔 로고" className="splash-image" />
      </div>
    </div>
  );
};

export default Splash;
