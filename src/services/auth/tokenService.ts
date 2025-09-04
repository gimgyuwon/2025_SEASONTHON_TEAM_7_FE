export const tokenService = {
  // Signup Token 관련
  getSignupToken(): string | null {
    return sessionStorage.getItem('signupToken');
  },

  setSignupToken(token: string): void {
    sessionStorage.setItem('signupToken', token);
  },

  removeSignupToken(): void {
    sessionStorage.removeItem('signupToken');
  },

  // Access Token 관련
  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  },

  setAccessToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
  },

  removeAccessToken(): void {
    sessionStorage.removeItem('accessToken');
  },

  // Refresh Token 관련
  getRefreshToken(): string | null {
    return sessionStorage.getItem('refreshToken');
  },

  setRefreshToken(token: string): void {
    sessionStorage.setItem('refreshToken', token);
  },

  removeRefreshToken(): void {
    sessionStorage.removeItem('refreshToken');
  },

  // 토큰 존재 여부 확인
  hasAnyToken(): boolean {
    return !!(this.getSignupToken() || this.getAccessToken() || this.getRefreshToken());
  },

  // 모든 토큰 제거
  clearAllTokens(): void {
    this.removeSignupToken();
    this.removeAccessToken();
    this.removeRefreshToken();
  }
};
