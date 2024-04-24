export const routes = {
  home: `/`,
  signIn: `/user/signin`,
  signUp: `/user/signup`,
  privacyPolicy: `/privacy-policy`,
  matchDetails: (status: string, team_names: string, id: string, game?: any) => {
    return game === "cricket" ? `/cricketMatch/${status}/${team_names}/${id}` : `/match/${status}/${team_names}/${id}`;
  },

  pricing: `/pricing`,
  liveTv: `/liveTv`,
  newsPage: `/news`,

  forgetPassword: `/user/forget-password`,
  adminLogin: "/super-admin/login",
  accessDenied: "/access-denied",
  notFound: "/not-found",
  admin: {
    dashboard: "/super-admin/dashboard",
    manageLive: {
      home: "/super-admin/manage-live-matches",
      create: "/super-admin/manage-live-matches/create",
      edit: (id: number | string) => `/super-admin/manage-live-matches/update/${id}`,
      clone: (id: number | string) => `/super-admin/manage-live-matches/clone/${id}`
    },
    manageMatch: {
      home: "/super-admin/manage-matches",
      create: "/super-admin/manage-matches/create",
      edit: (id: number | string) => `/super-admin/manage-matches/update/${id}`,
      clone: (id: number | string) => `/super-admin/manage-matches/clone/${id}`
    },
    fixture: "/super-admin/fixtures",
    news: {
      home: `/super-admin/news`,
      league: "/super-admin/news/league",
      create: "/super-admin/news/create",
      edit: (id: number | string) => `/super-admin/news/update/${id}`
    },
    ads: {
      home: `/super-admin/ads`,
      create: "/super-admin/ads/create",
      edit: (id: number | string) => `/super-admin/ads/update/${id}`
    },
    tipStar: {
      home: `/super-admin/tip-star`,
      create: "/super-admin/tip-star/create",
      edit: (id: number | string) => `/super-admin/tip-star/update/${id}`
    },
    manageUser: "/super-admin/manage-users",
    manageAdmin: "/super-admin/manage-admins",

    generalSettings: "/super-admin/general-settings",
    highlights: {
      home: "/super-admin/highlights",
      create: "/super-admin/highlights/create",
      edit: (id: number | string) => `/super-admin/highlights/update/${id}`
    },
    ownFixtures: {
      home: "/super-admin/own-fixtures",
      create: "/super-admin/own-fixtures/create",
      edit: (id: number | string) => `/super-admin/own-fixtures/update/${id}`
    },
    popularLeagues: "/super-admin/leagues",
    teams: "/super-admin/teams"
  }
};
