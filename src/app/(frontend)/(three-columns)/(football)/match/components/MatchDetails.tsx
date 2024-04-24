"use client";

import Countdown from "@/app/(frontend)/components/Countdown";
import FixtureCard from "@/app/(frontend)/components/FixtureCard";
import VideoPlayer from "@/app/(frontend)/components/VideoPlayer";
import {
  useGetFixtureDataQuery,
  useGetFixtureDatabyIdQuery,
  useGetFixtureLiveIdQuery
} from "@/features/front-end/fixture/fixtureApi";

import { RootState } from "@/features/store";

import { IFixtureProps } from "@/types";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function MatchDetails({ status, fixtureId, matchTabItem }: IFixtureProps) {
  const { accessToken } = useSelector((state: RootState) => state.authSlice);
  const { data: liveMatch, isLoading: streamSourcesLoading } = useGetFixtureLiveIdQuery(fixtureId) as any;

  const streamSources = liveMatch?.data?.streaming_sources;
  console.log("liveMatch", liveMatch);
  const formatDate = (timestamp: any) => new Date(timestamp * 1000);
  const isWithin15MinutesBeforeMatch = (timestamp: any) => {
    const fifteenMinutesBeforeMatch = new Date(formatDate(timestamp));
    fifteenMinutesBeforeMatch.setMinutes(fifteenMinutesBeforeMatch.getMinutes() - 15);
    return new Date() >= fifteenMinutesBeforeMatch;
  };
  const liveMatchStatus = isWithin15MinutesBeforeMatch(liveMatch?.data?.match_time);
  const { isLoading, data: fixtureData } = useGetFixtureDataQuery(undefined);

  const { isLoading: fixtureLoading, data: fixtureDataById } = useGetFixtureDatabyIdQuery(fixtureId);

  if (isLoading || fixtureLoading) {
    return <h2>Loading...</h2>;
  }

  const hotFixture = fixtureData?.data?.filter((data: any) => data.matchType === "hot");
  return (
    <div className='mx-auto mb-20 md:mb-4'>
      <div className='flex flex-col items-start justify-between '>
        <div className='w-full bg-[#1B2435] '></div>
      </div>

      {liveMatch?.status && (
        <div>
          {accessToken ? (
            <div>
              {liveMatchStatus ? (
                <VideoPlayer streamSources={streamSources} fixtureId={fixtureId} />
              ) : (
                <div className='my-5 flex justify-center'>
                  <div
                    style={{
                      backgroundImage: "url(/images/wallpaperflare.com_wallpaper.jpg)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover", // Adjust the background size as needed
                      position: "relative",
                      content: "fit"
                    }}
                    className='flex h-[400px] w-full flex-col items-center justify-center '
                  >
                    <div className='hero-overlay bg-black bg-opacity-50 blur-md'></div>

                    <Countdown date={liveMatch?.data?.match_time} className='text-xl   absolute top-[10rem]' />
                    <h2 className='absolute top-[12rem] text-center text-lg font-bold  '>
                      Streaming will start before 15 mins of the match started
                    </h2>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className='my-5 flex justify-center'>
                <div
                  style={{
                    backgroundImage: "url(/images/wallpaperflare.com_wallpaper.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", // Adjust the background size as needed
                    position: "relative",
                    content: "fit"
                  }}
                  className='flex h-[400px] w-full flex-col items-center justify-center '
                >
                  <div className='hero-overlay bg-black bg-opacity-50 blur-md'></div>

                  <Countdown date={liveMatch?.data?.match_time} />
                  <h2 className='absolute top-[7rem] text-center text-lg font-bold  '>
                    You must sign up or login to watch livestreams.
                  </h2>
                  <div className='absolute z-10 mx-auto'>
                    <div className='mb-2'>
                      <Link
                        href={"/user/signup"}
                        className='btn btn-neutral btn-active btn-wide bg-primary hover:bg-[#1B2435]'
                      >
                        SignUp
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={"/user/signin"}
                        className='btn btn-outline btn-active btn-wide border-primary hover:bg-[#1B2435]'
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {/* {<HighlightMatch fixtureId={fixtureId} />} */}
      <div
        // style={{ background: "linear-gradient(to bottom right, black 42%, #EE1E46 62%)" }}
        className='p-3 bg-cover bg-[#FFFFFF] rounded-md mb-3'
      >
        <div className='grid grid-cols-12 justify-items-center items-center my-3 '>
          <div className='col-span-4 flex flex-col items-center justify-center'>
            <img
              src={
                fixtureDataById?.data?.participants[0]?.image
                  ? fixtureDataById?.data?.participants[0]?.image
                  : "/images/team_placeholder.png"
              }
              alt='team-image'
              className='w-24 h-24'
            />
            <h2 className='font-bold text-lg'>{fixtureDataById?.data?.participants[0]?.name}</h2>
          </div>
          <div className='col-span-4 text-4xl font-bold'>
            <p className=''>
              {fixtureDataById?.data?.participants[0]?.score ? fixtureDataById?.data?.participants[0]?.score : 0} -{" "}
              {fixtureDataById?.data?.participants[1]?.score ? fixtureDataById?.data?.participants[1]?.score : 0}
            </p>
          </div>
          <div className='col-span-4 flex flex-col items-center justify-center'>
            <img
              src={
                fixtureDataById?.data?.participants[1]?.image
                  ? fixtureDataById?.data?.participants[1]?.image
                  : "/images/team_placeholder.png"
              }
              alt='team-image'
              className='w-24 h-24'
            />
            <h2 className='font-bold text-lg'>{fixtureDataById?.data?.participants[1]?.name}</h2>
          </div>
        </div>
      </div>
      <div className='visible m-2 mb-20 pb-2 md:mb-16 lg:m-0 lg:mb-0 '>
        <div className='bg-white p-3 rounded-lg '>
          <h2 className='text-xl font-bold my-5'>Hot Matches</h2>
          <FixtureCard fixtureData={hotFixture} />
        </div>
      </div>
    </div>
  );
}
