import { API_ENDPOINTS } from '../../constant/api';
import { apiV1 } from '../axiosInstance';

export interface SignupData {
  nickname: string;
  interests: string[];
  memberAge: 'TEENAGER' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES' | 'SIXTIES_PLUS';
  introduceMySelf: string;
}

export interface SignupResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

// 닉네임 중복 체크
export const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  try {
    const response = await apiV1.post('/auth', null, {
      params: { nickname }
    });
    return response.data.data; // true면 사용 가능, false면 중복
  } catch (error) {
    console.error('닉네임 중복 체크 실패:', error);
    throw new Error('닉네임 중복 체크에 실패했습니다.');
  }
};

export const signupService = {
  async signup(data: SignupData, token: string): Promise<SignupResponse> {
    // 관심사에서 # 제거
    const processedData = {
      ...data,
      interests: data.interests.map(interest => interest.replace('#', ''))
    };

    const response = await fetch(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(processedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }

    return await response.json();
  }
};
