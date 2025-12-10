"use client";

import { useState, useEffect } from "react";
import HospitalTable from "@/components/admin/hospital/HospitalTable";
import NoticeTable from "@/components/admin/hospital/NoticeTable";
import HospitalDetailModal from "@/components/admin/hospital/HospitalDetailModal";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function HospitalManagementPage() {
  const [tab, setTab] = useState("list"); // list | notice
  const [hospitals, setHospitals] = useState([]);
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체"); // 전체 | 정상 | 경고 | 정지

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [actionType, setActionType] = useState(null);

  // -------------------------------
  // 📌 병원 목록 불러오기 (백엔드 GET)
  // -------------------------------
  useEffect(() => {
    /*
    🔗 Spring Boot 예시
    GET /api/admin/hospitals
    const res = await fetch("/api/admin/hospitals");
    const data = await res.json();
    setHospitals(data);
    */

    setHospitals([
      {
        id: 1,
        name: "서울대학교병원",
        address: "서울시 종로구",
        phone: "02-1234-5678",
        status: "정상",
        violations: 0,
        notices: 15,
        regDate: "2023-01-10",
      },
      {
        id: 2,
        name: "강남세브란스병원",
        address: "서울시 강남구",
        phone: "02-2345-6789",
        status: "경고",
        violations: 1,
        notices: 12,
        regDate: "2023-02-20",
      },
      {
        id: 3,
        name: "삼성서울병원",
        address: "서울시 강남구",
        phone: "02-3456-7890",
        status: "정상",
        violations: 0,
        notices: 20,
        regDate: "2023-05-17",
      },
      {
        id: 4,
        name: "서울아산병원",
        address: "서울시 송파구",
        phone: "02-4567-8901",
        status: "정지",
        violations: 3,
        notices: 8,
        regDate: "2023-04-11",
      },
    ]);
  }, []);

  // -------------------------------
  // 📌 공지사항 검수 데이터
  // -------------------------------
  useEffect(() => {
    /*
    GET /api/admin/hospital-notices
    */
    setNotices([
      {
        id: 1,
        hospital: "서울대학교병원",
        title: "연말연시 진료 안내",
        date: "2024-12-01",
        status: "검토중",
      },
      {
        id: 2,
        hospital: "강남세브란스병원",
        title: "특별 할인 이벤트",
        date: "2024-12-02",
        status: "거부",
        reason: "허위 광고",
      },
      {
        id: 3,
        hospital: "삼성서울병원",
        title: "건강검진 예약 안내",
        date: "2024-12-03",
        status: "승인",
      },
    ]);
  }, []);

  // -------------------------------
  // 📌 병원 필터링 로직
  // -------------------------------
  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch = h.name.includes(search) || h.address.includes(search);

    const matchesStatus =
      statusFilter === "전체" ? true : h.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 병원 상세 모달
  const openDetail = (hospital) => setSelectedHospital(hospital);
  const closeDetail = () => setSelectedHospital(null);

  // 경고/정지/삭제 모달
  const openAction = (type, hospital) => {
    setActionType(type);
    setSelectedHospital(hospital);
  };

  const handleAction = async () => {
    /*
    📌 병원 상태 변경 API 예시
    POST /api/admin/hospitals/{id}/warn
    POST /api/admin/hospitals/{id}/suspend
    DELETE /api/admin/hospitals/{id}
    */

    console.log("병원 처리됨:", actionType, selectedHospital);

    setHospitals((prev) =>
      prev.map((h) =>
        h.id === selectedHospital.id
          ? {
              ...h,
              status:
                actionType === "warn"
                  ? "경고"
                  : actionType === "suspend"
                  ? "정지"
                  : h.status,
            }
          : h
      )
    );

    if (actionType === "delete") {
      setHospitals((prev) => prev.filter((h) => h.id !== selectedHospital.id));
    }

    setActionType(null);
    setSelectedHospital(null);
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
              onChange={(e) => setSearch(e.target.value)}
            />

            {["전체", "정상", "경고", "정지"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === s
                    ? "bg-black text-white shadow-sm"
                    : "bg-white shadow-sm"
                }`}
              >
                {s}
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
      {tab === "notice" && <NoticeTable notices={notices} />}

      {/* 병원 상세 모달 */}
      {selectedHospital && !actionType && (
        <HospitalDetailModal
          hospital={selectedHospital}
          onClose={closeDetail}
        />
      )}

      {/* 경고 / 정지 / 삭제 Confirm 모달 */}
      {actionType && (
        <ConfirmModal
          title={
            actionType === "warn"
              ? "병원 경고"
              : actionType === "suspend"
              ? "병원 정지"
              : "병원 삭제"
          }
          message={`정말로 ${selectedHospital.name}을(를) ${actionType} 처리하시겠습니까?`}
          onClose={() => setActionType(null)}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}
