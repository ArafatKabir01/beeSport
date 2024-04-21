"use client";

import PencilIcon from "@/components/icons/pencil";
import TrashIcon from "@/components/icons/trash";
import { ActionIcon } from "@/components/ui/action-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { routes } from "@/config/routes";
import Link from "next/link";

type LiveMatchActionsProps = {
  id: number | string;
  description: string;
  setDeleteItem: (data: { id: number | string; description: string }) => void;
  setDeleteModalState: (data: boolean) => void;
};

export default function HighlightActions({
  id,
  description,
  setDeleteItem,
  setDeleteModalState
}: LiveMatchActionsProps) {
  return (
    <div className='space-x-2'>
      <Tooltip size='sm' content={"Edit"} placement='top' color='invert'>
        <Link href={routes.admin.highlights.edit(id)}>
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
