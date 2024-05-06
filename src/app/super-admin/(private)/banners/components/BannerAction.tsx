"use client";

import PencilIcon from "@/components/icons/pencil";
import TrashIcon from "@/components/icons/trash";
import { ActionIcon } from "@/components/ui/action-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { routes } from "@/config/routes";
import Link from "next/link";

type TNewsActionsProps = {
  _id: any;
  description: string;
  handleDeleteModal: (data: { _id: any; description: string }) => void;
};

export default function BannerAction({ _id, description, handleDeleteModal }: TNewsActionsProps) {
  return (
    <div className='space-x-2'>
      <Tooltip size='sm' content={"Update"} placement='top' color='invert'>
        <Link href={routes.admin.banners.edit(_id)}>
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
          onClick={() => handleDeleteModal({ _id, description })}
        >
          <TrashIcon className='h-4 w-4' />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
