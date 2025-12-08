export default function SelectField({ label, value, onChange, children }) {
  return (
    <div>
      <label className="text-gray-600 text-sm mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm"
      >
        {children}
      </select>
    </div>
  );
}
