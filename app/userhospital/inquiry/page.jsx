"use client";

import { useState } from "react";
import { inquiriesData } from "@/data/hospital/inquiriesData";
import ReplyModal from "@/components/hospital/ReplyModal";
import { MessageSquare, Clock, CheckCircle, Search } from "lucide-react";

export default function InquiryPage() {
  const [tab, setTab] = useState("전체");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const filtered =
    tab === "전체"
      ? inquiriesData
      : inquiriesData.filter((q) => {
          if (tab === "대기중") return q.status === "대기중";
          if (tab === "답변완료") return q.status === "답변완료";
          return true;
        });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">환자 문의 관리</h1>
      <p className="text-gray-500 mt-1">
        환자들의 문의사항을 확인하고 답변할 수 있습니다
      </p>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow-sm p-5 rounded-xl  flex items-center justify-between">
          <div>
            <p className="text-gray-600">전체 문의</p>
            <p className="text-xl font-semibold">{inquiriesData.length}</p>
          </div>
          <MessageSquare size={32} className="text-indigo-400" />
        </div>

        <div className="bg-white shadow-sm p-5 rounded-xl  flex items-center justify-between">
          <div>
            <p className="text-gray-600">답변 대기</p>
            <p className="text-xl font-semibold">
              {inquiriesData.filter((i) => i.status === "대기중").length}
            </p>
          </div>
          <Clock size={32} className="text-orange-400" />
        </div>

        <div className="bg-white shadow-sm p-5 rounded-xl  flex items-center justify-between">
          <div>
            <p className="text-gray-600">답변 완료</p>
            <p className="text-xl font-semibold">
              {inquiriesData.filter((i) => i.status === "답변완료").length}
            </p>
          </div>
          <CheckCircle size={32} className="text-green-500" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mt-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="환자명, 제목, 내용으로 검색"
          className="w-full bg-white border border-gray-500 rounded-lg pl-10 pr-4 py-2 text-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mt-4">
        {["전체", "대기중", "답변완료"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1 rounded-lg text-sm shadow ${
              tab === t ? "bg-indigo-500 text-white" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Inquiry List */}
      <div className="mt-6 space-y-6">
        {filtered.map((q) => (
          <div key={q.id} className="bg-white rounded-xl  shadow-sm p-5">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">{q.type}</p>
              <span
                className={`px-2 py-1 text-xs rounded-md ${
                  q.status === "대기중"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {q.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mt-1">
              {q.patientName} ({q.patientId}) · {q.date}
            </p>

            <p className="text-gray-700 mt-3">{q.content}</p>

            {q.reply ? (
              <div className="bg-indigo-50 mt-4 p-4 rounded-lg text-gray-700 text-sm border border-indigo-100">
                <p className="text-indigo-600 font-medium">
                  답변 · {q.reply.date}
                </p>
                <p className="mt-2">{q.reply.content}</p>
              </div>
            ) : (
              <button
                className="mt-4 text-indigo-500 text-sm font-medium hover:underline"
                onClick={() => setSelectedInquiry(q)}
              >
                ✏ 답변 작성
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 답변 모달 */}
      {selectedInquiry && (
        <ReplyModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onSubmit={(text) => {
            console.log("답변 전송:", text);

            /*  
            ⭐ 여기서 나중에 Spring Boot 백엔드 연결
            
            await fetch('/api/inquiry/reply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                inquiryId: selectedInquiry.id,
                reply: text,
              }),
            });
            */

            setSelectedInquiry(null);
          }}
        />
      )}
    </div>
  );
}
