// AppointBookingComponent.jsx에서 의사 선택 필터링에서 사용되는 임시 데이터

const mockDoctors = [
  {
    id: "1",
    name: "김철수",
    specialty: "내과",
    hospital: "부천대병원",
    image: "https://images.unsplash.com/photo-1631217872822-1c2546d6b864?w=300",
    availableSlots: ["09:00", "10:30", "14:00", "15:30", "16:30"],
  },
  {
    id: "2",
    name: "이영희",
    specialty: "일반의",
    hospital: "부천대병원",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300",
    availableSlots: ["09:30", "11:00", "13:30", "15:00"],
  },
  {
    id: "3",
    name: "박민수",
    specialty: "정형외과",
    hospital: "부천대병원",
    image: "https://images.unsplash.com/photo-1594824848637-114aa4dee015?w=300",
    availableSlots: ["10:00", "11:30", "14:30", "16:00"],
  },
];

export default mockDoctors;
