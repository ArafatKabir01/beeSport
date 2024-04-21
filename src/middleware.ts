import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { routes } from "./config/routes";

const protectedPaths = [
  routes.admin.dashboard,
  routes.admin.manageLive.home,
  routes.admin.manageLive.create,
  routes.admin.manageLive.edit(""),
  routes.admin.highlights.home,
  routes.admin.highlights.create,
  routes.admin.highlights.edit(""),
  routes.admin.fixture.cricket,
  routes.admin.fixture.football,
  routes.admin.generalSettings,
  routes.admin.news.create,
  routes.admin.news.home,
  routes.admin.news.edit(""),
  routes.admin.manageUser,
  routes.admin.popularLeagues
];

function getProtectedRoutes(protectedPaths: string[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  // protectedPaths.forEach((route) => {
  //   locales.forEach((locale) => (protectedPathsWithLocale = [...protectedPathsWithLocale, `/${locale}${route}`]));
  // });

  return protectedPathsWithLocale;
}

// function getLocale(request: NextRequest): string | undefined {
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // @ts-ignore locales are readonly
//   const locales: string[] = i18n.locales;
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);
//   return locale;
// }

function isPathProtected(pathname: string, protectedPaths: string[]) {
  return protectedPaths.some((protectedPath) => {
    // Check if the pathname is equal to the protected path or starts with the protected path followed by '/'
    return pathname === protectedPath || pathname.startsWith(protectedPath + "/");
  });
}

const middleware = withAuth(
  function middleware(request) {
    const token = request.nextauth?.token;
    const pathname = request.nextUrl.pathname;

    // const pathnameIsMissingLocale = i18n.locales.every(
    //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    // );

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths);

    const shouldRedirect =
      (!token && isPathProtected(pathname, protectedPathsWithLocale)) ||
      (token && token.role === "user" && isPathProtected(pathname, protectedPathsWithLocale));

    if (shouldRedirect) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    // Redirect if there is no locale
    // if (pathnameIsMissingLocale) {
    //   const locale = getLocale(request);
    //   return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => true
    }
  }
);

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)"]
};
