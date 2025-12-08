"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Heart,
  Phone,
  Clock,
  X,
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
}

// --- 임시 UI 컴포넌트 ---
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

  // 1. 데이터를 담을 그릇을 만듭니다
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // 2. 페이지가 켜지면 백엔드(8081)에 데이터를 요청합니다.
  useEffect(() => {
    fetch("http://localhost:8081/hospitals")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 응답이 올바르지 않습니다.");
        return res.json();
      })
      .then((data) => {
        // 3. 백엔드 데이터를 프론트엔드 형식으로 변환
        const formattedData: Hospital[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.hosName,
          address: item.hosAddress,
          phone: item.hosNumber,
          openHours: item.hosTime,
          latitude: item.hosLat,
          longitude: item.hosLng,

          // --- DB에 없는 정보는 기본값 설정 ---
          rating: 4.5,
          distance: "0.5km",
          specialties: ["내과", "일반의", "정형외과"],
          image:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
        }));
        setHospitals(formattedData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  const specialties = [
    { value: "all", label: "전체" },
    { value: "내과", label: "내과" },
    { value: "외과", label: "외과" },
    { value: "정형외과", label: "정형외과" },
    { value: "산부인과", label: "산부인과" },
  ];

  // 4. 필터링 대상을 state인 hospitals로 변경
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
                {" "}
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
                  className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base text-gray-900">
                      {hospital.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-red-400 text-red-400" />
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
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-red-400 text-red-400" />
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
                  {/* ✅ 여기를 수정했습니다! */}
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