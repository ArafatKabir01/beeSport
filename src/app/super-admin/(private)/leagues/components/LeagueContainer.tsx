"use client";

import PopularFootballLeague from "./PopularFootballLeague";

export default function FootballEntitiesContainer() {
  return (
    <div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        <div className='col-span-1 w-full rounded-lg border border-gray-200 bg-white p-5 shadow md:col-span-12'>
          <PopularFootballLeague />
        </div>
      </div>
    </div>
  );
}
