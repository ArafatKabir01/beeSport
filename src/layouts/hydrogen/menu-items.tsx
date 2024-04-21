import { routes } from "@/config/routes";
import { BiVideoRecording } from "react-icons/bi";
import { FaCogs } from "react-icons/fa";
import { IoCalendarOutline, IoNewspaperOutline, IoShieldHalfSharp } from "react-icons/io5";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { SiGoogleads } from "react-icons/si";
// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: "Dashboard",
    href: routes.admin.dashboard,
    icon: <LuLayoutDashboard />
  },
  {
    name: "Manage Live",
    href: routes.admin.manageLive.home,
    icon: <BiVideoRecording />
  },
  {
    name: "Fixtures",
    href: "#",
    icon: <IoCalendarOutline />,
    dropdownItems: [
      {
        name: "Football",
        href: routes.admin.fixture.football
      },
      {
        name: "Cricket",
        href: routes.admin.fixture.cricket
      }
    ]
  },
  {
    name: "News",
    href: routes.admin.news.home,
    icon: <IoNewspaperOutline />
  },
  {
    name: "Highlights",
    href: routes.admin.highlights.home,
    icon: <PiTelevisionFill />
  },
  {
    name: "Popular Leagues",
    href: routes.admin.popularLeagues,
    icon: <IoShieldHalfSharp />
  },
  {
    name: "Manage Users",
    href: routes.admin.manageUser,
    icon: <LuUsers />
  },
  {
    name: "ADS",
    href: routes.admin.ads.home,
    icon: <SiGoogleads />
  },
  {
    name: "Tip Star",
    href: routes.admin.tipStar.home,
    icon: <MdOutlineTipsAndUpdates />
  },
  {
    name: "General Settings",
    href: routes.admin.generalSettings,
    icon: <FaCogs />
  }
];
