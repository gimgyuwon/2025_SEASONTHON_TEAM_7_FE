import Logo from '../../assets/teatalkLogo.svg';
import Kakao from './_components/kakao';

const Login = () => {
  return (
    <div className="wrapper">
      <div className="login-container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        <Kakao />
      </div>
    </div>
  );
};

export default Login;
