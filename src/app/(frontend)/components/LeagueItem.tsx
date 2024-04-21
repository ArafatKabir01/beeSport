import { ILeague } from "@/types";
import Link from "next/link";

export default function LeagueItem({ league }: { league: ILeague }) {
  return (
    <div className='select-none'>
      <Link href='#' className='mb-3 flex items-center'>
        <img src={league?.image_path} alt={league?.name} className='h-9 w-9 rounded-full' />
        <p className='text-md font-semibold ms-3'>{league?.name}</p>
      </Link>
    </div>
  );
}
