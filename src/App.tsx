import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Labs, Login, ExtraInfo } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import { Chat } from "./components/chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 공개 페이지 */}
          <Route path="/" element={<Home />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/chat" element={<Chat />} />

          {/* 비인증 사용자만 접근 가능 (로그인, 회원가입) */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup/extra-info"
            element={
              <ProtectedRoute requireAuth={false}>
                <ExtraInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
