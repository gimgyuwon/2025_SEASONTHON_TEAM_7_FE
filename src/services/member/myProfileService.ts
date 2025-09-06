import type { MyProfileData } from '@/interfaces/user';
import { apiV1 } from '../axiosInstance';

// API 응답 타입 정의
interface MyProfileApiResponse {
  success: boolean;
  message: string;
  data: MyProfileData;
}

// memberAge 변환 함수
const convertMemberAge = (memberAge: string): string => {
  const ageMap: Record<string, string> = {
    'TEENAGER': '10대',
    'TWENTIES': '20대',
    'THIRTIES': '30대',
    'FORTIES': '40대',
    'FIFTIES': '50대',
    'SIXTIES_PLUS': '60대 +'
  };
  
  return ageMap[memberAge] || memberAge;
};

// 내 프로필 조회
export const getMyProfile = async (): Promise<MyProfileData> => {
  try {
    const { data } = await apiV1.get<MyProfileApiResponse>("/mypage");
    console.log('내 프로필 조회 성공:', data);

    // memberAge 변환
    const transformedData = {
      ...data.data,
      memberAge: convertMemberAge(data.data.memberAge)
    };

    return transformedData;
  } catch (error) {
    console.error('내 프로필 조회 실패:', error);
    throw new Error('프로필을 불러오는데 실패했습니다.');
  }
};
