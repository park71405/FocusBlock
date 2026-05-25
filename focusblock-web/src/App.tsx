// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './component/context/AuthProvider';
import ProtectedRoute from './component/context/ProtectedRoute';
import Home from './screen/Home';
import Login from './screen/Login';
import Join from './screen/Join';
import NotFoundPage from './screen/NotFoundPage';

const App: React.FC = () => {
  return (
    // 1. 최상위에서 인증 컨텍스트를 먼저 제공합니다.
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          
          {/* 2. 이제 이 하위의 ProtectedRoute들은 안전하게 useAuth를 호출할 수 있습니다. */}
          <Route element={<ProtectedRoute authenticationRequired={true} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute authenticationRequired={false} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Join />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;