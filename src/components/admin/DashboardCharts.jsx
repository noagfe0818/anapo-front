"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

// 샘플 데이터 (너가 보낸 관리자 페이지 화면 기준)
const monthlyReports = [
  { month: "7월", count: 45 },
  { month: "8월", count: 52 },
  { month: "9월", count: 38 },
  { month: "10월", count: 60 },
  { month: "11월", count: 48 },
  { month: "12월", count: 22 },
];

const userGrowth = [
  { month: "7월", users: 10500 },
  { month: "8월", users: 10800 },
  { month: "9월", users: 11200 },
  { month: "10월", users: 11800 },
  { month: "11월", users: 12200 },
  { month: "12월", users: 13500 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 월별 신고 현황 (BarChart) */}
      <div className="bg-white p-6 shadow-sm  rounded-xl h-[350px]">
        <h2 className="text-lg font-semibold mb-4">월별 신고 현황</h2>

        <BarChart width={500} height={250} data={monthlyReports}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4A6CF7" />
        </BarChart>
      </div>

      {/* 사용자 증가 추이 (LineChart) */}
      <div className="bg-white p-6 shadow-sm  rounded-xl h-[350px]">
        <h2 className="text-lg font-semibold mb-4">사용자 증가 추이</h2>

        <LineChart width={500} height={250} data={userGrowth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#22C55E"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </div>
  );
}
