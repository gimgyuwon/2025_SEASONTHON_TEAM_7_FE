import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { tokenService } from "../services/auth/tokenService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true: 인증 필요, false: 비인증 사용자만 접근 가능
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const location = useLocation();
  const hasToken = tokenService.hasAnyToken();
  const isAuthenticated = !!tokenService.getAccessToken();

  // 인증이 필요한 페이지인데 토큰이 없는 경우
  if (requireAuth && !isAuthenticated) {
    // 로그인 후 원래 페이지로 돌아가기 위해 현재 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 비인증 사용자만 접근 가능한 페이지(로그인, 회원가입)인데 토큰이 있는 경우
  if (!requireAuth && hasToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
