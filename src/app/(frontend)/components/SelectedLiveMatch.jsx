"use client";

import JWPlayer from "@jwplayer/jwplayer-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// import GlobalLoading from "@/components/Global/GlobalLoading";

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
  console.log("match", match);
  const isLive = isWithin15MinutesBeforeMatch(match?.starting_at_timestamp);
  // const { streamSettings, isLoading: isLoadingStreamSettings } = useGetStreamSettings();

  const streamingSources = match?.streaming_sources || [];
  const videoUrls = streamingSources.map((source) => source?.stream_url);

  const handleLoginUserWatchTime = async (minutesWatched, index) => {
    if (!session) return;

    const isPremium = streamingSources[index]?.is_premium;

    try {
      const { data } = await apiBaseUrl.put("/api/user/watch-time", {
        email: session.email,
        minutes_watched: minutesWatched
      });

      const user = data?.data;
      const isPaid = user?.role === "paid";

      if (isPaid) {
        setIsPaidUser(isPaid);
      } else if (isPremium) {
        setBlockVideoPlayer(user?.is_blocked);
      } else {
        setBlockVideoPlayer(false);
      }

      setWatchTime(user?.minutes_watched);
      localStorage.setItem("watchTime", user?.minutes_watched);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuestUserWatchTime = async (minutesWatched, index) => {
    if (session) return;

    const isPremium = streamingSources[index]?.is_premium;

    try {
      const { data } = await apiBaseUrl.put("/api/black-list/update", {
        minutes_watched: minutesWatched
      });

      const isBlocked = data?.data?.is_blocked;
      if (isPremium) {
        setBlockVideoPlayer(isBlocked);
      } else {
        setBlockVideoPlayer(false);
      }

      setWatchTime(data?.data?.minutes_watched);
      localStorage.setItem("watchTime", data?.data?.minutes_watched);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStreamButtonClick = async (index, minutesWatched) => {
    setCurrentStreamIndex(index);
    if (!session) {
      await handleGuestUserWatchTime(minutesWatched, index);
    } else {
      await handleLoginUserWatchTime(minutesWatched, index);
    }
  };

  // const popupTime = session ? streamSettings?.data?.loginPopupTime : streamSettings?.data?.guestPopupTime;
  // const popupDuration = session ? streamSettings?.data?.loginPopupDuration : streamSettings?.data?.guestPopupDuration;

  const popupTime = 10;
  const popupDuration = 5;

  useEffect(() => {
    const storedWatchTime = localStorage.getItem("watchTime");
    if (storedWatchTime) {
      setWatchTime(parseInt(storedWatchTime, 10));
    }
  }, []);

  useEffect(() => {
    if (!blockVideoPlayer && isVideoPlaying) {
      const showPopupInterval = setInterval(
        async () => {
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
  }, [blockVideoPlayer, popupTime, popupDuration, isVideoPlaying, session, ,]);

  useEffect(() => {
    if (session) {
      handleLoginUserWatchTime(watchTime);
    } else {
      handleGuestUserWatchTime(watchTime);
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

  // if (isLoadingStreamSettings || sessionLoading) return <h2>Loading....</h2>;

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
      {isLive ? (
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
                  if (
                    buffering.reason === "loading" ||
                    buffering.reason === "buffering" ||
                    buffering.reason === "stalled"
                  ) {
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
              <img src='/images/stadium.jpg' alt='Soccer field' className='w-full aspect-video' />
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
