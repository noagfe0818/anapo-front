"use client";

export default function RecentActivity() {
  const activity = [
    {
      text: '사용자 "김**" 계정 정지 처리',
      tag: "신고 처리",
      time: "5분 전",
      color: "bg-green-500",
    },
    {
      text: "서울대학교병원 공지사항 승인",
      tag: "병원 승인",
      time: "12분 전",
      color: "bg-green-500",
    },
    {
      text: "부적절한 리뷰 신고 접수",
      tag: "신고 접수",
      time: "25분 전",
      color: "bg-blue-500",
    },
    {
      text: '사용자 "이**" 경고 처리',
      tag: "사용자 관리",
      time: "1시간 전",
      color: "bg-orange-500",
    },
    {
      text: "강남세브란스병원 허위 공지 삭제",
      tag: "병원 검수",
      time: "2시간 전",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="bg-white p-6 shadow-sm  rounded-xl">
      <h2 className="text-lg font-semibold mb-4">최근 활동</h2>

      <div className="flex flex-col gap-4">
        {activity.map((row, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${row.color}`}></span>
              <div>
                <p className="font-medium">{row.text}</p>
                <p className="text-gray-500 text-sm">{row.tag}</p>
              </div>
            </div>

            <span className="text-gray-400 text-sm">{row.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
