import { createContext } from 'react';
import type { HeaderType } from '../components/Layout/Header';

interface LayoutConfig {
  type: HeaderType;
  title?: string;
  showHeader?: boolean;
  showBottomBar?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  onMore?: () => void;
  onSetting?: () => void;
  onNotification?: () => void;
}

interface LayoutContextType {
  layoutConfig: LayoutConfig;
  setLayoutConfig: (config: LayoutConfig) => void;
  updateLayoutConfig: (updates: Partial<LayoutConfig>) => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export type { LayoutConfig, LayoutContextType };
