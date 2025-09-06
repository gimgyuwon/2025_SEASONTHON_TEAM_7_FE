/**
 * 마지막 활동 시간을 상대적 시간으로 표시하는 함수
 * @param lastActiveAt ISO 8601 형식의 날짜 문자열
 * @returns "방금 전", "5분 전", "1시간 전" 등의 문자열
 */
export const formatLastActiveTime = (lastActiveAt: string): string => {
  const now = new Date();
  const lastActive = new Date(lastActiveAt);
  const diffInMs = now.getTime() - lastActive.getTime();
  
  // 밀리초를 분으로 변환
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) { // 24시간 = 1440분
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    if (days > 30) {
      return "오래 전";
    }
    return `${days}일 전`;
  }
};
