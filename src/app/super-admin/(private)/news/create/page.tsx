import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import NewsCreate from "../components/NewsCreate";

const pageHeader = {
  title: "Create A News",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.news.home,
      name: "News"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("News Create")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false} />
      <NewsCreate />
    </>
  );
}
