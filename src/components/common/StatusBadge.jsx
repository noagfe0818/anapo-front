const STATUS_LABEL = {
  ACTIVE: "정상",
  INACTIVE: "경고",
  SUSPENDED: "정지",
  DELETED: "탈퇴",
};

const STATUS_STYLE = {
  ACTIVE: "bg-green-100 text-green-600",
  INACTIVE: "bg-yellow-100 text-yellow-600",
  SUSPENDED: "bg-red-100 text-red-600",
  DELETED: "bg-gray-200 text-gray-500",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        STATUS_STYLE[status] ?? ""
      }`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
