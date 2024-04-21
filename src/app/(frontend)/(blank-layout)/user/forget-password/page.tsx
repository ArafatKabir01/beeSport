import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { metaObject } from "@/config/site.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ForgetPassword from "../components/ForgetPassword";

export const metadata = {
  ...metaObject("User Sign In")
};

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return <ForgetPassword lang={lang} />;
}
