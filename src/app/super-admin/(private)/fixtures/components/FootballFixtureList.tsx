"use client";

import { routes } from "@/config/routes";
import { useGetFootballFixturesQuery } from "@/features/super-admin/fixture/fixtureApi";
import { useGetGeneralSettingsQuery } from "@/features/super-admin/general-settings/generalSettingsApi";
import { useGetPopularLeaguesQuery } from "@/features/super-admin/popular-football-entity/popularFootballEntityApi";
import { IFootballFixtureGroup } from "@/types";
import { getCurrentGoals } from "@/utils/get-current-goals";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
import { IoFootball } from "react-icons/io5";
import { Badge, Button } from "rizzui";

export default function FootballFixtureList({ pickerDate }: { pickerDate: string }) {
  const [skip, setSkip] = useState<boolean>(true);
  const [showFixtureData, setShowFixtureData] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const { data: footballLeagues, isLoading: footballLeaguesLoading, refetch } = useGetPopularLeaguesQuery("football");

  const {
    data: fixtures,
    isLoading: fixturesLoading,
    isError: fixturesError,
    isFetching
  } = useGetFootballFixturesQuery(pickerDate, {
    skip
  });

  const selectedFixtures = footballLeagues?.data?.docs
    ?.map((league: any) => {
      return fixtures?.data?.find((fixture: any) => fixture?.id === league?.id);
    })
    ?.filter((item: any) => item !== undefined);

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
    if (!skip && !fixturesLoading && !fixturesError && fixtures && fixtures.status) {
      setShowFixtureData(true);
    }

    if (fixtures && !fixtures.status) {
      toast.error(fixtures?.message || "Something went wrong!");
    }
  }, [fixtures, fixturesError, fixturesLoading, skip]);

  // const finalFixtures = fixturesDataAdmin?.sort((a, b) => a.id - b.id);

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
        selectedFixtures?.map((group: IFootballFixtureGroup) => {
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
                      const homeTeam = fixture?.participants?.find((team) => team?.meta?.location === "home");

                      const awayTeam = fixture?.participants?.find((team) => team?.meta?.location === "away");

                      const upcomingStatus = [
                        "TBA",
                        "NS",
                        "WO",
                        "ABANDONED",
                        "CANCELLED",
                        "AWARDED",
                        "INTERRUPTED",
                        "POSTPONED"
                      ];
                      const finishedStatus = ["FT", "AET", "FT_PEN"];

                      const isUpcoming = upcomingStatus.includes(fixture.state.state);
                      const isFinished = finishedStatus.includes(fixture.state.state);

                      const fixtureDate = moment
                        .utc(fixture?.starting_at)
                        .utcOffset(offset)
                        .format("HH:mm"); // .format('YYYY-MM-DD | HH:mm');

                      const { tOne, tTwo } = getCurrentGoals(fixture?.scores);

                      return (
                        <tr className='border-slate-100 text-center h-10' key={fixture?.id}>
                          <th>
                            <Badge>{fixture?.state?.state}</Badge>
                          </th>
                          <td>
                            <div className='flex items-center gap-2'>
                              <img
                                src={homeTeam?.image_path || "/images/team_placeholder.png"}
                                alt={homeTeam?.name}
                                className='h-7 w-7 rounded-full ring-1 ring-slate-200'
                              />
                              <h4 className='text-sm font-semibold uppercase'>{homeTeam?.name}</h4>
                            </div>
                          </td>
                          <td className='font-semibold'>{isUpcoming ? fixtureDate : `${tOne} - ${tTwo}`}</td>
                          <td>
                            <div className='flex items-center gap-2'>
                              <img
                                src={awayTeam?.image_path || "/images/team_placeholder.png"}
                                alt={awayTeam?.name}
                                className='h-7 w-7 rounded-full ring-1 ring-slate-200'
                              />
                              <h4 className='text-sm font-semibold uppercase'>{awayTeam?.name}</h4>
                            </div>
                          </td>
                          <td>
                            {/* {isFinished ? (
                              <Link
                                href={`${routes.admin.highlights.create}?fixture_id=${fixture?.id}&match_title=${fixture
                                  ?.league?.name}&time=${moment
                                  .utc(fixture?.starting_at)
                                  .utcOffset(offset)
                                  .format("YYYY-MM-DD HH:mm")}&category=football`}
                              >
                                <Button size='sm' variant='outline'>
                                  <HiPlus className='text-base mr-1' /> Add Highlights
                                </Button>
                              </Link>
                            ) : (
                              <Link
                                href={`${routes.admin.manageLive.create}?fixture_id=${fixture?.id}&match_title=${fixture
                                  ?.league?.name}&t1_name=${fixture?.participants[0]?.name}&t1_img=${fixture
                                  ?.participants[0]?.image_path}&t2_name=${fixture?.participants[1]
                                  ?.name}&t2_img=${fixture?.participants[1]?.image_path}&time=${moment
                                  .utc(fixture?.starting_at)
                                  .utcOffset(offset)
                                  .format("YYYY-MM-DD HH:mm")}&sports_type=football`}
                              >
                                <Button size='sm'>
                                  <HiPlus className='text-base mr-1' /> Add Live
                                </Button>
                              </Link>
                            )} */}
                            <Link
                              // href={`${routes.admin.ownFixtures.create}?fixture_id=${fixture?.id}&match_title=${fixture?.name}&time=${moment
                              //   .utc(fixture?.starting_at)
                              //   .utcOffset(offset)
                              //   .format("YYYY-MM-DD HH:mm")}&category=football`}
                              href={`${routes.admin.manageMatch.create}?fixture_id=${fixture?.id}&match_title=${fixture
                                ?.league?.name}&t1_name=${fixture?.participants[0]?.name}&t1_img=${fixture
                                ?.participants[0]?.image_path}&t2_name=${fixture?.participants[1]
                                ?.name}&t2_img=${fixture?.participants[1]?.image_path}&time=${moment
                                .utc(fixture?.starting_at)
                                .utcOffset(offset)
                                .format("YYYY-MM-DD HH:mm")}&state=${fixture?.state?.state}`}
                            >
                              <Button size='sm' variant='outline'>
                                <HiPlus className='text-base mr-1' /> Add Fixture
                              </Button>
                            </Link>
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
