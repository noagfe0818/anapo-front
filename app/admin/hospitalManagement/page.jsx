"use client";

import { useState, useEffect } from "react";
import HospitalTable from "@/components/admin/hospital/HospitalTable";
import NoticeTable from "@/components/admin/hospital/NoticeTable";
import HospitalDetailModal from "@/components/admin/hospital/HospitalDetailModal";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function HospitalManagementPage() {
  const [tab, setTab] = useState("list"); // list | notice
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | ACTIVE | WARNING | SUSPENDED

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [actionType, setActionType] = useState(null);

  // -------------------------------
  // 📌 병원 사용자 목록 불러오기
  // -------------------------------
  useEffect(() => {
    async function fetchHospitals() {
      try {
        const res = await fetch("/api/admin/hos-users");
        if (!res.ok) throw new Error("병원 사용자 목록 조회 실패");

        const data = await res.json();
        setHospitals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setHospitals([]);
      }
    }

    fetchHospitals();
  }, []);

  // -------------------------------
  // 📌 검색 + 상태 필터 (백엔드 필드 기준)
  // -------------------------------
  useEffect(() => {
    let result = [...hospitals];

    // 상태 필터
    if (statusFilter !== "ALL") {
      result = result.filter((h) => h.status === statusFilter);
    }

    // 검색 필터
    if (search.trim() !== "") {
      const keyword = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.hosName?.toLowerCase().includes(keyword) ||
          h.hosAddress?.toLowerCase().includes(keyword)
      );
    }

    setFilteredHospitals(result);
  }, [hospitals, search, statusFilter]);

  // -------------------------------
  // 모달 제어
  // -------------------------------
  const openDetail = (hospital) => setSelectedHospital(hospital);
  const closeDetail = () => setSelectedHospital(null);

  const openAction = (type, hospital) => {
    setActionType(type);
    setSelectedHospital(hospital);
  };

  // -------------------------------
  // 상태 변경 (경고 / 정지 / 삭제)
  // -------------------------------
  const handleAction = async () => {
    try {
      let status;
      if (actionType === "warn") status = "	INACTIVE";
      if (actionType === "suspend") status = "SUSPENDED";
      if (actionType === "delete") status = "DELETED";

      const res = await fetch(
        `/api/admin/hos-users/${selectedHospital.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("병원 상태 변경 실패");

      setHospitals((prev) =>
        prev.map((h) => (h.id === selectedHospital.id ? { ...h, status } : h))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setActionType(null);
      setSelectedHospital(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">병원 관리</h1>
      <p className="text-gray-500 mb-6">병원 정보 및 공지사항을 관리하세요</p>

      {/* 탭 */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setTab("list")}
          className={`px-4 py-2 rounded-lg ${
            tab === "list" ? "bg-black text-white" : "bg-white shadow-sm"
          }`}
        >
          병원 목록
        </button>

        <button
          onClick={() => setTab("notice")}
          className={`px-4 py-2 rounded-lg ${
            tab === "notice" ? "bg-black text-white" : "bg-white shadow-sm"
          }`}
        >
          공지사항 검수
        </button>
      </div>

      {/* 병원 목록 */}
      {tab === "list" && (
        <>
          <div className="flex gap-4 mb-4">
            <input
              className="flex-1 bg-white shadow-sm px-4 py-2 rounded-xl"
              placeholder="병원명 또는 주소로 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {[
              { label: "전체", value: "ALL" },
              { label: "정상", value: "ACTIVE" },
              { label: "경고", value: "	INACTIVE" },
              { label: "정지", value: "SUSPENDED" },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === s.value
                    ? "bg-black text-white"
                    : "bg-white shadow-sm"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <HospitalTable
            hospitals={filteredHospitals}
            onDetail={openDetail}
            onAction={openAction}
          />
        </>
      )}

      {/* 공지사항 검수 */}
      {tab === "notice" && <NoticeTable />}

      {/* 병원 상세 모달 */}
      {selectedHospital && !actionType && (
        <HospitalDetailModal
          hospital={selectedHospital}
          onClose={closeDetail}
        />
      )}

      {/* 경고 / 정지 Confirm 모달 */}
      {actionType && (
        <ConfirmModal
          type={actionType}
          target={selectedHospital}
          onClose={() => setActionType(null)}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}
