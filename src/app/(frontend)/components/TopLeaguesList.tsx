"use client";

import { useGetTopLeaguesQuery } from "@/features/front-end/league/leagueApi";
import { useGetTeamInfoQuery } from "@/features/front-end/teams/teamsApi";
import { ILeague } from "@/types";
import Link from "next/link";
import LeagueItem from "./LeagueItem";

export default function TopLeaguesList({ data }: { data: string }) {
  const { data: popularLeagues, isLoading, isError } = useGetTopLeaguesQuery(undefined);
  const { data: teams, isLoading: teamsLoading } = useGetTeamInfoQuery(undefined);

  const arr = [1, 2, 3, 4, 5, 6, 7];

  if (isLoading || teamsLoading) {
    return (
      <div className='mb-2 space-y-4'>
        {arr.map((shimmer) => (
          <div className='grid grid-cols-12' key={shimmer}>
            <div className='col-span-2 h-7 w-7 animate-pulse rounded-full bg-neutral'></div>
            <div className='col-span-10 h-7 w-full animate-pulse rounded-md bg-neutral'></div>
          </div>
        ))}
      </div>
    );
  }

  if (!popularLeagues?.data?.docs?.length) {
    return (
      <div className='border-t border-gray-300 pb-2'>
        <div className='p-3 text-xs font-light uppercase   '>
          No data available right now... Please try again later!
        </div>
      </div>
    );
  }

  if (popularLeagues.status) {
    return (
      <div>
        {data === "league" ? (
          <div className=''>
            {popularLeagues?.data?.docs?.map((league: ILeague) => (
              <Link key={league?.id} href={`/leagues/${league?.name}/${league?.id}`}>
                <LeagueItem league={league} />
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <div className=''>
              {teams?.data?.map((team: any) => (
                <Link key={team?.teamId} href={`/teams/${team?.name}/${team?.teamId}`}>
                  <div className='select-none'>
                    <div className='mb-3 flex items-center'>
                      <img src={team?.image} alt={team?.name} className='h-9 w-9 rounded-full' />
                      <p className='text-md font-semibold ms-3'>{team?.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
