"use client";

import { X } from "lucide-react";
import InputField from "@/ui/hospital/InputField";
import SelectField from "@/ui/hospital/SelectField";

export default function PatientEditModal({ form, setForm, onClose, onSubmit }) {
  const update = (key, value) => setForm(key, value);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {/* 바깥 블록 — 둥근 모서리 + 그림자 + 스크롤 X */}
      <div className="bg-white w-[700px] rounded-xl shadow-xl overflow-hidden">
        {/* 스크롤 블록 — 패딩 X */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* 내용 블록 — 패딩 O */}
          <div className="p-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-xl font-semibold">환자 정보 수정</h2>
              <X className="text-gray-600 cursor-pointer" onClick={onClose} />
            </div>

            {/* 기본 정보 */}
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg mb-1">기본 정보</h3>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="이름 *"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                />
                <SelectField
                  label="성별 *"
                  value={form.gender}
                  onChange={(v) => update("gender", v)}
                >
                  <option value="남">남</option>
                  <option value="여">여</option>
                </SelectField>
              </div>

              <InputField
                type="date"
                label="생년월일 *"
                value={form.birthDate}
                onChange={(v) => update("birthDate", v)}
              />
            </div>

            {/* 연락처 정보 */}
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg mb-1">연락처 정보</h3>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="전화번호 *"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                />
                <InputField
                  label="비상연락처"
                  value={form.emergencyContact}
                  onChange={(v) => update("emergencyContact", v)}
                />
              </div>

              <InputField
                label="이메일"
                value={form.email}
                onChange={(v) => update("email", v)}
              />

              <InputField
                label="주소"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
            </div>

            {/* 병력 정보 */}
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-lg mb-1">병력 정보</h3>
              <label className="text-gray-600 text-sm mb-1 block">
                기존 병력 및 특이사항
              </label>
              <textarea
                className="w-full border rounded-lg p-2 h-28 text-sm"
                value={form.medicalNotes}
                onChange={(e) => update("medicalNotes", e.target.value)}
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end mt-6 gap-3">
              <button className="px-5 py-2 border rounded-lg" onClick={onClose}>
                취소
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                onClick={onSubmit}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
