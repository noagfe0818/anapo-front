"use client";

import { useEffect, useState } from "react";
import { Users, Building2, AlertTriangle, CheckCircle } from "lucide-react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    userCount: 0,
    hospitalCount: 0,
    pendingReportCount: 0,
    completedReportCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        // 🔹 병원 수 (이미 있는 API 사용)
        const hosRes = await fetch("/api/admin/hos-users");
        if (hosRes.ok) {
          const hospitals = await hosRes.json();
          setStats((prev) => ({
            ...prev,
            hospitalCount: Array.isArray(hospitals) ? hospitals.length : 0,
          }));
        }

        // ❗ 사용자 / 신고는 아직 API 없으니 0 유지
      } catch (err) {
        console.error("대시보드 통계 로드 실패", err);
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      title: "전체 사용자",
      value: stats.userCount,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "등록 병원",
      value: stats.hospitalCount,
      icon: Building2,
      color: "text-green-600",
    },
    {
      title: "미처리 신고",
      value: stats.pendingReportCount,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "처리 완료",
      value: stats.completedReportCount,
      icon: CheckCircle,
      color: "text-black",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-2"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{item.value}</span>
              <Icon className={item.color} size={28} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
