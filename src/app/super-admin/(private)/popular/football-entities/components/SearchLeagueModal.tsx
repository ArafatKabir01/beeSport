import { useGetAllNewsLeagueQuery } from "@/features/front-end/news/newsApi";
import { useAddNewsLeagueMutation } from "@/features/super-admin/news-league/newsLeague";
import { useLeagueSearchQuery } from "@/features/super-admin/popular-football-entity/popularFootballEntityApi";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsXCircleFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { ActionIcon, Input, Loader, Modal, Title } from "rizzui";

export default function SearchLeagueModal({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skip, setSkip] = useState(true);
  const { data, isLoading, isFetching } = useLeagueSearchQuery(debounceText, { skip });
  const {
    data: newsLeague,
    isLoading: newsLeagueLoading,
    isFetching: newsLeagueFetching,
    refetch
  } = useGetAllNewsLeagueQuery(undefined);

  useEffect(() => {
    if (debounceText.length >= 3) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [data, debounceText]);

  const selectedLeagueNames = newsLeague?.data?.docs?.map((item: any) => item.name);
  const suggestedLeagueData = data?.data.filter((item: any) => !selectedLeagueNames?.includes(item?.name));
  const [addNewsLeague, { data: NewsLeagueResponse, isSuccess: loginSuccess, isError: loginError }] =
    useAddNewsLeagueMutation();
  useEffect(() => {
    if (loginSuccess && NewsLeagueResponse?.status && !loginError) {
      toast.success(NewsLeagueResponse?.message);
      refetch();
    }
  }, [NewsLeagueResponse, loginError, loginSuccess, refetch]);
  const handleLeagueData = (data: any) => {
    addNewsLeague({
      name: data.name,
      status: "1"
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
                    <HiPlus onClick={() => handleLeagueData(item)} className='text-xl text-error cursor-pointer' />
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
