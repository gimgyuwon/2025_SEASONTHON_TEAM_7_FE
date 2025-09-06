export interface UserCardData {
  id: string;
  userId: string;
  name: string;
  age: number;
  profileImage?: string;
  teaScore?: number; // 찻잔지수
  introduction: string;
  hashtags: string[];
}

export interface UserCardProps {
  user: UserCardData;
  onClick?: (userId: string) => void;
}

export interface ProfileProps {
  id: string;
  userId: string;
  nickname: string;
  age: number;
  profileImage?: string;
  teaScore?: number;
  introduction: string;
  interests: string[];
}
