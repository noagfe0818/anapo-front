"use client";
import React from "react";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Label from "@/ui/Label";
import Textarea from "@/ui/Textarea";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card";
import axios from "axios";
import { useRouter } from "next/navigation"; // 1. 라우터 기능 불러오기

const StepThree = ({
  setPatientInfo,
  patientInfo,
  selectedHospital,
  selectedDoctor,
  selectedDate,
  selectedTime,
  setStep,
}) => {
  const router = useRouter(); // 2. 라우터 변수 선언

  const handleSubmit = async () => {
    // 1. 입력값 검증
    if (!patientInfo.name || !patientInfo.phone) {
      alert("이름과 연락처를 입력해주세요.");
      return;
    }

    // 2. 로그인한 유저 ID 가져오기
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    // 3. 데이터 준비
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const formattedDateTime = `${dateStr}T${selectedTime}:00`;

    // 진료과 이름 결정 (의사 전문분야 -> 병원 대표진료과 -> 내과 순)
    let deptName = "내과";

    if (selectedDoctor && selectedDoctor.specialty) {
      deptName = selectedDoctor.specialty;
    } else if (
      selectedHospital &&
      selectedHospital.departments &&
      selectedHospital.departments.length > 0
    ) {
      deptName = selectedHospital.departments[0];
    }

    const requestData = {
      reserDate: formattedDateTime,
      department: deptName,
      hos: selectedHospital.id,
      acc: parseInt(storedUserId),
    };

    try {
      // 포트 8081로 예약 요청
      const response = await axios.post(
        "http://localhost:8081/reservations",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // 성공 시 (Status 200 OK)
      if (response.status === 200) {
        alert("예약이 성공적으로 완료되었습니다!");
        
        // 3. 마이페이지로 이동!
        router.push("/main/my"); 
      }
    } catch (error) {
      console.error("예약 에러:", error);
      if (error.response) {
        // 백엔드에서 거절 사유(예: 해당 병원은 진료과 없음)를 보낸 경우
        alert(`예약 실패: ${error.response.data.error || "알 수 없는 오류"}`);
      } else {
        alert("서버 연결 실패. 백엔드(8081)가 켜져 있는지 확인해주세요.");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>환자 정보 입력</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>이름</Label>
            <Input
              value={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label>연락처</Label>
            <Input
              value={patientInfo.phone}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, phone: e.target.value })
              }
            />
          </div>
          <div>
            <Label>생년월일</Label>
            <Input
              type="date"
              value={patientInfo.birthDate}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, birthDate: e.target.value })
              }
            />
          </div>
          <div>
            <Label>증상</Label>
            <Textarea
              value={patientInfo.symptoms}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, symptoms: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">예약 정보 확인</h4>
          <p className="text-sm">
            🏥 병원: {selectedHospital.name}
            <br />
            👨‍⚕️ 의사: {selectedDoctor?.name} ({selectedDoctor?.specialty})
            <br />
            📅 날짜:{" "}
            {selectedDate &&
              format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
            <br />
            ⏰ 시간: {selectedTime}
          </p>
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(2)}>
            이전
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!patientInfo.name || !patientInfo.phone}
          >
            예약 완료
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default StepThree;