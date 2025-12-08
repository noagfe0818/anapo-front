// 백엔드 연동 전 임시 데이터
// 나중에 Spring Boot API에서 가져올 예정
/*
  useEffect(() => {
    fetch("/api/hospital/stats")
      .then(res => res.json())
      .then(data => setDashboard(data));
  }, []);
*/

export const reportData = {
  summary: {
    totalReservations: 1344,
    completed: 1256,
    cancelRate: 6.5,
    newPatients: 187,
  },

  monthly: [
    { month: "1월", total: 200, complete: 180, cancel: 20 },
    { month: "2월", total: 220, complete: 200, cancel: 20 },
    { month: "3월", total: 240, complete: 220, cancel: 20 },
    { month: "4월", total: 230, complete: 210, cancel: 20 },
    { month: "5월", total: 250, complete: 230, cancel: 20 },
    { month: "6월", total: 260, complete: 240, cancel: 20 },
  ],

  department: [
    { name: "내과", value: 26, color: "#4F46E5" },
    { name: "정형외과", value: 20, color: "#16A34A" },
    { name: "소아과", value: 17, color: "#F59E0B" },
    { name: "피부과", value: 14, color: "#FB923C" },
    { name: "안과", value: 12, color: "#3B82F6" },
    { name: "이비인후과", value: 10, color: "#EC4899" },
  ],

  time: [
    { time: "09:00", value: 15 },
    { time: "10:00", value: 22 },
    { time: "11:00", value: 30 },
    { time: "12:00", value: 12 },
    { time: "14:00", value: 25 },
    { time: "15:00", value: 28 },
    { time: "16:00", value: 24 },
    { time: "17:00", value: 18 },
  ],
};
