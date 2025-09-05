import home from '@/assets/Bottombar/home.svg';
import notHome from '@/assets/Bottombar/not-home.svg';
import chat from '../assets/Bottombar/chat.svg';
import notChat from '@/assets/Bottombar/not-chat.svg';
import my from '@/assets/Bottombar/my.svg';
import notMy from '@/assets/Bottombar/not-my.svg';

export interface BottomBarItem {
  id: string;
  label: string;
  path: string;
  activeIcon: string;
  inactiveIcon: string;
  requireAuth?: boolean;
}

export const BOTTOM_BAR_ITEMS: BottomBarItem[] = [
  {
    id: 'home',
    label: '홈',
    path: '/',
    activeIcon: home,
    inactiveIcon: notHome
  },
  {
    id: 'chat',
    label: '채팅',
    path: '/chat',
    activeIcon: chat,
    inactiveIcon: notChat,
    requireAuth: true
  },
  {
    id: 'profile',
    label: '마이',
    path: '/profile',
    activeIcon: my,
    inactiveIcon: notMy,
    requireAuth: true
  }
];

