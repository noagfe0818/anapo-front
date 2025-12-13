import { Eye } from "lucide-react";

export default function NoticeTable({ notices = [] }) {
  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-4">병원명</th>
            <th className="p-4">공지 제목</th>
            <th className="p-4">등록일</th>
            <th className="p-4">상태</th>
            <th className="p-4">작업</th>
          </tr>
        </thead>

        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-400">
                공지사항 데이터가 없습니다.
              </td>
            </tr>
          ) : (
            notices.map((n) => (
              <tr key={n.id} className="border-t border-gray-300">
                <td className="p-4">{n.hospitalName}</td>

                <td className="p-4">
                  <div>
                    <p>{n.title}</p>
                    {n.rejectReason && (
                      <p className="text-red-500 text-sm">
                        사유: {n.rejectReason}
                      </p>
                    )}
                  </div>
                </td>

                <td className="p-4">{n.createdAt}</td>

                <td className="p-4">
                  {n.status === "APPROVED" && (
                    <span className="px-3 py-1 bg-black text-white rounded-full">
                      승인
                    </span>
                  )}

                  {n.status === "REJECTED" && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full">
                      거부
                    </span>
                  )}

                  {n.status === "PENDING" && (
                    <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full">
                      검토중
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <Eye className="cursor-pointer" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
