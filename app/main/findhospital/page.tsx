"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Heart,
  Phone,
  Clock,
  ArrowLeft,
} from "lucide-react";
import KakaoMap from "@/components/KakaoMap";
import Image from "next/image";
import Link from "next/link";

// --- 타입 정의 ---
interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  specialties: string[];
  openHours: string;
  image: string;
  latitude: number;
  longitude: number;
  isBookmarked?: boolean; // ✅ [추가] 찜 여부 확인용
}

// --- UI 컴포넌트 ---
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`border rounded px-3 py-2 w-full ${props.className}`}
    {...props}
  />
);
const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-colors bg-[#5CA0FF] text-white hover:bg-blue-500 ${props.className}`}
    {...props}
  >
    {children}
  </button>
);

export default function FindHospitalPage() {
  const router = useRouter();

  // 로그인한 유저 ID 가져오기
  const [userId, setUserId] = useState<string | null>(null);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // 1. 초기 로딩 시 유저 ID 확인
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // 2. 병원 데이터 + 내 찜 목록 가져오기
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 병원 목록 가져오기
        const hospitalRes = await fetch("http://localhost:8081/hospitals");
        const hospitalData = await hospitalRes.json();

        // 찜 목록 가져오기 (로그인 한 경우에만)
        let bookmarkedIds = new Set();
        if (userId) {
          try {
            const bookmarkRes = await fetch(`http://localhost:8081/bookmarks/${userId}`);
            if (bookmarkRes.ok) {
              const bookmarkData = await bookmarkRes.json();
              // 찜한 병원 ID만 모아서 Set으로 만듦 (검색 속도 빠르게)
              bookmarkData.forEach((b: any) => bookmarkedIds.add(b.hospitalId.toString()));
            }
          } catch (e) {
            console.error("북마크 로드 실패", e);
          }
        }

        // 병원 데이터 가공
        const formattedData: Hospital[] = hospitalData.map((item: any) => ({
          id: item.id.toString(),
          name: item.hosName,
          address: item.hosAddress,
          phone: item.hosNumber,
          openHours: item.hosTime,
          latitude: item.hosLat,
          longitude: item.hosLng,
          // 찜 여부 체크 ✅
          isBookmarked: bookmarkedIds.has(item.id.toString()),

          // 기본값 설정
          rating: 4.5,
          distance: "0.5km",
          specialties: ["내과", "일반의", "정형외과"],
          image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
        }));

        setHospitals(formattedData);
      } catch (error) {
        console.error("데이터 로드 중 오류:", error);
      }
    };

    fetchAllData();
  }, [userId]); // userId가 로드되면 실행

  // ✅ 3. 북마크 토글 함수 (찜하기 / 취소하기)
  const toggleBookmark = async (e: React.MouseEvent, hospital: Hospital) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 같이 눌리지 않게 방지

    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/main/login");
      return;
    }

    const isCurrentlyBookmarked = hospital.isBookmarked;

    // 1. 화면 먼저 업데이트 (빠른 반응)
    const updateState = (prevHospitals: Hospital[]) =>
      prevHospitals.map((h) =>
        h.id === hospital.id ? { ...h, isBookmarked: !isCurrentlyBookmarked } : h
      );

    setHospitals(updateState);
    if (selectedHospital && selectedHospital.id === hospital.id) {
      setSelectedHospital((prev) => prev ? { ...prev, isBookmarked: !isCurrentlyBookmarked } : null);
    }

    // 2. 백엔드 요청
    try {
      if (isCurrentlyBookmarked) {
        // 이미 찜했으면 -> 삭제 (DELETE)
        await fetch(`http://localhost:8081/bookmarks/${userId}/${hospital.id}`, {
          method: "DELETE",
        });
      } else {
        // 찜 안했으면 -> 등록 (POST)
        await fetch(`http://localhost:8081/bookmarks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: parseInt(userId),
            hospitalId: parseInt(hospital.id),
          }),
        });
      }
    } catch (error) {
      console.error("찜하기 오류:", error);
      alert("요청 처리 중 오류가 발생했습니다.");
      // 에러 나면 원래대로 되돌리기 (선택사항)
      setHospitals((prev) => updateState(prev)); // 다시 뒤집어서 원복
    }
  };

  const specialties = [
    { value: "all", label: "전체" },
    { value: "내과", label: "내과" },
    { value: "외과", label: "외과" },
    { value: "정형외과", label: "정형외과" },
    { value: "산부인과", label: "산부인과" },
  ];

  const filteredHospitals = hospitals.filter(
    (h) =>
      (h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === "all" || h.specialties.includes(selectedSpecialty))
  );

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedHospital(null);
  };

  const handleGoToBooking = (hospital: Hospital) => {
    router.push(`/main/reservationmed?hospitalId=${hospital.id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full lg:w-[450px] shrink-0 bg-white overflow-y-auto shadow-lg p-4 pt-8">
        {/* 헤더 부분 */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          {showDetail && selectedHospital ? (
            <>
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-gray-800 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="font-semibold">뒤로</span>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                병원 상세정보
              </h3>
              <div className="w-8"></div>
            </>
          ) : (
            <div className="flex flex-col gap-5">
              <Link href={"/main"}>
                <ArrowLeft />
              </Link>
              <h3 className="text-lg font-semibold text-gray-900 ">
                병원 찾기
              </h3>
            </div>
          )}
        </div>

        {/* 목록 뷰 */}
        {!showDetail ? (
          <>
            <div className="space-y-4 mb-6 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="병원명 또는 주소 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 placeholder:text-gray-500 text-gray-900 bg-gray-50 p-2 rounded-lg w-full"
                />
              </div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-900"
              >
                {specialties.map((s) => (
                  <option
                    key={s.value}
                    value={s.value}
                    className="text-gray-900"
                  >
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 ">
              {filteredHospitals.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  등록된 병원 데이터가 없거나 불러오는 중입니다.
                </div>
              )}

              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  onClick={() => handleHospitalSelect(hospital)}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base text-gray-900">
                      {hospital.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      {/* ✅ 하트 버튼 (클릭 시 토글) */}
                      <Heart
                        onClick={(e) => toggleBookmark(e, hospital)}
                        className={`w-5 h-5 cursor-pointer transition-all ${
                          hospital.isBookmarked
                            ? "fill-red-500 text-red-500" // 찜 됨: 빨간색
                            : "text-gray-400 hover:text-red-400" // 찜 안됨: 회색
                        }`}
                      />
                      <span className="font-semibold text-sm text-gray-900">
                        {hospital.rating}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{hospital.openHours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          selectedHospital && (
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-6">
                <Image
                  src={selectedHospital.image}
                  alt={selectedHospital.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedHospital.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      {/* ✅ 상세 페이지 하트 버튼 */}
                      <Heart
                        onClick={(e) => toggleBookmark(e, selectedHospital)}
                        className={`w-6 h-6 cursor-pointer transition-all ${
                          selectedHospital.isBookmarked
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-400"
                        }`}
                      />
                      <span className="font-semibold text-gray-900">
                        {selectedHospital.rating}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-900">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                      <span>{selectedHospital.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedHospital.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedHospital.openHours}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">진료과목</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-[#5CA0FF] text-sm rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <Button onClick={() => handleGoToBooking(selectedHospital)}>
                    진료 예약하기
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {/* 지도 영역 */}
      <div className="hidden lg:block flex-1">
        <KakaoMap
          latitude={selectedHospital?.latitude ?? 37.484}
          longitude={selectedHospital?.longitude ?? 126.7831}
        />
      </div>
    </div>
  );
}