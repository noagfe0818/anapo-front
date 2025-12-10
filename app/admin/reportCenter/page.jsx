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

  // -----------------------------
  // 📌 신고 리스트 불러오기 (백엔드 GET)
  // -----------------------------
  useEffect(() => {
    async function fetchReports() {
      try {
        /*
        🔗 Spring Boot API 예시
        GET /api/admin/reports

        const res = await fetch("/api/admin/reports");
        const data = await res.json();
        setReports(data);
        */

        setReports([
          {
            id: 1,
            target: "김민수",
            reporter: "이영희",
            type: "욕설/비방",
            contentType: "댓글",
            content: "부적절한 욕설이 포함된 댓글입니다...",
            date: "2024-12-03 10:30",
            status: "대기중",
          },
          {
            id: 2,
            target: "박철수",
            reporter: "정수진",
            type: "허위정보",
            contentType: "리뷰",
            content: "병원에 대한 허위 정보를 작성했습니다...",
            date: "2024-12-03 09:15",
            status: "대기중",
          },
          {
            id: 3,
            target: "강태양",
            reporter: "이하늘",
            type: "허위정보",
            contentType: "게시글",
            content: "검증되지 않은 의료 정보 게시...",
            date: "2024-12-03 11:50",
            status: "대기중",
          },
          {
            id: 4,
            target: "송민호",
            reporter: "조은비",
            type: "기타",
            contentType: "댓글",
            content: "개인정보 노출 댓글...",
            date: "2024-12-03 08:30",
            status: "대기중",
          },
        ]);
      } catch (err) {
        console.error("신고 불러오기 실패", err);
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
    /*
    🔗 Spring Boot API 예시
    POST /api/admin/reports/{id}/approve
    POST /api/admin/reports/{id}/reject

    await fetch(`/api/admin/reports/${report.id}/${action}`, {
      method: "POST",
    });
    */

    alert(`신고 ${action === "approve" ? "처리 완료" : "기각"}됨`);

    // 프론트에서 상태 업데이트
    setReports((prev) =>
      prev.map((r) =>
        r.id === report.id
          ? {
              ...r,
              status: action === "approve" ? "처리완료" : "기각",
            }
          : r
      )
    );
    closeDetail();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">신고센터</h1>
      <p className="text-gray-500 mb-6">사용자 신고를 검토하고 조치하세요</p>

      {/* 요약 박스 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard title="미처리 신고" value="4건" color="blue" />
        <SummaryCard title="처리 완료" value="3건" color="green" />
        <SummaryCard title="기각" value="1건" color="red" />
        <SummaryCard title="전체" value="8건" />
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
