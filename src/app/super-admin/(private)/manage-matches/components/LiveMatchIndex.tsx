"use client";

import { useGetLiveMatchesQuery, useSortLiveMatchMutation } from "@/features/super-admin/live-match/liveMatchApi";
import { ColorScheme, MantineProvider, useMantineTheme } from "@mantine/core";
import { MRT_PaginationState, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "rizzui";
import LiveMatchActions from "./LiveMatchActions";
import LiveMatchDeleteModal from "./LiveMatchDeleteModal";
import LiveMatchSourcesModal from "./LiveMatchSourcesModal";

export default function LiveMatchIndex() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const [finalData, setFinalData] = useState([]);
  const [finalDataLoading, setFinalDataLoading] = useState(true);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [sourcesModal, setSourcesModal] = useState(false);
  const [sourcesList, setSourcesList] = useState<any[]>([]);
  const [deleteItem, setDeleteItem] = useState<{ id: number; description: string } | null>(null);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });

  const {
    data: liveMatches,
    isLoading,
    isError,
    isFetching
  } = useGetLiveMatchesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const [sortMatch, { isSuccess: matchSortSuccess, isError: matchSortError }] = useSortLiveMatchMutation();

  useEffect(() => {
    if (!isLoading && !isError) {
      setFinalData(liveMatches?.data?.docs ?? []);
      setFinalDataLoading(false);
    }
  }, [isError, isLoading, liveMatches]);

  useEffect(() => {
    if (matchSortError) {
      toast.error("Something went wrong in sorting!");
    }

    if (matchSortSuccess) {
      toast.success("Sorting done successfully!");
    }
  }, [matchSortError, matchSortSuccess]);

  // Define Columns Data
  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "team_one_name",
        header: "Team One",
        id: "team_one_image",
        Cell: ({ row }: { row: { original: { team_one_image: string; team_one_name: string } } }) => (
          <div className='flex items-center'>
            {row?.original?.team_one_image ? (
              <Image
                className='h-10 w-10 rounded-full'
                src={row?.original?.team_one_image}
                width={0}
                height={0}
                sizes='100vw'
                alt={row?.original?.team_one_name}
              />
            ) : (
              <Image
                src='/default-placeholder.png'
                width={0}
                height={0}
                sizes='100vw'
                className='h-10 w-10 rounded-full'
                alt={row?.original?.team_one_name}
              />
            )}

            <span className='ml-2'>{row?.original?.team_one_name}</span>
          </div>
        )
      },
      {
        accessorKey: "team_two_name",
        header: "Team Two",
        id: "team_two_image",
        Cell: ({ row }: { row: { original: { team_two_image: string; team_two_name: string } } }) => (
          <div className='flex items-center'>
            {row?.original?.team_two_image ? (
              <Image
                className='h-10 w-10 rounded-full'
                src={row?.original?.team_two_image}
                width={0}
                height={0}
                sizes='100vw'
                alt={row?.original?.team_two_name}
              />
            ) : (
              <Image
                src='/default-placeholder.png'
                width={0}
                height={0}
                sizes='100vw'
                className='h-10 w-10 rounded-full'
                alt={row?.original?.team_two_name}
              />
            )}

            <span className='ml-2'>{row?.original?.team_two_name}</span>
          </div>
        )
      },
      {
        accessorKey: "match_title",
        header: "Title & Time",
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { match_title: string; time: string } } }) => (
          <div>
            <p className='mb-1 text-center text-sm font-medium'>{row.original.match_title}</p>
            <p className='text-center'>{moment(row.original.time).format("MMMM Do YYYY / h:mm")}</p>
          </div>
        )
      },
      {
        accessorKey: "sports_type_name",
        header: "Sport Type",
        columnDefType: "display",
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { sports_type_name: string } } }) => {
          return row.original.sports_type_name == "football" ? (
            <Badge color='warning' variant='outline'>
              Football
            </Badge>
          ) : (
            <Badge variant='outline'>Cricket</Badge>
          );
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
        Cell: ({ row }: { row: { original: { id: number; match_title: string; streaming_sources: any[] } } }) => (
          <div>
            <LiveMatchActions
              id={row.original.id}
              setDeleteItem={setDeleteItem}
              setDeleteModalState={setDeleteModalState}
              setSourcesModal={setSourcesModal}
              setSourcesList={setSourcesList}
              sources={row.original.streaming_sources}
              description={`Are you sure you want to delete this "${row.original.match_title}" match?`}
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
    rowCount: liveMatches?.data?.totalDocs as number,
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
    state: { isLoading: finalDataLoading, showProgressBars: isFetching, pagination },
    enableRowDragging: true,
    enableRowOrdering: true,
    enableSorting: false,
    autoResetPageIndex: false,
    // paginationDisplayMode: "pages",
    // enableFilters: false,
    // enableFullScreenToggle: false,
    // enableColumnVirtualization: false,
    // enableRowNumbers: true,
    // enablePinning: true,
    mantineRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow }: { hoveredRow: any; draggingRow: any } = table.getState();

        if (draggingRow && hoveredRow) {
          let copiedArray = [...(finalData as readonly any[])];
          const elementToMove = copiedArray.splice(draggingRow.index as number, 1)[0];
          copiedArray.splice(hoveredRow.index, 0, elementToMove);

          const updatedArray = copiedArray.map((obj: any, index: number) => ({
            ...obj,
            position: index + 1
          }));

          // Match Sorting
          sortMatch(updatedArray);
          setFinalData(updatedArray as never[]);
        }
      }
    })
  });

  return (
    <>
      <MantineProvider
        theme={{
          ...globalTheme,
          primaryShade: 5,
          colorScheme: (theme as ColorScheme) || "light"
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>

      <LiveMatchDeleteModal
        id={deleteItem?.id}
        description={deleteItem?.description}
        deleteModalState={deleteModalState}
        setDeleteModalState={setDeleteModalState}
      />

      <LiveMatchSourcesModal
        setSourcesList={setSourcesList}
        sourcesList={sourcesList}
        sourcesModal={sourcesModal}
        setSourcesModal={setSourcesModal}
      />
    </>
  );
}
