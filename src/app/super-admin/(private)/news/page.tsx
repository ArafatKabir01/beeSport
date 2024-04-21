import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewsHome from "./components/NewsHome";

export const metadata = {
  title: "MahaScore Admin | News"
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === "user") {
      redirect("/");
    }
  }
  const pageHeader = {
    title: "News",
    breadcrumb: [
      {
        href: routes.admin.dashboard,
        name: "Dashboard"
      },
      {
        name: "News"
      }
    ]
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isLinkBtn
        isLinkBtnText='Add New News'
        href={routes.admin.news.create}
      />
      <NewsHome />
    </>
  );
}
