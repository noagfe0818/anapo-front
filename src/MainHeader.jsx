"use client";

import { Activity } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // 1. 브라우저에 저장된 내 정보(ID, 이름, 토큰) 싹 지우기
    localStorage.removeItem("userId");
    localStorage.removeItem("userName"); // ✅ [추가됨] 이름도 삭제!
    localStorage.removeItem("token");

    logout();
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