export default function StatusBadge({ status }) {
  const styles = {
    정상: "bg-black text-white",
    경고: "bg-gray-300 text-gray-700",
    정지: "bg-red-600 text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}
