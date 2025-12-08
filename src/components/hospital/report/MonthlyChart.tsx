"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type MonthlyData = {
  month: string;
  done: number;
  total: number;
  cancel: number;
};

type Props = {
  data: MonthlyData[];
};

export default function MonthlyChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm animate-fadeIn">
      <h3 className="font-semibold mb-4">월별 예약 현황</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="done" fill="#4ade80" name="완료" />
            <Bar dataKey="total" fill="#60a5fa" name="총 예약" />
            <Bar dataKey="cancel" fill="#f87171" name="취소" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
