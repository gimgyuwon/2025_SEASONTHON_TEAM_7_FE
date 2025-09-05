import React from 'react';
import BottomBarItem from './BottomBarItem';
import { BOTTOM_BAR_ITEMS } from '../../constant/bottomBar';
import { tokenService } from '../../services/auth/tokenService';

const BottomBar: React.FC = () => {
  const isAuthenticated = !!tokenService.getAccessToken();

  return (
    <nav className="bottom-bar">
      <div className="bottom-bar-content">
        {BOTTOM_BAR_ITEMS.map((item) => {
          // 인증이 필요한 아이템이고 로그인하지 않은 경우 숨김
          if (item.requireAuth && !isAuthenticated) {
            return null;
          }
          return (
            <BottomBarItem key={item.id} item={item} />
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;
