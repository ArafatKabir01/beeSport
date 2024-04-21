"use client";

import FixtureCard from "./FixtureCard";

export default function FootballFixtures() {
  return (
    <div className='relative'>
      <>
        <div className='visible m-2 mb-20 pb-2 md:mb-16 lg:m-0 lg:mb-0 '>
          <div className='bg-white p-3 rounded-lg '>
            <h2 className='text-xl font-bold my-5'>Hot Matches</h2>
            <FixtureCard />
          </div>
          <div className='bg-white p-3 rounded-lg mt-8'>
            <h2 className='text-xl font-bold my-5'>All Matches</h2>
            <div className=''>
              <FixtureCard />
              <FixtureCard />
              <FixtureCard />
              <FixtureCard />
              <FixtureCard />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
