import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
