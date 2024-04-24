"use client";

import JWPlayer from "@jwplayer/jwplayer-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "rizzui";

const formatDate = (timestamp) => new Date(timestamp * 1000);
const isWithin15MinutesBeforeMatch = (timestamp) => {
  const fifteenMinutesBeforeMatch = new Date(formatDate(timestamp));
  fifteenMinutesBeforeMatch.setMinutes(fifteenMinutesBeforeMatch.getMinutes() - 15);
  return new Date() >= fifteenMinutesBeforeMatch;
};

export default function VideoPlayer({ streamSources, fixtureId }) {
  const { data: session } = useSession();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const videoUrls = streamSources?.map((source) => source?.stream_url) || [];

  const handleStreamButtonClick = async (index) => {
    setCurrentStreamIndex(index);
  };

  useEffect(() => {
    setIsRender(true);
  }, []);

  return (
    <>
      {videoUrls ? (
        <>
          <div className='relative  aspect-video w-full border border-gray-800 bg-black p-0'>
            {isRender && (
              <JWPlayer
                key={`stream-${currentStreamIndex}-${fixtureId}`}
                playerId={`jw-player-${currentStreamIndex}`}
                playerScript='https://cdn.jwplayer.com/libraries/XhGm52Nv.js'
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onBeforePlay={() => {
                  const allPlayers = JWPlayer.players;
                  allPlayers.forEach((otherPlayer) => {
                    if (otherPlayer !== JWPlayer.players[`jw-player-${currentStreamIndex}`]) {
                      otherPlayer.pause();
                    }
                  });
                }}
                playlist={[{ sources: [{ file: videoUrls[currentStreamIndex] }] }]}
                autostart={true}
                logo={null}
                controls={false}
              />
            )}
            <div className='flex justify-center items-center w-[900px] h-[500px] bg-black absolute top-[40px] left-[4rem] bottom-0 z-50 bg-opacity-90'>
              <div className=' text-center w-[500px]'>
                <h2 className='text-3xl font-bold text-[#EE1E46] mb-5'>YOUR TRIAL HAS EXPIRED!</h2>
                <p className='text-white mb-3'>
                  Upgrade your account now to continue enjoying exclusive sports content and never miss a moment of the
                  action!
                </p>
                <Button className='text-white bg-[#EE1E46]'>Update Your Plan</Button>
              </div>
            </div>
          </div>

          <div className='mb-5 mt-5 flex flex-col items-start justify-between px-1 lg:px-4'>
            {/* <div className='flex flex-wrap gap-1 lg:gap-4'>
              {streamSources?.map((stream, index) => (
                <button
                  key={index}
                  className={`btn btn-xs rounded-full lg:btn-sm
              ${
                currentStreamIndex === index
                  ? `btn-primary shadow-lg shadow-blue-900`
                  : `btn-outline ${
                      stream?.is_premium == 1 ? "btn-warning shadow-md shadow-yellow-300" : "btn-neutral"
                    }   `
              }`}
                  onClick={() => handleStreamButtonClick(index)}
                >
                  {stream?.is_premium == 1 && (
                    <span>
                      <IoDiamondOutline />
                    </span>
                  )}
                  <span>{stream?.stream_title} </span>
                </button>
              ))}
            </div> */}
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <DownloadAppClick /> */}
    </>
  );
}
