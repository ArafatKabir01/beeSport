import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import AuthProvider from "@/app/api/auth/[...nextauth]/auth-provider";
import { siteConfig } from "@/config/site.config";
import ReduxProvider from "@/features/redux-provider";

import cn from "@/utils/class-names";

import { getServerSession } from "next-auth/next";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { lexendDeca, poppins } from "./fonts";
import GlobalDrawer from "./shared/drawer-views/container";
import GlobalModal from "./shared/modal-views/container";
import { ThemeProvider } from "./shared/theme-provider";
const NextProgress = dynamic(() => import("@/components/next-progress"), {
  ssr: false
});
// styles
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export default async function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      dir='ltr'
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <Script
        // id="jw-player"
        strategy='afterInteractive'
        src='https://cdn.jwplayer.com/libraries/XhGm52Nv.js'
      ></Script>

      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(poppins.variable, lexendDeca.variable, "font-inter")}
      >
        <ReduxProvider>
          <AuthProvider session={session}>
            <ThemeProvider>
              <NextProgress />
              {children}
              <Toaster />
              <GlobalDrawer />
              <GlobalModal />
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
