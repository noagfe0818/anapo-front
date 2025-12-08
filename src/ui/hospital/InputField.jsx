export default function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-gray-600 text-sm mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm"
      />
    </div>
  );
}
