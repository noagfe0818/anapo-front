// "use client";

// import { useState } from "react";

// export default function ProfileTab() {
//   const [profile, setProfile] = useState({
//     name: "관리자",
//     dept: "시스템관리팀",
//     email: "admin@medicare.com",
//     phone: "010-1234-5678",
//     position: "시스템 관리자",
//   });

//   const update = (key, value) =>
//     setProfile((prev) => ({ ...prev, [key]: value }));

//   const saveProfile = () => {
//     // 📌 백엔드로 저장 요청
//     // fetch("/api/admin/profile", { method: "POST", body: JSON.stringify(profile) })
//     alert("프로필 정보가 저장되었습니다!");
//   };

//   return (
//     <div className="bg-white p-8 shadow rounded-xl">
//       <h2 className="text-xl font-semibold">프로필 정보</h2>
//       <p className="text-gray-500 mt-1 mb-6">관리자 계정 정보를 관리합니다</p>

//       <div className="flex items-center gap-6 mb-6">
//         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-400">
//           👤
//         </div>

//         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//           사진 변경
//         </button>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm text-gray-500">이름</label>
//           <input
//             className="mt-1 w-full border rounded-lg p-2"
//             value={profile.name}
//             onChange={(e) => update("name", e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-500">부서</label>
//           <input
//             className="mt-1 w-full border rounded-lg p-2"
//             value={profile.dept}
//             onChange={(e) => update("dept", e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-500">이메일</label>
//           <input
//             className="mt-1 w-full border rounded-lg p-2"
//             value={profile.email}
//             onChange={(e) => update("email", e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-500">전화번호</label>
//           <input
//             className="mt-1 w-full border rounded-lg p-2"
//             value={profile.phone}
//             onChange={(e) => update("phone", e.target.value)}
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="block text-sm text-gray-500">직책</label>
//           <input
//             className="mt-1 w-full border rounded-lg p-2"
//             value={profile.position}
//             onChange={(e) => update("position", e.target.value)}
//           />
//         </div>
//       </div>

//       <button
//         onClick={saveProfile}
//         className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
//       >
//         💾 저장
//       </button>
//     </div>
//   );
// }
