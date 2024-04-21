import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import NewsUpdate from "../../components/NewsUpdate";

const pageHeader = {
  title: "Update A News",
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
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("News")
};

export default function Page({ params: { news_id } }: { params: { news_id: number } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false} />
      <NewsUpdate newsId={news_id} />
    </>
  );
}
