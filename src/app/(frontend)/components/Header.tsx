"use client";

import { routes } from "@/config/routes";
import { useGetProfileQuery } from "@/features/auth/authApi";
import { userLoggedOut } from "@/features/auth/authSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Avatar, Dropdown, Text } from "rizzui";
import AuthModal from "../(blank-layout)/user/components/AuthModal";
import "./header.css";

interface AuthButtonProps {
  signin: string;
  signout: string;
}

export default function Header() {
  const [modalState, setModalState] = useState<boolean>(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  // const { data: settingInfo, isLoading: settingInfoLoading } = useGetSettingInfoQuery(undefined);

  const { data: userInfo } = useGetProfileQuery(null);

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
    localStorage.removeItem("accessToken");
    toast.success("Sign Out Successfully!");
  };
  return (
    <header>
      <div className=''>
        <div className='hidden lg:block'>
          <div className='relative mx-auto w-full py-4 px-4'>
            <div className='absolute inset-0 origin-bottom-right transform bg-[#FFFFFF] '></div>
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
                {session ? (
                  <div className='col-span-6 justify-self-end  flex gap-3'>
                    {/* <Input type='email' placeholder='Search..' />
                <Button className='bg-[#EE1E46] text-white hover:bg-black'>Secondary</Button> */}
                    <Dropdown placement='bottom-end'>
                      <Dropdown.Trigger>
                        <Avatar
                          name={session?.user?.name ? session?.user?.name : "efdf"}
                          // src='https://randomuser.me/api/portraits/women/40.jpg'
                          initials={session?.user?.name?.slice(0, 2).toUpperCase()}
                          className='cursor-pointer rounded-full '
                          color='info'
                          size='sm'
                        />
                      </Dropdown.Trigger>
                      <Dropdown.Menu className='w-64 divide-y text-gray-600'>
                        <Dropdown.Item className='hover:bg-transparent'>
                          <Avatar
                            name={session?.user?.name ? session?.user?.name : "df"}
                            initials={session?.user?.name?.slice(0, 2).toUpperCase()}
                            // src='https://randomuser.me/api/portraits/women/40.jpg'
                            className='rounded-full '
                            color='info'
                            size='sm'
                          />
                          <span className='ml-2 text-start'>
                            <Text className='text-gray-900 font-medium leading-tight'>{userInfo?.data?.name}</Text>
                            <Text>{session?.user?.email || "jon@gmail.com"}</Text>
                          </span>
                        </Dropdown.Item>
                        <div className='mt-3 mb-2 pt-2'>
                          <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>
                            Account Settings
                          </Dropdown.Item>
                          <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>Support</Dropdown.Item>
                          <Dropdown.Item className='hover:bg-gray-900 hover:text-gray-50'>License</Dropdown.Item>
                        </div>
                        <div onClick={handleLogout} className='mt-2 pt-2'>
                          <Dropdown.Item className='hover:bg-red-500 hover:text-gray-50'>Sign Out</Dropdown.Item>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <div className='col-span-6 justify-self-end text-lg border border-red-600 p-2 flex gap-3'>
                    <div
                      className={`${
                        pathname === routes.signIn ? "border-b-2 border-[#EE1E46]" : " hover:text-slate-300"
                      } transition-all duration-150 ease-in font-semibold cursor-pointer`}
                      // href={routes.signIn}
                      onClick={() => setModalState(true)}
                    >
                      SIGN IN
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal modalState={modalState} setModalState={setModalState} />
    </header>
  );
}
