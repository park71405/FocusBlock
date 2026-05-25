import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../../types/member';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (token: string, userInfo: UserProfile) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 앱 초기 구동 시 토큰 유효성 체크 (실무에선 유효성 검증 API 호출 권장)
    const token = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('userInfo');

    let savedUserObj: UserProfile | null = null;
    let isAuth = false;
    
    if (savedUser && savedUser !== "undefined") {
      try {
        savedUserObj = JSON.parse(savedUser);
      } catch (error) {
        console.error("Failed to parse saved user info:", error);
        savedUserObj = null;
      }
    }

    if (token && savedUser) {
      isAuth = true;
    }

    setIsAuthenticated(isAuth);
    setUser(savedUserObj);
    setIsLoading(false);
  }, []);

  const login = (token: string, userInfo: UserProfile) => {

    localStorage.setItem('accessToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};