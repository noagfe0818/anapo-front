"use client";

import { Activity } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  // ✅ [수정된 부분] 로그아웃 버튼을 눌렀을 때 실행되는 함수
  const handleLogout = () => {
    // 1. 브라우저 주머니(로컬 스토리지)에 있는 이전 사람의 흔적을 싹 지운다! (가장 중요)
    localStorage.removeItem("userId");
    localStorage.removeItem("token"); // 혹시 토큰도 쓴다면 같이 삭제

    // 2. '로그아웃' 방송하기 (화면을 '로그인 안 된 상태'로 변경)
    logout();

    // 3. 알림 띄우고 로그인 페이지로 이동
    alert("로그아웃되었습니다.");
    router.push("/main/login");
  };

  return (
    <header className=" bg-white w-full shadow-md shadow-black/10 z-10 fixed">
      <nav className=" container mx-auto px-3 py-3  flex justify-between items-center">
        <Link className="flex flex-row items-center gap-3" href={"/main"}>
          <Activity size={38} color="#5CA0FF" />
          <span className="text-2xl font-semibold text-[#5CA0FF]">anapo</span>
        </Link>

        <ul className=" flex flex-row items-center gap-8">
          <li>
            <Link href={"/main/findhospital"}>병원찾기/예약</Link>
          </li>
          <li>
            <Link href={"/main/myreservation"}>나의 예약</Link>
          </li>
          <li>
            <Link href={"/main/faq"}>상담 톡</Link>
          </li>
          <li>
            <Link href={"/main/community"}>커뮤니티</Link>
          </li>
          <li>
            <Link href={"/main/my"}>마이페이지</Link>
          </li>
        </ul>

        <div className="flex flex-row gap-1.5 ">
          {isLoggedIn ? (
            <>
              {/* --- 로그인 했을 때 --- */}
              <Link href="/main/my">
                <button className=" border border-gray-400 rounded-md px-3 py-1 text-[14px] text-gray-900">
                  마이페이지
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className=" border  border-[#5CA0FF] bg-[#5CA0FF] rounded-md px-3 py-1 text-[14px] text-white"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* --- 로그인 안 했을 때 --- */}
              <Link href={"/main/login"}>
                <button className=" border border-gray-400 rounded-md px-3 py-1 text-[14px] text-gray-900">
                  로그인
                </button>
              </Link>
              <Link href={"/main/join"}>
                <button className=" border  border-[#5CA0FF] bg-[#5CA0FF] rounded-md px-3 py-1 text-[14px] text-white">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;