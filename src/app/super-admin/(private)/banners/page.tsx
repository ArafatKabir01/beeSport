import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BannerHome from "./components/BannerHome";

export const metadata = {
  title: "MahaScore Admin | Banners"
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === "user") {
      redirect("/");
    }
  }
  const pageHeader = {
    title: "Banners",
    breadcrumb: [
      {
        href: routes.admin.dashboard,
        name: "Dashboard"
      },
      {
        name: "Banners"
      }
    ]
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isLinkBtn
        isLinkBtnText='Add New Banners'
        href={routes.admin.banners.create}
      />
      <BannerHome />
    </>
  );
}
