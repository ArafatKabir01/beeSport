"use client";

import HamburgerButton from "@/layouts/hamburger-button";
import Link from "next/link";

import Logo from "@/components/logo";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import HeaderMenuRight from "@/layouts/header-menu-right";
import Sidebar from "@/layouts/hydrogen/sidebar";
import cn from "@/utils/class-names";

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-2 backdrop-blur-xl dark:bg-gray-50/50 shadow",
        ((isMounted && windowScroll.y) as number) > 2 ? "card-shadow" : ""
      )}
    >
      <div className='flex w-full max-w-2xl items-center'>
        <HamburgerButton view={<Sidebar className='static w-full 2xl:w-full' />} />
        <Link href={"/"} aria-label='Site Logo' className='me-4 w-9 shrink-0 lg:me-5 xl:hidden'>
          <Logo iconOnly={true} />
        </Link>
      </div>

      <HeaderMenuRight />
    </header>
  );
}
