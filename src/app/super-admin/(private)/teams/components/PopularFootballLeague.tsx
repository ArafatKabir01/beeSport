import {
  useDeletePopularLeagueMutation,
  useGetPopularLeaguesQuery
} from "@/features/super-admin/popular-league/popularLeagueApi";
import { useGetTeamsQuery, useDeleteTeamMutation } from "@/features/super-admin/teams/teamApi";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
import { ImBin } from "react-icons/im";
import { Button, Popover, Text, Title } from "rizzui";
import SearchFootballLeague from "./SearchFootballLeague";

export default function PopularFootballLeague() {
  const [leagueList, setLeagueList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data: teams, isLoading: footballLeaguesLoading, refetch } = useGetTeamsQuery({});


  const [deleteTeam, { isSuccess: deleteTeamSuccess, isError: deleteTeamError }] =
  useDeleteTeamMutation();

  useEffect(() => {
    if (deleteTeamError) {
      toast.error("Something went wrong!");
    }

    if (deleteTeamSuccess) {
      toast.success("League Deleted Successfully!");
      refetch();
    }
  }, [deleteTeamError, deleteTeamSuccess, refetch]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = leagueList.findIndex((item: any) => item.id === active.id);
      const overIndex = leagueList.findIndex((item: any) => item.id === over.id);
      const newItems = arrayMove(leagueList, activeIndex, overIndex);
      newItems.forEach((item: any, index: number) => {
        item.position = index + 1;
      });

      setLeagueList(newItems);

      const leagueIdWithPosition = newItems.map((item: any) => {
        return { id: item.id, position: item.position };
      });

      try {
        // setIsSorting(true);
        // const { data } = await mahaScoreBackendUrl.post(
        //   '/api/admin/popular-leagues/sort',
        //   leagueIdWithPosition,
        //   {
        //     headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
        //   }
        // );
        // if (data?.status) {
        //   // setIsSorting(false);
        //   toast.success(data?.message);
        // }
      } catch (err) {
        // setIsSorting(false);
        toast.error("Failed to sort!");
      }
    }
  };

  return (
    <section className={"@5xl:grid @5xl:grid-cols-6"}>
      <header className='flex items-center justify-between col-span-2 mb-4 @5xl:mb-0'>
        <h3 className='text-lg font-semibold uppercase'>Popular Team List</h3>
        <Button size='sm' onClick={() => setIsOpen(true)}>
          <HiPlus className='text-lg' /> Add New Team
        </Button>
      </header>

      <div className='mt-5 w-full bg-white px-3'>
        <div>
          <ul>
            {teams?.data?.map((team: any) => {
              return (
                <li key={team.teamId} className='mb-3 rounded-md border border-slate-200 p-2'>
                  <div className='grid grid-cols-12'>
                    <div className='flex items-center gap-2 col-span-6'>
                      <img src={team.image} alt={team.name} className='w-8 h-8 rounded-full' />
                      <span className='font-medium text-base'>{team.name}</span>
                    </div>
                    {/* <ImBin className='text-xl text-error cursor-pointer' /> */}
                    <div className='col-span-6 flex justify-end'>
                      <Popover enableOverlay placement='left-start'>
                        <Popover.Trigger>
                          <Button variant='outline' color='danger'>
                            <ImBin className='text-xl text-error cursor-pointer' />
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                          {({ setOpen }) => (
                            <div className='w-56'>
                              <Title as='h6'>Delete Confirmation</Title>
                              <Text>Are you sure you want to delete the team?</Text>
                              <div className='flex justify-end gap-3 mb-1'>
                                <Button size='sm' variant='outline' onClick={() => setOpen(false)}>
                                  No
                                </Button>
                                <Button
                                  size='sm'
                                  onClick={() => {
                                    deleteTeam(team.teamId);
                                    setOpen(false);
                                  }}
                                >
                                  Yes
                                </Button>
                              </div>
                            </div>
                          )}
                        </Popover.Content>
                      </Popover>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* <div className="w-full rounded-box">
            {popularLeaguesLoading ? (
              <div className="flex h-44 justify-center p-5">
                <div className="animate-bounce">
                  <FaVolleyballBall className="animate-spin text-3xl text-secondary" />
                </div>
              </div>
            ) : popularLeagues?.data.length > 0 ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={leagueList}
                >
                  {popularLeagues?.data.map((league) => (
                    <LeagueItem
                      key={league._id}
                      league={league}
                      selectPointTableHandler={selectPointTableHandler}
                      deleteLeagueHandler={deleteLeagueHandler}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="mb-2 rounded-md border-slate-100 p-2 text-center font-medium">
                No Data Found!
              </div>
            )}
          </div> */}
        </div>
      </div>

      <SearchFootballLeague isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
