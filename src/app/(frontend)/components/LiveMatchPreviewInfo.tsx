import Countdown from "./Countdown";

export default function LiveMatchPreviewInfo({ match }: any) {
  return (
    <div className='relative mt-5 h-[50vh] sm:h-[65vh] mb-5'>
      <img src='/images/stadium.jpg' alt='logo' className='w-full h-full bg-primary' />
      <div className='absolute inset-0 backdrop-blur-sm'>
        <div className='flex flex-col items-center justify-center px-8 h-full gap-5 text-gray-800'>
          <div className='flex items-center justify-center gap-10'>
            <div className='flex flex-col items-center gap-1'>
              <img src={match?.participants[0].image} alt='Team One Image' className='w-12 h-12 p-0.5 rounded-full' />
              <h4 className='text-white text-center'>{match?.participants[0].name}</h4>
            </div>
            <div className='w-14  h-14 px-5 bg-warning font-bold rounded-full flex items-center justify-center'>vs</div>
            <div className='flex flex-col items-center gap-1'>
              <img src={match?.participants[1].image} alt='Team Two Image' className='w-12 h-12 p-0.5 rounded-full' />
              <h4 className='text-white text-center'>{match?.participants[1].name}</h4>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-2 text-white'>
            <p> The match will start in </p>
            <Countdown date={match?.starting_at_timestamp} />
          </div>
          <h4 className='text-base sm:text-xl font-medium text-white text-center'>
            Streaming will start before <span className='text-[#f4511e] font-semibold'>15 mins</span> of the match
            started
          </h4>
        </div>
      </div>
    </div>
  );
}
