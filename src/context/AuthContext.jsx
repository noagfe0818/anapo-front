"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 로그아웃 후 이동을 위해 필요

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ★ 로딩 상태 추가 (깜빡임 방지)
  
  const router = useRouter();

  // ★ 1. 새로고침 할 때마다 실행되는 함수 (백엔드에 로그인 상태 확인)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 백엔드(8081)의 세션 정보 확인 API 호출
        const response = await fetch("http://localhost:8081/user/info", {
          method: "GET",
          credentials: "include", // ★ 세션 쿠키(JSESSIONID)를 같이 보냄 (필수!)
        });

        if (response.ok) {
          const userData = await response.json();
          // 백엔드가 "어, 너 로그인 되어있어"라고 하면 상태 복구
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          // 로그인 안 되어 있음
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("로그인 확인 실패:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // 확인 끝남
      }
    };

    checkLoginStatus();
  }, []); // [] : 처음 한 번만 실행

  // 2. 로그인 함수 (화면에서 로그인 성공 시 호출)
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // 3. 로그아웃 함수 (백엔드 세션도 같이 지워야 함)
  const logout = async () => {
    try {
      // 백엔드에도 로그아웃 요청
      await fetch("http://localhost:8081/user/logout", { 
        method: "GET",
        credentials: "include" 
      });
    } catch (error) {
      console.error("로그아웃 요청 실패", error);
    }
    
    // 프론트엔드 상태 초기화
    setUser(null);
    setIsLoggedIn(false);
    router.push("/main/login"); // 로그인 페이지로 이동
  };

  // 로딩 중일 때는 아무것도 보여주지 않음 (로그인 풀린 것처럼 깜빡이는 것 방지)
  // 필요하다면 <div className="loading">로딩중...</div> 같은 컴포넌트를 리턴해도 됩니다.
  if (loading) {
      return null; 
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);