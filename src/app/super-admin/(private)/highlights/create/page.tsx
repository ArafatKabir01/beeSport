import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import { IFixtureSearchParams } from "@/types";
import HighlightCreate from "../components/HighlightCreate";

export const metadata = {
  ...metaObject("Admin Highlights")
};

const pageHeader = {
  title: "Create Highlight",
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
      name: "Create"
    }
  ]
};

export default function Page({ searchParams }: { searchParams: IFixtureSearchParams }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false}></PageHeader>
      <HighlightCreate searchParams={searchParams} />
    </>
  );
}
