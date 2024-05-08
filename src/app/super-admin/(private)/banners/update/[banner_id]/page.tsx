import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import BannerUpdate from "../../components/BannerUpdate";

const pageHeader = {
  title: "Update A Banner",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.news.home,
      name: "Banner"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Banner")
};

export default function Page({ params: { banner_id } }: { params: { banner_id: number } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false} />
      <BannerUpdate bannerId={banner_id} />
    </>
  );
}
