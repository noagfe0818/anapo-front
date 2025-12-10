"use client";

import { X } from "lucide-react";

export default function ConfirmModal({
  type, // warn | suspend | delete | approve | reject | contentDelete | reportDrop 등
  target, // user 또는 hospital 또는 report 등 어떤 객체든 가능
  onConfirm,
  onClose,
}) {
  // 안전하게 이름 가져오기
  const targetName =
    target?.name || target?.hospitalName || target?.reporter || "해당 대상";

  // 메시지 사전
  const messages = {
    warn: `${targetName}님에게 경고 조치를 내리시겠습니까?`,
    suspend: `${targetName}님의 계정을 정지하시겠습니까?`,
    delete: `${targetName}님의 계정을 탈퇴 처리하시겠습니까?`,

    hospitalWarn: `${targetName} 병원에 경고를 발송하시겠습니까?`,
    hospitalSuspend: `${targetName} 병원을 정지 처리하시겠습니까?`,
    hospitalDelete: `${targetName} 병원을 삭제하시겠습니까?`,

    contentDelete: `해당 콘텐츠를 삭제하시겠습니까?`,
    approve: `해당 공지사항을 승인하시겠습니까?`,
    reject: `해당 공지사항을 거부하시겠습니까?`,

    reportDrop: `해당 신고를 기각하시겠습니까?`,
  };

  const titleMap = {
    warn: "경고 발송",
    suspend: "계정 정지",
    delete: "계정 탈퇴",

    hospitalWarn: "병원 경고",
    hospitalSuspend: "병원 정지",
    hospitalDelete: "병원 삭제",

    contentDelete: "콘텐츠 삭제",
    approve: "승인",
    reject: "거부",

    reportDrop: "신고 기각",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-lg p-7 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* 제목 */}
        <h2 className="text-xl font-semibold mb-6">
          {titleMap[type] || "확인"}
        </h2>

        {/* 메시지 */}
        <p className="text-gray-700 mb-10 whitespace-pre-line leading-relaxed">
          {messages[type] || "이 작업을 진행하시겠습니까?"}
        </p>

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            취소
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
