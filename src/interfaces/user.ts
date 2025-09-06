import type { TimeStamp } from "./common";

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

// 리뷰 데이터
export interface Review {
  reviewerName: string;
  reviewerProfileImageUrl: string;
  reviewerComment: string;
  reviewDate: string;
}

// 마이페이지용 프로필 데이터
export interface MyProfileData {
  memberAge: string; // "TEENAGER", "TWENTIES", etc.
  nickname: string | null;
  profileImageUrl: string | null;
  mannerScore: number;
  interests: string[];
  introduceMySelf: string | null;
  reviews: Review[];
}

export interface ProfileProps {
  isActive?: boolean;
  lastActiveAt?: TimeStamp;
  nickname: string;
  age: number;
  memberId: number;
  profileImageUrl?: string;
  mannerScore?: number;
  introduction: string;
  interests: string[];
}
