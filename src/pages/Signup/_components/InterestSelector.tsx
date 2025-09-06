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
    if (selectedInterests.includes(interestId)) {
      // 이미 선택된 항목이면 선택 해제
      const newSelectedInterests = selectedInterests.filter(id => id !== interestId);
      onInterestsChange(newSelectedInterests);
    } else {
      // 새로운 항목 선택 (최대 3개까지)
      if (selectedInterests.length < 3) {
        const newSelectedInterests = [...selectedInterests, interestId];
        onInterestsChange(newSelectedInterests);
      } else {
        alert('관심사는 최대 3개까지 선택할 수 있습니다.');
      }
    }
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
