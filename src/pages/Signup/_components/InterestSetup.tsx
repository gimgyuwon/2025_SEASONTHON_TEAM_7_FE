import React, { useEffect } from 'react';
import InterestSelector from './InterestSelector';
import type { InterestId } from '@/interfaces/interests';
import { useLayout } from '@/services/hooks/useLayout';

interface InterestSetupProps {
  selectedInterests: InterestId[];
  onInterestsChange: (interests: InterestId[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const InterestSetup: React.FC<InterestSetupProps> = ({
  selectedInterests,
  onInterestsChange,
  onNext,
  onBack
}) => {
  const { setLayoutConfig } = useLayout();
  useEffect(() => {
    setLayoutConfig({
      type: 'back-only',
      title: '프로필 설정',
      showHeader: true,
      showBottomBar: false,
      onBack: onBack,
    });
  }, [setLayoutConfig, onBack]);
  const handleNext = () => {
    if (selectedInterests.length === 0) {
      alert('관심사를 선택해주세요.');
      return;
    }
    onNext();
  };

  return (
    <>
      <div className="extra-info-form">
        <InterestSelector
          selectedInterests={selectedInterests}
          onInterestsChange={onInterestsChange}
        />
        
        <button 
          type="button" 
          className="btn btn-primary extra-info-btn"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default InterestSetup;
