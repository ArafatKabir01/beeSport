import {
  cricketCancelStatus,
  cricketFinishedStatus,
  cricketLiveStatus,
  cricketPostponedStatus,
  cricketUpcomingStatus,
  finishedStatus,
  liveStatus,
  upcomingStatus,
} from '@/config/constants';
import { convertTimestampToFormattedDate } from '@/utils/convert-timestamp-to-formatted-date';
import dayjs from 'dayjs';

export default function MatchState({
  match,
  game = null,
}: {
  match: any;
  game?: string | null;
}) {
  const matchState = match?.state?.state;
  const isLive = liveStatus.includes(matchState);
  const isUpcoming = upcomingStatus.includes(matchState);
  const isFinished = finishedStatus.includes(matchState);

  const cricketMatchState = match?.status;
  const isCricketLive = cricketLiveStatus.includes(cricketMatchState);
  const isCricketUpcoming = cricketUpcomingStatus.includes(cricketMatchState);
  const isCricketFinished = cricketFinishedStatus.includes(cricketMatchState);
  const isCricketPostponed = cricketPostponedStatus.includes(cricketMatchState);
  const isCricketCancel = cricketCancelStatus.includes(cricketMatchState);

  let formattedDate;

  function formatDate(date?: Date, format: string = 'DD MMM'): string {
    if (!date) return '';
    return dayjs(date).format(format);
  }

  if (game === 'cricket') {
    formattedDate = formatDate(match?.starting_at);
  } else {
    formattedDate = convertTimestampToFormattedDate(
      match?.starting_at_timestamp
    );
  }

  return (
    <div className="col-span-2 flex items-center justify-center   p-1 lg:col-span-1 lg:pe-0">
      {isLive && (
        <div className="p-1 text-xs text-[#3388FF]">
          <span>{match?.periods?.slice(-1)[0]?.minutes}</span>
          <span className="">{`"`}</span>
        </div>
      )}

      {isFinished && (
        <span className="p-1 text-xs text-[#3388FF]">
          {match?.state?.short_name}
        </span>
      )}

      {isUpcoming && (
        <div className="text-center">
          <span className="p-1 text-xs text-[#3388FF]">{formattedDate}</span>
        </div>
      )}
      {isCricketLive && (
        <div className="p-1 text-xs text-[#3388FF]">
          <span className="font-bold text-rose-700">LIVE</span>
        </div>
      )}

      {isCricketFinished && (
        <span className="p-1 text-[9px] text-[#3388FF]">MATCH ENDED</span>
      )}

      {isCricketUpcoming && (
        <div className="">
          <span className=" text-[10px] text-[#3388FF]">{formattedDate}</span>
        </div>
      )}
      {isCricketPostponed && (
        <div className="text-center">
          <span className="p-1 text-[8px] text-yellow-500">POSTPONED</span>
        </div>
      )}
      {isCricketCancel && (
        <div className="text-center">
          <span className="p-1 text-[8px] font-bold text-red-700">
            CANCELED
          </span>
        </div>
      )}
    </div>
  );
}
