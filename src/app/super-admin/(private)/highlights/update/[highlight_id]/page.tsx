import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import HighlightUpdate from "../../components/HighlightUpdate";

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
      href: routes.admin.highlights.home,
      name: "Highlights"
    },
    {
      name: "Edit"
    }
  ]
};

export default function Page({ params: { highlight_id } }: { params: { highlight_id: number } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false}></PageHeader>
      <HighlightUpdate highlightId={highlight_id} />
    </>
  );
}
