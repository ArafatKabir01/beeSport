export default function FixtureCardNew() {
  return (
    <div className='relative mx-2 my-2 lg:mx-0 flex items-center justify-between gap-5 flex-wrap'>
      {/* <Link
        className={"h-24 flex p-3 justify-between items-center bg-[#F8F8FA] text-md hover:bg-[#E5E7EB] lg:h-full"}
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
          <Button color='danger'>Danger</Button>
        </div>
      </Link> */}
      <div className='w-[300px] h-[250px] bg-[#F3F4F6] rounded-md flex items-center justify-center p-4 she hover:drop-shadow-lg cursor-pointer'>
        <div>
          <div className='flex gap-5 items-center'>
            <div className='flex flex-col justify-center items-center'>
              <img
                src='https://preview.colorlib.com/theme/soccer/images/logo_1.png'
                alt='team-image'
                className='w-14 h-14'
              />
              <h2>Team1</h2>
            </div>
            <div className='flex flex-col justify-center items-center w-16 h-3 rounded-md bg-[#EE1E46] text-center p-4'>
              <h2 className='text-white font-bold'>VS</h2>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <img
                src='https://preview.colorlib.com/theme/soccer/images/logo_2.png'
                alt='team-image'
                className='w-14 h-14'
              />
              <h2>Team1</h2>
            </div>
          </div>
          <div className='mt-3'>
            <div className='text-center '>
              <h2 className='text-[#EE1E46] font-bold text-xl'>World Cup League</h2>
              <p>December 20th, 2020</p>
              <p>9:30 AM GMT+0</p>
              <p className='text-[#EE1E46] font-bold animate-pulse'>LIVE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
