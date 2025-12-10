"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios"; 

import AppointmentBookingComponent from "@/components/patient/AppointmentBookingComponent";

function ReservationPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null);     // 에러 상태 관리

  useEffect(() => {
    const fetchHospital = async () => {
      const hospitalId = searchParams.get("hospitalId");
      
      // 1. URL에 ID가 없으면? -> 로딩 끝내고 에러 표시
      if (!hospitalId) {
        setError("병원 ID가 없습니다. 병원을 다시 선택해주세요.");
        setLoading(false);
        return;
      }

      try {
        // 2. 백엔드 요청
        const response = await axios.get(`http://localhost:8081/hospitals/${hospitalId}`);
        const data = response.data;

        // 3. 데이터 변환
        const mappedHospital = {
          id: data.id,
          name: data.hosName,           
          address: data.hosAddress || "주소 정보 없음",     
          phoneNumber: data.hosNumber || "전화번호 없음",  
        };

        setSelectedHospital(mappedHospital);
      } catch (err) {
        console.error("에러 발생:", err);
        setError("병원 정보를 불러오지 못했습니다. (서버 연결 실패)");
      } finally {
        // 4. 성공하든 실패하든 로딩은 끝내야 함! (무한 로딩 방지)
        setLoading(false);
      }
    };

    fetchHospital();
  }, [searchParams]);

  // 로딩 중일 때
  if (loading) return (
    <div className="flex justify-center items-center h-screen text-gray-500">
      병원 정보를 불러오는 중...
    </div>
  );

  // 에러가 났을 때 (로딩이 안 풀리는 대신 에러 메시지를 보여줌)
  if (error || !selectedHospital) return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <p className="text-red-500 font-medium">{error || "병원 정보를 찾을 수 없습니다."}</p>
      <button 
        onClick={() => router.push("/main/findhospital")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        병원 목록으로 돌아가기
      </button>
    </div>
  );

  return (
    <AppointmentBookingComponent
      selectedHospital={selectedHospital}
      onBack={() => router.push("/main/findhospital")}
    />
  );
}

export default function ReservationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          페이지 로딩 중...
        </div>
      }
    >
      <ReservationPageContent />
    </Suspense>
  );
}