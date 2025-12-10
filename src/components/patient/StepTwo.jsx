"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card"; 
import Button from "@/ui/Button"; 
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import axios from "axios";

// ✅ 1. 만들어둔 mockDoctors 데이터 가져오기
// (파일 경로가 다르면 여기를 수정해주세요!)
import mockDoctors from "@/data/patient/mockDoctors"; 

const StepTwo = ({
  selectedHospital, 
  setStep,
  setSelectedDoctor,
  selectedDate,
  selectedTime,
}) => {
  const searchParams = useSearchParams();
  const hospitalId = searchParams.get("hospitalId");

  const [hospitalName, setHospitalName] = useState(selectedHospital?.name || "");

  // 병원 이름 가져오기 (백엔드 연동 유지)
  useEffect(() => {
    const fetchHospitalName = async () => {
      if (!hospitalId) return;
      try {
        const response = await axios.get(`http://localhost:8081/hospitals/${hospitalId}`);
        if (response.data && response.data.hosName) {
          setHospitalName(response.data.hosName);
        }
      } catch (error) {
        console.error("병원 정보 불러오기 실패:", error);
        setHospitalName("병원 정보를 불러올 수 없음");
      }
    };
    fetchHospitalName();
  }, [hospitalId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>의사 선택</CardTitle>
        <div className="text-sm text-gray-600 mt-1">
           선택된 일시: {selectedDate && format(selectedDate, "MM월 dd일", { locale: ko })} {selectedTime}
        </div>
        
        <div className="text-sm text-[#5CA0FF] bg-blue-50 p-3 rounded-lg mt-2 flex items-center gap-2">
          <span>📍</span>
          <strong>{hospitalName || "병원 정보를 불러오는 중..."}</strong>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* ✅ 가져온 mockDoctors 데이터를 화면에 뿌려줍니다 */}
          {mockDoctors && mockDoctors.length > 0 ? (
            mockDoctors.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center p-4 shadow-sm rounded-lg hover:bg-blue-50 cursor-pointer border border-gray-100"
                onClick={() => {
                  setSelectedDoctor(doc); // 선택한 의사 정보 저장
                  setStep(3); // 다음 단계로 이동
                }}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border bg-gray-100">
                  {/* 이미지 주소가 있으면 보여주고, 없으면 회색 박스 */}
                  {doc.image ? (
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      No Img
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{doc.name} 선생님</h3>
                  <p className="text-sm text-gray-600">{doc.specialty}</p>
                </div>
                <div className="text-[#5CA0FF] text-sm font-medium">선택 &rarr;</div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              예약 가능한 의사가 없습니다.
            </div>
          )}
        </div>
        
        <div className="mt-6">
            <Button variant="outline" onClick={() => setStep(1)}>
                이전 (시간 다시 선택)
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepTwo;