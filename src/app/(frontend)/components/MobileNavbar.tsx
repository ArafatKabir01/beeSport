"use client";
import { userLoggedOut } from "@/features/auth/authSlice";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const MobileNavbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isCurrentPath = (path: string) => pathname.includes(path);

  const { data: session } = useSession();
  const handleLogout = async () => {
    dispatch(userLoggedOut());

    await signOut({
      redirect: false,
      callbackUrl: "/"
    });
    toast.success("Sign Out Successfully!");
  };
  return (
    <div className='mobile_menu_bar fixed -bottom-2 left-0 z-[9999] mt-16 block h-20 w-full bg-[#061728] pb-5 lg:hidden '>
      {/* <div className='flex flex-wrap justify-around p-4 '>
        <div className='flex flex-col justify-center'>
          <Link
            className={` ${
              pathname === `/${lang}` || isCurrentPath(`${lang}/match`)
                ? "relative text-primary after:absolute after:left-11 after:top-4 after:  after:content-['']"
                : "  "
            }`}
            href={`/${lang}`}
          >
            <div className='flex justify-center'>
              {pathname === `/${lang}` ? (
                <div>
                  <IoMdFootball className='text-2xl font-extrabold text-primary' />
                </div>
              ) : (
                <div>
                  <IoMdFootball className='text-2xl font-extrabold' />
                </div>
              )}
            </div>

            <div className='font-xs'>
              <small className='text-center uppercase'>{pages?.matches}</small>
            </div>
          </Link>
        </div>

        <div className='flex flex-col justify-center'>
          <Link
            className={` ${
              pathname === `/${lang}/favorites`
                ? "relative text-primary after:absolute after:left-11  after:top-4 after:  after:content-['']"
                : " "
            }`}
            href={`/${lang}/favorites`}
          >
            <div className='flex justify-center'>
              {pathname === `/${lang}/favorites` ? (
                <div>
                  <IoStarSharp className='text-2xl font-extrabold text-primary' />
                </div>
              ) : (
                <div>
                  <IoStarSharp className='text-2xl font-extrabold' />
                </div>
              )}
            </div>

            <div className='font-xs'>
              <small className='text-center uppercase'> {pages.favorites}</small>
            </div>
          </Link>
        </div>

        <div className='flex flex-col justify-center'>
          <Link
            className={` ${
              pathname === `/${lang}/highlights`
                ? "relative text-primary after:absolute after:left-11 after:top-4 after:  after:content-['']"
                : " "
            }`}
            href={`/${lang}/highlights`}
          >
            <div className='flex justify-center'>
              {pathname === `/${lang}/highlights` ? (
                <div>
                  <PiVideoLight className='text-2xl font-extrabold text-primary' />
                </div>
              ) : (
                <div>
                  <PiVideoLight className='text-2xl font-extrabold' />
                </div>
              )}
            </div>

            <div className='font-xs'>
             
            </div>
          </Link>
        </div>

        <div className='flex flex-col justify-center'>
          <Link
            className={` ${
              pathname === `/${lang}/news`
                ? "relative text-primary after:absolute after:left-11 after:top-4 after:  after:content-['']"
                : " "
            }`}
            href={`/${lang}/news`}
          >
            <div className='flex justify-center'>
              {pathname === `/${lang}/news` ? (
                <div>
                  <FaRegNewspaper className='text-2xl text-primary' />
                </div>
              ) : (
                <div>
                  <FaRegNewspaper className=' text-2xl' />
                </div>
              )}
            </div>
            <div className='font-xs'>
            
            </div>
          </Link>
        </div>

        {!session ? (
          <div className='flex flex-col justify-center'>
            <Link
              className={` ${
                pathname === `/${lang}/signin`
                  ? "relative text-primary after:absolute after:left-11 after:top-4 after:  after:content-['']"
                  : " "
              }`}
              href={routes.signIn}
            >
              <div className='flex justify-center'>
                <div>
                  <FaSignInAlt className='text-2xl  ' />
                </div>
              </div>
              <div className='font-xs'>
               
              </div>
            </Link>
          </div>
        ) : (
          <div onClick={handleLogout} className='flex flex-col justify-center'>
            <div className='flex justify-center'>
              <div>
                <FaSignOutAlt className='text-2xl  ' />
              </div>
            </div>
            <div className='font-xs'>
              
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};
