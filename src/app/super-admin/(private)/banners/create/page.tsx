import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import BannerCreate from "../components/BannerCreate";

const pageHeader = {
  title: "Create A Banners",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.banners.home,
      name: "Banners"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Banners Create")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false} />
      <BannerCreate />
    </>
  );
}
