const formatTime = (isoString: string) => {
  if (!isoString) return;

  const msgDate = new Date(isoString);
  const now = new Date();

  const koreaOffset = 9 * 60;
  const msgTime = new Date(msgDate.getTime() + koreaOffset * 60 * 1000);
  const diffMs = now.getTime() - msgTime.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay >= 1) {
    return `${msgTime.getMonth() + 1}월 ${msgTime.getDate()}일`;
  } else if (diffHour >= 1) {
    return `${diffHour}시간 전`;
  } else if (diffMin >= 1) {
    return `${diffMin}분 전`;
  } else {
    return `방금 전`;
  }
};

export default formatTime;
