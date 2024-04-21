import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import LeagueContainer from "./components/LeagueContainer";

const title = "Popular Leagues";

const pageHeader = {
  title,
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: title
    }
  ]
};

export const metadata = {
  ...metaObject(title)
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false} />
      <LeagueContainer />
    </>
  );
}
