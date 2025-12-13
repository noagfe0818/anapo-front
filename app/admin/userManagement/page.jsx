"use client";

import { useState, useEffect } from "react";
import UserTable from "@/components/admin/UserTable";
import UserDetailModal from "@/components/common/DetailModal";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | ACTIVE | WARNING | SUSPENDED

  // ---------------------------
  // 📌 사용자 목록 불러오기
  // ---------------------------
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error("유저 목록 조회 실패");

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("사용자 목록 로드 실패", error);
        setUsers([]);
      }
    }

    fetchUsers();
  }, []);

  // ---------------------------
  // 📌 검색 + 상태 필터링
  // ---------------------------
  useEffect(() => {
    let result = [...users];

    // 상태 필터
    if (statusFilter !== "ALL") {
      result = result.filter((u) => u.status === statusFilter);
    }

    // 검색 필터
    if (search.trim() !== "") {
      const keyword = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.userName?.toLowerCase().includes(keyword) ||
          u.userId?.toLowerCase().includes(keyword)
      );
    }

    setFilteredUsers(result);
  }, [users, search, statusFilter]);

  // ---------------------------
  // 모달 제어
  // ---------------------------
  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  // ---------------------------
  // 상태 변경
  // ---------------------------
  const handleAction = async (type, user) => {
    try {
      let status;
      if (type === "warn") status = "WARNING";
      if (type === "suspend") status = "SUSPENDED";
      if (type === "delete") status = "DELETED";

      const res = await fetch(`/api/admin/users/${user.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("상태 변경 실패");

      // 상태 변경 반영
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status } : u))
      );
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

      {/* 검색 + 상태 필터 */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="이름 또는 아이디로 검색"
          className="flex-1 inset-shadow-sm px-4 py-2 rounded-xl bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterButton
          label="전체"
          active={statusFilter === "ALL"}
          onClick={() => setStatusFilter("ALL")}
        />
        <FilterButton
          label="정상"
          active={statusFilter === "ACTIVE"}
          onClick={() => setStatusFilter("ACTIVE")}
        />
        <FilterButton
          label="경고"
          active={statusFilter === "WARNING"}
          onClick={() => setStatusFilter("WARNING")}
        />
        <FilterButton
          label="정지"
          active={statusFilter === "SUSPENDED"}
          onClick={() => setStatusFilter("SUSPENDED")}
        />
      </div>

      <UserTable users={filteredUsers} onAction={openModal} />

      {modalType === "detail" && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}

      {["warn", "suspend", "delete"].includes(modalType) && selectedUser && (
        <ConfirmModal
          type={modalType}
          target={selectedUser}
          onClose={closeModal}
          onConfirm={() => handleAction(modalType, selectedUser)}
        />
      )}
    </div>
  );
}

// ---------------------------
// 상태 필터 버튼 컴포넌트
// ---------------------------
function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${
        active ? "bg-black text-white" : "bg-white shadow-sm"
      }`}
    >
      {label}
    </button>
  );
}
