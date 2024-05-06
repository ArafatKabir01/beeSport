import {
  useAddPopularLeagueMutation,
  useGetPopularLeaguesQuery,
  useLeagueSearchQuery
} from "@/features/super-admin/popular-league/popularLeagueApi";
import { useTeamSearchQuery, useAddTeamMutation, useGetTeamsQuery } from "@/features/super-admin/teams/teamApi";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsXCircleFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { ActionIcon, Input, Loader, Modal, Title } from "rizzui";

export default function SearchTeam({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);
  const [skip, setSkip] = useState(true);
  const {data : searchTeams, isFetching} = useTeamSearchQuery(debounceText, { skip });
  const { data: teams, isLoading: footballLeaguesLoading, refetch : footballLeagueRefetch } = useGetTeamsQuery({});


  const [
    addTeam,
    { data: addTeamResponse, isSuccess: addTeamSuccess, isError: addTeamError }
  ] = useAddTeamMutation();

  useEffect(() => {
    if (debounceText.length >= 3) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [searchTeams, debounceText]);

  useEffect(() => {
    if (addTeamError) {
      toast.error("already have created team");
    }

    if (addTeamSuccess) {
      if (addTeamResponse?.status) {
        toast.success("Team Added Successfully!");
        footballLeagueRefetch();
      } else {
        toast.error(addTeamResponse?.message || "Something went wrong!");
      }
    }
  }, [addTeamError, addTeamResponse, addTeamSuccess, footballLeagueRefetch]);

  const selectedTeamIds = teams?.data?.map((item: any) => item.teamId);
  const suggestedTeamData = searchTeams?.data?.filter((item: any) => !selectedTeamIds?.includes(item?.id));

  // Add Handler
  const handleLeagueData = (data: any) => {

    addTeam({
      teamId : data?.id,
      name : data?.name,
      image : data?.image_path
    })
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} customSize='600px'>
      <div className='m-auto px-7 pt-6 pb-8'>
        <div className='mb-7 flex items-center justify-between'>
          <Title as='h3' className='flex items-center'>
            <PiListMagnifyingGlassLight className='text-2xl mr-1' />
            Search & Add Team
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
            placeholder='Team'
          />
          <div className='h-64 overflow-y-auto'>
            <ul>
              {suggestedTeamData?.map((item: any) => (
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

              {!searchTeams?.status && (
                <li className='mb-3 rounded-md border border-slate-200 p-2'>
                  <div className='flex justify-center items-center'>No Team Available!</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
