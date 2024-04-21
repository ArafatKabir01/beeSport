import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
import { ImBin } from "react-icons/im";
import { Button } from "rizzui";
import SearchLeagueModal from "./SearchLeagueModal";

export default function PopularLeague() {
  const [singleLeague, setSingleLeague] = useState(null);
  const [leagueList, setLeagueList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      } finally {
        // setIsSorting(false);
      }
    }
  };

  return (
    <section className={"@5xl:grid @5xl:grid-cols-6"}>
      <header className='flex items-center justify-between col-span-2 mb-4 @5xl:mb-0'>
        <h3 className='text-lg font-semibold uppercase'>Popular Leagues List</h3>
        <Button size='sm' onClick={() => setIsOpen(true)}>
          <HiPlus className='text-lg' /> Add New League
        </Button>
      </header>

      <div className='mt-5 w-full bg-white px-3'>
        <div>
          <ul>
            <li className='mb-3 rounded-md border border-slate-200 p-2'>
              <div className='flex justify-between gap-2 items-center'>
                <div className='flex items-center gap-2'>
                  <img src='/images/earth-americas.png' alt='logo' className='w-8 h-8 rounded-full' />
                  <span className='font-medium text-base'>Premier League</span>
                </div>
                <ImBin className='text-xl text-error cursor-pointer' />
              </div>
            </li>
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

      <SearchLeagueModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
