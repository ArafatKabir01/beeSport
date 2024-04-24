import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import HighlightIndex from "./components/HighlightIndex";

export const metadata = {
  ...metaObject("Admin Own Fixtures")
};

const pageHeader = {
  title: "Own Fixtures",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Own Fixtures"
    }
  ]
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isLinkBtn
        isLinkBtnText='Add New Fixture'
        href={routes.admin.highlights.create}
      ></PageHeader>
      <HighlightIndex />
    </>
  );
}
