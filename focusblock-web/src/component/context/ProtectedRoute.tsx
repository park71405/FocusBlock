import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  authenticationRequired: boolean; // true: 인증 필수(메인 등), false: 미인증 필수(로그인 등)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authenticationRequired }) => {
  const { isAuthenticated } = useAuth();

  if (authenticationRequired && !isAuthenticated) {
    // 인증이 필요한데 로그인 안 됨 -> 로그인 페이지로 이동
    return <Navigate to="/login" replace />;
  }

  if (!authenticationRequired && isAuthenticated) {
    // 이미 로그인했는데 로그인 페이지 접근 시도 -> 메인 페이지로 이동
    return <Navigate to="/" replace />;
  }

  // 조건 만족 시 자식 컴포넌트(Page) 렌더링
  return <Outlet />;
};

export default ProtectedRoute;