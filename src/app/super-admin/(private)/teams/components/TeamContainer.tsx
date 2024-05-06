"use client";

import { useState } from "react";
import PopularTeam from "./PopularTeam";

export default function TeamEntitiesContainer() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = ["Football", "Cricket"];

  const handleTabChange = (tab: number) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        <div className='col-span-1 w-full rounded-lg border border-gray-200 bg-white p-5 shadow md:col-span-12'>
          {/* <div hidden={currentTab === 0 ? false : true}>
            <PopularFootballLeague />
          </div>

          <div hidden={currentTab === 1 ? false : true}>
            <PopularCricketLeague />
          </div> */}
          <PopularTeam />
        </div>
      </div>
    </div>
  );
}
