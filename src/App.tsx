import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Labs, Login, ExtraInfo, Chat, ChatRoom, Review } from "./pages";
import HomeChatRequest from "./pages/Home/HomeChatRequest";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { LayoutProvider } from "./contexts/LayoutProvider";
import { ChatLab } from "./components/chat";

function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <Layout>
          <Routes>
            {/* 공개 페이지 */}
            <Route path="/" element={<Home />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/chat-request" element={<HomeChatRequest />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatlab" element={<ChatLab />} />
            <Route path="/chat/:chatRoomId" element={<ChatRoom />} />
            <Route path="/review" element={<Review />} />

            {/* 비인증 사용자만 접근 가능 (로그인, 회원가입 등) */}
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
        </Layout>
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default App;
