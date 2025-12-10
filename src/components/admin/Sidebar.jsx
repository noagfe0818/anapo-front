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
        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm mt-90 ml-30">
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
