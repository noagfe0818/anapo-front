"use client";

import { usePathname } from "next/navigation"; // ✅ 추가
import { AuthProvider } from "../../src/context/AuthContext";
import MainHeader from "../../src/MainHeader.jsx";

export default function MainLayout({ children }) {
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  // ✅ 헤더를 숨기고 싶은 페이지 경로 지정
  const hideHeaderRoutes = ["/main/findhospital"];

  // ✅ 현재 경로가 포함되어 있으면 헤더 숨김
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!shouldHideHeader && <MainHeader />}
      {children}
    </AuthProvider>
  );
}
