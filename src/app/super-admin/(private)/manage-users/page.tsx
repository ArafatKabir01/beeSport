import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import ManageUserIndex from "./components/ManageUserIndex";

const pageHeader = {
  title: "Manage Users",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Manage Users"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Users")
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        isLinkBtnText={"Add User"}
        isLinkBtn={false}
      />
      <ManageUserIndex />
    </>
  );
}
