import {
  useAddPopularLeagueMutation,
  useGetPopularLeaguesQuery,
  useLeagueSearchQuery
} from "@/features/super-admin/popular-league/popularLeagueApi";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsXCircleFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { ActionIcon, Input, Loader, Modal, Title } from "rizzui";

export default function SearchFootballLeague({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);
  const [skip, setSkip] = useState(true);
  const { data, isFetching } = useLeagueSearchQuery(debounceText, { skip });

  const {
    data: footballLeagues,
    isLoading: footballLeaguesLoading,
    refetch: footballLeagueRefetch
  } = useGetPopularLeaguesQuery("football");

  const [
    addFootballLeague,
    { data: addFootballLeagueResponse, isSuccess: addFootballLeagueSuccess, isError: addFootballLeagueError }
  ] = useAddPopularLeagueMutation();

  useEffect(() => {
    if (debounceText.length >= 3) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [data, debounceText]);

  useEffect(() => {
    if (addFootballLeagueError) {
      toast.error("Something went wrong!");
    }

    if (addFootballLeagueSuccess) {
      if (addFootballLeagueResponse?.status) {
        toast.success("Football League Added Successfully!");
        footballLeagueRefetch();
      } else {
        toast.error(addFootballLeagueResponse?.message || "Something went wrong!");
      }
    }
  }, [addFootballLeagueError, addFootballLeagueResponse, addFootballLeagueSuccess, footballLeagueRefetch]);

  const selectedLeagueIds = footballLeagues?.data?.docs?.map((item: any) => item.id);
  const suggestedLeagueData = data?.data?.filter((item: any) => !selectedLeagueIds?.includes(item?.id));

  // Add Handler
  const handleLeagueData = (data: any) => {
    addFootballLeague({
      id: data?.id,
      name: data?.name,
      image_path: data?.image_path,
      country: data?.country?.name,
      category: "football",
      currentSeason: data?.currentseason?.id
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} customSize='600px'>
      <div className='m-auto px-7 pt-6 pb-8'>
        <div className='mb-7 flex items-center justify-between'>
          <Title as='h3' className='flex items-center'>
            <PiListMagnifyingGlassLight className='text-2xl mr-1' />
            Search & Add League
          </Title>
          <ActionIcon size='sm' variant='text' onClick={() => setIsOpen(false)} className='hover:text-error'>
            <BsXCircleFill className='text-2xl' />
          </ActionIcon>
        </div>
        <div className='grid grid-cols-1 gap-y-6 gap-x-5 [&_label>span]:font-medium'>
          <Input
            label='Search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<HiMiniMagnifyingGlass className='w-4 text-xl' />}
            suffix={<RxCross2 className='w-4 text-xl cursor-pointer' onClick={() => setSearchText("")} />}
            placeholder='Premier League'
          />
          <div className='h-64 overflow-y-auto'>
            <ul>
              {suggestedLeagueData?.map((item: any) => (
                <li key={item?.id} className='mb-3 rounded-md border border-slate-200 p-2'>
                  <div className='flex justify-between gap-2 items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={item?.image_path} alt='logo' className='w-8 h-8 rounded-full' />
                      <span className='font-medium text-base'>{item?.name}</span>
                    </div>
                    <button onClick={() => handleLeagueData(item)}>
                      <HiPlus className='text-xl text-error cursor-pointer' />
                    </button>
                  </div>
                </li>
              ))}

              {isFetching && (
                <li className='mb-3 rounded-md p-2'>
                  <div className='flex justify-center items-center'>
                    <Loader variant='pulse' size='lg' />
                    <Loader variant='pulse' size='lg' />
                    <Loader variant='pulse' size='lg' />
                  </div>
                </li>
              )}

              {!data?.status && (
                <li className='mb-3 rounded-md border border-slate-200 p-2'>
                  <div className='flex justify-center items-center'>No League Available!</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
