import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MainBanner = () => {
  return (
    // ✅ 수정: 여기에 'mx-8' (좌우 여백) 추가
    <section className=" pt-20 h-[90vh] bg-gray-50 px-8 ">
      <div className="container mx-auto max-w-8xl py-8">
        <article className="flex flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#3B8DFF] to-[#B8D5FF] rounded-2xl p-12 ">
          <div className=" flex flex-col gap-2 ">
            <h1 className="text-5xl text-white font-bold  ">
              언제 어디서나 <br />
              <span className="text-amber-500  ">편리한 의료 서비스</span>
            </h1>
            <p className="text-white text-[20px] font-medium mt-2">
              anapo와 함께 더 쉽고 빠른 의료 서비스를 경험해보세요. <br />
              병원 검색부터, 예약, 상담까지 모든 것을 한 곳에서.
            </p>
            <div className="flex flex-row gap-2.5 mt-6">
              <Link
                href={"/main/findhospital"}
                className="flex flex-row items-center gap-3 text-[14px] font-semibold text-black rounded-md bg-white px-4 py-2"
              >
                병원 찾기 시작하기 <ArrowRight size={15} />
              </Link>
              <Link
                href={"/main/reservationmed"}
                className=" items-center text-[14px] font-semibold text-black rounded-md bg-white px-6 py-3"
              >
                지금 예약하기
              </Link>
            </div>
          </div>

          <div>
            <Image
              className="rounded-2xl  object-cover "
              width={600}
              height={700}
              src={"/anapo_Main.jpg"}
              alt={""}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default MainBanner;
