import React, { useEffect } from 'react';
import AgeRangeSelector from './AgeRangeSelector';
import { useLayout } from '@/services/hooks/useLayout';
import { useNavigate } from 'react-router-dom';

interface ProfileSetupProps {
  formData: {
    nickname: string;
    ageRange: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAgeChange: (age: string) => void;
  onNext: () => void;
  onBack: () => void;
}



const ProfileSetup: React.FC<ProfileSetupProps> = ({
  formData,
  onInputChange,
  onAgeChange,
  onNext,
}) => {
  const { setLayoutConfig } = useLayout();
  const navigate = useNavigate();
  useEffect(() => {
    setLayoutConfig({
      type: 'back-only',
      title: '프로필 설정',
      showHeader: true,
      showBottomBar: false,
      onBack: () => {
        navigate('/login');
        sessionStorage.removeItem('signupToken');
      },
    });
  }, [setLayoutConfig, navigate]);
  return (
    <>
      <form className="extra-info-form">
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={onInputChange}
            placeholder="2-8자 한글"
            required
            maxLength={16}
          />
        </div>

        <AgeRangeSelector
          selectedAge={formData.ageRange}
          onAgeChange={onAgeChange}
        />
        
        <div className="btn-primary">
          <button 
            type="button" 
            onClick={onNext}
          >
            다음
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileSetup;
