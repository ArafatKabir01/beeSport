import Link from "next/link";
import { Button } from "rizzui";

export default function FixtureCard() {
  return (
    <div className='relative mx-2 my-2 lg:mx-0'>
      <Link
        className={"h-24 flex p-3 justify-between py-7 items-center bg-[#F8F8FA] text-md hover:bg-[#E5E7EB] lg:h-full"}
        href={`/match/preview/team1-vs-team2/8923`}
      >
        <div>
          <div className='flex gap-5 '>
            <img src='/images/team_placeholder.png' alt='League-Img' className='w-9 h-9 rounded-md' />
            <div>
              <h2>01:00 - Apr 18,</h2>
              <h2 className='text-sm text-gray-400'>UEFA Champions Lea..</h2>
            </div>
          </div>
          <div></div>
        </div>
        <div className='flex items-center gap-3 text-md font-bold '>
          <div className='flex justify-center items-center'>
            <h2>Team 1</h2>
            <img src='/images/team_placeholder.png' alt='team-image' className='w-7 h-7 mx-2' />
          </div>
          <div className='w-16 h-8 bg-slate-400 rounded-md flex justify-center items-center'>
            <p className='text-lg font-normal'> 0 - 0 </p>
          </div>
          <div className='flex justify-center items-center'>
            <img src='/images/team_placeholder.png' alt='team-image' className='w-7 h-7 mx-2' />
            <h2>Team 2</h2>
          </div>
        </div>
        <div>
          {" "}
          <Button className='bg-[#EE1E46] text-white hover:bg-black'>Watch</Button>
        </div>
      </Link>
    </div>
  );
}
