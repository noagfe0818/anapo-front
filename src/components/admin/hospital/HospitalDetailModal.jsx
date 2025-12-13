import { X } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

// 날짜 포맷 (있을 경우 대비)
const formatDate = (date) => {
  if (!date) return "-";
  return date.split("T")[0];
};

export default function HospitalDetailModal({ hospital, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-[550px] shadow-lg relative">
        <button className="absolute right-6 top-6" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-6">병원 상세 정보</h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          {/* 병원명 */}
          <div>
            <p className="text-gray-500">병원명</p>
            <p className="font-medium">{hospital.hosName}</p>
          </div>

          {/* 상태 */}
          <div>
            <p className="text-gray-500">상태</p>
            <StatusBadge status={hospital.status} />
          </div>

          {/* 주소 */}
          <div>
            <p className="text-gray-500">주소</p>
            <p className="font-medium">{hospital.hosAddress}</p>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-gray-500">연락처</p>
            <p className="font-medium">{hospital.hosNumber}</p>
          </div>

          {/* 이메일 */}
          <div>
            <p className="text-gray-500">이메일</p>
            <p className="font-medium">{hospital.hosEmail}</p>
          </div>

          {/* 운영 시간 */}
          <div>
            <p className="text-gray-500">운영 시간</p>
            <p className="font-medium">{hospital.hosTime}</p>
          </div>

          {/* 등록일 (백엔드 없으면 -) */}
          <div>
            <p className="text-gray-500">등록일</p>
            <p className="font-medium">{formatDate(hospital.createdAt)}</p>
          </div>

          {/* 위반 / 공지 (아직 백엔드 없으면 0) */}
          <div>
            <p className="text-gray-500">위반 횟수</p>
            <p className="font-medium">{hospital.violations ?? 0}건</p>
          </div>

          <div>
            <p className="text-gray-500">공지사항</p>
            <p className="font-medium">{hospital.notices ?? 0}건</p>
          </div>
        </div>
      </div>
    </div>
  );
}
