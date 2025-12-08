"use client";

import { useState } from "react";
import SettingSidebar from "@/components/hospital/setting/SettingSidebar";
import ProfileTab from "@/components/hospital/setting/ProfileTab";
import SecurityTab from "@/components/hospital/setting/SecurityTab";
import NotificationTab from "@/components/hospital/setting/NotificationTab";
// import SystemTab from "@/components/hospital/setting/SystemTab";

export default function SettingPage() {
  const [tab, setTab] = useState("security");

  return (
    <div className="flex gap-8 p-10 bg-gray-100 min-h-screen">
      {/* 왼쪽 메뉴 */}
      <div className="w-64">
        <SettingSidebar tab={tab} setTab={setTab} />
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="flex-1">
        {/* {tab === "profile" && <ProfileTab />} */}
        {tab === "security" && <SecurityTab />}
        {tab === "notification" && <NotificationTab />}
        {/* {tab === "system" && <SystemTab />} */}
      </div>
    </div>
  );
}
