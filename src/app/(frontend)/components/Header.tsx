"use client";

import { routes } from "@/config/routes";
import { userLoggedOut } from "@/features/auth/authSlice";
import { useGetSettingInfoQuery } from "@/features/front-end/settings/settingsApi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Avatar, Button, Dropdown, Input, Text } from "rizzui";
import "./header.css";

interface AuthButtonProps {
  signin: string;
  signout: string;
}

export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: settingInfo, isLoading: settingInfoLoading } = useGetSettingInfoQuery(undefined);
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLogout = async () => {
    dispatch(userLoggedOut());

    await signOut({
      redirect: false,
      callbackUrl: "/"
    });
    toast.success("Sign Out Successfully!");
  };
  return (
    <header>
      <div className=''>
        <div className='hidden lg:block'>
          <div className='relative mx-auto w-full py-4 '>
            <div className='absolute inset-0 origin-bottom-right transform bg-[#FFFFFF]'></div>
            <div className='relative mx-auto max-w-[1400px]'>
              <div className='grid grid-cols-12'>
                <Link href={routes.home} className='flex items-center col-span-2'>
                  {/* <img src='/images/mahascoreLogo.png' alt='logo' className='absolute w-[140px]' /> */}
                  <h2 className='text-2xl font-bold'>
                    Bee<span className='text-[#EE1E46]'>Sport</span>
                  </h2>
                </Link>
                <ul className='flex items-center gap-3 text-lg md:gap-7 col-span-4'>
                  <Link
                    className={`${
                      pathname === routes.home ? "border-b-2 border-[#EE1E46]" : " hover:text-slate-300"
                    } transition-all duration-150 ease-in font-semibold`}
                    href={routes.home}
                  >
                    HOME
                  </Link>
                  <Link
                    className={` ${
                      pathname === routes.liveTv ? "border-b-2 border-[#EE1E46]" : " hover:text-slate-300"
                    } transition-all duration-150 ease-in font-semibold`}
                    href='/liveTv'
                  >
                    LIVE TV
                  </Link>
                  <Link
                    className={` ${
                      pathname === routes.newsPage ? "border-b-2 border-[#EE1E46]" : "hover:text-slate-300"
                    } transition-all duration-150 ease-in font-semibold`}
                    href={routes.newsPage}
                  >
                    NEWS
                  </Link>
                  <Link
                    className={` ${
                      pathname === routes.pricing ? "border-b-2 border-[#EE1E46]" : "hover:text-slate-300"
                    } transition-all duration-150 ease-in font-semibold`}
                    href='/pricing'
                  >
                    PRICING
                  </Link>
                </ul>
                <div className='col-span-6 justify-self-end  flex gap-3'>
                  <Input type='email' placeholder='Search..' />
                  <Button className='bg-[#EE1E46] text-white hover:bg-black'>Secondary</Button>
                  <Dropdown placement='bottom-end'>
                    <Dropdown.Trigger>
                      <Avatar
                        name='John Doe'
                        src='https://randomuser.me/api/portraits/women/40.jpg'
                        className='cursor-pointer'
                      />
                    </Dropdown.Trigger>
                    <Dropdown.Menu className='w-56 divide-y text-gray-600'>
                      <Dropdown.Item className='hover:bg-transparent'>
                        <Avatar name='John Doe' src='https://randomuser.me/api/portraits/women/40.jpg' />
                        <span className='ml-2 text-start'>
                          <Text className='text-gray-900 font-medium leading-tight'>Mary Hoops</Text>
                          <Text>maryhe@demo.io</Text>
                        </span>
                      </Dropdown.Item>
                      <div className='mt-3 mb-2 pt-2'>
                        <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>Account Settings</Dropdown.Item>
                        <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>Support</Dropdown.Item>
                        <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>License</Dropdown.Item>
                      </div>
                      <div className='mt-2 pt-2'>
                        <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>Sign Out</Dropdown.Item>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
