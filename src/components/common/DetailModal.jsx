import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return dateStr.split("T")[0]; // yyyy-MM-dd
};

export default function UserDetailModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-[500px] shadow-lg relative">
        <button className="absolute right-5 top-5" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-5">사용자 상세 정보</h2>

        {/* 탭 (UI 유지용) */}
        <div className="flex bg-gray-100 p-1 rounded-full mb-6">
          <button className="flex-1 py-2 rounded-full bg-white font-semibold shadow">
            기본 정보
          </button>
          <button className="flex-1 py-2 text-gray-500 cursor-not-allowed">
            신고 내역
          </button>
        </div>

        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">이름</p>
            <p className="font-medium">{user.userName}</p>
          </div>

          <div>
            <p className="text-gray-500">아이디 / 이메일</p>
            <p className="font-medium">{user.userId}</p>
          </div>

          <div>
            <p className="text-gray-500">가입일</p>
            <p className="font-medium">{formatDate(user.createdAt)}</p>
          </div>

          <div>
            <p className="text-gray-500">상태</p>
            <StatusBadge status={user.status} />
          </div>

          <div>
            <p className="text-gray-500">신고 횟수</p>
            <p className="font-medium">{user.reportCount ?? 0}건</p>
          </div>

          <div>
            <p className="text-gray-500">예약 내역</p>
            <p className="font-medium">{user.bookingCount ?? 0}건</p>
          </div>
        </div>
      </div>
    </div>
  );
}
