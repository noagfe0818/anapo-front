"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineData = {
  time: string;
  count: number;
};

type Props = {
  data: LineData[];
};

export default function TimeLineChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm animate-fadeIn">
      <h3 className="font-semibold mb-4">시간대별 예약 분포</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4b6bfb"
              strokeWidth={3}
              dot={{ r: 4 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
