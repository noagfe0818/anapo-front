"use client";

import { Calendar, UserCheck, Users } from "lucide-react";

export default function Page() {
  return (
    <section className="space-y-8 p-10">
      {/* 페이지 설명 */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">대시보드</h2>
        <p className="text-gray-500">병원 예약 현황을 한눈에 확인하세요</p>
      </div>
      {/* 페이지 설명 아래 카드 3개 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm flex flex-row gap-32 ">
          <h3 className="text-lg font-semibold flex flex-col gap-1 ">
            오늘 예약 <p className="text-3xl font-medium mt-2">24</p>
          </h3>
          <div className="w-18 h-18 bg-blue-400 rounded-xl flex items-center justify-center p-1">
            <Calendar size={40} color="white" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm flex flex-row  gap-42">
          <h3 className="text-lg font-semibold flex flex-col gap-1">
            완료 <p className="text-3xl font-medium mt-2">16</p>
          </h3>
          <div className="w-18 h-18 bg-blue-400 rounded-xl flex items-center justify-center p-1">
            <UserCheck size={40} color="white" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm flex flex-row  gap-32">
          <h3 className="text-lg font-semibold flex flex-col gap-1">
            총 환자 <p className="text-3xl font-medium mt-2">1,234</p>
          </h3>
          <div className="w-18 h-18 bg-blue-400 rounded-xl flex items-center justify-center p-1">
            <Users size={40} color="white" />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 오늘의 예약 현황 */}
        <div className="bg-white rounded-2xl  p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">오늘의 예약 현황</h2>

          {/* 테이블 */}
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-md border-b">
                <th className="pb-3">환자명</th>
                <th className="pb-3">담당의</th>
                <th className="pb-3">시간</th>
                <th className="pb-3">상태</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-lg">
              {/* ROW 1 */}
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-4 font-medium">박지은</td>
                <td>최철수 교수</td>
                <td>09:30</td>
                <td>
                  <span className="px-4 py-2 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold">
                    진료중
                  </span>
                </td>
              </tr>

              {/* ROW 2 */}
              <tr className="hover:bg-gray-50 transition">
                <td className="py-4 font-medium">정수연</td>
                <td>윤성호 교수</td>
                <td>10:30</td>
                <td>
                  <span className="px-4 py-2 text-sm rounded-full bg-green-100 text-green-600 font-semibold">
                    완료
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 최근 등록 환자 */}
        <div className="bg-white rounded-2xl  p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">최근 등록 환자</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-md border-b">
                <th className="pb-3">환자명</th>
                <th className="pb-3">연락처</th>
                <th className="pb-3">등록일</th>
                <th className="pb-3">구분</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-lg">
              {/* ROW 1 */}
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-4 font-medium">김민수</td>
                <td>010-1234-5678</td>
                <td>2025-01-15</td>
                <td>
                  <span className="px-4 py-2 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold">
                    신규
                  </span>
                </td>
              </tr>

              {/* ROW 2 */}
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-4 font-medium">박지은</td>
                <td>010-2345-6789</td>
                <td>2025-01-15</td>
                <td>
                  <span className="px-4 py-2 text-sm rounded-full bg-gray-100 text-gray-600 font-semibold">
                    재진
                  </span>
                </td>
              </tr>

              {/* ROW 3 */}
              <tr className="hover:bg-gray-50 transition">
                <td className="py-4 font-medium">이준호</td>
                <td>010-3456-7890</td>
                <td>2025-01-14</td>
                <td>
                  <span className="px-4 py-2 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold">
                    신규
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
