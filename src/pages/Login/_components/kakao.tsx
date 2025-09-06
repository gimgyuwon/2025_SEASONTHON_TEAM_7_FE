const Kakao = () => {
  const handleLogin = () => {
    // Spring Security OAuth2 엔드포인트로 리다이렉트, 추후 배포 시 다른 주소로 변경
    // window.location.href = 'http://34.47.125.208:8080/api/oauth2/authorization/kakao';
    window.location.href = "https://tee-talk.com/api/v1/auth/signup";
    // window.location.href = 'http://localhost:8080/api/oauth2/authorization/kakao';
  };

  return (
    <button className="btn-kakao" onClick={handleLogin}>
      <div className="inner-container">카카오로 시작하기</div>
    </button>
  );
};

export default Kakao;
