"use client";
import { useEffect, useState } from "react";
import { Search, Eye, Download } from "lucide-react";

const Medicalrecord = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체 상태");

  /*  
    📌 백엔드 연동 예정 부분
    useEffect(() => {
      fetch("/api/medical-records")
        .then(res => res.json())
        .then(data => setRecords(data));
    }, []);
  */

  // ❗ 지금은 임시 Mock 데이터 (백엔드 연동 전)
  useEffect(() => {
    setRecords([
      {
        id: "MR001",
        patientName: "김민수",
        patientId: "P001",
        doctor: "박의사",
        date: "2024-01-15",
        diagnosis: "급성 기관지염",
        status: "완료",
      },
      {
        id: "MR002",
        patientName: "이영희",
        patientId: "P002",
        doctor: "김의사",
        date: "2024-01-14",
        diagnosis: "알레르기성 비염",
        status: "완료",
      },
      {
        id: "MR003",
        patientName: "박철수",
        patientId: "P003",
        doctor: "이의사",
        date: "2024-01-14",
        diagnosis: "고혈압",
        status: "진행중",
      },
      {
        id: "MR004",
        patientName: "최은정",
        patientId: "P004",
        doctor: "박의사",
        date: "2024-01-13",
        diagnosis: "감기",
        status: "완료",
      },
      {
        id: "MR005",
        patientName: "정민호",
        patientId: "P005",
        doctor: "김의사",
        date: "2024-01-13",
        diagnosis: "위염",
        status: "완료",
      },
    ]);
  }, []);

  // 검색 + 상태 필터
  const filteredRecords = records.filter((r) => {
    const keyword = `${r.patientName} ${r.patientId} ${r.diagnosis}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "전체 상태" ? true : r.status === statusFilter;

    return keyword && statusMatch;
  });

  // 상태 뱃지 스타일
  const badgeClass = (status) => {
    if (status === "완료") return "bg-green-100 text-green-700";
    if (status === "진행중") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">진료 내역 관리</h1>
      <p className="text-gray-500 mb-8">
        환자들의 진료 기록을 조회하고 관리할 수 있습니다
      </p>

      <div className="bg-white p-6 rounded-xl shadow">
        {/* 검색 + 상태 필터 */}
        <div className="flex justify-between items-center mb-6">
          {/* 검색창 */}
          <div className="relative w-[60%]">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="환자명, 환자번호, 진단명으로 검색"
              className="w-full border rounded-lg pl-10 p-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* 상태 필터 */}
          <select
            className="border rounded-lg px-3 py-2 text-gray-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>전체 상태</option>
            <option>완료</option>
            <option>진행중</option>
          </select>
        </div>

        {/* 테이블 */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">진료 번호</th>
              <th className="p-3">환자명</th>
              <th className="p-3">환자번호</th>
              <th className="p-3">담당의</th>
              <th className="p-3">진료일</th>
              <th className="p-3">진단명</th>
              <th className="p-3">상태</th>
              <th className="p-3">관리</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.patientName}</td>
                <td className="p-3">{r.patientId}</td>
                <td className="p-3">{r.doctor}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.diagnosis}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>

                {/* 관리 아이콘 */}
                <td className="p-3 flex gap-3 justify-center">
                  <Eye
                    size={18}
                    className="text-gray-600 hover:text-black cursor-pointer"
                  />
                  <Download
                    size={18}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  />

                  {/*
                    📌 다운로드 기능은 여기서 백엔드 파일 다운로드 API를 연결하면 됨.
                    예)
                    fetch(`/api/medical-records/${r.id}/download`)
                      .then(...)
                  */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicalrecord;
