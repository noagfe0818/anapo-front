import { Eye, AlertTriangle, Ban, Trash2 } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function HospitalTable({ hospitals, onDetail, onAction }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-4">병원명</th>
            <th className="p-4">주소</th>
            <th className="p-4">연락처</th>
            <th className="p-4">상태</th>
            <th className="p-4">위반</th>
            <th className="p-4">공지</th>
            <th className="p-4">작업</th>
          </tr>
        </thead>

        <tbody>
          {hospitals.map((h) => (
            <tr className="border-t border-gray-400" key={h.id}>
              {/* 병원명 */}
              <td className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  {h.hosName?.charAt(0) ?? "H"}
                </div>
                <span className="font-medium">{h.hosName}</span>
              </td>

              {/* 주소 */}
              <td className="p-4">{h.hosAddress}</td>

              {/* 연락처 */}
              <td className="p-4">{h.hosNumber}</td>

              {/* 상태 */}
              <td className="p-4">
                <StatusBadge status={h.status} />
              </td>

              {/* 위반 / 공지 (아직 백엔드 없으면 0으로) */}
              <td className="p-4 text-red-500">{h.violations ?? 0}건</td>
              <td className="p-4">{h.notices ?? 0}건</td>

              {/* 작업 */}
              <td className="p-4 flex gap-3">
                <Eye className="cursor-pointer" onClick={() => onDetail(h)} />

                <AlertTriangle
                  className="text-orange-500 cursor-pointer"
                  onClick={() => onAction("warn", h)}
                />

                <Ban
                  className="text-red-500 cursor-pointer"
                  onClick={() => onAction("suspend", h)}
                />

                <Trash2
                  className="text-red-600 cursor-pointer"
                  onClick={() => onAction("delete", h)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
