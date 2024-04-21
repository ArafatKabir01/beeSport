import { liveStatus, upcomingStatus } from "@/config/constants";
import { INestedObject } from "@/types";
import { getCurrentGoals } from "@/utils/get-current-goals";

export default function MatchScore({
  match,
  large,
  game = null
}: {
  match: INestedObject;
  large: boolean;
  game?: string | null;
}) {
  const matchState = match?.state?.state;
  const isLive = liveStatus.includes(matchState);
  const isUpcoming = upcomingStatus.includes(matchState);
  const { tOne, tTwo } = getCurrentGoals(match?.scores);

  let localTeamScore;
  let visitorTeamScore;

  if (game === "cricket" && match?.scoreboards) {
    localTeamScore = match?.scoreboards?.filter((team: any) => team.team_id === match?.localteam?.id);
    localTeamScore = localTeamScore[localTeamScore?.length - 1];

    visitorTeamScore = match?.scoreboards?.filter((team: any) => team.team_id === match?.visitorteam?.id);
    visitorTeamScore = visitorTeamScore[visitorTeamScore?.length - 1];
  }

  const localTeamScoreFormate = `${localTeamScore?.total}-${localTeamScore?.wickets} (${localTeamScore?.overs})`;

  const visitorTeamScoreFormate = `${visitorTeamScore?.total}-${visitorTeamScore?.wickets} (${visitorTeamScore?.overs})`;

  return (
    <div className='col-span-3 me-2 grid content-center lg:me-4 justify-items-start'>
      {!isUpcoming ? (
        <div className={large ? "md:text-md text-sm text-gray-400" : "me-2 text-xs text-gray-400 lg:me-3"}>
          <div className='pb-1 text-center'>
            {game === "cricket" ? (
              <h2 className='mb-[2px] h-[1.1rem] text-[10px] lg:mb-[0px] lg:text-xs'>
                {localTeamScore ? localTeamScoreFormate : " "}
              </h2>
            ) : (
              <h2>{tOne}</h2>
            )}
          </div>
          <div className='text-center'>
            {game === "cricket" ? (
              <h2 className='mt-[4px] h-[1.1rem] text-[10px] lg:mt-[0px] lg:text-xs'>
                {visitorTeamScore ? visitorTeamScoreFormate : " "}
              </h2>
            ) : (
              <h2>{tTwo}</h2>
            )}
          </div>
        </div>
      ) : (
        <div
          className={
            large ? "md:text-md text-center text-sm text-gray-400" : "my-auto text-center text-sm text-gray-400 me-2"
          }
        >
          <div className='pb-1'>
            <h2>-</h2>
          </div>
          <div>
            <h2>-</h2>
          </div>
        </div>
      )}
    </div>
  );
}
