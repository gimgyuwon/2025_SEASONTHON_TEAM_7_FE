import React, { useState, type ReactNode } from 'react';
import { LayoutContext, type LayoutConfig } from './LayoutContext';

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    type: 'home',
    showHeader: true,
    showBottomBar: true,
  });

  const updateLayoutConfig = (updates: Partial<LayoutConfig>) => {
    setLayoutConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <LayoutContext.Provider value={{ layoutConfig, setLayoutConfig, updateLayoutConfig }}>
      {children}
    </LayoutContext.Provider>
  );
};
