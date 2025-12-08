import MainBanner from "@/MainBanner";
import MainHotPosts from "@/MainHotPost";
import MainNoticeSection from "@/MainNoticeSection";
import MainOffer from "@/MainOffer";
import MainHotPost from "@/MainHotPost";
import { MessageCircle } from "lucide-react";

const Page = () => {
  return (
    <section className="relative">
      <MainBanner />
      <MainNoticeSection />
      <MainHotPost />

      {/* <MessageCircle
        size={"70px"}
        color="#5CA0FF"
        className="absolute right-20 bottom-[70px]"
      /> */}
    </section>
  );
};

export default Page;
