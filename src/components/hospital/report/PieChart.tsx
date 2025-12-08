"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type PieData = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: PieData[];
};

export default function DepartmentPieChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm animate-fadeIn">
      <h3 className="font-semibold mb-4">진료과별 예약 분포</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((item, idx) => (
                <Cell key={idx} fill={item.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
