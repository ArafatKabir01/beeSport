"use client";

import { useGetAllNewsQuery } from "@/features/super-admin/news/newsApi";
import { ColorScheme, MantineProvider, useMantineTheme } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import NewsAction from "./NewsAction";
import NewsDeleteModal from "./NewsDeleteModal";

export default function NewsHome() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const [deleteItem, setDeleteItem] = useState<{
    _id: any;
    description: string;
  } | null>(null);

  const [finalData, setFinalData] = useState([]);
  const { data: newsData, isLoading, isError, isFetching } = useGetAllNewsQuery(undefined);
  const [deleteModalState, setDeleteModalState] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      setFinalData(newsData?.data?.docs || []);
    }
  }, [isError, isLoading, newsData]);

  const handleDeleteModal = (deletedItem: { _id: any; description: string }) => {
    setDeleteItem(deletedItem);
    setDeleteModalState(true);
  };

  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "title",
        header: "News List",
        id: "img&title",
        Cell: ({ row }: { row: { original: { image: string; title: string } } }) => (
          <div className='flex items-center'>
            {row?.original?.image ? (
              <img className='h-20 w-32 rounded-md' src={row?.original?.image} alt={row?.original?.title} />
            ) : (
              <img src='/default-placeholder.png' className='h-20 w-32 rounded-md' alt={row?.original?.title} />
            )}

            <span className='ml-2'>
              {row?.original?.title.length > 25 ? `${row?.original?.title.substring(0, 25)}...` : row?.original?.title}
            </span>
          </div>
        )
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
            <span className='badge rounded-full bg-success'>Active</span>
          ) : (
            <span className='bg-danger badge rounded-full'>Inactive</span>
          );
        }
      },
      {
        id: "edit",
        header: "Action",
        columnDefType: "display",
        enableColumnOrdering: false,
        Cell: ({ row }: { row: { original: { _id: any; title: string } } }) => (
          <div>
            <NewsAction
              _id={row.original._id}
              handleDeleteModal={handleDeleteModal}
              description={`Are you sure you want to delete?`}
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

  const table = useMantineReactTable({
    columns,
    data: finalData || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // paginationDisplayMode: "pages",
    mantinePaginationProps: {
      rowsPerPageOptions: ["5", "10", "20", "50", "100"],
      color: "rgb(56, 114, 250)",
      withEdges: true
    },
    rowCount: finalData?.length as number,
    initialState: {
      density: "xs",
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    },
    enableDensityToggle: false,
    enableRowNumbers: true,
    state: { isLoading: isLoading, showProgressBars: isFetching }
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

      <NewsDeleteModal
        id={deleteItem?._id}
        description={deleteItem?.description}
        deleteModalState={deleteModalState}
        setDeleteModalState={setDeleteModalState}
      />
    </>
  );
}
