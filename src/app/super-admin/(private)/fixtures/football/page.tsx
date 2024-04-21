import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import FootballFixtureContainer from "../components/FootballFixtureContainer";

const pageHeader = {
  title: "Football Fixtures",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Fixtures"
    },
    {
      name: "Football"
    }
  ]
};

export const metadata = {
  ...metaObject("Fixtures - Football")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false}></PageHeader>
      <FootballFixtureContainer />
    </>
  );
}
