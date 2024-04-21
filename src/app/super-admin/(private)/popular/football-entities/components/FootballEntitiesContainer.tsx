"use client";

import { useState } from "react";
import TabButtonItem from "../../../components/TabButtonItem";
import PopularLeague from "./PopularLeague";
import PopularPlayer from "./PopularPlayer";
import PopularTeam from "./PopularTeam";

export default function FootballEntitiesContainer() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = ["Popular Leagues", "Popular Teams", "Popular Players"];

  const handleTabChange = (tab: number) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        <div className='col-span-1 flex flex-col md:col-span-3'>
          {tabs.map((tab, index) => (
            <TabButtonItem key={index} tab={tab} onClick={() => handleTabChange(index)} active={currentTab === index} />
          ))}
        </div>
        <div className='col-span-1 w-full rounded-lg border border-gray-200 bg-white p-5 shadow md:col-span-9'>
          <div hidden={currentTab === 0 ? false : true}>
            <PopularLeague />
          </div>

          <div hidden={currentTab === 1 ? false : true}>
            <PopularTeam />
          </div>

          <div hidden={currentTab === 2 ? false : true}>
            <PopularPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
