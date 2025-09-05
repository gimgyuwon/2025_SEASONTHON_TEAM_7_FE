import React from 'react';
import BellSvg from '@/assets/Header/bell.svg';

interface BellIconProps {
  onClick?: () => void; // 추후 알람 관련 로직 연동
  className?: string;
}

const BellIcon: React.FC<BellIconProps> = ({ onClick, className = '' }) => {
  return (
    <button 
      className={`bell-icon ${className}`}
      onClick={onClick}
      type="button"
    >
      <img src={BellSvg} alt="알림" width="24" height="24" />
    </button>
  );
};

export default BellIcon;
