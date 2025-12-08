//  이후 백엔드 연동 시 fetch('/api/inquiry')로 교체될 예정
//  병원 사용자 - 환자 문의 데이터
export const inquiriesData = [
  {
    id: 1,
    type: "진료 예약 변경 문의",
    status: "대기중",
    patientName: "김민수",
    patientId: "P001",
    date: "2024-01-20 14:30",
    content: "다음주 화요일로 예정된 예약을 수요일로 변경할 수 있을까요?",
    reply: null,
  },
  {
    id: 2,
    type: "검사 결과 문의",
    status: "답변완료",
    patientName: "이형진",
    patientId: "P002",
    date: "2024-01-19 10:15",
    content: "지난주에 받은 혈액 검사 결과를 확인하고 싶습니다.",
    reply: {
      date: "2024-01-19 15:20",
      content:
        "검사 결과는 정상 범위입니다. 자세한 내용은 다음 진료 시 설명드리겠습니다.",
    },
  },
  {
    id: 3,
    type: "약 처방 재발급",
    status: "답변완료",
    patientName: "박재수",
    patientId: "P003",
    date: "2024-01-18 16:45",
    content: "고혈압 약이 떨어졌는데 재진 없이 처방전만 받을 수 있나요?",
    reply: {
      date: "2024-01-19 11:10",
      content: "약 처방 재발급은 담당 의사와 상담이 필요합니다.",
    },
  },
];
