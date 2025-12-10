"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Eye, Send, Filter } from "lucide-react";

export default function CommunitySection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("posts"); // 탭 상태 관리 직접 구현

  const categories = [
    { id: "all", label: "전체" },
    { id: "general", label: "일반 건강" },
    { id: "chronic", label: "만성질환" },
    { id: "mental", label: "정신건강" },
    { id: "nutrition", label: "영양/다이어트" },
    { id: "exercise", label: "운동/재활" },
  ];

  // 임시 게시글 데이터
  const posts = [
    {
      id: 1,
      category: "general",
      title: "감기 증상 완화에 도움되는 민간요법 공유해요",
      content:
        "요즘 환절기라 감기 걸리신 분들 많으시죠? 제가 효과 봤던 방법들 공유드립니다...",
      author: "건강지킴이",
      likes: 24,
      comments: 12,
      views: 156,
      timeAgo: "2시간 전",
      isHot: true,
    },
    {
      id: 2,
      category: "chronic",
      title: "당뇨 관리 어떻게 하시나요?",
      content:
        "최근에 당뇨 진단 받았는데 식단 관리가 너무 어렵네요. 다들 어떻게 관리하시는지 궁금합니다.",
      author: "새출발",
      likes: 18,
      comments: 8,
      views: 89,
      timeAgo: "5시간 전",
      isHot: false,
    },
    {
      id: 3,
      category: "mental",
      title: "불면증 극복 후기",
      content:
        "3년간 불면증으로 고생했는데 드디어 극복했습니다. 제 경험 공유드릴게요.",
      author: "꿀잠맨",
      likes: 45,
      comments: 23,
      views: 312,
      timeAgo: "1일 전",
      isHot: true,
    },
    {
      id: 4,
      category: "nutrition",
      title: "단백질 섭취 어떻게 하세요?",
      content:
        "근력 운동 시작했는데 단백질 보충이 중요하다고 하더라구요. 좋은 방법 있을까요?",
      author: "운동초보",
      likes: 12,
      comments: 15,
      views: 98,
      timeAgo: "3시간 전",
      isHot: false,
    },
    {
      id: 5,
      category: "exercise",
      title: "허리 디스크 재활 운동 루틴",
      content:
        "물리치료사님께 배운 재활 운동 루틴 공유합니다. 같은 증상 있으신 분들께 도움이 되길...",
      author: "재활중",
      likes: 32,
      comments: 18,
      views: 203,
      timeAgo: "6시간 전",
      isHot: true,
    },
    {
      id: 6,
      category: "general",
      title: "종합검진 어디서 받는게 좋을까요?",
      content:
        "30대 중반인데 첫 종합검진 받으려고 합니다. 추천해주실 곳 있으신가요?",
      author: "건강챙기자",
      likes: 8,
      comments: 11,
      views: 67,
      timeAgo: "4시간 전",
      isHot: false,
    },
  ];

  // 카테고리 필터링
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">건강 커뮤니티</h2>
          <p className="text-gray-600">
            같은 고민을 가진 사람들과 경험과 정보를 공유하세요
          </p>
        </div>

        {/* 탭 버튼 영역 */}
        <div className="w-full max-w-md mx-auto grid grid-cols-2 mb-8 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "posts"
                ? "bg-white shadow text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            게시글
          </button>
          <button
            onClick={() => setActiveTab("write")}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "write"
                ? "bg-white shadow text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            글쓰기
          </button>
        </div>

        {/* 탭 내용: 게시글 목록 */}
        {activeTab === "posts" && (
          <div>
            {/* 카테고리 필터 */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-gray-500 shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* 게시글 목록 */}
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {post.isHot && (
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-500 text-white">
                            HOT
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-xs font-semibold border border-gray-200 text-gray-700">
                          {categories.find((c) => c.id === post.category)?.label}
                        </span>
                      </div>
                      <h3 className="mb-2 font-bold text-lg hover:text-blue-500 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.timeAgo}</span>
                        <div className="flex items-center gap-4 ml-auto">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            <div className="text-center mt-8">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                게시글 더보기
              </button>
            </div>
          </div>
        )}

        {/* 탭 내용: 글쓰기 */}
        {activeTab === "write" && (
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((category) => (
                      <button
                        key={category.id}
                        className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        {category.label}
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">제목</label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">내용</label>
                <textarea
                  placeholder="내용을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px] resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                  취소
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  게시하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}