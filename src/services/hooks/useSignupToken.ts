import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { tokenService } from '../auth/tokenService';

export const useSignupToken = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [signupToken, setSignupToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('signupToken');
    if (token) {
      setSignupToken(token);
      tokenService.setSignupToken(token);
    } else {
      console.error('SignupToken이 없습니다.');
      alert('유효하지 않은 접근입니다.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  const validateToken = (): boolean => {
    const token = tokenService.getSignupToken();
    if (!token) {
      alert('인증 토큰이 없습니다. 다시 로그인해주세요.');
      navigate('/login');
      return false;
    }
    return true;
  };

  const clearToken = () => {
    tokenService.removeSignupToken();
    setSignupToken(null);
  };

  return {
    signupToken,
    validateToken,
    clearToken
  };
};
