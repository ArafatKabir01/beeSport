"use client";

import { useGetAllNewsQuery } from "@/features/super-admin/news/newsApi";
import { useGetAllBannerQuery } from "@/features/super-admin/banner/bannerApi";
import { ColorScheme, MantineProvider, useMantineTheme } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import BannerAction from "./BannerAction";
import BannerDeleteModal from "./BannerDeleteModal";

export default function BannerHome() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const [deleteItem, setDeleteItem] = useState<{
    _id: any;
    description: string;
  } | null>(null);

  const [finalData, setFinalData] = useState([]);
  const { data: bannerData, isLoading, isError, isFetching, isSuccess } = useGetAllBannerQuery(undefined);
  const [deleteModalState, setDeleteModalState] = useState(false);



  useEffect(() => {
    if (!isLoading && !isError) {
      setFinalData(bannerData?.data?.docs || []);
    }
  }, [isError, isLoading, bannerData]);

  const handleDeleteModal = (deletedItem: { _id: any; description: string }) => {
    setDeleteItem(deletedItem);
    setDeleteModalState(true);
  };

  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        id: "img&title",
        Cell: ({ row }: { row: { original: { image: string; title: string } } }) => (
          <div className=''>
            <span className='ml-2'>
              {row?.original?.title.length > 25 ? `${row?.original?.title.substring(0, 25)}...` : row?.original?.title}
            </span>
          </div>
        )
      },
      {
        accessorKey: "image",
        header: "Image",
        id: "img&title",
        Cell: ({ row }: { row: { original: { image: string; title: string } } }) => (
          <img className='h-20 w-32 rounded-md' src={row?.original?.image} alt={row?.original?.title} />
        )
      },

      {
        accessorKey: "fixtureId",
        header: "FixtureId",
        id : "fixtureId"
      },
      {
        id: "edit",
        header: "Action",
        columnDefType: "display",
        enableColumnOrdering: false,
        Cell: ({ row }: { row: { original: { _id: any; title: string } } }) => (
          <div>
            <BannerAction
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

      <BannerDeleteModal
        id={deleteItem?._id}
        description={deleteItem?.description}
        deleteModalState={deleteModalState}
        setDeleteModalState={setDeleteModalState}
      />
    </>
  );
}
