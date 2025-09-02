import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken) {
    // console.log('액세스 토큰 받음:', accessToken);
    sessionStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
      // console.log('리프레시 토큰도 저장됨:', refreshToken);
    }
    // URL에서 토큰 파라미터 제거
    window.history.replaceState({}, document.title, window.location.pathname);
    // console.log('토큰이 sessionStorage에 저장되었습니다.');
    }
  }, [searchParams]);
  return (
    <div className="wrapper">
      <div className="center">
        <button className="btn-primary" onClick={() => navigate("/labs")}>
          실험실로 이동하기 🧪🥼
        </button>
      </div>
    </div>
  );
};

export default Home;
