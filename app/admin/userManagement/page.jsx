"use client";

import { useState, useEffect } from "react";
import UserTable from "@/components/admin/UserTable";
import UserDetailModal from "@/components/common/DetailModal";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // "detail" | "warn" | "suspend" | "delete"
  const [users, setUsers] = useState([]);

  // ---------------------------
  // 📌 1. 사용자 목록 불러오기 (백엔드 GET 요청)
  // ---------------------------
  useEffect(() => {
    async function fetchUsers() {
      try {
        /*
        🔗 예시: Spring API
        GET /api/admin/users
        
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
        */

        // 👉 현재는 하드코딩
        setUsers([
          {
            id: 1,
            name: "김민수",
            email: "minsu@example.com",
            date: "2024-01-15",
            status: "정상",
            reports: 0,
            bookings: 12,
          },
          {
            id: 2,
            name: "이영희",
            email: "younghee@example.com",
            date: "2024-02-20",
            status: "경고",
            reports: 1,
            bookings: 8,
          },
          {
            id: 3,
            name: "박철수",
            email: "chulsoo@example.com",
            date: "2024-03-10",
            status: "정상",
            reports: 0,
            bookings: 15,
          },
          {
            id: 4,
            name: "정수진",
            email: "sujin@example.com",
            date: "2024-04-05",
            status: "정지",
            reports: 3,
            bookings: 5,
          },
        ]);
      } catch (error) {
        console.error("사용자 목록 로드 실패", error);
      }
    }

    fetchUsers();
  }, []);

  // 모달 열기
  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type); // "detail" | "warn" | "suspend" | "delete"
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };

  // ---------------------------
  // 📌 2. 경고/정지/탈퇴 처리 (백엔드 POST 요청)
  // ---------------------------
  const handleAction = async (type, user) => {
    try {
      /*
      🔗 Spring Controller 예시
      
      POST   /api/admin/users/{id}/warn     → 경고
      POST   /api/admin/users/{id}/suspend  → 정지
      DELETE /api/admin/users/{id}          → 탈퇴
      
      await fetch(`/api/admin/users/${user.id}/${type}`, {
        method: type === "delete" ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" }
      });
      */

      console.log(`${type} 처리됨:`, user);

      // 프론트에서 상태만 미리 반영하고 싶다면 여기서 setUsers로 업데이트
    } catch (err) {
      console.error("작업 실패", err);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">사용자 관리</h1>
      <p className="text-gray-500 mb-6">회원 정보 및 신고 내역을 관리하세요</p>

      {/* 검색창 (백엔드 검색 API 연결 가능) */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="이름 또는 이메일로 검색"
          className="flex-1 inset-shadow-sm px-4 py-2 rounded-xl bg-white"
          /* 
          📌 검색 기능 추가할 때 사용:
          onChange={(e) => searchUsers(e.target.value)}
          */
        />

        <button className="px-4 py-2 bg-black text-white rounded-lg">
          전체
        </button>
        <button className="px-4 py-2 bg-white shadow-sm rounded-lg">
          정상
        </button>
        <button className="px-4 py-2 bg-white shadow-sm rounded-lg">
          경고
        </button>
        <button className="px-4 py-2 bg-white shadow-sm rounded-lg">
          정지
        </button>
      </div>

      <UserTable users={users} onAction={openModal} />

      {/* 상세 정보 모달 */}
      {modalType === "detail" && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}

      {/* 경고/정지/탈퇴 모달 (통합 ConfirmModal 사용) */}
      {["warn", "suspend", "delete"].includes(modalType) && selectedUser && (
        <ConfirmModal
          type={modalType} // warn | suspend | delete
          target={selectedUser} // 통합 모달에서는 user가 아니라 target으로 받음
          onClose={closeModal}
          onConfirm={() => handleAction(modalType, selectedUser)}
        />
      )}
    </div>
  );
}
