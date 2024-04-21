"use client";

import NoDataFound from "@/app/shared/NoDataFound";
import NewsShimmer from "@/components/shimmer/NewsShimmer";
import { useGetGroupByNewsQuery } from "@/features/front-end/news/newsApi";
import { RootState } from "@/features/store";
import { INestedObject } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../css/newsSlider.css";

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

  useEffect(() => {
    if (sportType) {
      localStorage.setItem("category", sportType);
    }
  }, [sportType]);
  if (isLoading) {
    return <NewsShimmer />;
  }

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
    <div className='mx-auto mb-20 mt-6 max-w-screen-xl md:mb-5'>
      <h3 className='mx-3 my-7 text-lg font-medium   lg:text-2xl'>Top News</h3>
      {groupByNewsData?.data?.length > 0 ? (
        <div>
          {groupByNewsData?.data?.length > 0 && (
            <Slider {...sliderSettings}>
              {groupByNewsData?.data[0].news.slice(0, 3).map((news: INestedObject) => (
                <div key={news._id}>
                  <Link key={news._id} href={`/news/${news?.slug}`}>
                    <div className='grid grid-cols-12'>
                      <div className='col-span-12 lg:col-span-6'>
                        <Image
                          src={news?.image}
                          alt='Demo'
                          height={0}
                          width={0}
                          sizes='100vw'
                          className='mr-4 aspect-[16/8] h-full w-full p-1 lg:h-[400px]'
                        />
                      </div>
                      <div className='col-span-12 m-2 h-[300px] bg-[#FFFFFF] p-3 lg:col-span-6 lg:m-0 lg:h-full lg:p-10'>
                        <h4 className='text-sm   lg:text-lg'>{news?.title}</h4>
                        <p className='py-5 text-justify text-xs   lg:text-sm'>
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
                </div>
              ))}
            </Slider>
          )}

          {groupByNewsData?.data?.length > 0 &&
            groupByNewsData?.data?.map((group: INestedObject, index: number) => (
              <div key={index}>
                <h3 className='mx-5 my-7 text-xl font-medium md:mx-0'>{group?.league}</h3>
                <div className='mx-5 grid grid-cols-12 gap-5 md:mx-0 '>
                  {group?.news.map((item: INestedObject) => (
                    <div
                      key={item._id}
                      className='col-span-12 flex flex-col p-2 rounded-lg md:col-span-6 lg:col-span-3 shadow-lg'
                    >
                      <div className='mb-5 mt-2'>
                        <Link href={`/news/${item?.slug}`}>
                          <Image
                            src={item?.image}
                            alt='Demo'
                            height={0}
                            width={0}
                            sizes='100vw'
                            className='h-48 w-full select-none rounded-md'
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
                          <span className='  py-4'>Match Reports</span>
                          <span className='text-sm'>{formatNewsTimestamp(item?.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}
