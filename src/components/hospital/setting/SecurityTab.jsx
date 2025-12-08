"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function SecurityTab() {
  const [form, setForm] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleChangePassword = () => {
    if (form.newPass !== form.confirmPass) {
      alert("새 비밀번호가 일치하지 않습니다!");
      return;
    }

    // 📌 백엔드 비밀번호 변경 API
    // fetch("/api/admin/password", {...})

    alert("비밀번호가 변경되었습니다!");
  };

  return (
    <div className="bg-white p-8 shadow rounded-xl">
      <h2 className="text-xl font-semibold">보안 설정</h2>
      <p className="text-gray-500 mt-1 mb-6">
        비밀번호 및 보안 설정을 관리합니다
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">현재 비밀번호</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2 mt-1  focus:outline-indigo-500"
            onChange={(e) => update("currentPass", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-500 ">새 비밀번호</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2 mt-1  focus:outline-indigo-500"
            onChange={(e) => update("newPass", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">새 비밀번호 확인</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2 mt-1  focus:outline-indigo-500"
            onChange={(e) => update("confirmPass", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border text-sm text-gray-700">
        <ShieldCheck className="inline mr-2 text-blue-600" />
        <p className="font-semibold mb-1">비밀번호 요구사항</p>
        <ul className="list-disc ml-4 text-gray-600">
          <li>최소 8자 이상</li>
          <li>영문 대소문자, 숫자, 특수문자 포함</li>
          <li>연속된 문자 또는 숫자 사용 금지</li>
        </ul>
      </div>

      <button
        onClick={handleChangePassword}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        비밀번호 변경
      </button>
    </div>
  );
}
