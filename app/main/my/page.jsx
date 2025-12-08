"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Heart, MapPin, Activity, User, Phone, Mail, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../src/context/AuthContext"; // 경로 확인 필요!
import axios from "axios"; // axios 추가

export default function MyPage() {
  // 1. AuthContext에서 로그인한 유저 정보 가져오기
  const { user, loading } = useAuth();
  const router = useRouter();

  // 2. 로그인 안 했으면 로그인 페이지로 쫓아내기
  useEffect(() => {
    if (!loading && !user) {
      router.push("/main/login");
    }
  }, [loading, user, router]);

  // ---------------------------------------------------------
  // ⭐ 통계
  // ---------------------------------------------------------
  const [stats, setStats] = useState({
    reservations: 0,
    favorites: 3,
    reviews: 8,
  });

  // ---------------------------------------------------------
  // ⭐ 즐겨찾는 병원 (일단 하드코딩 유지)
  // ---------------------------------------------------------
  const [favorites, setFavorites] = useState([
    {
      hospitalId: 1,
      name: "부천세종병원",
      dept: "내과",
      distance: "0.5km",
    },
    {
      hospitalId: 2,
      name: "서울대학교병원",
      dept: "정형외과",
      distance: "1.2km",
    },
    {
      hospitalId: 3,
      name: "강남성심병원",
      dept: "피부과",
      distance: "2.1km",
    },
  ]);

  // ---------------------------------------------------------
  // ⭐ 최근 예약 내역 (백엔드 연동)
  // ---------------------------------------------------------
  const [recentReservations, setRecentReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
        // 로컬스토리지에서 로그인한 유저 ID 가져오기
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) return;

        try {
            // 백엔드 요청: 내 ID(acc)로 된 예약 가져오기
            // (백엔드 컨트롤러에 @GetMapping("/user/{accId}")가 있어야 함)
            const response = await axios.get(`http://localhost:8081/reservations/user/${storedUserId}`);
            
            // 데이터 최신순 정렬 (id 기준 내림차순)
            const sortedData = response.data.sort((a, b) => b.id - a.id);
            
            setRecentReservations(sortedData);
            
            // 통계 숫자 업데이트 (예약 건수)
            setStats(prev => ({ ...prev, reservations: sortedData.length }));

        } catch (error) {
            console.error("예약 내역 불러오기 실패:", error);
        }
    };

    if (user) {
        fetchReservations();
    }
  }, [user]);

  // 3. 로딩 중이거나 유저 정보가 없으면 '로딩중' 표시 (에러 방지)
  if (loading || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500">회원 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 날짜 포맷팅 함수 (2025-12-20T13:00 -> 2025.12.20 13:00)
  const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${year}.${month}.${day} ${hour}:${minute}`;
    } catch (e) {
        return dateString;
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* ----------------------------- */}
        {/* 제목 */}
        {/* ----------------------------- */}
        <div className="flex flex-col justify-center items-center gap-3 mb-8 pt-10">
          <div className="p-3 bg-blue-100 rounded-2xl items-center">
            <Activity color="#5CA0FF" size={38} />
          </div>
          <h1 className="font-bold text-2xl text-gray-900">마이페이지</h1>
          <p className="text-gray-600">
            회원 정보와 예약 내역을 확인하고 관리하세요.
          </p>
        </div>

        {/* ----------------------------- */}
        {/* 사용자 정보 (백엔드 데이터 연동 완료) */}
        {/* ----------------------------- */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 프로필 아이콘 */}
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-4xl font-bold text-[#5CA0FF]">
              {user.userName ? user.userName.charAt(0) : "U"}
            </div>
            
            {/* 상세 정보 */}
            <div className="flex-1 w-full space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{user.userName}님</h2>
                <button
                  onClick={() => router.push("/main/edit")}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition"
                >
                  정보 수정
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-[#5CA0FF]" />
                  <span>{user.userId}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-[#5CA0FF]" />
                  <span>{user.userNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} className="text-[#5CA0FF]" />
                  <span>{user.birth}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <User size={18} className="text-[#5CA0FF]" />
                  <span>{user.sex}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* 통계 */}
        {/* ----------------------------- */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.reservations}</p>
            <p className="text-gray-600 text-sm mt-1">총 예약 접수</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.favorites}</p>
            <p className="text-gray-600 text-sm mt-1">즐겨찾는 병원</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">{stats.reviews}</p>
            <p className="text-gray-600 text-sm mt-1">작성 리뷰</p>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* 최근 예약 + 즐겨찾기 */}
        {/* ----------------------------- */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 최근 예약 내역 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={20} className="text-[#5CA0FF]" />
              <h3 className="font-semibold text-lg">최근 예약 내역</h3>
            </div>

            {recentReservations.length === 0 ? (
              <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
                최근 예약 내역이 없습니다.
              </div>
            ) : (
              recentReservations.map((item, i) => (
                <div key={i} className="border rounded-xl p-4 mb-3">
                  {/* 여기가 핵심: 백엔드 데이터(item)를 화면에 뿌려주는 부분 */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900">
                        {/* 병원 이름이 hospital 객체 안에 있는지, 바로 있는지 확인해서 출력 */}
                        {item.hospital?.hosName || item.hosName || "병원 정보 없음"}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {item.department || "진료과"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                      {formatDate(item.reserDate)}
                  </div>
                </div>
              ))
            )}

            <button className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-xl mt-4 font-medium transition">
              새 예약하기
            </button>
          </div>

          {/* 즐겨찾는 병원 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <h3 className="font-semibold text-lg">즐겨찾는 병원</h3>
            </div>

            <div className="space-y-3">
              {favorites.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-sm flex gap-1 items-center mt-1">
                      {item.dept} · <MapPin size={14} /> {item.distance}
                    </p>
                  </div>

                  {/* 삭제 */}
                  <button className="text-gray-400 hover:text-red-500 transition p-2">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-xl mt-4 font-medium transition">
              병원 더 찾아보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}