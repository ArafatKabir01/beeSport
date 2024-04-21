import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import FootballEntitiesContainer from "./components/FootballEntitiesContainer";

const pageHeader = {
  title: "Popular Football Entities",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Popular Football Entities"
    }
  ]
};

export const metadata = {
  ...metaObject("Popular Football Entities")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false} />
      <FootballEntitiesContainer />
    </>
  );
}
