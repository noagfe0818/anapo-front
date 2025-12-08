"use client";

import { useState } from "react";
import { Mail, Bell, MessageSquare } from "lucide-react";

export default function NotificationTab() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [types, setTypes] = useState({
    new: true,
    cancel: true,
    inquiry: true,
    system: true,
  });

  const saveNotification = () => {
    // 📌 백엔드 저장 API
    // fetch("/api/admin/notification", {...})
    alert("알림 설정이 저장되었습니다!");
  };

  const toggleType = (key) =>
    setTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-white p-8 shadow rounded-xl">
      <h2 className="text-xl font-semibold">알림 설정</h2>
      <p className="text-gray-500 mt-1 mb-6">알림 수신 방식을 설정합니다</p>

      <h3 className="font-semibold mb-2">알림 채널</h3>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <Mail size={20} />
          이메일 알림
          <input
            type="checkbox"
            className="ml-auto"
            checked={emailEnabled}
            onChange={() => setEmailEnabled(!emailEnabled)}
          />
        </label>

        <label className="flex items-center gap-3">
          <MessageSquare size={20} />
          SMS 알림
          <input
            type="checkbox"
            className="ml-auto"
            checked={smsEnabled}
            onChange={() => setSmsEnabled(!smsEnabled)}
          />
        </label>
      </div>

      <h3 className="font-semibold mt-6 mb-2">알림 유형</h3>

      <div className="space-y-3">
        {[
          ["new", "신규 예약"],
          ["cancel", "예약 취소"],
          ["inquiry", "환자 문의"],
          ["system", "시스템 알림"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center">
            {label}
            <input
              type="checkbox"
              className="ml-auto"
              checked={types[key]}
              onChange={() => toggleType(key)}
            />
          </label>
        ))}
      </div>

      <button
        onClick={saveNotification}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        저장
      </button>
    </div>
  );
}
