"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card";
import Button from "@/ui/Button"; 
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// ✅ StepTwo: 1단계에서 고른 시간에 진료 가능한 '의사'를 여기서 고릅니다.
const StepTwo = ({
  selectedHospital,
  setStep,
  setSelectedDoctor,
  filteredDoctors,
  selectedDate,
  selectedTime,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>의사 선택</CardTitle>
        {/* 1단계(StepOne)에서 고른 시간을 여기서 보여줍니다. */}
        <div className="text-sm text-gray-600 mt-1">
           선택된 일시: {selectedDate && format(selectedDate, "MM월 dd일", { locale: ko })} {selectedTime}
        </div>
        <div className="text-sm text-[#5CA0FF] bg-blue-50 p-3 rounded-lg mt-2">
          📍 <strong>{selectedHospital.name}</strong>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center p-4 shadow-sm rounded-lg hover:bg-blue-50 cursor-pointer border border-gray-100"
                onClick={() => {
                  setSelectedDoctor(doc);
                  setStep(3); // 의사를 고르면 바로 3단계(StepThree)로 이동
                }}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
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