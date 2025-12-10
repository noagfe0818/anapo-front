export default function ReportStatusBadge({ status }) {
  const styles = {
    대기중: "bg-gray-200 text-gray-600",
    처리완료: "bg-black text-white",
    기각: "bg-red-600 text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}
