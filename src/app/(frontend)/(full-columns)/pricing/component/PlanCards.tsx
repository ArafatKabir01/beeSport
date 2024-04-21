import { MdOutlineWifiProtectedSetup } from "react-icons/md";
import { Button } from "rizzui";

const PlanCards = () => {
  return (
    <div className='mt-16 my-10'>
      <div className='mb-4'>
        <div className='flex items-center gap-3'>
          <p className='rounded-full w-8 h-8 font-bold text-xl border-2 border-gray-500 flex justify-center items-center'>
            1
          </p>
          <h2 className='font-bold text-xl'>Choose your Watch plan</h2>
        </div>
        <div className='grid grid-cols-3 mt-9 gap-5 content-center place-items-center'>
          {/* card 1 */}
          <div className='w-full h-[200px] rounded-md bg-white shadow-md'>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>1 Month</h2>{" "}
              <h2 className='w-[70px] h-[30px] rounded-full border border-[#0c8982e0] flex items-center justify-center'>
                Save 72%
              </h2>
            </div>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>
                <span className='text-4xl text-[#F91E4E] font-bold'>$24</span>/Month
              </h2>{" "}
              <Button className='bg-[#EE1E46] text-white'>Upgrade</Button>
            </div>
            <div className='px-4 mt-6'>
              <h2 className='text-[#0c8982e0] flex items-center text-md'>
                <MdOutlineWifiProtectedSetup className='text-xl' /> 7-days money-back guarantee
              </h2>
            </div>
          </div>
          {/* card 2 */}
          <div className='w-full h-[230px] rounded-md bg-white shadow-md flex items-center'>
            <div className='h-[200px] w-full'>
              <div className='flex items-center justify-between p-4'>
                <h2 className='text-xl font-bold'>1 Month</h2>{" "}
                <h2 className='w-[70px] h-[30px] rounded-full border border-[#0c8982e0] flex items-center justify-center'>
                  Save 72%
                </h2>
              </div>
              <div className='flex items-center justify-between p-4'>
                <h2 className='text-xl font-bold'>
                  <span className='text-4xl text-[#F91E4E] font-bold'>$24</span>/Month
                </h2>{" "}
                <Button className='bg-[#EE1E46] text-white'>Upgrade</Button>
              </div>
              <div className='px-4 mt-6'>
                <h2 className='text-[#0c8982e0] flex items-center text-md'>
                  <MdOutlineWifiProtectedSetup className='text-xl' /> 7-days money-back guarantee
                </h2>
              </div>
            </div>
          </div>
          {/* card 3 */}
          <div className='w-full h-[200px] rounded-md bg-white shadow-md'>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>1 Month</h2>{" "}
              <h2 className='w-[70px] h-[30px] rounded-full border border-[#0c8982e0] flex items-center justify-center'>
                Save 72%
              </h2>
            </div>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>
                <span className='text-4xl text-[#F91E4E] font-bold'>$24</span>/Month
              </h2>{" "}
              <Button className='bg-[#EE1E46] text-white'>Upgrade</Button>
            </div>
            <div className='px-4 mt-6'>
              <h2 className='text-[#0c8982e0] flex items-center text-md'>
                <MdOutlineWifiProtectedSetup className='text-xl' /> 7-days money-back guarantee
              </h2>
            </div>
          </div>
        </div>
      </div>
      <hr className='mx-auto mt-8 max-w-screen-full  border-gray-300 dark:border-gray-700 sm:mx-auto lg:my-4' />
    </div>
  );
};

export default PlanCards;
