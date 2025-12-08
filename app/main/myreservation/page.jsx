"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

// 상태 라벨 상수
const STATUS_LABEL = {
  CONFIRMED: "예약 확정",
  CANCELED: "취소됨",
  COMPLETED: "진료 완료",
};

const STATUS_STYLE = {
  CONFIRMED: "bg-blue-50 text-blue-600 border border-blue-100",
  CANCELED: "bg-red-50 text-red-600 border border-red-100",
  COMPLETED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
};

export default function MyReservationPage() {
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming | past
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 데이터 불러오기 함수
  const fetchReservations = async () => {
    const userId = localStorage.getItem("userId");
    
    // 로그인이 안 되어 있다면 로딩 끝내고 종료
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // 백엔드(8081)에서 내 예약 내역 가져오기
      const response = await axios.get(`http://localhost:8081/reservations/user/${userId}`);
      
      // 백엔드 데이터를 프론트엔드 UI에 맞게 변환
      const formattedData = response.data.map((item) => {
        const dateObj = new Date(item.reserDate);
        const now = new Date();
        const isUpcoming = dateObj > now; // 현재 시간보다 미래면 '다가오는 예약'

        // 날짜와 시간 분리 (예: 2025-12-20T14:30:00)
        // item.reserDate가 문자열로 온다고 가정
        const dateStr = item.reserDate.split("T")[0];
        const timeStr = item.reserDate.split("T")[1]?.substring(0, 5); // 14:30 까지만 자르기

        return {
          id: item.id,
          hospitalId: item.hospitalId || 1, // 없으면 기본값
          hospitalName: item.hosName,
          department: item.department,
          doctorName: "전문의", // DB에 의사 정보가 없어서 임시 텍스트
          date: dateStr,
          time: timeStr,
          // 미래면 확정, 과거면 완료로 처리
          status: isUpcoming ? "CONFIRMED" : "COMPLETED", 
          address: "병원 위치 정보", // DB에 주소 정보가 없어서 임시 텍스트
          isUpcoming: isUpcoming,
        };
      });

      // 최신순 정렬 (ID 내림차순)
      setReservations(formattedData.sort((a, b) => b.id - a.id));
      setError(null);
    } catch (err) {
      console.error("예약 불러오기 실패:", err);
      // 에러가 나도 사용자에게는 빈 목록을 보여주거나 에러 메시지 표시
      setError("예약 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 화면 켜지면 데이터 가져오기
  useEffect(() => {
    fetchReservations();
  }, []);

  // ✅ 예약 취소 기능
  const handleCancelReservation = async (reservationId) => {
    if (!confirm("정말로 예약을 취소하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:8081/reservations/${reservationId}`);
      alert("예약이 취소되었습니다.");
      // 목록 새로고침
      fetchReservations();
    } catch (err) {
      console.error("취소 실패:", err);
      alert("예약 취소에 실패했습니다.");
    }
  };

  const upcomingReservations = reservations.filter((r) => r.isUpcoming);
  const pastReservations = reservations.filter((r) => !r.isUpcoming);

  const listToShow =
    activeTab === "upcoming" ? upcomingReservations : pastReservations;

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* 상단 헤더 영역 */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 pt-8">
            나의 예약
          </h1>
          <p className="mt-2 text-gray-500">
            anapo로 예약한 병원 진료 내역을 한 눈에 확인해보세요.
          </p>
        </header>

        {/* 탭 버튼 */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "upcoming"
                ? "bg-[#3B8DFF] text-white shadow-sm"
                : "bg-white text-gray-600 border hover:bg-gray-50"
            }`}
          >
            다가오는 예약
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "past"
                ? "bg-[#3B8DFF] text-white shadow-sm"
                : "bg-white text-gray-600 border hover:bg-gray-50"
            }`}
          >
            지난 예약
          </button>
        </div>

        {/* 본문 카드 영역 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          {/* 로딩 상태 */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mb-3" />
              <p>예약 정보를 불러오는 중입니다...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {!loading && error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 text-red-700">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div>
                <p className="font-medium">오류가 발생했습니다</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* 목록 */}
          {!loading && !error && (
            <>
              {listToShow.length === 0 ? (
                <EmptyState activeTab={activeTab} />
              ) : (
                <ul className="space-y-4">
                  {listToShow.map((reservation) => (
                    <ReservationCard
                      key={reservation.id}
                      reservation={reservation}
                      onCancel={handleCancelReservation} // 취소 함수 전달
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 예약 카드 컴포넌트
 */
function ReservationCard({ reservation, onCancel }) {
  const {
    id,
    hospitalId,
    hospitalName,
    department,
    doctorName,
    date,
    time,
    status,
    address,
    isUpcoming,
  } = reservation;

  const statusLabel = STATUS_LABEL[status] ?? "알 수 없음";
  const statusStyle = STATUS_STYLE[status] ?? "bg-gray-100 text-gray-600";

  return (
    <li className="rounded-2xl border border-gray-100 bg-linear-to-r from-white to-[#F7F9FF] p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* 왼쪽 정보 영역 */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs md:text-sm px-2 py-1 rounded-full bg-[#E5F0FF] text-[#3B8DFF] font-semibold">
            {department}
          </span>
          <span
            className={`text-xs md:text-sm px-2 py-1 rounded-full font-medium ${statusStyle}`}
          >
            {statusLabel}
          </span>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-1">
          {hospitalName}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          담당의&nbsp;
          <span className="font-medium text-gray-800">{doctorName}</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[220px] md:max-w-xs">
              {address}
            </span>
          </div>
        </div>
      </div>

      {/* 오른쪽 버튼 영역 */}
      <div className="flex flex-row md:flex-col items-end md:items-stretch gap-2 min-w-40">
        <Link
          href={`/main/findhospital/${hospitalId}`}
          className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition"
        >
          병원 상세 보기
          <ChevronRight className="w-4 h-4" />
        </Link>

        {/* 다가오는 예약일 때만 취소 버튼 노출 */}
        {isUpcoming && status === "CONFIRMED" && (
          <button
            type="button"
            onClick={() => onCancel(id)} // 취소 버튼 클릭 시 실행
            className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 transition w-full"
          >
            예약 취소
          </button>
        )}
      </div>
    </li>
  );
}

// 빈 상태 컴포넌트
function EmptyState({ activeTab }) {
  const isUpcoming = activeTab === "upcoming";

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-[#E5F0FF] flex items-center justify-center mb-4">
        <Calendar className="w-7 h-7 text-[#3B8DFF]" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">
        {isUpcoming ? "다가오는 예약이 없습니다" : "지난 예약 내역이 없습니다"}
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        {isUpcoming
          ? "병원을 검색하고 진료 예약을 진행해보세요."
          : "아직 완료된 진료 기록이 없습니다."}
      </p>

      {isUpcoming && (
        <Link
          href="/main/findhospital"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#3B8DFF] text-white hover:bg-[#2f73d1] transition"
        >
          병원 찾으러 가기
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}