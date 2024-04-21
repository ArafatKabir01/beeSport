import { INestedObject } from "@/types";
import getSlugify from "@/utils/get-slugify";
import Link from "next/link";

interface StandingTeamItemProps {
  singleStandings: INestedObject;
  index: number;
  teams: any;
}
interface CricketData {
  runs_against: number;
  overs_against: number;
}
function calculateECO(cricketData: CricketData): number {
  const runsConceded = cricketData?.runs_against;
  const oversBowled = cricketData?.overs_against;

  if (oversBowled === 0) {
    return oversBowled;
  }

  const eco = runsConceded / oversBowled;

  // Round the result to two decimal places
  return Math.round(eco * 100) / 100;
}
export default function CricketStandingTeamItem({ singleStandings, index, teams }: StandingTeamItemProps) {
  const currentTeam = teams?.find((team: any) => team.id === singleStandings.team_id);
  const cricketStats = {
    runs_against: singleStandings?.runs_against,
    overs_against: singleStandings?.overs_against
  };
  const eco = calculateECO(cricketStats);
  return (
    <div
      key={singleStandings.team_id}
      className={`grid grid-cols-12 items-center text-[8px] lg:text-xs w-full py-3 font-light select-none   ${
        index % 2 === 0 && "bg-slate-800"
      }`}
    >
      <div className='text-center'>{singleStandings?.position}</div>
      <div className='col-span-5'>
        <div>
          <Link href={`/cricketTeam/${getSlugify(currentTeam?.name)}/${currentTeam?.id}`} className='flex items-center'>
            <img
              src={currentTeam?.image_path ? currentTeam?.image_path : "/images/team_placeholder.png"}
              alt={currentTeam?.name}
              className='w-7 h-7 p-1 mr-0 lg:mr-4 rounded-full'
            />
            <p className='uppercase '>{currentTeam?.name}</p>
          </Link>
        </div>
      </div>
      <div className='text-center '>{singleStandings.played ? singleStandings.played : 0}</div>
      <div className='text-center '>{singleStandings.won ? singleStandings.won : 0}</div>
      <div className='text-center'>{singleStandings.draw ? singleStandings.draw : 0}</div>
      <div className='text-center'>{singleStandings.lost}</div>
      <div className='text-center'>{singleStandings.points ? singleStandings.points : 0}</div>
      <div className='text-center'>{eco ? eco.toFixed(2) : 0}</div>
    </div>
  );
}
