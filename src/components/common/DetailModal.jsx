import { X } from "lucide-react";

export default function UserDetailModal({ user, onClose }) {
  /*
  📌 백엔드에서 상세정보만 다시 불러오는 경우
  GET /api/admin/users/{id}
  
  useEffect(() => {
    fetch(`/api/admin/users/${user.id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);
  */

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl w-[500px] shadow-lg relative">
        <button className="absolute right-5 top-5" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-5">사용자 상세 정보</h2>

        {/* 탭 */}
        <div className="flex bg-gray-100 p-1 rounded-full mb-6">
          <button className="flex-1 py-2 rounded-full bg-white font-semibold shadow">
            기본 정보
          </button>
          <button className="flex-1 py-2 text-gray-500">신고 내역</button>
        </div>

        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">이름</p>
            <p>{user.name}</p>
          </div>

          <div>
            <p className="text-gray-500">이메일</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500">가입일</p>
            <p>{user.date}</p>
          </div>

          <div>
            <p className="text-gray-500">상태</p>
            <span className="px-3 py-1 bg-black text-white rounded-full">
              {user.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500">신고 횟수</p>
            <p>{user.reports}건</p>
          </div>

          <div>
            <p className="text-gray-500">예약 내역</p>
            <p>{user.bookings}건</p>
          </div>
        </div>
      </div>
    </div>
  );
}
