"use client";

import NoDataFound from "@/app/shared/NoDataFound";
import NewsShimmer from "@/components/shimmer/NewsShimmer";
import { useGetGroupByNewsQuery } from "@/features/front-end/news/newsApi";
import { RootState } from "@/features/store";
import { INestedObject } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./newsSlider.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCube, Pagination } from "swiper/modules";
function formatNewsTimestamp(timestamp: string) {
  const momentTimestamp = moment(timestamp);
  if (momentTimestamp.isValid()) {
    return momentTimestamp.fromNow();
  }
  return "Invalid Date";
}
export default function NewsHome() {
  const { sportType } = useSelector((state: RootState) => state.fixtureSlice);
  const dispatch = useDispatch();
  const { isLoading, data: groupByNewsData } = useGetGroupByNewsQuery(sportType, { skip: !sportType });
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    if (sportType) {
      localStorage.setItem("category", sportType);
    }
  }, [sportType]);
  if (isLoading) {
    return <NewsShimmer />;
  }

  const handleSeeMore = (league: string) => {
    setVisibleItems((prev) => ({
      ...prev,
      [league]: (prev[league] || 8) + 8 // Display 8 more items each time "See More" is clicked
    }));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  return (
    <div className='mx-auto mb-20 mt-6 max-w-[1200px] md:mb-5'>
      <h3 className='mx-3 my-7 text-lg font-medium lg:text-2xl'>Top News</h3>
      {groupByNewsData?.data?.length > 0 ? (
        <div className=''>
          {groupByNewsData?.data?.length > 0 && (
            // <Slider {...sliderSettings}>
            //   {groupByNewsData?.data[0].news.slice(0, 3).map((news: INestedObject) => (
            //     <div key={news._id}>
            //       <Link key={news._id} href={`/news/${news?.slug}`}>
            //         <div className='grid grid-cols-12'>
            //           <div className='col-span-12 lg:col-span-6'>
            //             <Image
            //               src={news?.image}
            //               alt='Demo'
            //               height={0}
            //               width={0}
            //               sizes='100vw'
            //               className='mr-4 aspect-[16/8] h-full w-full p-1 lg:h-[400px]'
            //             />
            //           </div>
            //           <div className='col-span-12 m-2 h-[300px] bg-[#FFFFFF] p-3 lg:col-span-6 lg:m-0 lg:h-full lg:p-10'>
            //             <h4 className='text-sm   lg:text-lg'>{news?.title}</h4>
            //             <p className='py-5 text-justify text-xs   lg:text-sm'>
            //               {news?.shortDescription?.length > 350
            //                 ? `${news?.shortDescription?.slice(0, 350)}...`
            //                 : news?.shortDescription}
            //             </p>
            //             <div className=' flex items-center gap-5 '>
            //               <span className='badge badge-md border-gray-700 bg-[#374151] px-5 py-4 text-xs text-gray-200 lg:text-sm'>
            //                 Match Reports
            //               </span>
            //               <span className='text-xs   lg:text-sm'>{formatNewsTimestamp(news?.updatedAt)}</span>
            //             </div>
            //           </div>
            //         </div>
            //       </Link>
            //     </div>
            //   ))}
            // </Slider>
            <div className=' lg:flex lg:justify-between justify-center gap-2 hidden'>
              <div className=''>
                <Swiper
                  effect={"cube"}
                  grabCursor={true}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                  }}
                  pagination={true}
                  modules={[EffectCube, Pagination, Autoplay]}
                  className='newsSwiper'
                >
                  {groupByNewsData?.data[0].news.slice(0, 3).map((news: INestedObject) => (
                    <SwiperSlide key={news.id}>
                      <Link key={news._id} href={`/news/${news?.slug}`} className=''>
                        <img src={news?.image} alt='test' className='rounded-lg object-fit aspect-[16/9]' />

                        <div
                          style={{
                            background:
                              "linear-gradient(0deg, rgba(2,0,36,1) 7%, rgba(4,4,22,0.7483368347338936) 40%, rgba(255,255,255,0) 100%)"
                          }}
                          className='w-full h-full  absolute top-0 rounded-lg  '
                        >
                          {" "}
                          <div className='col-span-12 text-white lg:p-10 mt-44'>
                            <h4 className='text-md font-bold lg:text-xl '>{news?.title}</h4>
                            <p className='py-5 text-justify text-xs  hidden lg:block lg:text-sm'>
                              {news?.shortDescription?.length > 350
                                ? `${news?.shortDescription?.slice(0, 350)}...`
                                : news?.shortDescription}
                            </p>
                            <div className=' flex items-center gap-5 '>
                              <span className='badge badge-md border-gray-700 bg-[#374151] px-5 py-4 text-xs text-gray-200 lg:text-sm'>
                                Match Reports
                              </span>
                              <span className='text-xs   lg:text-sm'>{formatNewsTimestamp(news?.updatedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className=' grid grid-cols lg:grid-cols-2 gap-2 justify-items-center'>
                {groupByNewsData?.data[0].news.slice(4, 8).map((news: INestedObject) => (
                  <div key={news._id} className=' rounded-md relative w-[260px] h-[180px] gap-2 '>
                    <Link href={`/news/${news?.slug}`}>
                      <img src={news?.image} alt='test' className='rounded-lg w-full h-full' />
                      <div className='w-full absolute top-0 rounded-lg h-full bg-gradient-to-b from-white/10 to-black/90'>
                        {" "}
                        <div className='col-span-12 text-white lg:p-2 mt-20'>
                          <h4 className='text-md font-bold lg:text-sm mb-3'>{news?.title.slice(0, 50)}..</h4>
                          {/* <p className='py-5 text-justify text-xs   lg:text-sm'>
                            {news?.shortDescription?.length > 350
                              ? `${news?.shortDescription?.slice(0, 150)}...`
                              : news?.shortDescription}
                          </p> */}
                          <div className=' flex items-center gap-5 '>
                            <span className='badge badge-md border-gray-700 bg-[#374151] px-5 py-4 text-xs text-gray-200 lg:text-sm'>
                              Match Reports
                            </span>
                            <span className='text-xs lg:text-sm'>{formatNewsTimestamp(news?.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {groupByNewsData?.data?.length > 0 &&
            groupByNewsData?.data?.map((group: any, index: number) => {
              const { league, news } = group;
              const visibleCount = visibleItems[league] || 8; // Default to 8 items

              return (
                <div key={index}>
                  <h3 className='mx-5 my-7 text-xl font-medium md:mx-0'>{league}</h3>
                  <div className='mx-5 grid grid-cols-12 gap-5 md:mx-0'>
                    {news.slice(0, visibleCount).map((item: any) => (
                      <div
                        style={{ backgroundImage: "url(/images/cool-background.png)" }}
                        key={item._id}
                        className='col-span-12 flex flex-col p-2 rounded-lg md:col-span-6 lg:col-span-3 shadow-lg'
                      >
                        <div className='mb-5 mt-2 overflow-hidden '>
                          <Link href={`/news/${item?.slug}`}>
                            <Image
                              src={item?.image}
                              alt='Demo'
                              height={0}
                              width={0}
                              sizes='100vw'
                              className='h-48 w-full select-none rounded-md hover:scale-125 transition duration-300 ease-in-out'
                            />
                          </Link>
                        </div>
                        <div className='flex min-h-[250px] flex-col justify-between'>
                          <Link href={`/news/${item?.slug}`}>
                            <h2 className='font-bold text-lg'>{item?.title}</h2>
                            <p className='text-justify my-4'>
                              {item?.title?.length > 95 ? `${item?.title?.slice(0, 95)}...` : item?.title}
                            </p>
                          </Link>
                          <div className='flex items-center justify-between px-4 font-bold text-gray-500'>
                            <span className='py-4'>Match Reports</span>
                            <span className='text-sm'>{formatNewsTimestamp(item?.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* {visibleCount < news.length && (
                    <div className='mx-5 my-4 md:mx-0'>
                      <button
                        className='bg-blue-500 text-white py-2 px-4 rounded'
                        onClick={() => handleSeeMore(league)}
                      >
                        See More
                      </button>
                    </div>
                  )} */}
                  <div className='flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4'>
                    {/* more free and premium Tailwind CSS components at https://tailwinduikit.com/ */}

                    <div className='lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200'>
                      <div className='flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer'>
                        <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M1.1665 4H12.8332'
                            stroke='currentColor'
                            strokeWidth='1.25'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M1.1665 4L4.49984 7.33333'
                            stroke='currentColor'
                            strokeWidth='1.25'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M1.1665 4.00002L4.49984 0.666687'
                            stroke='currentColor'
                            strokeWidth='1.25'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <p className='text-sm ml-3 font-medium leading-none'>Previous</p>
                      </div>
                      <div className='sm:flex hidden'>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          1
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          2
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          3
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2'>
                          4
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          5
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          6
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          7
                        </p>
                        <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
                          8
                        </p>
                      </div>
                      <div className='flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer'>
                        <p className='text-sm font-medium leading-none mr-3'>Next</p>
                        <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M1.1665 4H12.8332'
                            stroke='currentColor'
                            strokeWidth='1.25'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M9.5 7.33333L12.8333 4'
                            stroke='currentColor'
                            strokeWidth='1.25'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M9.5 0.666687L12.8333 4.00002'
                            stroke='currentColor'
                            strokeWidth='1.25'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}
