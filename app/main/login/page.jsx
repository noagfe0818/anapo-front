"use client";

import { Activity, Mail, Lock, MoveLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../src/context/AuthContext";

const Page = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId: email, userPassword: password }),
      });

      if (response.ok) {
        const data = await response.json();

        // 🔍 백엔드 데이터 확인용 로그
        console.log("로그인 성공 데이터:", data);

        if (data.id) {
             // 1. 기본 정보 저장
             localStorage.setItem("userId", data.id);
             localStorage.setItem("userName", data.userName);
             
             // ✅ [중요] 역할(Role) 정보도 저장!
             localStorage.setItem("userRole", data.role); 
        }

        if (login) login(data);

        // 2. 환영 메시지 설정 (ADMIN 추가)
        let roleName = "회원";
        if (data.role === "HOSPITAL") roleName = "병원 관리자";
        else if (data.role === "ADMIN") roleName = "시스템 관리자"; // ✅ 추가됨

        alert(`환영합니다, ${data.userName} ${roleName}님!`);

        // 🚀 3. 역할에 따라 페이지 이동 (3갈래 길)
        if (data.role === "ADMIN") {
            // (1) 관리자 -> 관리자 페이지로 이동
            router.push("/admin");
        } else if (data.role === "HOSPITAL") {
            // (2) 병원 관리자 -> 병원 대시보드로 이동
            router.push("/userhospital");
        } else {
            // (3) 일반 사용자 -> 메인 페이지로 이동
            router.push("/main");
        }

      } else {
        const errorText = await response.text();
        alert(errorText || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-15">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-2xl items-center">
            <Activity color="#5CA0FF" size={38} />
          </div>
          <h1 className="font-bold text-2xl text-gray-900 ">anapo에 로그인</h1>
          <span className="text-lg text-gray-600 ">
            의료 서비스를 더 편리하게 이용하세요
          </span>
        </div>
        <article className="flex justify-center mt-8">
          <div className="w-[500px] h-[600px]  rounded-2xl bg-white shadow-md flex flex-col items-center ">
            <h1 className="text-2xl  text-gray-900 mt-5">로그인</h1>

            <form onSubmit={handleSubmit} className="mt-10 ">
              <div className="text-sm text-gray-900 mb-1">이메일</div>
              <div className="relative flex items-center">
                <Mail className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="text" 
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>
              <div className="text-sm text-gray-900 mb-1 mt-6">비밀번호</div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>
              <div className="flex justify-between items-center text-md text-gray-600 mt-8">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4"
                  />
                  로그인 상태 유지
                </label>
                <a href="#" className="text-blue-500 hover:underline">
                  비밀번호 찾기
                </a>
              </div>

              <button
                type="submit"
                className="w-[420px] rounded-lg p-2 bg-[#5CA0FF] mt-8 text-white text-lg"
              >
                로그인
              </button>

              <div className="flex justify-between items-center text-md text-gray-600 mt-8 ">
                <span>아직 계정이 없으신가요?</span>
                <Link
                  className="text-blue-500 hover:underline"
                  href={"/main/join"}
                >
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </article>
        <p className=" relative text-center text-sm text-gray-400 mt-8">
          <Link
            href="/main"
            className="hover:underline flex items-center justify-center "
          >
            <MoveLeft className=" absolute left-138 " size={18} /> 홈으로
            돌아가기
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;