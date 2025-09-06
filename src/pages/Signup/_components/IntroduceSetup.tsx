import React, { useEffect } from 'react';
import { useLayout } from '@/services/hooks/useLayout';

interface IntroduceSetupProps {
  introduceMySelf: string;
  onIntroduceChange: (introduce: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const IntroduceSetup: React.FC<IntroduceSetupProps> = ({
  introduceMySelf,
  onIntroduceChange,
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
    if (!introduceMySelf.trim()) {
      alert('자기소개를 입력해주세요.');
      return;
    }
    onNext();
  };

  return (
    <>
      <div className="extra-info-form">
        <div className="form-group">
          <label htmlFor="introduceMySelf" className="introduce-label">나를 표현하는 자기소개 문구를<br />
          자유롭게 작성해주세요.</label>
          <div className="textarea-container">
            <textarea
              id="introduceMySelf"
              name="introduceMySelf"
              value={introduceMySelf}
              onChange={(e) => onIntroduceChange(e.target.value)}
              placeholder="ex. 요즘 요즘 관심사는 건강과 산책이에요. 대화를 통해 서로의 생각을 알아가고 싶어요."
              className="introduce-textarea"
              rows={8}
              maxLength={250}
            />
            <div className="character-count"><span className="character-count-number">{introduceMySelf.length}</span>/250자</div>
          </div>
        </div>
        
        <button 
          type="button" 
          className="btn btn-primary extra-info-btn"
          onClick={handleNext}
        >
          완료
        </button>
      </div>
    </>
  );
};

export default IntroduceSetup;
