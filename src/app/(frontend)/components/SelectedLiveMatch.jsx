"use client";

import JWPlayer from "@jwplayer/jwplayer-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useGetSettingInfoQuery } from "@/features/front-end/settings/settingsApi";
import { useGuestUserDataMutation, useUserDataMutation } from "@/features/front-end/settings/userSetting";
import LiveMatchPreviewInfo from "./LiveMatchPreviewInfo";
import ShowPopUps from "./ShowPopUps";
import StreamChangeButtons from "./StreamChangeButtons";

const formatDate = (timestamp) => new Date(timestamp * 1000);
const isWithin15MinutesBeforeMatch = (timestamp) => {
  const fifteenMinutesBeforeMatch = new Date(formatDate(timestamp));
  fifteenMinutesBeforeMatch.setMinutes(fifteenMinutesBeforeMatch.getMinutes() - 15);
  return new Date() >= fifteenMinutesBeforeMatch;
};

const SelectedLiveMatch = ({ match }) => {
  const { data: session } = useSession();
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [blockVideoPlayer, setBlockVideoPlayer] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { data: settingInfo } = useGetSettingInfoQuery(undefined);
  const [userData] = useUserDataMutation(undefined);
  const [guestUserData] = useGuestUserDataMutation(undefined);

  const isLive = isWithin15MinutesBeforeMatch(match?.starting_at_timestamp);

  const GUEST_POPUP_INTERVAL = settingInfo?.generalSetting[0]?.GUEST_POPUP_INTERVAL;
  const GUEST_POPUP_DURATION = settingInfo?.generalSetting[0]?.GUEST_POPUP_DURATION;

  const LOGGED_IN_POPUP_INTERVAL = settingInfo?.generalSetting[0]?.Login_POPUP_INTERVAL;
  const LOGGED_IN_POPUP_DURATION = settingInfo?.generalSetting[0]?.Login_POPUP_DURATION;

  const streamingSources = match?.streaming_sources || [];
  const videoUrls = streamingSources.map((source) => source?.stream_url);

  const handleLoginUserWatchTime = async (minutesWatched, index = 0) => {
    if (!session) return;

    const isPremium = streamingSources[index]?.is_premium;

    try {
      const { data } = await userData({ email: session?.user?.email, minutes_watched: minutesWatched });
      const user = data?.data;
      const isPaid = user?.role === "paid";

      if (isPaid) {
        setIsPaidUser(isPaid);
      } else if (isPremium) {
        setBlockVideoPlayer(user?.is_blocked);
        if (user?.is_blocked) {
          localStorage.removeItem("watchTime");
        }
      } else {
        setBlockVideoPlayer(false);
      }

      if (!user?.is_blocked) localStorage.setItem("watchTime", user?.minutes_watched);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuestUserWatchTime = async (minutesWatched, index = 0) => {
    if (session) return;

    const isPremium = streamingSources[index]?.is_premium;

    try {
      const { data } = await guestUserData({ minutes_watched: minutesWatched });

      const isBlocked = data?.data?.is_blocked;
      if (isPremium) {
        setBlockVideoPlayer(isBlocked);
        if (isBlocked) {
          localStorage.removeItem("watchTime");
        }
      } else {
        setBlockVideoPlayer(false);
      }

      setWatchTime(data?.data?.minutes_watched);

      if (!isBlocked) localStorage.setItem("watchTime", data?.data?.minutes_watched);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStreamButtonClick = async (index = 0, minutesWatched) => {
    setCurrentStreamIndex(index);
    if (!session) {
      await handleGuestUserWatchTime(minutesWatched, index);
    } else {
      await handleLoginUserWatchTime(minutesWatched, index);
    }
  };

  const popupTime = session ? LOGGED_IN_POPUP_INTERVAL : GUEST_POPUP_INTERVAL;
  const popupDuration = session ? LOGGED_IN_POPUP_DURATION : GUEST_POPUP_DURATION;

  useEffect(() => {
    const storedWatchTime = localStorage.getItem("watchTime");
    if (storedWatchTime) {
      setWatchTime(parseInt(storedWatchTime, 10));
    }
  }, []);
  console.log(session);

  // useEffect(() => {
  //   if (session) {
  //     setBlockVideoPlayer(true);
  //   }
  // }, [session]);

  useEffect(() => {
    if (!blockVideoPlayer && isVideoPlaying) {
      const showPopupInterval = setInterval(
        () => {
          setShowPopup(true);
          setSeconds(popupDuration);
          const closePopupTimer = setTimeout(() => {
            setShowPopup(false);
          }, popupDuration * 1000);
          return () => clearTimeout(closePopupTimer);
        },
        (popupTime + popupDuration) * 1000
      );

      return () => clearInterval(showPopupInterval);
    }
  }, [blockVideoPlayer, popupTime, popupDuration, isVideoPlaying, session]);

  useEffect(() => {
    if (session) {
      handleLoginUserWatchTime(watchTime, currentStreamIndex);
    } else {
      handleGuestUserWatchTime(watchTime, currentStreamIndex);
    }
  }, [showPopup]);

  useEffect(() => {
    let interval = null;
    if (isVideoPlaying) {
      interval = setInterval(() => setWatchTime((prev) => prev + 1), 1000);
    } else if (!isVideoPlaying && watchTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, watchTime]);

  useEffect(() => {
    let interval = null;
    if (isVideoPlaying) {
      interval = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    } else if (!isVideoPlaying) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  useEffect(() => {
    if (seconds <= 0) clearInterval();
  }, [seconds]);

  const handleBeforePlay = () => {
    JWPlayer.players.forEach((otherPlayer) => {
      if (otherPlayer !== JWPlayer.players[`jw-player-${currentStreamIndex}`]) {
        otherPlayer.pause();
      }
    });
  };

  const handleFullScreen = () => toast.error("Only subscribed users can watch streams on fullscreen");

  return (
    <>
      {!isLive ? (
        <>
          <div className='relative aspect-video bg-black w-full border border-gray-800 p-0'>
            <div onClick={handleFullScreen} className='absolute bottom-0 right-3 z-20 h-11 w-11 cursor-pointer'></div>
            {!blockVideoPlayer ? (
              <JWPlayer
                key={`stream-${currentStreamIndex}-${match?.id}`}
                playerId={`jw-player-${currentStreamIndex}`}
                playerScript='https://cdn.jwplayer.com/libraries/XhGm52Nv.js'
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onBuffer={(buffering) => {
                  if (["loading", "buffering", "stalled"].includes(buffering.reason)) {
                    setIsVideoPlaying(false);
                  }
                }}
                onBeforePlay={handleBeforePlay}
                playlist={[{ sources: [{ file: videoUrls[currentStreamIndex] }] }]}
                autostart={true}
                logo={null}
                controls={true}
              />
            ) : (
              <img src='/images/wallpaperflare.com_wallpaper.jpg' alt='Soccer field' className='w-full aspect-video' />
            )}
            {!isPaidUser && (
              <ShowPopUps
                blockVideoPlayer={blockVideoPlayer}
                showPopup={showPopup}
                session={session}
                seconds={seconds}
              />
            )}
          </div>
          <StreamChangeButtons
            streamingSources={streamingSources}
            currentStreamIndex={currentStreamIndex}
            watchTime={watchTime}
            handleStreamButtonClick={handleStreamButtonClick}
          />
        </>
      ) : (
        <LiveMatchPreviewInfo match={match} />
      )}
    </>
  );
};

export default SelectedLiveMatch;
