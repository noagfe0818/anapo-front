// src/components/hospital/patient/PatientDetailModal.jsx
"use client";

import { X } from "lucide-react";
import DetailField from "@/ui/hospital/DetailField";

export default function PatientDetailModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold">환자 상세 정보</h2>
          <X className="text-gray-600 cursor-pointer" onClick={onClose} />
        </div>

        {/* 기본 정보 */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">기본 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailField label="환자번호" value={patient.id} />
            <DetailField label="이름" value={patient.name} />
            <DetailField label="성별" value={patient.gender} />
            <DetailField label="나이" value={`${patient.age}세`} />
            <DetailField label="생년월일" value={patient.birth || "-"} />
            <DetailField label="등록일" value={patient.regDate || "-"} />
          </div>
        </div>

        {/* 연락처 정보 */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">연락처 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailField label="전화번호" value={patient.phone || "-"} />
            <DetailField label="이메일" value={patient.email || "-"} />
            <DetailField label="비상연락처" value={patient.subPhone || "-"} />
            <DetailField label="주소" value={patient.address || "-"} />
          </div>
        </div>

        {/* 진료 정보 */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">진료 정보</h3>
          <DetailField
            label="총 방문 횟수"
            value={patient.visits != null ? `${patient.visits}회` : "-"}
          />
          <DetailField
            label="기존 병력 및 특이사항"
            value={patient.history || "-"}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 border rounded-lg" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
