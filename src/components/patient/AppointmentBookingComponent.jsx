// 병원 찾기 페이지 안에서 사용하는 예약 컴포넌트

"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
// ✅ 수정 1: 데이터 파일 경로 확인 (mockDoctors가 data 폴더 바로 아래에 있다면)
import mockDoctors from "@/data/patient/mockDoctors";

const AppointmentBookingComponent = ({ selectedHospital, onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    phone: "",
    birthDate: "",
    symptoms: "",
  });

  // 의사 데이터 필터링
  const filteredDoctors = mockDoctors.filter(
    (doc) => doc.hospital === selectedHospital?.name
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 pt-10">
        {/* 단계 표시기 */}
        <div className="flex justify-center items-center mb-8 space-x-4 text-sm">
          <div
            className={`px-3 py-1 rounded-full ${
              step === 1 ? "bg-[#5CA0FF] text-white font-bold" : "text-gray-500"
            }`}
          >
            1. 날짜/시간
          </div>
          <div className="text-gray-300">&gt;</div>
          <div
            className={`px-3 py-1 rounded-full ${
              step === 2 ? "bg-[#5CA0FF] text-white font-bold" : "text-gray-500"
            }`}
          >
            2. 의사 선택
          </div>
          <div className="text-gray-300">&gt;</div>
          <div
            className={`px-3 py-1 rounded-full ${
              step === 3 ? "bg-[#5CA0FF] text-white font-bold" : "text-gray-500"
            }`}
          >
            3. 정보 입력
          </div>
        </div>

        {/* ✅ 수정 2: StepOne에 setSelectedDate, setSelectedTime 전달 (필수!) */}
        {step === 1 && (
          <StepOne
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate} // <--- 이게 없어서 에러가 났던 겁니다
            setSelectedTime={setSelectedTime} // <--- 이것도 필수
            setStep={setStep}
            onBack={onBack}
          />
        )}

        {/* StepTwo */}
        {step === 2 && (
          <StepTwo
            selectedHospital={selectedHospital}
            filteredDoctors={filteredDoctors}
            setSelectedDoctor={setSelectedDoctor}
            setStep={setStep}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}

        {/* StepThree */}
        {step === 3 && (
          <StepThree
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
            selectedHospital={selectedHospital}
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setStep={setStep}
          />
        )}
      </div>
    </section>
  );
};

export default AppointmentBookingComponent;
