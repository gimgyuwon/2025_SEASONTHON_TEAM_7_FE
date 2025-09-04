import React from 'react';
import InterestSelector from './InterestSelector';
import type { InterestId } from '../../../interfaces/interests';

interface InterestSetupProps {
  selectedInterests: InterestId[];
  onInterestsChange: (interests: InterestId[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InterestSetup: React.FC<InterestSetupProps> = ({
  selectedInterests,
  onInterestsChange,
  onSubmit,
  isLoading
}) => {
  return (
    <>
      <div className="subT">관심사 설정</div>
      
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
