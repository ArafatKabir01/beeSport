import { useDeleteHighlightMutation, useGetHighlightsQuery } from "@/features/super-admin/highlight/highlightApi";
import { useDeleteFixtureMutation } from "@/features/super-admin/fixture/fixtureApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsXCircleFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { ImBin } from "react-icons/im";
import { PiSpinnerLight } from "react-icons/pi";
import { ActionIcon, Button, Modal, Text, Title } from "rizzui";

export default function HighlightDeleteModal({
  description,
  id,
  deleteModalState,
  setDeleteModalState
}: {
  description: string | undefined;
  id: number | undefined | string;
  deleteModalState: boolean;
  setDeleteModalState: (data: boolean) => void;
}) {
  const { refetch } = useGetHighlightsQuery(undefined);
  // const [deleteHighlight, { data, isError, isSuccess }] = useDeleteHighlightMutation();
  const [deleteFixture, { data, isError, isSuccess }] = useDeleteFixtureMutation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteHandler = () => {
    setIsSubmitting(true);
    deleteFixture(id);
  };

  console.log("delete data", data);

  useEffect(() => {
    if (isSuccess && data?.status && !isError) {
      setDeleteModalState(false);
      setIsSubmitting(false);
      toast.success(data?.message);
    }
  }, [data, isError, isSuccess, refetch, setDeleteModalState]);

  return (
    <Modal isOpen={deleteModalState} onClose={() => setDeleteModalState(false)}>
      <div className='m-auto px-7 pt-6 pb-8'>
        <div className='mb-7 flex items-center justify-between'>
          <Title as='h3' className='flex items-center'>
            <ImBin className='text-error' />
            Delete Confirmation!
          </Title>
          <ActionIcon size='sm' variant='text' onClick={() => setDeleteModalState(false)} className='hover:text-error'>
            <BsXCircleFill className='text-2xl' />
          </ActionIcon>
        </div>
        <div className='grid grid-cols-1 gap-y-6 gap-x-5 [&_label>span]:font-medium'>
          <Text as='p' className='font-medium'>
            {description}
          </Text>
        </div>
        <div className='flex justify-end mt-10'>
          <Button
            color='danger'
            type='submit'
            size='sm'
            className='col-span-2 mt-2 uppercase'
            onClick={deleteHandler}
            disabled={isSubmitting}
          >
            Confirm{" "}
            {isSubmitting ? (
              <PiSpinnerLight className='ml-1 animate-spin text-base' />
            ) : (
              <FiCheckCircle className='ml-1 text-base' />
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
