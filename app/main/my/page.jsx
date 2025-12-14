"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Heart, MapPin, Activity, User, Phone, Mail, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../src/context/AuthContext";
import axios from "axios";

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 최신 유저 정보
  const [userInfo, setUserInfo] = useState(null);

  // 통계 상태
  const [stats, setStats] = useState({
    reservations: 0,
    favorites: 0, // 초기값 0
    reviews: 0, // 리뷰 기능이 아직 없다면 0 또는 하드코딩 유지
  });

  // ✅ [수정] 즐겨찾기 목록 (초기값 빈 배열)
  const [favorites, setFavorites] = useState([]);

  // 최근 예약 내역
  const [recentReservations, setRecentReservations] = useState([]);

  // 로그인 체크
  useEffect(() => {
    if (!loading && !user) {
      router.push("/main/login");
    }
  }, [loading, user, router]);

  // ✅ 데이터 불러오기 (유저정보, 예약내역, 즐겨찾기)
  const fetchData = async () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) return;

    try {
      // 1. 유저 정보
      const userRes = await axios.get(`http://localhost:8081/user/${storedUserId}`);
      setUserInfo(userRes.data);

      // 2. 예약 내역
      const resRes = await axios.get(`http://localhost:8081/reservations/user/${storedUserId}`);
      const sortedRes = resRes.data.sort((a, b) => b.id - a.id); // 최신순
      setRecentReservations(sortedRes);

      // 3. ✅ 즐겨찾기 목록 가져오기 [추가됨]
      const bookmarkRes = await axios.get(`http://localhost:8081/bookmarks/${storedUserId}`);
      setFavorites(bookmarkRes.data);

      // 4. 통계 업데이트
      setStats({
        reservations: sortedRes.length,
        favorites: bookmarkRes.data.length, // 즐겨찾기 개수 반영
        reviews: 0, // 리뷰 기능 구현 전이면 0
      });

    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // ✅ [추가] 즐겨찾기 삭제 (X 버튼)
  const handleRemoveBookmark = async (hospitalId, hospitalName) => {
    if (!confirm(`'${hospitalName}'을(를) 즐겨찾기에서 삭제하시겠습니까?`)) return;

    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) return;

    try {
      // 백엔드 삭제 요청
      await axios.delete(`http://localhost:8081/bookmarks/${storedUserId}/${hospitalId}`);
      
      // 화면에서 즉시 제거 (새로고침 없이)
      const updatedFavorites = favorites.filter(item => item.hospitalId !== hospitalId);
      setFavorites(updatedFavorites);
      
      // 통계 숫자도 -1
      setStats(prev => ({ ...prev, favorites: prev.favorites - 1 }));

    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 로딩 화면
  if (loading || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500">회원 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 날짜 포맷
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (e) {
      return dateString;
    }
  };

  const displayUser = userInfo || user;

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* 헤더 */}
        <div className="flex flex-col justify-center items-center gap-3 mb-8 pt-10">
          <div className="p-3 bg-blue-100 rounded-2xl items-center">
            <Activity color="#5CA0FF" size={38} />
          </div>
          <h1 className="font-bold text-2xl text-gray-900">마이페이지</h1>
          <p className="text-gray-600">회원 정보와 예약 내역을 확인하고 관리하세요.</p>
        </div>

        {/* 유저 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-4xl font-bold text-[#5CA0FF]">
              {displayUser.userName ? displayUser.userName.charAt(0) : "U"}
            </div>
            
            <div className="flex-1 w-full space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{displayUser.userName}님</h2>
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
                  <span>{displayUser.userId}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-[#5CA0FF]" />
                  <span>{displayUser.userNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} className="text-[#5CA0FF]" />
                  <span>{displayUser.birth || displayUser.userBirth}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <User size={18} className="text-[#5CA0FF]" />
                  <span>{displayUser.sex || displayUser.userSex}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
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

        {/* 하단 영역 (예약 내역 + 즐겨찾기) */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* 1. 최근 예약 내역 */}
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
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900">
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

            <button 
              onClick={() => router.push("/main/findhospital")}
              className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-xl mt-4 font-medium transition"
            >
              새 예약하기
            </button>
          </div>

          {/* 2. ✅ 즐겨찾는 병원 (실제 데이터 연동) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <h3 className="font-semibold text-lg">즐겨찾는 병원</h3>
            </div>

            <div className="space-y-3">
              {favorites.length === 0 ? (
                 <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
                   즐겨찾기한 병원이 없습니다.
                 </div>
              ) : (
                favorites.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition cursor-pointer"
                    // 클릭 시 해당 병원 예약 페이지로 이동 (선택사항)
                    onClick={() => router.push(`/main/reservationmed?hospitalId=${item.hospitalId}`)}
                  >
                    <div>
                      {/* DTO 변수명: hosName */}
                      <p className="font-semibold text-gray-900">{item.hosName}</p>
                      <p className="text-gray-500 text-sm flex gap-1 items-center mt-1">
                        {/* DTO 변수명: hosAddress */}
                        <MapPin size={14} /> {item.hosAddress}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // 카드 클릭 방지
                        handleRemoveBookmark(item.hospitalId, item.hosName);
                      }}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => router.push("/main/findhospital")}
              className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-xl mt-4 font-medium transition"
            >
              병원 더 찾아보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}