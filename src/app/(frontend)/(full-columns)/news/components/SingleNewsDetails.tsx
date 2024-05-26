"use client";

import NewsShimmer from "@/components/shimmer/NewsShimmer";
import { useGetSingleNewsQuery } from "@/features/front-end/news/newsApi";
import { INestedObject } from "@/types";
import DOMPurify from "dompurify";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

function formatNewsTimestamp(timestamp: string) {
  const momentTimestamp = moment(timestamp);
  if (momentTimestamp.isValid()) {
    return momentTimestamp.fromNow();
  }
  return "Invalid Date";
}

export default function SingleNewsDetails({ newsSlug }: { newsSlug: string }) {
  const { isLoading, data: newsData } = useGetSingleNewsQuery(newsSlug, {
    skip: !newsSlug
  });
  if (isLoading) {
    return <NewsShimmer />;
  }
  const sanitizedDescription = DOMPurify.sanitize(newsData?.data?.description || "");

  return (
    <div className=' mx-auto my-5 mb-20 grid max-w-screen-xl grid-cols-12 gap-6 lg:mb-2'>
      <div className='col-span-12 m-2 lg:col-span-7'>
        <h2 className='my-4 text-lg font-bold   lg:text-3xl'>{newsData?.data?.title}</h2>
        <div className='card rounded-none'>
          <figure>
            <Image
              src={newsData?.data?.image}
              alt='HighlightImg'
              width={0}
              height={0}
              className='aspect-[16/9] h-full w-full object-fit '
              sizes='100vw'
            />
          </figure>

          <div className='mt-5 text-xs   lg:text-lg'>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </div>
        </div>
        <div className=' block lg:hidden'>
          <h2 className='my-4 text-base font-semibold text-secondary'>Related Articles</h2>

          <div>
            {newsData?.data.relatedNews.map((relatedItem: INestedObject) => (
              <div key={relatedItem._id} className='border-b-[1px]'>
                <Link className='my-4 flex gap-3' href={`/news/${relatedItem?.slug}`}>
                  <Image
                    src={relatedItem?.image}
                    alt='HighlightImg'
                    width={0}
                    height={0}
                    className='aspect-[16/8] h-32 w-52 object-cover py-[4px]'
                    sizes='100vw'
                  />
                  <div className='flex flex-col justify-around  '>
                    <h3 className='text-sm lg:text-base'>
                      {relatedItem?.title?.length > 60 ? `${relatedItem?.title?.slice(0, 60)}...` : relatedItem?.title}
                    </h3>
                    <span className='text-sm'>{formatNewsTimestamp(relatedItem?.publish_date)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-5 hidden lg:block'>
        <h2 className='my-4 text-base font-semibold  '>Related Articles</h2>

        <div>
          {newsData?.data?.relatedNews?.map((relatedItem: INestedObject) => (
            <div key={relatedItem?._id} className='border-b-[1px]'>
              <Link className='my-4 flex gap-3' href={`/news/${relatedItem?.slug}`}>
                <Image
                  src={relatedItem?.image}
                  alt='HighlightImg'
                  width={0}
                  height={0}
                  className='aspect-[16/8] h-32 w-52 object-cover py-[4px]'
                  sizes='100vw'
                />
                <div className='flex flex-col justify-around  '>
                  <h3 className='text-base'>
                    {relatedItem?.title?.length > 60 ? `${relatedItem?.title?.slice(0, 60)}...` : relatedItem?.title}
                  </h3>
                  <span className='text-sm'>{formatNewsTimestamp(relatedItem?.publish_date)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
