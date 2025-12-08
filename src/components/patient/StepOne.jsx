"use client";
import React from "react";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Label from "@/ui/Label";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card";

// ✅ StepOne: 이제 여기서 '날짜와 시간'을 먼저 고릅니다.
const StepOne = ({
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  setStep,
  onBack, // '취소' 버튼 누르면 병원 목록으로 돌아감
}) => {
  
  // 아직 의사를 안 골랐으니, 병원 전체 공통 시간표를 보여줍니다.
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>날짜 및 시간 선택</CardTitle>
        <p className="text-sm text-gray-500">
          원하시는 진료 시간을 먼저 선택해주세요.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>날짜 선택</Label>
            <Input
              type="date"
              value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
          <div>
            <Label>시간 선택</Label>
            {selectedDate && (
              <div className="grid grid-cols-2 gap-2 mt-2 h-64 overflow-y-auto">
                {timeSlots.map((t) => (
                  <Button
                    key={t}
                    variant={selectedTime === t ? "default" : "outline"}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6 container mx-auto">
          <Button variant="outline" onClick={onBack}>
            취소
          </Button>
          <Button
            onClick={() => setStep(2)} // 다음 단계(의사 선택)인 StepTwo로 이동
            disabled={!selectedDate || !selectedTime}
          >
            다음 (의사 선택)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepOne;