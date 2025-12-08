export default function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <div className="mt-1">{value}</div>
    </div>
  );
}
