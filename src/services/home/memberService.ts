import type { UserCardData } from '@/interfaces/user';
import { api } from '../axiosInstance';
import { API_ENDPOINTS } from '@/constant/api';

// API 응답 타입 정의
interface ApiMemberData {
  memberId: number;
  nickname: string | null;
  age: string;
  introduction: string | null;
  interests: string[];
}

interface MemberApiResponse {
  success: boolean;
  message: string;
  data: ApiMemberData[];
}

// API 데이터를 UserCardData로 변환하는 함수
const transformApiDataToUserCard = (apiData: ApiMemberData): UserCardData => {
  // console.log('API 데이터 변환:', {
  //   memberId: apiData.memberId,
  //   nickname: apiData.nickname,
  //   interests: apiData.interests
  // });
  
  return {
    id: apiData.memberId.toString(),
    userId: apiData.memberId.toString(),
    name: apiData.nickname || '익명',
    age: parseInt(apiData.age.replace('대', '')) || 20, // "20대" -> 20
    profileImage: undefined, // API에서 제공하지 않음
    teaScore: Math.floor(Math.random() * 5) + 1, // 임시 점수 (API에서 제공하지 않음)
    introduction: apiData.introduction || '안녕하세요!',
    hashtags: apiData.interests || []
  };
};

// 모든 멤버 목록 조회
export const getAllMembers = async (): Promise<UserCardData[]> => {
  try {
    const { data } = await api.get<MemberApiResponse>(API_ENDPOINTS.ALL_MEMBER);
    // console.log('멤버 목록 조회 성공:', data);
    
    // API 응답 데이터를 UserCardData 형태로 변환
    const transformedData = data.data.map(transformApiDataToUserCard);
    return transformedData;
  } catch (error) {
    console.error('멤버 목록 조회 실패:', error);
    throw new Error('멤버 목록을 불러오는데 실패했습니다.');
  }
};

// 특정 관심사로 필터링된 멤버 조회 (선택사항)
export const getMembersByInterests = async (interests: string[]): Promise<UserCardData[]> => {
  try {
    const allMembers = await getAllMembers();
    
    // 관심사 필터링 로직
    if (interests.length === 0) {
      return allMembers;
    }
    
    return allMembers.filter(member => 
      member.hashtags.some(hashtag => interests.includes(hashtag))
    );
  } catch (error) {
    console.error('관심사별 멤버 조회 실패:', error);
    throw error;
  }
};
