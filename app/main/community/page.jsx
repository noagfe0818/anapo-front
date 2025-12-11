"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Eye, Send, Filter, ArrowLeft, User, Trash2 } from "lucide-react";
import axios from "axios";

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const [writeForm, setWriteForm] = useState({
    title: "",
    content: "",
    category: "general"
  });

  const categories = [
    { id: "all", label: "전체" },
    { id: "general", label: "일반 건강" },
    { id: "chronic", label: "만성질환" },
    { id: "mental", label: "정신건강" },
    { id: "nutrition", label: "영양/다이어트" },
    { id: "exercise", label: "운동/재활" },
  ];

  const getMyName = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("userName");
    }
    return null;
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/community");
      const sortedPosts = res.data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);
    } catch (err) {
      console.error("게시글 로드 실패:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ [수정] 게시글 클릭 -> 상세 보기 (조회수 증가됨)
  const handlePostClick = async (post) => {
    try {
      // 1. 상세 정보 가져오기 (이때 조회수 +1 됨)
      const postRes = await axios.get(`http://localhost:8081/community/${post.id}`);
      setSelectedPost(postRes.data); // 최신 정보(조회수 증가된 것)로 설정

      // 2. 댓글 가져오기
      const commentRes = await axios.get(`http://localhost:8081/community/${post.id}/comments`);
      setComments(commentRes.data);
    } catch (err) {
      console.error("상세 정보 로드 실패:", err);
    }
  };

  // ✅ [추가] 좋아요 버튼 클릭
  const handleLike = async () => {
    if (!selectedPost) return;
    try {
      // 좋아요 요청
      const res = await axios.post(`http://localhost:8081/community/${selectedPost.id}/like`);
      
      // 받아온 최신 정보로 업데이트 (좋아요 수 증가됨)
      setSelectedPost(res.data); 
    } catch (err) {
      console.error("좋아요 실패:", err);
      alert("오류가 발생했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const myName = localStorage.getItem("userName") || "익명";
    const myId = localStorage.getItem("userId");

    try {
      const payload = {
        content: commentContent,
        writer: myName,
        accId: myId ? parseInt(myId) : null,
      };
      await axios.post(`http://localhost:8081/community/${selectedPost.id}/comments`, payload);
      const res = await axios.get(`http://localhost:8081/community/${selectedPost.id}/comments`);
      setComments(res.data);
      setCommentContent(""); 
    } catch (err) {
      alert("댓글 등록 실패");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    try {
        await axios.delete(`http://localhost:8081/community/${postId}`);
        alert("게시글이 삭제되었습니다.");
        setSelectedPost(null);
        fetchPosts();
    } catch (err) {
        alert("삭제 실패");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) return;
    try {
        await axios.delete(`http://localhost:8081/community/comments/${commentId}`);
        const res = await axios.get(`http://localhost:8081/community/${selectedPost.id}/comments`);
        setComments(res.data);
    } catch (err) {
        alert("삭제 실패");
    }
  };

  const handleWrite = async () => {
    if (!writeForm.title || !writeForm.content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const myName = localStorage.getItem("userName") || "익명";
    const myId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:8081/community", {
        title: writeForm.title,
        content: writeForm.content,
        category: writeForm.category,
        writer: myName,
        accId: myId ? parseInt(myId) : null
      });
      alert("게시글이 등록되었습니다!");
      setWriteForm({ title: "", content: "", category: "general" });
      setActiveTab("posts");
      fetchPosts(); 
    } catch (err) {
      alert("글 작성 실패");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch(e) {
        return dateString;
    }
  };

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // -------------------------------------------------------------
  // 📌 상세 페이지
  // -------------------------------------------------------------
  if (selectedPost) {
    const myName = getMyName();

    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => { setSelectedPost(null); fetchPosts(); }} // 목록 갈때 조회수 갱신 위해 새로고침
            className="flex items-center text-gray-600 mb-6 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> 목록으로 돌아가기
          </button>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
            <div className="mb-6">
              <div className="flex justify-between items-start">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                    {categories.find(c => c.id === selectedPost.category)?.label || selectedPost.category}
                  </span>
                  {selectedPost.writer === myName && (
                      <button 
                        onClick={() => handleDeletePost(selectedPost.id)}
                        className="text-red-500 hover:text-red-700 flex items-center text-sm font-medium"
                      >
                          <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </button>
                  )}
              </div>

              <h1 className="text-2xl font-bold mt-3 mb-2 text-gray-900">{selectedPost.title}</h1>
              <div className="flex items-center text-gray-500 text-sm gap-3">
                <span className="font-medium text-gray-900 flex items-center gap-1">
                  <User className="w-4 h-4"/> {selectedPost.writer}
                </span>
                <span>•</span>
                <span>{formatDate(selectedPost.regDate || selectedPost.createdAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4"/> {selectedPost.views || 0}</span>
                <span>•</span>
                {/* ✅ 좋아요 버튼 */}
                <button 
                    onClick={handleLike}
                    className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                    <ThumbsUp className="w-4 h-4" /> 
                    <span>{selectedPost.likes || 0}</span>
                </button>
              </div>
            </div>
            <hr className="my-6 border-gray-100" />
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed min-h-[100px]">
              {selectedPost.content}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-900">
              <MessageSquare className="w-5 h-5 text-blue-500" /> 댓글 {comments.length}
            </h3>
            
            <div className="space-y-4 mb-6">
              {comments.length === 0 ? (
                <div className="text-center py-4 text-gray-400 text-sm">첫 댓글을 남겨보세요!</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-gray-900">{comment.writer}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                        {comment.writer === myName && (
                            <button 
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-xs text-red-400 hover:text-red-600 underline"
                            >
                                삭제
                            </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="댓글을 입력하세요..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <button 
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium transition-colors"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------
  // 📌 목록 화면
  // -------------------------------------------------------------
  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">건강 커뮤니티</h2>
          <p className="text-gray-600">같은 고민을 가진 사람들과 정보를 공유하세요</p>
        </div>

        <div className="w-full max-w-md mx-auto grid grid-cols-2 mb-8 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => { setActiveTab("posts"); setSelectedPost(null); }}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "posts" ? "bg-white shadow text-black" : "text-gray-500"
            }`}
          >
            게시글
          </button>
          <button
            onClick={() => setActiveTab("write")}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "write" ? "bg-white shadow text-black" : "text-gray-500"
            }`}
          >
            글쓰기
          </button>
        </div>

        {activeTab === "posts" && (
          <div>
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

            <div className="grid gap-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">등록된 게시글이 없습니다.</div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold border border-gray-200 text-gray-700">
                            {categories.find((c) => c.id === post.category)?.label || post.category}
                          </span>
                        </div>
                        <h3 className="mb-2 font-bold text-lg hover:text-blue-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{post.writer}</span>
                          <span>•</span>
                          <span>{formatDate(post.regDate)}</span>
                          <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-1"><Eye className="w-4 h-4"/> <span>{post.views || 0}</span></div>
                            <div className="flex items-center gap-1"><ThumbsUp className="w-4 h-4"/> <span>{post.likes || 0}</span></div>
                            <div className="flex items-center gap-1"><MessageSquare className="w-4 h-4"/></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 글쓰기 탭 */}
        {activeTab === "write" && (
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c.id !== "all").map((cat) => (
                    <button 
                      key={cat.id} 
                      onClick={() => setWriteForm({...writeForm, category: cat.id})}
                      className={`px-3 py-1.5 rounded-full text-sm border ${writeForm.category === cat.id ? "bg-blue-100 border-blue-500 text-blue-700" : "border-gray-300"}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <input 
                type="text" 
                placeholder="제목" 
                className="w-full px-4 py-3 border rounded-lg"
                value={writeForm.title} 
                onChange={(e) => setWriteForm({...writeForm, title: e.target.value})}
              />
              <textarea 
                placeholder="내용" 
                className="w-full px-4 py-3 border rounded-lg min-h-[200px]"
                value={writeForm.content} 
                onChange={(e) => setWriteForm({...writeForm, content: e.target.value})}
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setActiveTab("posts")} className="px-4 py-2 border rounded-lg">취소</button>
                <button onClick={handleWrite} className="px-4 py-2 bg-blue-500 text-white rounded-lg">게시하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}