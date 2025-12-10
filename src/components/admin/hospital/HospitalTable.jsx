import { Eye, AlertTriangle, Ban, Trash2 } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function HospitalTable({ hospitals, onDetail, onAction }) {
  return (
    <div className="bg-white  rounded-xl overflow-hidden">
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
              <td className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  H
                </div>
                {h.name}
              </td>
              <td className="p-4">{h.address}</td>
              <td className="p-4">{h.phone}</td>
              <td className="p-4">
                <StatusBadge status={h.status} />
              </td>
              <td className="p-4 text-red-500">{h.violations}건</td>
              <td className="p-4">{h.notices}건</td>
              <td className="p-4 flex gap-3">
                <Eye className="cursor-pointer" onClick={() => onDetail(h)} />

                {/* 경고 */}
                <AlertTriangle
                  className="text-orange-500 cursor-pointer"
                  onClick={() => onAction("warn", h)}
                />

                {/* 정지 */}
                <Ban
                  className="text-red-500 cursor-pointer"
                  onClick={() => onAction("suspend", h)}
                />

                {/* 삭제 */}
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
