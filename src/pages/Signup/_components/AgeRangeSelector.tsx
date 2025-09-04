import React from 'react';

interface AgeRangeSelectorProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
}

const AgeRangeSelector: React.FC<AgeRangeSelectorProps> = ({ selectedAge, onAgeChange }) => {
  const ageRanges = [
    { value: '10대', label: '10대' },
    { value: '20대', label: '20대' },
    { value: '30대', label: '30대' },
    { value: '40대', label: '40대' },
    { value: '50대', label: '50대' },
    { value: '60대+', label: '60대 +' }
  ];

  return (
    <div className="age-range-selector">
      <label className="age-range-label">연령대</label>
      <div className="age-range-grid">
        {ageRanges.map((age) => (
          <button
            key={age.value}
            type="button"
            className={`age-range-btn ${selectedAge === age.value ? 'selected' : ''}`}
            onClick={() => onAgeChange(age.value)}
            aria-label={`${age.label} 선택`}
          >
            {age.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeRangeSelector;