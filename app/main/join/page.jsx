"use client";

import { Activity, User, Mail, Lock, MoveLeft, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState("남자"); // 성별 상태 추가

  // 체크박스 상태 관리
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const router = useRouter();

  // 체크박스 변경 핸들러
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. 필수 약관 체크 확인
    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 모두 동의해야 회원가입이 가능합니다.");
      return;
    }
    
    // 2. 비밀번호 일치 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    // 3. 전화번호 입력 확인
    if (!phone.trim()) {
      alert("전화번호는 필수 입력 항목입니다.");
      return;
    }

    try {
      // 4. 백엔드(IntelliJ)로 보낼 데이터 준비
      // (DTO 변수명: userId, userPassword, userName, userNumber 등)
      const payload = {
        userId: email,        // 화면의 이메일 -> 백엔드 ID
        userPassword: password,
        userPassword2: confirmPassword, 
        userName: name,
        userNumber: phone.replace(/-/g, ""), // 하이픈 제거하고 숫자만 전송
        birth: date,
        sex: sex,             
      };

      // 5. 백엔드 주소(8081)로 전송
      const response = await fetch("http://localhost:8081/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // 성공 시 (200 OK)
        alert("🎉 회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/main/login"); 
      } else {
        // 실패 시: 백엔드가 보낸 에러 메시지(문자열) 읽기
        const errorText = await response.text();
        alert("회원가입 실패: " + errorText);
      }
    } catch (error) {
      console.error("네트워크 에러:", error);
      alert("서버와 연결할 수 없습니다. 백엔드가 켜져 있나요?");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-15">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-2xl items-center">
            <Activity color="#5CA0FF" size={38} />
          </div>

          <h1 className="font-bold text-2xl text-gray-900 ">
            anapo에 회원가입
          </h1>
          <span className="text-lg text-gray-600 ">
            건강한 의료 서비스의 시작
          </span>
        </div>
        <article className="flex justify-center mt-8">
          <div className="w-[500px] h-[950px] rounded-2xl bg-white shadow-md flex flex-col items-center ">
            <h1 className="text-2xl mt-5 text-gray-600">회원가입</h1>

            <form onSubmit={handleSubmit} className="mt-10 ">
              {/* 이름 */}
              <div className="text-sm text-gray-900 mb-1">이름 *</div>
              <div className="relative flex items-center">
                <User className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[420px] bg-gray-100 rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 이메일 */}
              <div className="text-sm text-gray-900 mt-5">이메일 (아이디) *</div>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-[420px] bg-gray-100 rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 비밀번호 */}
              <div className="text-sm text-gray-900 mb-1 mt-5">비밀번호 *</div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[420px] bg-gray-100 rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 비밀번호 확인 */}
              <div className="text-sm text-gray-900 mb-1 mt-5">
                비밀번호 확인 *
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[420px] bg-gray-100 rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 전화번호 */}
              <div className="text-sm text-gray-900 mt-5">전화번호 * </div>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  className="w-[420px] bg-gray-100 rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 생년월일 & 성별 (레이아웃 유지) */}
              <div className="flex justify-between w-[420px]">
                <div className="flex flex-col text-md text-gray-600 mt-8 w-[60%]">
                  <label className="gap-3 text-sm mb-1">생년월일 *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-10 bg-gray-100 rounded-lg p-2"
                    required
                  />
                </div>
                
                {/* 성별 선택 기능 연결 */}
                <div className="flex flex-col text-md text-gray-600 mt-8 w-[35%]">
                  <label className="gap-3 text-sm mb-1">성별 *</label>
                  <select 
                    className="bg-gray-100 rounded-lg w-full h-10 p-2"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option value="남자">남성</option>
                    <option value="여자">여성</option>
                  </select>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="mt-8 flex flex-col gap-1 w-[420px]">
                <label className="flex items-center flex-row gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleAgreementChange}
                    className="accent-[#5CA0FF] w-4 h-4"
                  />
                  <h4>
                    이용약관에 동의합니다{" "}
                    <span className="text-sm text-blue-500">(필수)</span>
                  </h4>
                </label>

                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleAgreementChange}
                    className="accent-[#5CA0FF] w-4 h-4"
                  />
                  <h4>
                    개인정보 처리방침에 동의합니다{" "}
                    <span className="text-sm text-blue-500">(필수)</span>
                  </h4>
                </label>

                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={agreements.marketing}
                    onChange={handleAgreementChange}
                    className="accent-[#5CA0FF] w-4 h-4"
                  />
                  <h4>
                    마케팅 정보 수신에 동의합니다{" "}
                    <span className="text-sm text-gray-400">(선택)</span>
                  </h4>
                </label>
              </div>

              <button
                type="submit"
                className={`w-[420px] rounded-lg p-2 mt-8 text-white text-lg transition ${
                  agreements.terms && agreements.privacy
                    ? "bg-[#5CA0FF] hover:bg-[#4A8BE0]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!agreements.terms || !agreements.privacy}
              >
                회원가입
              </button>

              <div className="flex justify-between items-center text-md text-gray-600 mt-8 w-[420px]">
                <span>이미 계정이 있으신 가요?</span>
                <Link
                  className="text-blue-500 hover:underline"
                  href={"/main/login"}
                >
                  로그인
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