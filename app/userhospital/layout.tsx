// layout.tsx
import Sidebar from "@/components/hospital/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100">
      {/* ⭐ 왼쪽 사이드바 - 화면 고정 & 스크롤 없음 */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-[#1f2a44] text-white p-6 overflow-hidden">
        <Sidebar />
      </aside>

      {/* ⭐ 오른쪽 콘텐츠 영역 - 이곳만 스크롤됨 */}
      <main className="ml-64 w-[calc(100%-16rem)] h-screen overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}
