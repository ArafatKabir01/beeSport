import getShortName from "@/utils/get-short-name";
import Link from "next/link";
import { Button } from "rizzui";

function formatDate(inputDate: string): string {
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date = new Date(inputDate);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");

  return `${hours}:${minutes} - ${month} ${day}`;
}

export default function FixtureCard({ fixtureData }: any) {
  return (
    <div className='relative mx-2 my-2 lg:mx-0'>
      {fixtureData?.map((fixture: any) => (
        <Link
          key={fixture._id}
          className='h-24 my-2 p-2 grid grid-cols-12 w-full py-1 lg:py-7 items-center bg-[#F8F8FA] text-md hover:bg-[#E5E7EB] lg:h-full'
          href={`/match/${fixture?.participants[0]?.name}-vs-${fixture?.participants[1]?.name}/${fixture?.fixtureId}`}
        >
          <div className='flex gap-5 col-span-12 lg:col-span-3'>
            <img
              src={fixture?.league?.image ? fixture?.league?.image : "/images/team_placeholder.png"}
              alt='League-Img'
              className='w-9 h-9 rounded-md hidden lg:block'
            />
            <div className='flex items-center gap-4 lg:block text-xs w-full'>
              <h2>{formatDate(fixture?.startingAt)}</h2>
              <h2 className='text-xs lg:text-sm text-gray-400'>{fixture?.league?.name}</h2>
            </div>
          </div>
          <div className='grid grid-cols-12 lg:grid-cols-5 w-full justify-items-center lg:justify-items-center text-md font-normal lg:font-bold col-span-12 lg:col-span-5 items-center my-2 lg:my-0 '>
            <div className='flex justify-end items-center  col-span-5 lg:col-span-2 w-full '>
              <h2 className='text-sm '>{getShortName(fixture?.participants[0]?.name)}</h2>
              <img
                src={fixture?.participants[0]?.image ? fixture?.participants[0]?.image : "/images/team_placeholder.png"}
                alt='team-image'
                className='w-7 h-7 lg:h-8 lg:w-8 mx-1'
              />
            </div>
            <div className='w-12 h-7 lg:w-16 lg:h-8 col-span-2 lg:col-span-1  bg-slate-400 rounded-md flex justify-center items-center p-1'>
              {/* <h2>{formatDate(fixture?.startingAt)}</h2> */}
              <p className='text-lg font-normal'>
                {fixture?.participants[0]?.score ? fixture?.participants[0]?.score : 0} -{" "}
                {fixture?.participants[1]?.score ? fixture?.participants[1]?.score : 0}
              </p>
              {/* <h2 className='text-sm text-gray-400'>{fixture?.league?.name}</h2> */}
            </div>
            <div className='flex justify-start items-center col-span-5 lg:col-span-2 w-full'>
              <img
                src={fixture?.participants[1]?.image ? fixture?.participants[1]?.image : "/images/team_placeholder.png"}
                alt='team-image'
                className='w-7 h-7 lg:h-8 lg:w-8 mx-1'
              />
              <h2 className='text-sm '>{getShortName(fixture?.participants[1]?.name)}</h2>
            </div>
          </div>
          <div className='justify-self-end col-span-3 hidden lg:block'>
            <Button className='bg-[#EE1E46] text-white hover:bg-black'>Watch</Button>
          </div>
        </Link>
      ))}
    </div>
  );
}
