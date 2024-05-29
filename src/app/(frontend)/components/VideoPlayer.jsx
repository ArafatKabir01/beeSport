"use client";

import JWPlayer from "@jwplayer/jwplayer-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";
// Constants for pop-up timing
const GUEST_POPUP_INTERVAL = 20000; // 20 seconds
const GUEST_POPUP_DURATION = 5000; // 5 seconds
const GUEST_FREE_WATCH_LIMIT = 300; // 5 minutes (300 seconds)

const LOGGED_IN_POPUP_INTERVAL = 10000; // 30 seconds
const LOGGED_IN_POPUP_DURATION = 5000; // 10 seconds
const LOGGED_IN_FREE_WATCH_LIMIT = 60; // 1 minute (60 seconds)

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
  const [showPopup, setShowPopup] = useState(false);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [permanentPopup, setPermanentPopup] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false); // State to track if the player is ready
  const [popupCountdown, setPopupCountdown] = useState(0); // State to track the countdown timer for the popup
  const playerInstanceRef = useRef(null); // Ref to store the JWPlayer instance
  const timerRef = useRef(null);
  const popupTimerRef = useRef(null);
  const watchTimeIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const videoUrls = streamSources?.map((source) => source?.stream_url) || [];
  const handleStreamButtonClick = async (index) => {
    setCurrentStreamIndex(index);
  };

  useEffect(() => {
    setIsRender(true);
  }, []);

  const startPopupTimer = (interval, duration) => {
    timerRef.current = setInterval(() => {
      setShowPopup(true);
      setPopupCountdown(duration / 1000); // Set initial countdown timer
      popupTimerRef.current = setTimeout(() => {
        setShowPopup(false);
      }, duration); // Hide popup after specified duration
    }, interval); // Show popup at specified interval
  };

  useEffect(() => {
    const isLoggedIn = session?.user != null;
    const hasSubscription = session?.user?.subscription != null;

    if (hasSubscription) {
      return; // Do nothing if the user has a subscription
    }

    const popupInterval = isLoggedIn ? LOGGED_IN_POPUP_INTERVAL : GUEST_POPUP_INTERVAL;
    const popupDuration = isLoggedIn ? LOGGED_IN_POPUP_DURATION : GUEST_POPUP_DURATION;
    const freeWatchLimit = isLoggedIn ? LOGGED_IN_FREE_WATCH_LIMIT : GUEST_FREE_WATCH_LIMIT;

    if (isVideoPlaying) {
      startPopupTimer(popupInterval, popupDuration);
      watchTimeIntervalRef.current = setInterval(() => {
        setTotalWatchTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= freeWatchLimit) {
            setPermanentPopup(true);
            setIsVideoPlaying(false);
            clearInterval(watchTimeIntervalRef.current);
            clearInterval(timerRef.current);
            clearTimeout(popupTimerRef.current);
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      clearTimeout(popupTimerRef.current);
      clearInterval(watchTimeIntervalRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(popupTimerRef.current);
      clearInterval(watchTimeIntervalRef.current);
    };
  }, [isVideoPlaying, session]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopupCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  useEffect(() => {
    if (popupCountdown <= 0) {
      // Clear and close popup when timer ends
      clearInterval(countdownIntervalRef.current);
      setShowPopup(false);
    }
  }, [popupCountdown]);
  const handleFullScreen = () => {
    toast.error("Please buy subscription to watch live on fullscreen");
  };
  const handlePause = () => {
    setIsVideoPlaying(false);
  };

  return (
    <>
      {videoUrls.length > 0 && (
        <>
          <div className='relative aspect-video w-full border border-gray-800 bg-black p-0'>
            <div
              onClick={handleFullScreen}
              className='absolute bottom-2 right-4 z-20 rounded h-8 w-10 cursor-pointer'
            ></div>
            {isRender && (
              <JWPlayer
                key={`stream-${currentStreamIndex}-${fixtureId}`}
                playerId={`jw-player-${currentStreamIndex}`}
                playerScript='https://cdn.jwplayer.com/libraries/XhGm52Nv.js'
                onReady={(player) => {
                  playerInstanceRef.current = player;
                  setIsPlayerReady(true);
                }}
                onPlay={() => setIsVideoPlaying(permanentPopup === true ? false : true)}
                onPause={() => handlePause()}
                onBeforePlay={() => {
                  const allPlayers = JWPlayer.players;
                  allPlayers.forEach((otherPlayer) => {
                    if (otherPlayer !== playerInstanceRef.current) {
                      otherPlayer.pause();
                    }
                  });
                }}
                playlist={[
                  {
                    sources: [{ file: videoUrls[currentStreamIndex] }]
                  }
                ]}
                autostart={false}
                logo={null}
                controls={!showPopup} // Hide controls when the popup is shown
              />
            )}

            {showPopup && !permanentPopup && (
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
                  <div className='text-white mt-3'>Popup closes in {popupCountdown} seconds</div>
                </div>
              </div>
            )}
            {permanentPopup && (
              <div className='flex justify-center items-center w-full h-full bg-black absolute top-0 left-0 z-50 bg-opacity-90'>
                <div className='text-center'>
                  <h2 className='text-3xl font-bold text-[#EE1E46] mb-5'>Your Free Watch Time Is Over!</h2>
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
