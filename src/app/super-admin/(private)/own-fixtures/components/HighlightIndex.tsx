"use client";

import { useGetHighlightsQuery } from "@/features/super-admin/highlight/highlightApi";
import { useGetAllFixtureQuery } from "@/features/super-admin/fixture/fixtureApi";
import { ColorScheme, MantineProvider, useMantineTheme } from "@mantine/core";
import { MRT_PaginationState, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Badge, Button } from "rizzui";
import HighlightActions from "./HighlightActions";
import HighlightDeleteModal from "./HighlightDeleteModal";
import { IoFootball } from "react-icons/io5";
import { IFootballFixtureGroup } from "@/types";
import { getCurrentGoals } from "@/utils/get-current-goals";
import { routes } from "@/config/routes";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { useGetGeneralSettingsQuery } from "@/features/super-admin/general-settings/generalSettingsApi";
import toast from "react-hot-toast";

export default function HighlightIndex() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const [finalData, setFinalData] = useState([]);
  const [finalDataLoading, setFinalDataLoading] = useState(true);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number | string; description: string } | null>(null);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 100 });
  const [skip, setSkip] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const {
    data: highlights,
    isLoading: highlightsLoading,
    isError: highlightsError,
    isFetching: highlightsFetching
  } = useGetHighlightsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const {
    data: fixtures,
    isLoading: fixturesLoading,
    isSuccess,
    isError: fixturesError,
    isFetching: fixturesFetching
  } = useGetAllFixtureQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

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


  useEffect(() => {
    if (!fixturesLoading && !fixturesError) {
      setFinalData(fixtures?.data ?? []);
      setFinalDataLoading(false);
    }
  }, [fixtures, fixturesError, fixturesLoading]);

  // Define Columns Data
  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        mantineTableHeadCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { name: string } } }) => (
          <div className="ml-3">
            {row?.original?.name.length > 50 ? `${row?.original?.name.substring(0, 50)}...` : row?.original?.name}
          </div>
        )
      },
      {
        accessorKey: "date",
        header: "Date",
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { startingAt: string } } }) => (
          <div>
            <p className='text-center'>{moment(row.original.startingAt).format("MMMM Do YYYY")}</p>
          </div>
        )
      },
      {
        accessorKey: "participants",
        header: "Score",
        columnDefType: "display",
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { participants: any } } }) => {
          return `${row.original.participants[0]?.score} : ${row.original.participants[1]?.score}`
        }
      },
      {
        accessorKey: "status",
        header: "Status",
        columnDefType: "display",
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { status: string } } }) => {
          return row.original.status == "1" ? (
            <Badge color='success'>Active</Badge>
          ) : (
            <Badge color='danger'>Inactive</Badge>
          );
        }
      },
      {
        id: "edit",
        header: "Action",
        columnDefType: "display",
        enableColumnOrdering: false,
        Cell: ({ row }: { row: { original: { _id: string; name: string } } }) => (
          <div>
            <HighlightActions
              setDeleteModalState={setDeleteModalState}
              id={row.original._id}
              description={`Are you sure you want to delete this "${row.original.name}" fixture?`}
              setDeleteItem={setDeleteItem}
            />
          </div>
        ),
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        }
      }
    ],
    []
  );

  // Define Table
  const table = useMantineReactTable({
    columns,
    data: finalData,
    rowCount: highlights?.data?.totalDocs as number,
    mantinePaginationProps: {
      rowsPerPageOptions: ["10", "20", "50", "100"],
      color: "rgb(56, 114, 250)",
      withEdges: true
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    initialState: {
      density: "xs"
    },
    enableDensityToggle: false,
    state: { isLoading: finalDataLoading, showProgressBars: highlightsFetching, pagination },
    enableSorting: true,
    autoResetPageIndex: false
  });

  // return (
  //   <>
  //     <MantineProvider
  //       theme={{
  //         ...globalTheme,
  //         primaryShade: 5,
  //         colorScheme: (theme as ColorScheme) || "light"
  //       }}
  //     >
  //       <MantineReactTable table={table} />
  //     </MantineProvider>

  //     <HighlightDeleteModal
  //       id={deleteItem?.id}
  //       description={deleteItem?.description}
  //       deleteModalState={deleteModalState}
  //       setDeleteModalState={setDeleteModalState}
  //     />
  //   </>
  // );

  return (
    <div className='grid grid-cols-1 gap-3 pt-5'>
      {(fixturesLoading) && (
        <div className='mt-5 flex h-32 justify-center'>
          <div className='animate-bounce'>
            <IoFootball className='animate-spin text-3xl text-primary' />
          </div>
        </div>
      )}

      {isSuccess &&
        fixtures?.data?.map((group: IFootballFixtureGroup) => {
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

                      const isUpcoming = upcomingStatus.includes(fixture?.state?.state);
                      const isFinished = finishedStatus.includes(fixture?.state?.state);

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
                          <td className="flex gap-2">
                            {isFinished && (
                              <Link
                                href={`${routes.admin.highlights.create}?fixture_id=${fixture?.id}&match_title=${fixture
                                  ?.name}&time=${moment
                                  .utc(fixture?.starting_at)
                                  .utcOffset(offset)
                                  .format("YYYY-MM-DD HH:mm")}&category=football`}
                              >
                                <Button size='sm' variant='outline'>
                                  <HiPlus className='text-base mr-1' /> Add Highlights
                                </Button>
                              </Link>)
                            // ) : (
                            //   <Link
                            //     href={`${routes.admin.manageLive.create}?fixture_id=${fixture?.id}&match_title=${fixture
                            //       ?.league?.name}&t1_name=${fixture?.participants[0]?.name}&t1_img=${fixture
                            //       ?.participants[0]?.image_path}&t2_name=${fixture?.participants[1]
                            //       ?.name}&t2_img=${fixture?.participants[1]?.image_path}&time=${moment
                            //       .utc(fixture?.starting_at)
                            //       .utcOffset(offset)
                            //       .format("YYYY-MM-DD HH:mm")}&sports_type=football`}
                            //   >
                            //     <Button size='sm'>
                            //       <HiPlus className='text-base mr-1' /> Add Live
                            //     </Button>
                            //   </Link>
                            // )
                            }
                            <div>
                            <HighlightActions
                              setDeleteModalState={setDeleteModalState}
                              id={fixture?.id}
                              description={`Are you sure you want to delete this "${fixture.name}" fixture?`}
                              setDeleteItem={setDeleteItem}
                            />
                          </div>
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
        
      <HighlightDeleteModal
        id={deleteItem?.id}
        description={deleteItem?.description}
        deleteModalState={deleteModalState}
        setDeleteModalState={setDeleteModalState}
      />
    </div>
  );
}
