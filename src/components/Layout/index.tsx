import React from 'react';
import { useLayout } from '@/services/hooks/useLayout';
import Header from './Header';
import BottomBar from './BottomBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { layoutConfig } = useLayout();
  const { type, title, showHeader, showBottomBar, onClose, onBack, onMore, onSetting } = layoutConfig;

  return (
    <div className="layout">
      {showHeader && (
        <Header 
          type={type}
          title={title}
          onClose={onClose}
          onBack={onBack}
          onMore={onMore}
          onSetting={onSetting}
        />
      )}
      <main className={`main-content ${!showHeader ? 'no-header' : ''}`}>
        {children}
      </main>
      {showBottomBar && <BottomBar />}
    </div>
  );
};

export default Layout;