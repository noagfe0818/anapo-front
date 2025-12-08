"use client";

import { Flame, MessageCircle, Eye, Heart, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { hotPosts } from "@/data/patient/hotposts";

import EmergencySlider from "./components/patient/EmergencySlider";
export default function MainHotPosts() {
  // 🔥 HOT 게시글 목록 (하드코딩 → 나중에 Spring 연동)

  // ❤️ 응급상황 카드 (슬라이드)

  const [slide, setSlide] = useState(0);

  return (
    <section className="h-min-screen bg-gray-50 w-full flex justify-center pt-45 pb-20">
      <div className="w-full max-w-7xl flex gap-8">
        {/* ------------------------------- */}
        {/* 🔥 왼쪽 HOT 게시글 */}
        {/* ------------------------------- */}
        <div className="flex-1">
          {/* TITLE */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" size={28} />
              <h2 className="text-xl font-bold">HOT 게시글</h2>
            </div>
            <button className="text-sm text-blue-500 hover:underline">
              전체보기
            </button>
          </div>

          {/* 카드 목록 */}
          <div className="flex flex-col gap-6  ">
            {hotPosts.map((post) => (
              <div
                key={post.id}
                className=" rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">
                    {post.rank}
                  </div>

                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {post.category}
                  </span>

                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    HOT
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>
                    {post.writer} · {post.time}
                  </span>

                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {post.view.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} /> {post.comment}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={14} /> {post.like}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------- */}
        {/* 🚨 오른쪽 응급상황 대처법 */}
        {/* ------------------------------- */}

        <EmergencySlider />
      </div>
    </section>
  );
}
