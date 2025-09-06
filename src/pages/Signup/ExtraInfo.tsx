import React from 'react';
import ProfileSetup from './_components/ProfileSetup';
import InterestSetup from './_components/InterestSetup';
import IntroduceSetup from './_components/IntroduceSetup';
import SignupComplete from './_components/SignupComplete';
import { useSignupFlow } from '../../services/hooks/useSignupFlow';
import { useSignupToken } from '../../services/hooks/useSignupToken';

const ExtraInfo = () => {
  const {
    currentStep,
    formData,
    isLoading,
    nextStep,
    prevStep,
    handleInputChange,
    handleAgeChange,
    handleInterestsChange,
    handleIntroduceChange,
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
      {currentStep === 1 && (
        <ProfileSetup
          formData={formData}
          onInputChange={handleInputChange}
          onAgeChange={handleAgeChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 2 && (
        <InterestSetup
          selectedInterests={formData.interests}
          onInterestsChange={handleInterestsChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 3 && (
        <IntroduceSetup
          introduceMySelf={formData.introduceMySelf}
          onIntroduceChange={handleIntroduceChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 4 && (
        <SignupComplete
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onBack={prevStep}
        />
      )}
    </div>
  );
};

export default ExtraInfo;
