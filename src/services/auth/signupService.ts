import { API_ENDPOINTS } from '../../constant/api';

export interface SignupData {
  nickname: string;
  interestedJob: string;
}

export interface SignupResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export const signupService = {
  async signup(data: SignupData, token: string): Promise<SignupResponse> {
    const response = await fetch(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }

    return await response.json();
  }
};
