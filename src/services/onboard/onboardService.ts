export const onboardService = {
  // 온보딩 완료 여부 확인
  isOnboarded(): boolean {
    try {
      const isOnboarded = sessionStorage.getItem('isOnboarded');
      return isOnboarded === 'true';
    } catch {
      return false;
    }
  },

  // 온보딩 완료 처리
  setOnboarded(): void {
    try {
      sessionStorage.setItem('isOnboarded', 'true');
    } catch (error) {
      console.error('온보딩 완료 상태 저장 실패:', error);
    }
  },

  // 온보딩 상태 초기화 (개발/테스트용)
  resetOnboarded(): void {
    try {
      sessionStorage.removeItem('isOnboarded');
    } catch (error) {
      console.error('온보딩 상태 초기화 실패:', error);
    }
  }
};
