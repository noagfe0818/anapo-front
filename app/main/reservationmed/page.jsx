"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ✅ 수정 3: 파일 경로를 'patient' 폴더 안으로 변경
import AppointmentBookingComponent from "@/components/patient/AppointmentBookingComponent";

import hospitalData from "@/data/patient/hospitalData";

function ReservationPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    const hospitalId = searchParams.get("hospitalId");
    if (hospitalId) {
      const hospital = hospitalData.find((h) => h.id === hospitalId);
      setSelectedHospital(hospital || null);
    }
  }, [searchParams]);

  // 병원 정보가 없으면 로딩 중 표시
  if (!selectedHospital) return <div>병원 정보를 불러오는 중...</div>;

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
          로딩 중...
        </div>
      }
    >
      <ReservationPageContent />
    </Suspense>
  );
}
