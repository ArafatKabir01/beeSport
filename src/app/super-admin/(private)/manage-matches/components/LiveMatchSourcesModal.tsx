import { useSortStreamSourcesMutation } from "@/features/super-admin/live-match/liveMatchApi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BsSortUpAlt, BsXCircleFill } from "react-icons/bs";
import { ActionIcon, Modal, Title } from "rizzui";
import StreamingLink from "./StreamingLink";

export default function LiveMatchSourcesModal({
  sourcesList,
  setSourcesList,
  sourcesModal,
  setSourcesModal
}: {
  sourcesList: any[];
  sourcesModal: boolean;
  setSourcesList: (data: any) => void;
  setSourcesModal: (data: boolean) => void;
}) {
  const [sortSources, { isSuccess, isError }] = useSortStreamSourcesMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong in Sorting!");
    }

    if (isSuccess) {
      toast.success("Sources Sorting done successfully!");
    }
  }, [isError, isSuccess]);

  async function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = sourcesList.findIndex((item) => item.id === active.id);
      const overIndex = sourcesList.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(sourcesList, activeIndex, overIndex);

      const sourceIdWithPosition = newItems.map((item, index) => {
        return {
          _id: item._id,
          position: ++index
        };
      });

      setSourcesList(newItems);
      sortSources(sourceIdWithPosition); // Sort Sources
    }
  }

  return (
    <Modal isOpen={sourcesModal} onClose={() => setSourcesModal(false)}>
      <div className='m-auto px-7 pt-6 pb-8'>
        <div className='mb-7 flex items-center justify-between'>
          <Title as='h3' className='flex items-center'>
            <BsSortUpAlt className='text-error mr-1' />
            Sort in Sources
          </Title>
          <ActionIcon size='sm' variant='text' onClick={() => setSourcesModal(false)} className='hover:text-error'>
            <BsXCircleFill className='text-2xl' />
          </ActionIcon>
        </div>
        <div className='grid grid-cols-1 gap-y-6 gap-x-5 [&_label>span]:font-medium'>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <ul>
              {sourcesList.length > 0 && (
                <SortableContext strategy={verticalListSortingStrategy} items={sourcesList}>
                  {sourcesList?.length > 0 ? (
                    sourcesList.map((source) => <StreamingLink key={source._id} source={source} />)
                  ) : (
                    <li className='mb-2 rounded-md border-2 border-violet-500 bg-white p-2'>
                      <a>No Streaming Link Available!</a>
                    </li>
                  )}
                </SortableContext>
              )}
            </ul>
          </DndContext>
        </div>
      </div>
    </Modal>
  );
}
