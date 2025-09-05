import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { BottomBarItem as BottomBarItemType } from '../../constant/bottomBar';

interface BottomBarItemProps {
  item: BottomBarItemType;
  isActive?: boolean;
  onClick?: () => void;
}

const BottomBarItem: React.FC<BottomBarItemProps> = ({ 
  item, 
  isActive = false, 
  onClick 
}) => {
  const location = useLocation();
  const isCurrentActive = location.pathname === item.path || isActive;

  return (
    <Link
      to={item.path}
      className={`bottom-bar-item ${isCurrentActive ? 'active' : 'inactive'}`}
      onClick={onClick}
    >
      <div className="bottom-bar-icon">
        <img 
          src={isCurrentActive ? item.activeIcon : item.inactiveIcon} 
          alt={item.label}
          className="bottom-bar-icon-svg"
        />
      </div>
      <span className="bottom-bar-label">{item.label}</span>
    </Link>
  );
};

export default BottomBarItem;
