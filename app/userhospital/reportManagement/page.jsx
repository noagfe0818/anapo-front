"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/hospital/report/StatsCard";
import MonthlyChart from "@/components/hospital/report/MonthlyChart";
import PieChart from "@/components/hospital/report/PieChart";
import TimeLineChart from "@/components/hospital/report/LineChart";

export default function reportManagement() {
  // 📌 추후 백엔드 연동 예정
  // useEffect(() => {
  //   fetch("/api/hospital/stats")
  //     .then(res => res.json())
  //     .then(data => setStats(data));
  // }, []);

  const [monthlyData] = useState([
    { month: "1월", done: 180, total: 200, cancel: 10 },
    { month: "2월", done: 165, total: 185, cancel: 8 },
    { month: "3월", done: 210, total: 235, cancel: 12 },
    { month: "4월", done: 220, total: 240, cancel: 10 },
    { month: "5월", done: 230, total: 255, cancel: 15 },
    { month: "6월", done: 200, total: 220, cancel: 9 },
  ]);

  const [pieData] = useState([
    { name: "내과", value: 26, color: "#4b6bfb" },
    { name: "정형외과", value: 20, color: "#4ade80" },
    { name: "소아과", value: 17, color: "#fb923c" },
    { name: "피부과", value: 14, color: "#facc15" },
    { name: "이비인후과", value: 10, color: "#f472b6" },
    { name: "안과", value: 12, color: "#60a5fa" },
  ]);

  const [lineData] = useState([
    { time: "09:00", count: 15 },
    { time: "10:00", count: 22 },
    { time: "11:00", count: 30 },
    { time: "12:00", count: 12 },
    { time: "14:00", count: 25 },
    { time: "15:00", count: 30 },
    { time: "16:00", count: 27 },
    { time: "17:00", count: 18 },
  ]);

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-2xl font-bold mb-1">통계 및 리포트</h1>
      <p className="text-gray-500 mb-4">병원 운영 현황을 한눈에 확인하세요</p>

      {/* 상단 카드 4개 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="이번 달 총 예약"
          value="1,344건"
          diff="↑ 12% 지난 달 대비"
          diffColor="text-green-500"
        />
        <StatsCard
          title="완료된 진료"
          value="1,256건"
          diff="↑ 8% 지난 달 대비"
          diffColor="text-green-500"
        />
        <StatsCard
          title="취소율"
          value="6.5%"
          diff="↑ 1.2% 지난 달 대비"
          diffColor="text-red-500"
        />
        <StatsCard
          title="신규 환자"
          value="187명"
          diff="↑ 15% 지난 달 대비"
          diffColor="text-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart data={monthlyData} />
        <PieChart data={pieData} />
      </div>

      <TimeLineChart data={lineData} />
    </div>
  );
}
