"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-[#F7F9FC]">
      {/* ⭐ 왼쪽 사이드바 (고정) */}
      <div className="fixed top-0 left-0 h-screen w-64 border-r border-gray-300 bg-white">
        <Sidebar />
      </div>

      {/* ⭐ 오른쪽 컨텐츠 (스크롤 가능) */}
      <main className="ml-64 p-10 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
