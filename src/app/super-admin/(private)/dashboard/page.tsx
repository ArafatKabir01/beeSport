import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Admin Dashboard")
};

const pageHeader = {
  title: "Dashboard",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    }
  ]
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false}></PageHeader>
    </>
  );
}
