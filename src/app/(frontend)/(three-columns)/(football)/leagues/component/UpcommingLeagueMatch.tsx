"use client";
import FixtureCard from "@/app/(frontend)/components/FixtureCard";
import { useGetFixtureDataQuery } from "@/features/front-end/fixture/fixtureApi";
import { useGetTopLeaguesQuery } from "@/features/front-end/league/leagueApi";

const UpcommingLeagueMatch = ({ leagueId }: { leagueId: any }) => {
  const { isLoading, data: fixtureData } = useGetFixtureDataQuery(undefined);
  const { data: popularLeagues, isLoading: leagueLoading } = useGetTopLeaguesQuery(undefined);
  if (isLoading || leagueLoading) {
    return <h2>Loading...</h2>;
  }
  const leagueFixture = fixtureData?.data.filter((fixture: any) => fixture?.league?.id === Number(leagueId));
  const league = popularLeagues?.data?.docs?.find((league: any) => league?.id === Number(leagueId));
  return (
    <div>
      <div className='flex items-center gap-2 my-4'>
        <img src={`${league?.image_path}`} alt='league-img' className='w-16 h-16' />
        <h2 className='text-3xl font-bold'>{league?.name}</h2>
      </div>
      <div>
        <div className='bg-white p-3 rounded-lg'>
          <h2 className='font-bold text-xl'>Upcoming Matches</h2>

          {leagueFixture?.map((fixture: any) => <FixtureCard key={fixture?.id} fixture={fixture} />)}
        </div>
      </div>
    </div>
  );
};

export default UpcommingLeagueMatch;
