"use client";
import { useState, useEffect } from "react";
import { Search, Pin, Edit, Trash2, Plus } from "lucide-react";
import NewNotice from "@/components/hospital/NewNotice";
import EditNotice from "@/components/hospital/EditNotice";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const hospitalId = 1; // 🔥 로그인 병원 ID (나중에 auth에서 가져오기)

  // ✅ 공지 목록 조회
  useEffect(() => {
    fetch("/api/notice")
      .then((res) => res.json())
      .then((data) =>
        setNotices(
          data.map((n) => ({
            ...n,
            status: "게시중",
            pinned: false,
            date: n.createdAt?.slice(0, 10),
          }))
        )
      );
  }, []);

  const filteredNotices = notices.filter((n) =>
    `${n.title} ${n.content}`.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status) =>
    status === "게시중"
      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
      : "bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm";

  // ⭐ 핀 토글 (프론트 전용)
  const togglePin = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  // ⭐ 삭제
  const deleteNotice = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    await fetch(`/api/notice/${id}`, { method: "DELETE" });
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const openEdit = (notice) => {
    setSelectedNotice(notice);
    setOpenEditModal(true);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">공지사항 관리</h1>
          <p className="text-gray-500 mt-1">
            병원 공지사항을 작성하고 관리합니다
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setOpenCreateModal(true)}
        >
          <Plus size={18} /> 새 공지사항
        </button>
      </div>

      {/* 검색 */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="제목 또는 내용으로 검색"
            className="w-full border rounded-lg pl-10 p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 리스트 */}
      <div className="space-y-4">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className="bg-white p-5 rounded-xl shadow flex justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                {n.pinned && (
                  <Pin size={20} className="text-blue-500" fill="#3b82f6" />
                )}
                <h2 className="text-lg font-semibold">{n.title}</h2>
              </div>

              <p className="text-gray-700 mb-2">{n.content}</p>

              <div className="flex gap-3 text-gray-500 text-sm">
                <span>{n.writer}</span>
                <span>·</span>
                <span>{n.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={statusBadge(n.status)}>{n.status}</span>

              <Pin
                size={18}
                className="cursor-pointer"
                onClick={() => togglePin(n.id)}
              />

              <Edit
                size={18}
                className="cursor-pointer"
                onClick={() => openEdit(n)}
              />

              <Trash2
                size={18}
                className="text-red-500 cursor-pointer"
                onClick={() => deleteNotice(n.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 생성 */}
      {openCreateModal && (
        <NewNotice
          onClose={() => setOpenCreateModal(false)}
          onSubmit={async ({ requestDto, pinned, status }) => {
            const res = await fetch("/api/notice", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...requestDto,
                hospitalId,
              }),
            });

            const saved = await res.json();

            setNotices((prev) => [
              {
                ...saved,
                pinned,
                status,
                date: saved.createdAt?.slice(0, 10),
              },
              ...prev,
            ]);

            setOpenCreateModal(false);
          }}
        />
      )}

      {/* 수정 */}
      {openEditModal && selectedNotice && (
        <EditNotice
          notice={selectedNotice}
          onClose={() => setOpenEditModal(false)}
          onSubmit={async ({ id, requestDto, pinned, status }) => {
            await fetch(`/api/notice/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...requestDto,
                hospitalId,
              }),
            });

            setNotices((prev) =>
              prev.map((n) =>
                n.id === id ? { ...n, ...requestDto, pinned, status } : n
              )
            );

            setOpenEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Notice;
