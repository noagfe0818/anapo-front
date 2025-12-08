const StatusBadge = ({ status }) => {
  const colors = {
    예약확정: "bg-blue-100 text-blue-600",
    진료완료: "bg-green-100 text-green-600",
    대기중: "bg-yellow-100 text-yellow-600",
    취소: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`px-4 py-1 text-xs rounded-full font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
