import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import LiveMatchUpdate from "../../components/LiveMatchUpdate";

const pageHeader = {
  title: "Update A Live Match",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.manageLive.home,
      name: "Live Matches"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Live")
};

export default function Page({ params: { live_match_id } }: { params: { live_match_id: number } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isLinkBtn={false}></PageHeader>
      <LiveMatchUpdate liveMatchId={live_match_id} />
    </>
  );
}
