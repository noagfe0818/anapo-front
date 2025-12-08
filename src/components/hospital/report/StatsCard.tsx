"use client";

type StatsCardProps = {
  title: string;
  value: string | number;
  diff: string;
  diffColor: string; // 예: "text-green-500"
};

export default function StatsCard({
  title,
  value,
  diff,
  diffColor,
}: StatsCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm w-full transition-all animate-fadeIn">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className={`text-sm mt-1 ${diffColor}`}>{diff}</p>
    </div>
  );
}
