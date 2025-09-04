import KakaoIcon from '@/assets/kakaoIcon.svg';

const Kakao = () => {
  const handleLogin = () => {
    // Spring Security OAuth2 엔드포인트로 리다이렉트, 추후 배포 시 다른 주소로 변경
    window.location.href = 'http://34.47.125.208:8080/api/oauth2/authorization/kakao';
    // window.location.href = 'http:/localhost:8080/api/oauth2/authorization/kakao';
  };

  return (
    <button className="btn-kakao" onClick={handleLogin}>
      <div className="inner-container">
        <img className="kakao-icon-img" src={KakaoIcon} alt="kakao" />
        카카오톡으로 로그인
      </div>
    </button>
  );
};

export default Kakao;
