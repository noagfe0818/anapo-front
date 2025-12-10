"use client";
import React, { useEffect } from "react"; // ✅ useEffect 추가
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Label from "@/ui/Label";
import Textarea from "@/ui/Textarea";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card";
import axios from "axios";
import { useRouter } from "next/navigation";

const StepThree = ({
  setPatientInfo,
  patientInfo,
  selectedHospital,
  selectedDoctor,
  selectedDate,
  selectedTime,
  setStep,
}) => {
  const router = useRouter();

  // ✅ [기능 추가] 화면 켜지자마자 내 정보 불러와서 칸 채우기
  useEffect(() => {
    const fetchMyInfo = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) return; 

      try {
        // 백엔드에서 내 정보 가져오기
        const response = await axios.get(`http://localhost:8081/user/${storedUserId}`);
        const data = response.data;

        // 가져온 정보로 patientInfo 업데이트 (자동 채우기)
        setPatientInfo((prev) => ({
          ...prev,
          name: data.userName,       // 이름
          phone: data.userNumber,    // 전화번호
          birthDate: data.birth || data.userBirth || "", // 생년월일 (필드명 확인 필요)
        }));
      } catch (error) {
        console.error("회원 정보 불러오기 실패:", error);
      }
    };

    fetchMyInfo();
  }, [setPatientInfo]);

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

    // 진료과 이름 결정
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
      symptoms: patientInfo.symptoms, // 증상 (백엔드가 받을 수 있다면)
    };

    try {
      // 예약 요청
      const response = await axios.post(
        "http://localhost:8081/reservations",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        alert("예약이 성공적으로 완료되었습니다!");
        router.push("/main/my"); 
      }
    } catch (error) {
      console.error("예약 에러:", error);
      if (error.response) {
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
              readOnly // ✅ 수정 방지
              className="bg-gray-100 text-gray-500 cursor-not-allowed" // 디자인 유지하며 '읽기 전용' 느낌 주기
            />
          </div>
          <div>
            <Label>연락처</Label>
            <Input
              value={patientInfo.phone}
              readOnly // ✅ 수정 방지
              className="bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <Label>생년월일</Label>
            <Input
              type="date"
              value={patientInfo.birthDate}
              readOnly // ✅ 수정 방지
              className="bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <Label>증상</Label>
            <Textarea
              value={patientInfo.symptoms}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, symptoms: e.target.value })
              }
              placeholder="증상을 입력해주세요"
            />
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">예약 정보 확인</h4>
          <p className="text-sm leading-relaxed">
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