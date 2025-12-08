// 지워도 됨

// import Link from "next/link";
// import { Search, ArrowRight, Calendar, MessageCircle } from "lucide-react";

// const MainOffer = () => {
//   return (
//     <section className="h-[80vh] bg-gray-50 px-8 pt-10 ">
//       <div className="container mx-auto  py-8 ">
//         <h1 className="flex flex-col gap-4 justify-center items-center text-3xl text-gray-900 font-bold mt-10">
//           anapo가 제공하는 서비스 <br />
//           <span className="text-lg text-gray-600 font-medium">
//             의료 서비스의 모든 과정을 디지털로 혁신하여 더 편리하고 빠른 경험을
//             제공합니다
//           </span>
//         </h1>
//         <div className="flex justify-between items-center mt-15">
//           {/* ----- 1. 병원 찾기 ----- */}
//           <article className=" bg-white w-[400px] h-[250px] flex flex-col justify-center items-center  rounded-xl  shadow-xl shadow-black/20">
//             <Link
//               href={"/main/findhospital"} // <--- 수정됨
//               className=" p-4 rounded-xl bg-gray-100"
//             >
//               <Search size={30} color="#5CA0FF" />
//             </Link>
//             <p className="text-gray-900 text-xl mt-2 text-[20px]">병원 찾기</p>

//             <span className="text-[16px] text-gray-600 py-6">
//               내 주변 병원을 쉽고 빠르게 찾아보세요
//             </span>
//             <Link
//               href={"/main/findhospital"} // <--- 수정됨
//               className="flex flex-row items-center gap-3 text-gray-800"
//             >
//               시작하기 <ArrowRight size={15} />
//             </Link>
//           </article>

//           {/* ----- 2. 진료 예약 ----- */}
//           <article className="  bg-white w-[400px] h-[250px] flex flex-col justify-center items-center  rounded-xl  shadow-xl shadow-black/20">
//             <Link
//               href={"/main/reservationmed"} // <--- 수정됨
//               className=" p-4 rounded-xl bg-gray-100"
//             >
//               <Calendar size={30} color="#5CA0FF" />
//             </Link>
//             <p className="text-gray-900 text-xl mt-2 text-[20px]">진료 예약</p>

//             <span className="text-[16px] text-gray-600 py-6">
//               원클릭으로 간편하게 병원 예약을 잡으세요
//             </span>
//             <Link
//               href={"/main/reservationmed"} // <--- 수정됨
//               className="flex flex-row items-center gap-3 text-gray-800"
//             >
//               시작하기 <ArrowRight size={15} />
//             </Link>
//           </article>

//           {/* ----- 3. 1:1 상담 (고객센터) ----- */}
//           <article className="  bg-white w-[400px] h-[250px] flex flex-col justify-center items-center  rounded-xl  shadow-xl shadow-black/20">
//             <Link
//               href={"/main/faq"} // <--- 수정됨
//               className=" p-4 rounded-xl bg-gray-100"
//             >
//               <MessageCircle size={30} color="#5CA0FF" />
//             </Link>
//             <p className="text-gray-900 text-xl mt-2 text-[20px]">1:1 상담</p>

//             <span className="text-[16px] text-gray-600 py-6">
//               전문 상담사와 실시간으로 상담받으세요
//             </span>
//             <Link
//               href={"/main/faq"} // <--- 수정됨
//               className="flex flex-row items-center gap-3 text-gray-800"
//             >
//               시작하기 <ArrowRight size={15} />
//             </Link>
//           </article>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MainOffer;
