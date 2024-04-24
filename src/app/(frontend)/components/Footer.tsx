"use client";

import moment from "moment";
import { FaRegCopyright } from "react-icons/fa";

import { MobileNavbar } from "./MobileNavbar";

export default function Footer() {
  const updateYear = moment().format("YYYY [escaped] YYYY").split(" ");
  // const { data: settingInfo, isLoading: settingInfoLoading } = useGetSettingInfoQuery(undefined);

  return (
    <div className='bg-[#1F2937]'>
      <div className=' hidden lg:block'>
        <footer className='footer mx-auto p-10 text-gray-200'></footer>
        <hr className='mx-auto mt-3 max-w-screen-xl border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-4' />
        {/* copyright section */}
        <div className='my-4 flex justify-center'>
          <span className='text-md flex select-none items-center gap-1 text-gray-500 sm:text-center'>
            <p className='text-center'>
              <span className='mx-1 mb-1'>
                <FaRegCopyright className=' inline-block text-sm  text-gray-500' />
              </span>
              Copyright {updateYear[2]} {process.env.NEXT_PUBLIC_APP_NAME} | All Rights Reserved.
            </p>
          </span>
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
}
