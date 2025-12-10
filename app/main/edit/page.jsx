"use client";

import { useState, useEffect } from "react";
import { User, Lock, Bell, Settings } from "lucide-react";
import axios from "axios"; 

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState("profile");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    department: "시스템관리팀",
    position: "시스템 관리자",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // 1. 내 정보 불러오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      const myId = localStorage.getItem("userId");
      if (!myId) return;

      try {
        const res = await axios.get(`http://localhost:8081/user/${myId}`);
        const data = res.data;
        setAdminInfo((prev) => ({
          ...prev,
          name: data.userName,
          email: data.userId,
          phone: data.userNumber || "",
        }));
      } catch (err) {
        console.error("정보 로드 실패:", err);
      }
    };
    fetchMyInfo();
  }, []);

  // ✅ 2. 프로필 저장 (즉시 반영 로직 추가됨)
  const handleSaveProfile = async () => {
    const myId = localStorage.getItem("userId");
    try {
      const payload = {
        userName: adminInfo.name,
        userNumber: adminInfo.phone,
      };

      // DB 업데이트
      await axios.patch(`http://localhost:8081/user/accUpdate/${myId}`, payload);
      
      alert("프로필 정보가 수정되었습니다.");

      // 🔥 [중요] 브라우저에 저장된 이름도 바로 바꿔치기!
      if (adminInfo.name) {
        localStorage.setItem("userName", adminInfo.name);
      }

      // 화면 새로고침하며 마이페이지로 이동
      window.location.href = "/main/my"; 

    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    }
  };

  // 3. 비밀번호 변경
  const handleSavePassword = async () => {
    const myId = localStorage.getItem("userId");

    if (!passwordData.new) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (passwordData.new.length < 4) { 
        alert("비밀번호는 최소 4자 이상이어야 합니다.");
        return;
    }

    try {
      const payload = { userPassword: passwordData.new };
      await axios.patch(`http://localhost:8081/user/accUpdate/${myId}`, payload);
      
      alert("비밀번호가 변경되었습니다. 보안을 위해 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/main/login";
      
    } catch (err) {
      console.error(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-2xl font-semibold mb-2">설정</h1>
        <p className="text-gray-600 mb-8">사용자 계정 설정을 관리합니다</p>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3 bg-white shadow rounded-xl p-4 h-fit">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                activeMenu === "profile" ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setActiveMenu("profile")}
            >
              <User size={18} /> 프로필
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                activeMenu === "security" ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setActiveMenu("security")}
            >
              <Lock size={18} /> 보안
            </button>
          </aside>

          <div className="col-span-9 bg-white shadow rounded-xl p-8">
            {activeMenu === "profile" && (
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
                  <User size={20} /> 프로필 정보
                </h2>
                <div className="flex items-center gap-6 mb-8 mt-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-4xl">
                    <User size={44} />
                  </div>
                  <span className="text-gray-400 text-sm">기본 프로필 이미지</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-700">이름</label>
                    <input
                      type="text"
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                      value={adminInfo.name}
                      onChange={(e) => setAdminInfo({ ...adminInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">이메일 (아이디)</label>
                    <input
                      type="email"
                      disabled
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-500"
                      value={adminInfo.email}
                      onChange={(e) => setAdminInfo({ ...adminInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">전화번호</label>
                    <input
                      type="text"
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                      value={adminInfo.phone}
                      onChange={(e) => setAdminInfo({ ...adminInfo, phone: e.target.value })}
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSaveProfile}
                  className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  저장
                </button>
              </div>
            )}

            {activeMenu === "security" && (
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
                  <Lock size={20} /> 보안 설정
                </h2>
                <div className="space-y-5 mt-4">
                  <input
                    type="password"
                    placeholder="새 비밀번호"
                    className="w-full border rounded-lg p-3"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                  />
                  <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    className="w-full border rounded-lg p-3"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                  />
                </div>
                <button 
                  onClick={handleSavePassword}
                  className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  비밀번호 변경
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}