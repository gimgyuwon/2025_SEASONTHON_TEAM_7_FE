import type { ProfileProps, UserCardData } from "@/interfaces/user";
import { api, apiV1 } from "../axiosInstance";
import { API_ENDPOINTS } from "@/constant/api";

// API 응답 타입 정의
interface ApiMemberData {
  memberId: number;
  profileImageUrl: string | null;
  nickname: string | null;
  mannerScore: number;
  age: string;
  introduction: string | null;
  interests: string[];
  isActive: boolean;
  lastActiveAt: string;
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
    name: apiData.nickname || "익명",
    age: parseInt(apiData.age.replace("대", "")) || 20, // "20대" -> 20
    profileImage: apiData.profileImageUrl || undefined, // API에서 제공하지 않음
    teaScore: apiData.mannerScore ? Math.round(apiData.mannerScore * 10) / 10 : -1, // 소수점 한 자리까지만
    introduction: apiData.introduction || "안녕하세요!",
    hashtags: apiData.interests || [],
    isActive: apiData.isActive,
    lastActiveAt: apiData.lastActiveAt,
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
    console.error("멤버 목록 조회 실패:", error);
    throw new Error("멤버 목록을 불러오는데 실패했습니다.");
  }
};

// 특정 관심사로 필터링된 멤버 조회 (선택사항)
export const getMembersByInterests = async (
  interests: string[]
): Promise<UserCardData[]> => {
  try {
    const allMembers = await getAllMembers();

    // 관심사 필터링 로직
    if (interests.length === 0) {
      return allMembers;
    }

    return allMembers
      .filter((member) =>
        member.hashtags.some((hashtag) => interests.includes(hashtag))
      )
      .sort((a, b) => {
        // 매칭되는 관심사 개수 계산
        const aMatches = a.hashtags.filter(hashtag => interests.includes(hashtag)).length;
        const bMatches = b.hashtags.filter(hashtag => interests.includes(hashtag)).length;
        
        // 매칭 개수가 많은 순서대로 정렬 (내림차순)
        return bMatches - aMatches;
      });
  } catch (error) {
    console.error("관심사별 멤버 조회 실패:", error);
    throw error;
  }
};

// GET: get specific member
export const getSpecificMember = async (
  coffeeChatId: number
): Promise<ProfileProps> => {
  const { data } = await apiV1.get("/members/coffee", {
    params: { coffeeChatId },
  });

  return data.data;
};

// GET: get my profile
export const getMyProfile = async (): Promise<ProfileProps> => {
  const { data } = await apiV1.get("/members/me");

  return data.data;
};
