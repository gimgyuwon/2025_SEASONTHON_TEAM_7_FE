import React, { useEffect } from 'react';
import { useLayout } from '@/services/hooks/useLayout';
import SignupCompleteIcon from '@/assets/Login/signup-complete.svg';

interface SignupCompleteProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onBack: () => void;
}

const SignupComplete: React.FC<SignupCompleteProps> = ({
  onSubmit,
  onBack
}) => {
  const { setLayoutConfig } = useLayout();
  
  useEffect(() => {
    setLayoutConfig({
      type: 'back-only',
      title: '',
      showHeader: false,
      showBottomBar: false,
      onBack: onBack,
    });
  }, [setLayoutConfig, onBack]);

  return (
    <>
      <div className="extra-info-form">
        <div className="complete-title">
          프로필 설정 완료
        </div>
        <img src={SignupCompleteIcon} alt="signup-complete" />
        <button 
          type="button" 
          className="btn btn-primary extra-info-btn submit-btn"
          onClick={onSubmit}
        >
          시작하기
        </button>
      </div>
    </>
  );
};

export default SignupComplete;
