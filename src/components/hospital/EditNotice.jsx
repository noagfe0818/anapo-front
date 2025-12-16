"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function EditNotice({ notice, onClose, onSubmit }) {
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);

  // ⬇️ 프론트 전용 상태
  const [pinned, setPinned] = useState(notice.pinned);
  const [status, setStatus] = useState(notice.status);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // ✅ 백엔드로 보낼 데이터 (NoticeRequestDto 기준)
    const requestDto = {
      title,
      content,
      writer: notice.writer, // 🔥 나중에 로그인 유저로 교체 가능
    };

    // ✅ 부모로 전달
    onSubmit({
      id: notice.id,
      requestDto,
      pinned,
      status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-xl shadow-xl p-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold">공지사항 수정</h2>
          <button onClick={onClose}>
            <X className="text-gray-600 hover:text-gray-800" size={22} />
          </button>
        </div>

        {/* 제목 */}
        <div className="mt-5">
          <label className="block mb-2 text-gray-700 font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm"
          />
        </div>

        {/* 내용 */}
        <div className="mt-5">
          <label className="block mb-2 text-gray-700 font-medium">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 h-36 text-sm resize-none"
          />
        </div>

        {/* 옵션 */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={pinned}
              onChange={() => setPinned(!pinned)}
            />
            상단 고정
          </label>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">상태:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="게시중">게시중</option>
              <option value="임시저장">임시저장</option>
            </select>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            취소
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
