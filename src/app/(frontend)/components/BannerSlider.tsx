"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { useGetBannersQuery } from "@/features/front-end/banner/bannerApi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./BannerSlider.css";

function BannerSlider() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: bannerData, isLoading, isSuccess } = useGetBannersQuery({ page: 1, limit: 30 });

  console.log("bannerData", bannerData?.data);

  return (
    <div>
      {pathname === "/" && (
        <>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper'
          >
            {/* <SwiperSlide>
              <img
                src='https://img.lovepik.com/background/20211021/large/lovepik-cool-line-technology-banner-background-image_400112106.jpg'
                alt='banner-img'
                className='h-full object-cover'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src='https://png.pngtree.com/thumb_back/fh260/back_pic/00/02/40/1456176dd0f0db4.png'
                alt='banner-img'
                className='h-full object-cover'
              />
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
            {bannerData?.data?.map((item: any) => (
              <SwiperSlide key={item?.id}>
                <Link href={`/match/${item?.title?.split(" ")?.join("-")}/${item?.fixtureId}`}>
                  <img
                    // onClick={() => router.push(`/match/${item?.title?.split(" ")?.join("-")}/${item?.fixtureId}`)}
                    src={item?.image}
                    alt='banner-img'
                    className='h-full object-cover cursor-pointer'
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default BannerSlider;
