import { X } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function HospitalDetailModal({ hospital, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl w-[550px] shadow-lg relative">
        <button className="absolute right-6 top-6" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-6">병원 상세 정보</h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">병원명</p>
            <p>{hospital.name}</p>
          </div>

          <div>
            <p className="text-gray-500">상태</p>
            <StatusBadge status={hospital.status} />
          </div>

          <div>
            <p className="text-gray-500">주소</p>
            <p>{hospital.address}</p>
          </div>

          <div>
            <p className="text-gray-500">연락처</p>
            <p>{hospital.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">등록일</p>
            <p>{hospital.regDate}</p>
          </div>

          <div>
            <p className="text-gray-500">위반 횟수</p>
            <p>{hospital.violations}건</p>
          </div>

          <div>
            <p className="text-gray-500">공지사항</p>
            <p>{hospital.notices}건</p>
          </div>
        </div>
      </div>
    </div>
  );
}
