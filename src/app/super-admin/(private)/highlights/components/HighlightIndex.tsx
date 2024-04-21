"use client";

import { useGetHighlightsQuery } from "@/features/super-admin/highlight/highlightApi";
import { ColorScheme, MantineProvider, useMantineTheme } from "@mantine/core";
import { MRT_PaginationState, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "rizzui";
import HighlightActions from "./HighlightActions";
import HighlightDeleteModal from "./HighlightDeleteModal";

export default function HighlightIndex() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const [finalData, setFinalData] = useState([]);
  const [finalDataLoading, setFinalDataLoading] = useState(true);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number | string; description: string } | null>(null);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });

  const {
    data: highlights,
    isLoading: highlightsLoading,
    isError: highlightsError,
    isFetching: highlightsFetching
  } = useGetHighlightsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  useEffect(() => {
    if (!highlightsLoading && !highlightsError) {
      setFinalData(highlights?.data?.docs ?? []);
      setFinalDataLoading(false);
    }
  }, [highlights, highlightsError, highlightsLoading]);

  // Define Columns Data
  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        Cell: ({ row }: { row: { original: { title: string } } }) => (
          <div>
            {row?.original?.title.length > 25 ? `${row?.original?.title.substring(0, 25)}...` : row?.original?.title}
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
        Cell: ({ row }: { row: { original: { date: string } } }) => (
          <div>
            <p className='text-center'>{moment(row.original.date).format("MMMM Do YYYY")}</p>
          </div>
        )
      },
      {
        accessorKey: "videoType",
        header: "Video Type",
        columnDefType: "display",
        mantineTableHeadCellProps: {
          align: "center"
        },
        mantineTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }: { row: { original: { videoType: string } } }) => {
          return row.original.videoType == "source" ? (
            <Badge color='warning' variant='outline'>
              Source
            </Badge>
          ) : (
            <Badge variant='outline'>Youtube</Badge>
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
        Cell: ({ row }: { row: { original: { _id: string; title: string } } }) => (
          <div>
            <HighlightActions
              setDeleteModalState={setDeleteModalState}
              id={row.original._id}
              description={`Are you sure you want to delete this "${row.original.title}" highlight?`}
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

      <HighlightDeleteModal
        id={deleteItem?.id}
        description={deleteItem?.description}
        deleteModalState={deleteModalState}
        setDeleteModalState={setDeleteModalState}
      />
    </>
  );
}
