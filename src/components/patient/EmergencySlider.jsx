// MainHotPost.jsx 안에 들어가는 컴포넌트
// 응급처치 카드

"use client";

import { AlertTriangle, Heart } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    title: "심장 발작",
    subtitle: "가슴 통증, 호흡곤란",
    steps: [
      "즉시 119에 전화하세요",
      "환자를 편안한 자세로 앉히거나 눕히세요",
      "의식이 있다면 아스피린 1정을 씹어 먹게 하세요",
      "구급차가 올 때까지 환자 곁에 머물러 주세요",
    ],
  },
  {
    title: "효주가 나중에 넣을 응급처치",
    subtitle: "여기에 다른 상황 설명",
    steps: ["1단계", "2단계", "3단계", "4단계"],
  },
];

export default function EmergencySlider() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col gap-4">
      {/* 상단 작은 타이틀 카드 */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={16} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">긴급상황 대처법</p>
          <p className="text-[11px] text-gray-400">응급처치 가이드</p>
        </div>
      </div>

      {/* 메인 카드 */}
      <article className="relative overflow-hidden rounded-3xl bg-white shadow-md">
        {/* 위쪽 그라데이션 바 */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FF5C8A] via-[#FF6FB5] to-[#FF9A5C]" />

        <div className="px-6 py-6">
          {/* 아이콘 */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
              <Heart className="text-rose-400" size={32} />
            </div>
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {current.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{current.subtitle}</p>
          </div>

          {/* 단계 리스트 */}
          <ol className="mt-6 space-y-3 text-xs text-gray-700">
            {current.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-semibold text-rose-400">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {/* 슬라이드 넘기기 */}
          <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
            <button onClick={prev} className="px-2 py-1">
              ◀
            </button>
            <div className="flex gap-1">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === index ? "bg-rose-400" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="px-2 py-1">
              ▶
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
