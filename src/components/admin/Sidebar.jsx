"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Building2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "대시보드", icon: LayoutDashboard, path: "/admin" },
    { name: "사용자 관리", icon: User, path: "/admin/userManagement" },
    { name: "병원 관리", icon: Building2, path: "/admin/hospitalManagement" },
    { name: "신고센터", icon: AlertCircle, path: "/admin/reportCenter" },
  ];

  // ✅ [수정됨] 백엔드 로그아웃 요청 포함
  const handleLogout = async () => {
    if (confirm("관리자 계정에서 로그아웃 하시겠습니까?")) {
      try {
        // 1. 백엔드에 로그아웃 요청 보내기 (세션 삭제)
        // credentials: "include"가 있어야 쿠키(세션ID)를 같이 보내서 서버가 누구인지 압니다.
        await fetch("http://localhost:8081/user/logout", {
          method: "GET",
          credentials: "include", 
        });
      } catch (error) {
        console.error("로그아웃 요청 실패:", error);
      }

      // 2. 저장된 로그인 정보 모두 삭제
      localStorage.clear();

      // 3. 로그인 페이지로 이동 (새로고침 효과를 위해 window.location 사용)
      window.location.href = "/main/login";
    }
  };

  return (
    <aside className=" w-64 bg-white border-r border-gray-300 p-6 flex flex-col ">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-blue-600 mb-5 pl-4">관리자</h1>

      {/* 메뉴 */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] cursor-pointer
                ${
                  active
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="mt-auto pt-10">
        <button 
            onClick={handleLogout} // ✅ 클릭 이벤트 연결
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm mt-90 ml-30"
        >
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}