import React, { useEffect, useState, useCallback } from 'react';
import AgeRangeSelector from './AgeRangeSelector';
import { useLayout } from '@/services/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { checkNicknameDuplicate } from '@/services/auth/signupService';

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
  const [nicknameStatus, setNicknameStatus] = useState<'idle' | 'checking' | 'available' | 'duplicate'>('idle');
  const [nicknameMessage, setNicknameMessage] = useState('');
  // 닉네임 중복 체크 (debounce 적용)
  const checkNickname = useCallback(async (nickname: string) => {
    if (!nickname || nickname.length < 2) {
      setNicknameStatus('idle');
      setNicknameMessage('');
      return;
    }

    setNicknameStatus('checking');
    setNicknameMessage('확인 중...');

    try {
      const isAvailable = await checkNicknameDuplicate(nickname);
      if (isAvailable) {
        setNicknameStatus('available');
        setNicknameMessage('사용가능한 닉네임이에요.');
      } else {
        setNicknameStatus('duplicate');
        setNicknameMessage('이미 누군가가 사용중인 닉네임이에요.');
      }
    } catch (error) {
      setNicknameStatus('idle');
      setNicknameMessage('');
    }
  }, []);

  // 닉네임 변경 시 debounce 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      checkNickname(formData.nickname);
    }, 500); // 500ms 후에 체크

    return () => clearTimeout(timer);
  }, [formData.nickname, checkNickname]);

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
          <label htmlFor="nickname" className="nickname-label">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={onInputChange}
            placeholder="2-8자 한글"
            required
            maxLength={16}
            className={nicknameStatus === 'available' ? 'valid' : nicknameStatus === 'duplicate' ? 'invalid' : ''}
          />
          {nicknameMessage && (
            <div className={`nickname-message ${nicknameStatus === 'available' ? 'success' : nicknameStatus === 'duplicate' ? 'error' : 'checking'}`}>
              {nicknameMessage}
            </div>
          )}
        </div>

        <AgeRangeSelector
          selectedAge={formData.ageRange}
          onAgeChange={onAgeChange}
        />
        

        <button 
          type="button" 
          className="btn btn-primary extra-info-btn"
          onClick={onNext}
        >
        다음
        </button>
      </form>
    </>
  );
};

export default ProfileSetup;
