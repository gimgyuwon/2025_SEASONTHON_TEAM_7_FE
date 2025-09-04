import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupService, type SignupData } from '../auth/signupService';
import { tokenService } from '../auth/tokenService';
import type { InterestId } from '../../interfaces/interests';

export const useSignupFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    interests: [] as InterestId[],
    ageRange: ''
  });

  const nextStep = () => {
    if (!formData.nickname.trim() || !formData.ageRange.trim()) {
      alert('닉네임과 연령대를 모두 입력해주세요.');
      return;
    }
    setCurrentStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgeChange = (age: string) => {
    setFormData(prev => ({
      ...prev,
      ageRange: age
    }));
  };

  const handleInterestsChange = (interests: InterestId[]) => {
    setFormData(prev => ({
      ...prev,
      interests: interests
    }));
  };

  const submitSignup = async () => {
    if (formData.interests.length === 0) {
      alert('관심사를 선택해주세요.');
      return;
    }

    const signupToken = tokenService.getSignupToken();
    if (!signupToken) {
      alert('인증 토큰이 없습니다. 다시 로그인해주세요.');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      const interestsString = formData.interests.join(',');
      const signupData: SignupData = {
        nickname: formData.nickname.trim(),
        interestedJob: interestsString
      };

      const response = await signupService.signup(signupData, signupToken);

      // 토큰을 sessionStorage에 저장
      if (response.accessToken) {
        tokenService.setAccessToken(response.accessToken);
      }
      if (response.refreshToken) {
        tokenService.setRefreshToken(response.refreshToken);
      }

      // signupToken 제거
      tokenService.removeSignupToken();

      // 홈으로 리다이렉트
      navigate('/');
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    formData,
    isLoading,
    nextStep,
    handleInputChange,
    handleAgeChange,
    handleInterestsChange,
    submitSignup
  };
};
