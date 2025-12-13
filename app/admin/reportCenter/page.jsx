"use client";

import { useEffect, useState } from "react";
import ReportTable from "@/components/admin/reports/ReportTable";
import ReportDetailModal from "@/components/admin/reports/ReportDetailModal";

export default function ReportCenterPage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, done, rejected
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const pendingCount = reports.filter((r) => r.status === "대기중").length;
  const completedCount = reports.filter((r) => r.status === "처리완료").length;
  const rejectedCount = reports.filter((r) => r.status === "기각").length;
  const totalCount = reports.length;

  // -----------------------------
  // 📌 신고 리스트 불러오기 (백엔드 GET)
  // -----------------------------
  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("http://localhost:8081/admin/reports");
        const rawData = await res.json();

        // 🔥 백엔드 DTO → 프론트 UI용으로 매핑
        const mapped = rawData.map((r) => ({
          id: r.id,

          // 👇 핵심: 백엔드 구조 그대로 대응
          target: r.reported?.name ?? "-",
          reporter: r.reporter?.name ?? "-",

          type: convertReportType(r.reportType),
          contentType: convertTargetType(r.targetType),
          content: r.description ?? "-",
          date: formatDate(r.createdAt),
          status: convertStatus(r.status),
          adminMemo: r.adminMemo ?? "",
        }));

        setReports(mapped);
      } catch (err) {
        console.error("신고 불러오기 실패:", err);
      }
    }

    fetchReports();
  }, []);

  // -----------------------------
  // 📌 검색 + 필터링 기능
  // -----------------------------
  useEffect(() => {
    let list = [...reports];

    // 검색
    if (search.trim() !== "") {
      list = list.filter(
        (r) =>
          r.target.includes(search) ||
          r.reporter.includes(search) ||
          r.content.includes(search)
      );
    }

    // 상태 필터
    if (statusFilter !== "all") {
      list = list.filter((r) => r.status === statusFilter);
    }

    // 신고 종류 필터
    if (typeFilter !== "all") {
      list = list.filter((r) => r.type === typeFilter);
    }

    setFilteredReports(list);
  }, [search, statusFilter, typeFilter, reports]);

  // 상세 모달 열기
  const openDetail = (report) => setSelectedReport(report);
  const closeDetail = () => setSelectedReport(null);

  // -----------------------------
  // 📌 신고 처리하기 (백엔드 POST 요청)
  // -----------------------------
  const handleProcess = async (report, action) => {
    try {
      const newStatus = action === "approve" ? "COMPLETED" : "REJECTED";

      await fetch(`http://localhost:8081/admin/reports/${report.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          adminMemo: "",
          adminId: 1,
        }),
      });

      // 프론트에서도 상태 변경
      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id
            ? { ...r, status: action === "approve" ? "처리완료" : "기각" }
            : r
        )
      );

      closeDetail();
    } catch (err) {
      console.error("신고 처리 실패", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">신고센터</h1>
      <p className="text-gray-500 mb-6">사용자 신고를 검토하고 조치하세요</p>

      {/* 요약 박스 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="미처리 신고"
          value={`${pendingCount}건`}
          color="blue"
        />
        <SummaryCard
          title="처리 완료"
          value={`${completedCount}건`}
          color="green"
        />
        <SummaryCard title="기각" value={`${rejectedCount}건`} color="red" />
        <SummaryCard title="전체" value={`${totalCount}건`} />
      </div>

      {/* 상단 필터 버튼 */}
      <div className="flex gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "all" ? "bg-black text-white" : "border"
          }`}
          onClick={() => setStatusFilter("all")}
        >
          전체
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "대기중"
              ? "bg-black text-white"
              : "bg-white shadow-sm"
          }`}
          onClick={() => setStatusFilter("대기중")}
        >
          신고접수함
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "처리완료"
              ? "bg-black text-white"
              : "bg-white shadow-sm"
          }`}
          onClick={() => setStatusFilter("처리완료")}
        >
          처리 완료함
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "기각"
              ? "bg-black text-white"
              : "bg-white shadow-sm"
          }`}
          onClick={() => setStatusFilter("기각")}
        >
          기각됨
        </button>
      </div>

      {/* 검색창 + 신고유형 필터 */}
      <div className="flex gap-4 items-center mb-4">
        <input
          placeholder="신고자, 피신고자, 내용으로 검색"
          className="flex-1 bg-white shadow-sm px-4 py-2 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {["all", "욕설/비방", "허위정보", "스팸", "부적절한내용"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-lg ${
              typeFilter === t ? "bg-black text-white" : "bg-white shadow-sm"
            }`}
            onClick={() => setTypeFilter(t)}
          >
            {t === "all" ? "전체" : t}
          </button>
        ))}
      </div>

      {/* 신고 테이블 */}
      <ReportTable reports={filteredReports} onDetail={openDetail} />

      {/* 상세 모달 */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={closeDetail}
          onProcess={handleProcess}
        />
      )}
    </div>
  );
}

function convertReportType(type) {
  switch (type) {
    case "ABUSE":
      return "욕설/비방";
    case "SPAM":
      return "스팸";
    case "OBSCENE":
      return "음란성/부적절";
    case "PERSONAL_INFO":
      return "개인정보 노출";
    case "FALSE_INFO":
      return "허위정보";
    default:
      return "기타";
  }
}

function convertTargetType(type) {
  switch (type) {
    case "USER":
      return "사용자";
    case "POST":
      return "게시글";
    case "COMMENT":
      return "댓글";
    case "REVIEW":
      return "리뷰";
    default:
      return "기타";
  }
}

function convertStatus(status) {
  switch (status) {
    case "PENDING":
      return "대기중";
    case "IN_PROGRESS":
      return "처리중";
    case "COMPLETED":
      return "처리완료";
    case "REJECTED":
      return "기각";
    default:
      return status;
  }
}

function SummaryCard({ title, value, color }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white p-5 shadow-sm rounded-xl flex flex-col gap-1">
      <span className="text-gray-500">{title}</span>
      <span className={`text-xl font-semibold ${colors[color]}`}>{value}</span>
    </div>
  );
}
