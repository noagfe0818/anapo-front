"use client";

import { X } from "lucide-react";
import InputField from "@/ui/hospital/InputField";
import SelectField from "@/ui/hospital/SelectField";

export default function NewReservationModal({
  form,
  setForm,
  onClose,
  onSubmit,
}) {
  const update = (key, value) => setForm(key, value);

  const handleSubmit = () => {
    const newData = {
      code: `R${String(Date.now()).slice(-3)}`,
      name: form.name,
      phone: form.phone,
      department: form.department,
      doctor: form.doctor,
      datetime: `${form.date} ${form.time}`,
      memo: form.memo,
      status: form.status,
    };

    onSubmit(newData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold">새 예약 등록</h2>
          <X className="text-gray-600 cursor-pointer" onClick={onClose} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <InputField
            label="환자명 *"
            value={form.name}
            onChange={(v) => update("name", v)}
          />
          <InputField
            label="연락처 *"
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />

          <SelectField
            label="진료과 *"
            value={form.department}
            onChange={(v) => update("department", v)}
          >
            <option value="">진료과 선택</option>
            <option value="내과">내과</option>
            <option value="정형외과">정형외과</option>
            <option value="소아과">소아과</option>
            <option value="피부과">피부과</option>
          </SelectField>

          <InputField
            label="담당의 *"
            value={form.doctor}
            onChange={(v) => update("doctor", v)}
          />

          <InputField
            type="date"
            label="예약일 *"
            value={form.date}
            onChange={(v) => update("date", v)}
          />
          <InputField
            type="time"
            label="예약시간 *"
            value={form.time}
            onChange={(v) => update("time", v)}
          />

          <SelectField
            label="상태"
            value={form.status}
            onChange={(v) => update("status", v)}
          >
            <option value="예약확정">예약확정</option>
            <option value="진료완료">진료완료</option>
            <option value="대기중">대기중</option>
            <option value="취소">취소</option>
          </SelectField>

          <div className="col-span-2">
            <label className="text-gray-600 text-sm mb-1 block">메모</label>
            <textarea
              className="w-full border rounded-lg p-2 h-28 text-sm  focus:outline-indigo-500"
              value={form.memo}
              onChange={(e) => update("memo", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button className="px-5 py-2 border rounded-lg" onClick={onClose}>
            취소
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
