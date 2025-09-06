import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenService } from '../auth/tokenService';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasAccessToken = !!tokenService.getAccessToken();
    const isLoginPage = location.pathname === '/login';

    // 액세스 토큰이 없는데 보호된 페이지에 접근하려고 하면 /login으로 리다이렉트
    if (!hasAccessToken && !isLoginPage && location.pathname !== '/') {
      navigate('/login');
      return;
    }

    // 액세스 토큰이 있는데 /login 페이지에 접근하려고 하면 홈으로 리다이렉트
    if (hasAccessToken && isLoginPage) {
      navigate('/');
      return;
    }
  }, [location.pathname, navigate]);

  return {
    hasToken: !!tokenService.getAccessToken(),
    isAuthenticated: !!tokenService.getAccessToken()
  };
};
