import React from 'react';
import { INTEREST_CATEGORIES } from '../../../interfaces/interests';
import type { InterestId } from '../../../interfaces/interests';

interface InterestSelectorProps {
  selectedInterests: InterestId[];
  onInterestsChange: (interests: InterestId[]) => void;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({
  selectedInterests,
  onInterestsChange
}) => {
  const handleInterestToggle = (interestId: InterestId) => {
    // 현재는 한 개만 선택 가능 (나중에 3개로 확장 예정)
    const newSelectedInterests = selectedInterests.includes(interestId)
      ? [] // 선택 해제
      : [interestId]; // 새로운 항목만 선택
    
    onInterestsChange(newSelectedInterests);
  };

  return (
    <div className="interest-selector">
      <label className="interest-label">평소 나의 관심사를 선택해주세요.</label>
      <div className="interest-label-description">관심사에 맞는 대화 상대를 추천해드려요. (최대 3개)</div>
      <div className="interest-grid">
        {INTEREST_CATEGORIES.map((interest) => (
          <button
            key={interest.id}
            type="button"
            className={`interest-btn ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
            onClick={() => handleInterestToggle(interest.id)}
          >
            {interest.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
