import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminLoginForm from "../components/AdminLoginForm";

export const metadata = {
  ...metaObject("Admin Sign In")
};

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session?.user?.role === "admin") {
      redirect(routes.admin.dashboard);
    } else {
      redirect(routes.home);
    }
  }

  return (
    <section className='flex min-h-screen items-center justify-center bg-[#061626]   p-5 md:p-0'>
      <div className='p-5 md:p-10 rounded-md w-[600px] bg-[#1C2632] shadow-xl'>
        <div className='p-2'>
          <img src='/images/maha-logo2.png' className='m-auto w-56' alt='logo' />
          <h2 className='mb-5 text-center text-lg font-semibold'>Admin Login</h2>
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
