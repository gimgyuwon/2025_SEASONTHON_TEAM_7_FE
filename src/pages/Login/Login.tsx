import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/teatalkLogo.svg';
import Kakao from './_components/kakao';
import { useLayout } from '@/services/hooks/useLayout';

const Login = () => {
  const navigate = useNavigate();
  const { setLayoutConfig } = useLayout();

  // 레이아웃 설정
  useEffect(() => {
    setLayoutConfig({
      type: 'close',
      showHeader: false,
      showBottomBar: false,
      onClose: () => navigate(-1),
    });
  }, [setLayoutConfig, navigate]);

  return (
    <div className="wrapper">
      <div className="login-container">
        <div className="logo-container">
          <div className="logo-text1">세대를 잇는-대화 </div>
          <div className="logo-text2">차한잔</div>
          <img src={Logo} alt="logo" className="logo-img"/>
        </div>
        <Kakao />
      </div>
    </div>
  );
};

export default Login;
