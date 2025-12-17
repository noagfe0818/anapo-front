"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  User,
  ClipboardList,
  Building2,
  FileBarChart2,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    {
      name: "대시보드",
      icon: <Home size={20} />,
      href: "/userhospital",
    },
    {
      name: "예약 관리",
      icon: <Calendar size={20} />,
      href: "/userhospital/reservation",
    },
    {
      name: "환자 관리",
      icon: <User size={20} />,
      href: "/userhospital/patient",
    },
    {
      name: "진료 내역",
      icon: <ClipboardList size={20} />,
      href: "/userhospital/medicalrecord",
    },
    {
      name: "병원 정보",
      icon: <Building2 size={20} />,
      href: "/userhospital/hospitalinfo",
    },
    {
      name: "공지사항",
      icon: <FileText size={20} />,
      href: "/userhospital/notice",
    },
    {
      name: "환자 문의",
      icon: <MessageSquare size={20} />,
      href: "/userhospital/inquiry",
    },
    {
      name: "통계 및 리포트",
      icon: <FileBarChart2 size={20} />,
      href: "/userhospital/reportManagement",
    },
  ];

  // ✅ [수정됨] 완벽한 로그아웃 (서버 세션 제거 + 로컬 비우기)
  const handleLogout = async () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      try {
        // 1. 서버에 로그아웃 요청 (세션 무효화)
        await fetch("http://localhost:8081/user/logout", {
          method: "GET",
          credentials: "include", // 쿠키(세션) 포함 전송
        });
      } catch (error) {
        console.error("로그아웃 요청 중 오류 발생:", error);
      }

      // 2. 브라우저 저장소 싹 비우기
      localStorage.clear();

      // 3. 페이지 새로고침하며 로그인 화면으로 이동
      // (이렇게 해야 헤더가 '로그인 상태 아님'을 인지하고 갱신됩니다)
      window.location.href = "/main/login";
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <h1 className="text-2xl font-bold tracking-widest px-2">병원이름</h1>

      <nav className="space-y-2 flex-1">
        {menus.map((menu) => {
          const active = pathname === menu.href;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? "bg-white text-[#1f2a44] font-semibold"
                    : "text-gray-200 hover:bg-[#263556]"
                }
              `}
            >
              {menu.icon}
              {menu.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700 space-y-3 px-4 pb-4">
        <Link
          href="/userhospital/setting"
          className="flex items-center gap-3 text-gray-300 hover:text-white transition"
        >
          <Settings size={20} />
          설정
        </Link>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout} // ✅ 클릭 시 실행
          className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full text-left"
        >
          <LogOut size={20} />
          로그아웃
        </button>
      </div>
    </div>
  );
}