"use client";

import { useState } from "react";
import { User, Lock, Bell, Settings } from "lucide-react";

export default function SettingsPage() {
  // 현재 선택된 메뉴
  const [activeMenu, setActiveMenu] = useState("profile");

  // -------------------------------
  // ⭐ 하드코딩된 관리자 정보 (나중에 백엔드 연결 예정)
  // -------------------------------
  const [adminInfo, setAdminInfo] = useState({
    name: "사용자",
    email: "admin@medicare.com",
    department: "시스템관리팀",
    phone: "010-1234-5678",
    position: "시스템 관리자",
  });

  /*
  🔌 [백엔드 연동 예정 코드]

  useEffect(() => {
    async function fetchAdminInfo() {
      const res = await fetch("http://localhost:8080/api/admin/info", {
        credentials: "include",
      });
      const data = await res.json();
      setAdminInfo(data);
    }
    fetchAdminInfo();
  }, []);

  async function saveProfile() {
    await fetch("http://localhost:8080/api/admin/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(adminInfo),
    });
  }

  async function changePassword() {
    await fetch("http://localhost:8080/api/admin/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });
  }
  */

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-2xl font-semibold mb-2">설정</h1>
        <p className="text-gray-600 mb-8">사용자 계정 설정을 관리합니다</p>

        <div className="grid grid-cols-12 gap-6">
          {/* ---------------------------------------------------------------- */}
          {/* ⭐ 왼쪽 사이드 메뉴 */}
          {/* ---------------------------------------------------------------- */}
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

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                activeMenu === "alert" ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setActiveMenu("alert")}
            >
              <Bell size={18} /> 알림
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeMenu === "system" ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setActiveMenu("system")}
            >
              <Settings size={18} /> 시스템
            </button>
          </aside>

          {/* ---------------------------------------------------------------- */}
          {/* ⭐ 오른쪽 메인 콘텐츠 */}
          {/* ---------------------------------------------------------------- */}
          <div className="col-span-9 bg-white shadow rounded-xl p-8">
            {/* ---------------------------------------------------------------- */}
            {/* 📌 1) 프로필 화면 */}
            {/* ---------------------------------------------------------------- */}
            {activeMenu === "profile" && (
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
                  <User size={20} /> 프로필 정보
                </h2>
                <p className="text-gray-500 mb-6">
                  사용자 계정 정보를 관리합니다
                </p>

                {/* 프로필 사진 영역 */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-4xl">
                    <User size={44} />
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
                    사진 변경
                  </button>
                  <span className="text-gray-400 text-sm">
                    JPG, PNG 파일 (최대 2MB)
                  </span>
                </div>

                {/* 입력 폼 */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-700">이름</label>
                    <input
                      type="text"
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                      value={adminInfo.name}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, name: e.target.value })
                      }
                    />
                  </div>

                  {/* <div>
                    <label className="text-sm text-gray-700">부서</label>
                    <input
                      type="text"
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                      value={adminInfo.department}
                      onChange={(e) =>
                        setAdminInfo({
                          ...adminInfo,
                          department: e.target.value,
                        })
                      }
                    />
                  </div> */}

                  <div>
                    <label className="text-sm text-gray-700">이메일</label>
                    <input
                      type="email"
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                      value={adminInfo.email}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">전화번호</label>
                    <input
                      type="text"
                      className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                      value={adminInfo.phone}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, phone: e.target.value })
                      }
                    />
                  </div>

                  {/* <div className="col-span-2">
                    <label className="text-sm text-gray-700">직책</label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-lg p-2"
                      value={adminInfo.position}
                      onChange={(e) =>
                        setAdminInfo({
                          ...adminInfo,
                          position: e.target.value,
                        })
                      }
                    />
                  </div> */}
                </div>

                {/* 저장 버튼 */}
                <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  저장
                </button>

                {/* 
                🔌 나중에 백엔드 저장 버튼 연결  
                onClick={saveProfile} 
                */}
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* 📌 2) 보안 설정 화면 */}
            {/* ---------------------------------------------------------------- */}
            {activeMenu === "security" && (
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
                  <Lock size={20} /> 보안 설정
                </h2>
                <p className="text-gray-500 mb-6">
                  비밀번호 및 보안 설정을 관리합니다
                </p>

                <div className="space-y-5">
                  <div>
                    <input
                      type="password"
                      placeholder="현재 비밀번호를 입력하세요"
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="새 비밀번호를 입력하세요"
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="새 비밀번호를 다시 입력하세요"
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                </div>

                {/* 요구사항 박스 */}
                <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-2">
                    🔐 비밀번호 요구사항
                  </p>
                  <ul className="text-sm text-blue-700 leading-6">
                    <li>• 최소 8자 이상</li>
                    <li>• 영문 대소문자, 숫자, 특수문자 포함</li>
                    <li>• 연속된 문자 또는 숫자 사용 금지</li>
                  </ul>
                </div>

                <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  비밀번호 변경
                </button>

                {/*  
                🔌 나중에 비밀번호 변경 버튼 클릭 → changePassword() 실행
                */}
              </div>
            )}

            {/* (알림 / 시스템 화면은 필요 시 만들어줄게!) */}
          </div>
        </div>
      </div>
    </section>
  );
}
