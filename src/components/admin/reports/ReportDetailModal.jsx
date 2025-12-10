import { X } from "lucide-react";
import ReportTypeBadge from "./ReportTypeBadge";
import ReportStatusBadge from "./ReportStatusBadge";

export default function ReportDetailModal({ report, onClose, onProcess }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl w-[600px] shadow-lg relative">
        <button className="absolute right-6 top-6" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-6">신고 상세 내용</h2>

        {/* 정보 */}
        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
          <div>
            <p className="text-gray-500">피신고자</p>
            <p>{report.target}</p>
          </div>

          <div>
            <p className="text-gray-500">신고자</p>
            <p>{report.reporter}</p>
          </div>

          <div>
            <p className="text-gray-500">신고 유형</p>
            <ReportTypeBadge type={report.type} />
          </div>

          <div>
            <p className="text-gray-500">콘텐츠 유형</p>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs">
              {report.contentType}
            </span>
          </div>

          <div>
            <p className="text-gray-500">신고 일시</p>
            <p>{report.date}</p>
          </div>

          <div>
            <p className="text-gray-500">처리 상태</p>
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        {/* 신고 내용 */}
        <div className="mb-6">
          <p className="text-gray-500 mb-1">신고된 콘텐츠</p>
          <textarea
            readOnly
            className="w-full p-3 border rounded bg-gray-50"
            value={report.content}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg"
            /*
              📌 콘텐츠 삭제 API
              POST /api/admin/reports/{id}/delete-content
            */
            onClick={() => onProcess(report, "delete-content")}
          >
            🗑 콘텐츠 삭제
          </button>

          <button
            className="px-4 py-2 bg-gray-100 text-black rounded-lg"
            onClick={() => onProcess(report, "approve")}
          >
            ✔ 사용자 경고
          </button>

          <button
            className="px-4 py-2 bg-gray-100 text-black rounded-lg"
            onClick={() => onProcess(report, "suspend")}
          >
            ⛔ 계정 정지
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => onProcess(report, "reject")}
          >
            신고 기각
          </button>
        </div>
      </div>
    </div>
  );
}
