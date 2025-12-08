"use client";

import { User, Lock, Bell, Database } from "lucide-react";

export default function SettingSidebar({ tab, setTab }) {
  const menus = [
    // { key: "profile", name: "프로필", icon: <User size={20} /> },
    { key: "security", name: "보안", icon: <Lock size={20} /> },
    { key: "notification", name: "알림", icon: <Bell size={20} /> },
    // { key: "system", name: "시스템", icon: <Database size={20} /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-1">
      {menus.map((m) => (
        <button
          key={m.key}
          onClick={() => setTab(m.key)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
            ${
              tab === m.key
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {m.icon}
          {m.name}
        </button>
      ))}
    </div>
  );
}
