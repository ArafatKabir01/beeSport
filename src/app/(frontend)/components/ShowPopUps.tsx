export default function ShowPopUps({ blockVideoPlayer, showPopup, session, seconds }: any) {
  return (
    <>
      {(blockVideoPlayer || showPopup) && (
        <div
          className='p-2 lg:p-8 absolute z-[9] pop-up-modal h-full w-full'
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)"
          }}
        >
          <div className="bg-[url('/images/popup_bg.png')] bg-cover bg-center bg-no-repeat h-full w-full backdrop-blur-sm bg-black bg-opacity-[80] shadow-sm shadow-gray-500 rounded-[20px] lg:rounded-[100px] flex items-center justify-center p-4 z-[10]">
            {blockVideoPlayer ? (
              <div className='flex items-center justify-center backdrop-blur-xl bg-white/30 rounded-2xl p-4 lg:p-10 flex-col gap-2 lg:gap-5'>
                {session ? (
                  <>
                    {" "}
                    <p className='text-error text-center text-sm lg:text-xl'>
                      Your free watch time for today has expired.
                    </p>
                    <p className='uppercase text-white text-center hidden lg:block lg:text-xl text-sm'>
                      Upgrade your account for better watching experience
                    </p>
                    {/* <ShowYearlyPackage isCard={true} /> */}
                  </>
                ) : (
                  <>
                    <p className='uppercase text-white text-center lg:text-xl text-xs px-4'>
                      Your free watch time for today has expired. Please sign in to continue watch our contents.
                    </p>
                    <label
                      //   onClick={() => window.authModal.showModal()}
                      className='btn btn-primary rounded-md btn-xs sm:btn-sm px-8'
                    >
                      Sign In
                    </label>
                  </>
                )}
              </div>
            ) : (
              <div className='flex items-center justify-center flex-col gap-5 backdrop-blur-xl bg-white/30 rounded-2xl p-4'>
                {session ? (
                  <>
                    <p className='text-white text-center hidden lg:block'>
                      Please buy a subscription to watch live matches in full screen
                    </p>
                    {/* <ShowYearlyPackage isCard={true} /> */}
                  </>
                ) : (
                  <>
                    <p className='text-white text-center text-sm sm:text-base uppercase'>
                      Please Sign In to remove popup and watch in fullscreen mode
                    </p>
                    <label
                      //   onClick={() => window.authModal.showModal()}
                      className='btn btn-secondary rounded-md btn-xs sm:btn-sm px-2'
                    >
                      Sign In
                    </label>
                  </>
                )}
                <p className='text-xs text-white text-center'>This pop up will close in {seconds} seconds</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
