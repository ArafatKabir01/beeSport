"use client";

import JWPlayer from "@jwplayer/jwplayer-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "rizzui";

const formatDate = (timestamp) => new Date(timestamp * 1000);
const isWithin15MinutesBeforeMatch = (timestamp) => {
  const fifteenMinutesBeforeMatch = new Date(formatDate(timestamp));
  fifteenMinutesBeforeMatch.setMinutes(fifteenMinutesBeforeMatch.getMinutes() - 15);
  return new Date() >= fifteenMinutesBeforeMatch;
};

export default function VideoPlayer({ streamSources, fixtureId }) {
  const { data: session } = useSession();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isRender, setIsRender] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef(null); // Ref to manage the timer
  const popupTimerRef = useRef(null); // Ref to manage popup visibility timer
  const videoUrls = streamSources?.map((source) => source?.stream_url) || [];

  const handleStreamButtonClick = async (index) => {
    setCurrentStreamIndex(index);
  };

  useEffect(() => {
    setIsRender(true);
  }, []);

  const startPopupTimer = () => {
    timerRef.current = setInterval(() => {
      setShowPopup(true);
      popupTimerRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Hide popup after 3 seconds
    }, 10000); // Show popup every 10 seconds
  };

  useEffect(() => {
    if (isVideoPlaying) {
      startPopupTimer();
    } else {
      clearInterval(timerRef.current);
      clearTimeout(popupTimerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(popupTimerRef.current);
    };
  }, [isVideoPlaying]);

  return (
    <>
      {videoUrls.length > 0 && (
        <>
          <div className='relative aspect-video w-full border border-gray-800 bg-black p-0'>
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
                playlist={[
                  {
                    sources: [{ file: videoUrls[currentStreamIndex] }]
                  }
                ]}
                autostart={true}
                logo={null}
                controls={!showPopup} // Hide controls when the popup is shown
              />
            )}
            {showPopup && (
              <div className='flex justify-center items-center w-full h-full bg-black absolute top-0 left-0 z-50 bg-opacity-90'>
                <div className='text-center'>
                  <h2 className='text-3xl font-bold text-[#EE1E46] mb-5'>Your Trial Has Expired!</h2>
                  <p className='text-white mb-3'>
                    Upgrade your account now to continue enjoying exclusive sports content and never miss a moment of
                    the action!
                  </p>
                  <Link href='/pricing'>
                    <Button className='text-white bg-[#EE1E46]'>Update Your Plan</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className='mb-5 mt-5 flex flex-col items-start justify-between px-1 lg:px-4'></div>
        </>
      )}
    </>
  );
}
