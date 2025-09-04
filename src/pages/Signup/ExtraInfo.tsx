import React from 'react';
import ProfileSetup from './_components/ProfileSetup';
import InterestSetup from './_components/InterestSetup';
import { useSignupFlow } from '../../services/hooks/useSignupFlow';
import { useSignupToken } from '../../services/hooks/useSignupToken';

const ExtraInfo = () => {
  const {
    currentStep,
    formData,
    isLoading,
    nextStep,
    handleInputChange,
    handleAgeChange,
    handleInterestsChange,
    submitSignup
  } = useSignupFlow();

  // signupToken 추출 및 검증 (훅 내부에서 처리)
  useSignupToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSignup();
  };

  return (
    <div className="wrapper">
      {currentStep === 1 ? (
        <ProfileSetup
          formData={formData}
          onInputChange={handleInputChange}
          onAgeChange={handleAgeChange}
          onNext={nextStep}
        />
      ) : (
        <InterestSetup
          selectedInterests={formData.interests}
          onInterestsChange={handleInterestsChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ExtraInfo;
