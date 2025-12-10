"use client";

import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";
import RecentActivity from "@/components/admin/RecentActivity";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">대시보드</h1>
        <p className="text-gray-500 mt-1 text-[15px]">
          전체 시스템 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* 통계 카드 */}
      <DashboardStats />

      {/* 그래프 */}
      <DashboardCharts />

      {/* 최근 활동 */}
      <RecentActivity />
    </div>
  );
}
