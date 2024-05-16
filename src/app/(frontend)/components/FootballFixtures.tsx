"use client";

import NoDataFound from "@/app/shared/NoDataFound";
import { useGetFixtureDataQuery } from "@/features/front-end/fixture/fixtureApi";
import FixtureCard from "./FixtureCard";

export default function FootballFixtures() {
  const { isLoading, data: fixtureData } = useGetFixtureDataQuery(undefined);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const hotFixture = fixtureData?.data?.filter((data: any) => data.matchType === "hot");

  return (
    <div className='relative'>
      <>
        <div className='visible m-2 mb-20 pb-2 md:mb-16 lg:m-0 lg:mb-0 '>
          <div className='bg-white p-1 lg:p-3 rounded-lg '>
            <h2 className='text-xl font-bold my-5'>Hot Matches</h2>
            {hotFixture?.length ? (
              hotFixture.map((fixture: any) => <FixtureCard key={fixture?.id} fixture={fixture} />)
            ) : (
              <NoDataFound />
            )}
          </div>
          <div className='bg-white p-1 lg:p-3 rounded-lg mt-8'>
            <h2 className='text-xl font-bold my-5'>All Matches</h2>
            <div className=''>
              {fixtureData?.data?.map((fixture: any) => <FixtureCard key={fixture?.id} fixture={fixture} />)}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
