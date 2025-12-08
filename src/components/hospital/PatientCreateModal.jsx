// src/components/hospital/PatientCreateModal.jsx
// 환자 관리 페이지에서 새 환자 등록

"use client";

import { X } from "lucide-react";
import InputField from "@/ui/hospital/InputField";
import SelectField from "@/ui/hospital/SelectField";

export default function PatientCreateModal({
  form,
  setForm,
  onClose,
  onSubmit,
}) {
  const update = (key, value) => setForm(key, value);

  const handleSubmit = () => {
    // ------------------------------
    // ⚠️ 필수 입력값 체크 (프론트 유효성 검사)
    // ------------------------------
    if (!form.name?.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!form.gender) {
      alert("성별을 선택해주세요.");
      return;
    }
    if (!form.birth) {
      alert("생년월일을 선택해주세요.");
      return;
    }
    if (!form.phone?.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!form.subPhone?.trim()) {
      alert("비상 연락처를 입력해주세요.");
      return;
    }
    if (!form.email?.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!form.address?.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }

    // ------------------------------
    // 나이 계산
    // ------------------------------
    let age = "";
    if (form.birth) {
      const birthYear = Number(form.birth.split("-")[0]);
      const nowYear = new Date().getFullYear();
      age = nowYear - birthYear;
    }

    const payload = {
      ...form,
      age,
      regDate: new Date().toISOString().slice(0, 10),
    };

    // ------------------------------
    // ⚠️ 나중에 Spring 백엔드 연동할 때 이곳에서 POST 요청
    // fetch("/api/patient/create", { method: "POST", body: JSON.stringify(payload) })
    // ------------------------------

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {/*  */}
      <div className="bg-white w-[700px] rounded-xl shadow-xl overflow-hidden">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-xl font-semibold">새 환자 등록</h2>
              <X className="text-gray-600 cursor-pointer" onClick={onClose} />
            </div>

            {/* 기본 정보 */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">기본 정보</h3>

              <div className="grid grid-cols-2 gap-4 ">
                <InputField
                  label="이름 *"
                  value={form.name}
                  placeholder="환자 이름"
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

                <InputField
                  label="생년월일 *"
                  type="date"
                  value={form.birth}
                  onChange={(v) => update("birth", v)}
                />

                {/* 오른쪽은 공백 (디자인 유지) */}
                <div />
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">연락처 정보</h3>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="전화번호 *"
                  value={form.phone}
                  placeholder="010-0000-0000"
                  onChange={(v) => update("phone", v)}
                />
                <InputField
                  label="비상연락처 *"
                  value={form.subPhone}
                  placeholder="010-0000-0000"
                  onChange={(v) => update("subPhone", v)}
                />
                <InputField
                  label="이메일 *"
                  value={form.email}
                  placeholder="email@example.com"
                  onChange={(v) => update("email", v)}
                />
                <div />
              </div>

              <div className="mt-4">
                <InputField
                  label="주소"
                  value={form.address}
                  placeholder="서울시 강남구..."
                  onChange={(v) => update("address", v)}
                />
              </div>
            </div>

            {/* 병력 정보 */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">병력 정보</h3>
              <label className="text-gray-600 text-sm mb-1 block">
                기존 병력 및 특이사항
              </label>
              <textarea
                className="w-full border rounded-lg p-2 h-28 text-sm  focus:outline-indigo-500"
                placeholder="알레르기, 기존 질병, 복용 중인 약 등"
                value={form.history}
                onChange={(e) => update("history", e.target.value)}
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-6 py-2 border rounded-lg" onClick={onClose}>
                취소
              </button>
              <button
                className="px-8 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleSubmit}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
