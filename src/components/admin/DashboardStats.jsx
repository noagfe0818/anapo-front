"use client";

import { Users, Building2, AlertTriangle, CheckCircle } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    {
      title: "전체 사용자",
      value: "12,847",
      percent: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      sub: "text-green-500",
    },
    {
      title: "등록 병원",
      value: "348",
      percent: "+8.2%",
      icon: Building2,
      color: "text-green-600",
      sub: "text-green-500",
    },
    {
      title: "미처리 신고",
      value: "23",
      percent: "-15.3%",
      icon: AlertTriangle,
      color: "text-orange-600",
      sub: "text-red-500",
    },
    {
      title: "처리 완료",
      value: "1,456",
      percent: "+5.1%",
      icon: CheckCircle,
      color: "text-black",
      sub: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-sm  flex flex-col gap-2"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{item.value}</span>
              <Icon className={item.color} size={28} />
            </div>
            <span className={`text-sm font-semibold ${item.sub}`}>
              {item.percent}
            </span>
          </div>
        );
      })}
    </div>
  );
}
