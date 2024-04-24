"use client";

import PencilIcon from "@/components/icons/pencil";
import TrashIcon from "@/components/icons/trash";
import { ActionIcon } from "@/components/ui/action-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { routes } from "@/config/routes";
import Link from "next/link";
import { BsSortUpAlt } from "react-icons/bs";
import { FaRegClone } from "react-icons/fa";

type LiveMatchActionsProps = {
  id: number;
  description: string;
  setDeleteItem: (data: { id: number; description: string }) => void;
  setDeleteModalState: (data: boolean) => void;
  setSourcesModal: (data: boolean) => void;
  setSourcesList: (date: any[]) => void;
  sources: any[];
};

export default function LiveMatchActions({
  id,
  description,
  sources,
  setDeleteItem,
  setSourcesList,
  setSourcesModal,
  setDeleteModalState
}: LiveMatchActionsProps) {
  return (
    <div className='space-x-2'>
      <Tooltip size='sm' content={"Sort Sources"} placement='top' color='invert'>
        <Link href={routes.admin.manageLive.home}>
          <ActionIcon
            size='sm'
            variant='outline'
            aria-label={"Sorting Sources"}
            onClick={() => {
              setSourcesList(sources);
              setSourcesModal(true);
            }}
          >
            <BsSortUpAlt className='h-4 w-4' />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size='sm' content={"Clone"} placement='top' color='invert'>
        <Link href={routes.admin.manageLive.clone(id)}>
          <ActionIcon size='sm' variant='outline' aria-label={"Clone Live Match"}>
            <FaRegClone className='h-4 w-4' />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size='sm' content={"Edit"} placement='top' color='invert'>
        <Link href={routes.admin.manageLive.edit(id)}>
          <ActionIcon size='sm' variant='outline' aria-label={"Edit Live Match"}>
            <PencilIcon className='h-4 w-4' />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size='sm' content={"Delete"} placement='top' color='invert'>
        <ActionIcon
          size='sm'
          variant='outline'
          aria-label={"Delete Live Match"}
          onClick={() => {
            setDeleteItem({ id, description });
            setDeleteModalState(true);
          }}
        >
          <TrashIcon className='h-4 w-4' />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
