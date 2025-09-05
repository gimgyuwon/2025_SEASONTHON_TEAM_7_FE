import React, { useEffect } from 'react';
import InterestSelector from './InterestSelector';
import type { InterestId } from '@/interfaces/interests';
import { useLayout } from '@/services/hooks/useLayout';

interface InterestSetupProps {
  selectedInterests: InterestId[];
  onInterestsChange: (interests: InterestId[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onBack: () => void;
}

const InterestSetup: React.FC<InterestSetupProps> = ({
  selectedInterests,
  onInterestsChange,
  onSubmit,
  isLoading,
  onBack
}) => {
  const { setLayoutConfig } = useLayout();
  useEffect(() => {
    setLayoutConfig({
      type: 'back-only',
      title: '관심사 설정',
      showHeader: true,
      showBottomBar: false,
      onBack: onBack,
    });
  }, [setLayoutConfig, onBack]);
  return (
    <>
      
      <form onSubmit={onSubmit} className="extra-info-form">
        <InterestSelector
          selectedInterests={selectedInterests}
          onInterestsChange={onInterestsChange}
        />
        
        <div className="btn-primary">
          <button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '완료'}
          </button>
        </div>
      </form>
    </>
  );
};

export default InterestSetup;
