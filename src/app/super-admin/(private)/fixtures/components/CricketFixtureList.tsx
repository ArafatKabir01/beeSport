"use client";

import {
  cricketCancelStatus,
  cricketFinishedStatus,
  cricketLiveStatus,
  cricketPostponedStatus,
  cricketUpcomingStatus
} from "@/config/constants";
import { routes } from "@/config/routes";
import { useGetCricketV2FixturesQuery } from "@/features/super-admin/fixture/fixtureApi";
import { useGetGeneralSettingsQuery } from "@/features/super-admin/general-settings/generalSettingsApi";
import { ICricketFixtureGroup } from "@/types";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
import { IoFootball } from "react-icons/io5";
import { Badge, Button } from "rizzui";

export default function CricketFixtureList({ pickerDate }: { pickerDate: string }) {
  const [skip, setSkip] = useState<boolean>(true);
  const [showFixtureData, setShowFixtureData] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const currentDate = new Date(pickerDate);
  currentDate.setDate(currentDate.getDate() + 1);
  const previousDate = pickerDate;
  const nextDate = currentDate.toISOString().split("T")[0];

  const {
    data: cricketFixtures,
    isLoading: cricketFixtureLoading,
    isError: cricketFixtureError,
    isFetching
  } = useGetCricketV2FixturesQuery(
    {
      previousDate,
      nextDate
    },
    {
      skip
    }
  );

  const { data: generalSettings, isLoading, isError } = useGetGeneralSettingsQuery(undefined);

  // Get TimeZone
  useEffect(() => {
    if (!isLoading && !isError) {
      if (generalSettings?.data?.timezone && generalSettings?.data?.timezone?.value) {
        setOffset(generalSettings?.data?.timezone?.value);
        setSkip(false);
      } else {
        toast.error("Setup timezone in general settings!");
      }
    }
  }, [generalSettings, isError, isLoading]);

  // Get Fixture After Set TimeZone
  useEffect(() => {
    if (!skip && !cricketFixtureLoading && !cricketFixtureError && cricketFixtures && cricketFixtures.status) {
      setShowFixtureData(true);
    }

    if (cricketFixtures && !cricketFixtures.status) {
      toast.error(cricketFixtures?.message || "Something went wrong!");
    }
  }, [cricketFixtureError, cricketFixtureLoading, cricketFixtures, skip]);

  return (
    <div className='grid grid-cols-1 gap-3 pt-5'>
      {(!showFixtureData || isFetching) && (
        <div className='mt-5 flex h-32 justify-center'>
          <div className='animate-bounce'>
            <IoFootball className='animate-spin text-3xl text-primary' />
          </div>
        </div>
      )}

      {!isFetching &&
        showFixtureData &&
        cricketFixtures.data.map((group: ICricketFixtureGroup) => {
          return (
            <div key={group?.id}>
              <div className='panel'>
                <div className='flex flex-col items-center'>
                  <div className='w-full bg-white'>
                    <div className='flex h-full items-center justify-start p-2 px-4 hover:text-secondary'>
                      <img src={group?.image} alt='team one' className='mr-3 h-8 w-8 rounded-full' />

                      <h4 className='text-[16px] font-semibold uppercase text-gray-900'>{group?.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full border-separate border-spacing-2'>
                  <thead className='bg-slate-100'>
                    <tr className='border-slate-100 text-center text-base'>
                      <th style={{ width: "20%" }}>Status</th>
                      <th style={{ width: "25%" }}>Team One</th>
                      <th style={{ width: "10%" }}>Time/Score</th>
                      <th style={{ width: "25%" }}>Team Two</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.fixtures.map((fixture) => {
                      const isUpcoming =
                        cricketUpcomingStatus.includes(fixture.status) || cricketLiveStatus.includes(fixture.status);

                      const isFinished =
                        cricketFinishedStatus.includes(fixture.status) ||
                        cricketPostponedStatus.includes(fixture.status) ||
                        cricketCancelStatus.includes(fixture.status);

                      const fixtureDate = moment
                        .utc(fixture?.starting_at)
                        .utcOffset(offset)
                        .format("HH:mm"); // .format('YYYY-MM-DD | HH:mm');

                      return (
                        <tr className='border-slate-100 text-center h-10' key={fixture?.id}>
                          <th>
                            <Badge>{fixture?.status}</Badge>
                          </th>
                          <td>
                            <div className='flex items-center gap-2'>
                              <img
                                src={fixture.localteam?.image_path || "/images/team_placeholder.png"}
                                alt={fixture.localteam?.name}
                                className='h-7 w-7 rounded-full ring-1 ring-slate-200'
                              />
                              <h4 className='text-sm font-semibold uppercase'>{fixture.localteam?.name}</h4>
                            </div>
                          </td>
                          <td className='font-semibold'>{isUpcoming ? fixtureDate : `Finished`}</td>
                          <td>
                            <div className='flex items-center gap-2'>
                              <img
                                src={fixture.visitorteam?.image_path || "/images/team_placeholder.png"}
                                alt={fixture.visitorteam?.name}
                                className='h-7 w-7 rounded-full ring-1 ring-slate-200'
                              />
                              <h4 className='text-sm font-semibold uppercase'>{fixture.visitorteam?.name}</h4>
                            </div>
                          </td>
                          <td>
                            {isFinished ? (
                              <Link href={`${routes.admin.highlights.create}?fixture_id=${fixture?.id}&match_title=${fixture
                                ?.league?.name}&time=${moment
                                .utc(fixture?.starting_at)
                                .utcOffset(offset)
                                .format("YYYY-MM-DD HH:mm")}&category=cricket`}>
                                <Button size='sm' variant='outline'>
                                  <HiPlus className='text-base mr-1' /> Add Highlights
                                </Button>
                              </Link>
                            ) : (
                              <Link
                                href={`${routes.admin.manageLive.create}?fixture_id=${fixture?.id}&match_title=${fixture
                                  ?.league?.name}&t1_name=${fixture?.localteam?.name}&t1_img=${fixture?.localteam
                                  ?.image_path}&t2_name=${fixture?.visitorteam?.name}&t2_img=${fixture?.visitorteam
                                  ?.image_path}&time=${moment
                                  .utc(fixture?.starting_at)
                                  .utcOffset(offset)
                                  .format("YYYY-MM-DD HH:mm")}&sports_type=cricket`}
                              >
                                <Button size='sm'>
                                  <HiPlus className='text-base mr-1' /> Add Live
                                </Button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </div>
  );
}
