import { Eye, AlertTriangle, Ban, Trash2 } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function UserTable({ users, onAction }) {
  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4">사용자</th>
            <th className="p-4">이메일</th>
            <th className="p-4">가입일</th>
            <th className="p-4">상태</th>
            <th className="p-4">신고</th>
            <th className="p-4">예약</th>
            <th className="p-4">작업</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-gray-300">
              {/* 아바타 */}
              <td className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {u.name.charAt(0)}
                </div>
                <span className="font-medium">{u.name}</span>
              </td>

              <td className="p-4">{u.email}</td>
              <td className="p-4">{u.date}</td>

              <td className="p-4">
                <StatusBadge status={u.status} />
              </td>

              <td className="p-4 text-red-500">{u.reports}건</td>
              <td className="p-4">{u.bookings}건</td>

              {/* ------------------------------
              📌 아이콘 클릭 → 모달 열림
              상세보기 = detail
              경고 = warn
              정지 = suspend
              탈퇴 = delete
              ------------------------------ */}
              <td className="p-4 flex gap-3 items-center">
                <Eye
                  className="cursor-pointer hover:text-black"
                  onClick={() => onAction("detail", u)}
                />
                <AlertTriangle
                  className="text-orange-500 cursor-pointer"
                  onClick={() => onAction("warn", u)}
                />
                <Ban
                  className="text-red-500 cursor-pointer"
                  onClick={() => onAction("suspend", u)}
                />
                <Trash2
                  className="text-red-600 cursor-pointer"
                  onClick={() => onAction("delete", u)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
