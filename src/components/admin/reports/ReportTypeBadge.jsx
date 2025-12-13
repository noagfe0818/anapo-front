export default function ReportTypeBadge({ type }) {
  const colors = {
    욕설비방: "bg-red-100 text-red-600",
    허위정보: "bg-orange-100 text-orange-600",
    스팸: "bg-yellow-100 text-yellow-600",
    부적절한내용: "bg-purple-100 text-purple-600",
    기타: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${colors[type]}`}>
      {type}
    </span>
  );
}
