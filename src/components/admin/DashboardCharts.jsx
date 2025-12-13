"use client";

import { useEffect, useState } from "react";
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

export default function DashboardCharts() {
  const [reservationRank, setReservationRank] = useState([]);
  const [bookmarkRank, setBookmarkRank] = useState([]);

  useEffect(() => {
    async function fetchCharts() {
      try {
        // 🔹 예약 랭킹
        const res1 = await fetch("/api/admin/hospital-rank/reservation");
        if (res1.ok) {
          const data = await res1.json();
          setReservationRank(data.slice(0, 6));
        }

        // 🔹 즐겨찾기 랭킹
        const res2 = await fetch("/api/admin/hospital-rank/bookmark");
        if (res2.ok) {
          const data = await res2.json();
          setBookmarkRank(data.slice(0, 6));
        }
      } catch (err) {
        console.error("차트 데이터 로드 실패", err);
      }
    }

    fetchCharts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 병원 예약 랭킹 */}
      <div className="bg-white p-6 shadow-sm rounded-xl h-[350px]">
        <h2 className="text-lg font-semibold mb-4">병원 예약 랭킹 TOP 6</h2>

        <BarChart width={500} height={250} data={reservationRank}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hospitalName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4A6CF7" />
        </BarChart>
      </div>

      {/* 병원 즐겨찾기 랭킹 */}
      <div className="bg-white p-6 shadow-sm rounded-xl h-[350px]">
        <h2 className="text-lg font-semibold mb-4">병원 즐겨찾기 랭킹 TOP 6</h2>

        <LineChart width={500} height={250} data={bookmarkRank}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hospitalName" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#22C55E"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </div>
  );
}
