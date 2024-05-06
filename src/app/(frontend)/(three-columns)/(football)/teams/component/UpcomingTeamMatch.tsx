"use client";
import { useGetFixtureDataQuery } from "@/features/front-end/fixture/fixtureApi";
import { useGetTeamInfoQuery } from "@/features/front-end/teams/teamsApi";

const UpcomingTeamMatch = ({ teamId }: { teamId: any }) => {
  const { isLoading, data: fixtureData } = useGetFixtureDataQuery(undefined);

  const { data: teams, isLoading: teamsLoading } = useGetTeamInfoQuery(undefined);
  if (isLoading || teamsLoading) {
    return <h2>Loading...</h2>;
  }
  const leagueFixture = fixtureData?.data.map(
    (fixture: any) => fixture?.participants.filter((team: any) => team.id === Number(teamId))
  );
  const team = teams?.data?.find((team: any) => team?.teamId === Number(teamId));
  return (
    <div>
      <div className='flex items-center gap-2 my-4'>
        <img src={`${team?.image_path}`} alt='league-img' className='w-16 h-16' />
        <h2 className='text-3xl font-bold'>{team?.name}</h2>
      </div>
      <div>
        <div className='bg-white p-3 rounded-lg'>
          <h2 className='font-bold text-xl'>Upcoming Matches</h2>
          {/* <FixtureCard fixtureData={leagueFixture} /> */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingTeamMatch;
