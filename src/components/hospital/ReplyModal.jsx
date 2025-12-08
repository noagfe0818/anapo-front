// userhospital/patient/page.jsx에 사용되는 컴포넌트
//환자 문의 답글 작성 창임

"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function ReplyModal({ inquiry, onClose, onSubmit }) {
  const [replyText, setReplyText] = useState("");

  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[680px] p-6 shadow-xl animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">답변 작성</h2>
          <button onClick={onClose}>
            <X size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* 문의 내용 박스 */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-800">{inquiry.type}</h3>

          <p className="text-sm text-gray-500 mt-1">
            {inquiry.patientName} ({inquiry.patientId}) · {inquiry.date}
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            {inquiry.content}
          </p>
        </div>

        {/* 답변 입력 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            답변 내용
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-indigo-500 text-sm"
            placeholder="답변 내용을 입력하세요"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>

          <button
            onClick={() => onSubmit(replyText)}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            답변 전송
          </button>
        </div>
      </div>
    </div>
  );
}
