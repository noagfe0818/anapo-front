import { Eye } from "lucide-react";
import ReportTypeBadge from "./ReportTypeBadge";
import ReportStatusBadge from "./ReportStatusBadge";

export default function ReportTable({ reports, onDetail }) {
  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-4">피신고자</th>
            <th className="p-4">신고자</th>
            <th className="p-4">신고 유형</th>
            <th className="p-4">콘텐츠</th>
            <th className="p-4">신고일시</th>
            <th className="p-4">상태</th>
            <th className="p-4">작업</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr className="border-t border-gray-300" key={r.id}>
              <td className="p-4">{r.target}</td>
              <td className="p-4">{r.reporter}</td>
              <td className="p-4 flex gap-2">
                <ReportTypeBadge type={r.type} />
                <span className="text-xs px-2 py-1 rounded bg-gray-200">
                  {r.contentType}
                </span>
              </td>
              <td className="p-4">{r.content}</td>
              <td className="p-4">{r.date}</td>
              <td className="p-4">
                <ReportStatusBadge status={r.status} />
              </td>
              <td className="p-4">
                <Eye className="cursor-pointer" onClick={() => onDetail(r)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
