"use client";

import { X } from "lucide-react";
import DetailField from "@/ui/hospital/DetailField";
import StatusBadge from "@/components/hospital/StatusBadge";

export default function ViewReservationModal({ data, onClose }) {
  const [date, time] = data.datetime.split(" ");

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold">예약 상세 정보</h2>
          <X className="text-gray-600 cursor-pointer" onClick={onClose} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <DetailField label="예약번호" value={data.code} />
          <DetailField label="상태" value={StatusBadge(data.status)} />
          <DetailField label="환자명" value={data.name} />
          <DetailField label="연락처" value={data.phone} />
          <DetailField label="담당의" value={data.doctor} />
          <DetailField label="진료과" value={data.department} />
          <DetailField label="예약일" value={date} />
          <DetailField label="예약시간" value={time} />
          <DetailField label="메모" value={data.memo || "-"} />
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-5 py-2 border rounded-lg" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
