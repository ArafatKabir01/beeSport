import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import HighlightIndex from "./components/HighlightIndex";

export const metadata = {
  ...metaObject("Admin Highlights")
};

const pageHeader = {
  title: "Highlights",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Highlights"
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
        isLinkBtnText='Add New Highlight'
        href={routes.admin.highlights.create}
      ></PageHeader>
      <HighlightIndex />
    </>
  );
}
