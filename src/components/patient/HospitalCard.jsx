// 메인 배너 아래 빠른병원찾기 카드 컴포넌트

import { MapPin, Phone, Clock, Star } from "lucide-react";

export default function HospitalCard({ hospital }) {
  return (
    <article className="relative rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-5">
      {/* 상단 - 병원명 / 평점 */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {hospital.name}
          </h3>

          {/* 진료과 뱃지들 */}
          <div className="mt-2 flex flex-wrap gap-2">
            {hospital.departments.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] text-gray-700"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>

        {/* 오른쪽 위 - 별점 + 거리 */}
        <div className="flex flex-col items-end gap-2">
          <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-500">
            <Star size={14} fill="#FBBF24" stroke="none" />
            <span>{hospital.rating}</span>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] text-blue-500">
            {hospital.distance}
          </span>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="mt-3 space-y-1 text-xs text-gray-600">
        <p className="flex items-center gap-2">
          <MapPin size={14} className="text-gray-400" />
          {hospital.address}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400" />
          {hospital.phone}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          {hospital.hours}
        </p>
      </div>

      {/* 예약 버튼 */}
      <button className="mt-4 w-full rounded-xl bg-[#4C7DFF] py-2.5 text-sm font-semibold text-white hover:bg-[#3c69e8] transition">
        예약하기
      </button>
    </article>
  );
}
