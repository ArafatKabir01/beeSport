import { apiSlice } from "@/features/api/apiSlice";


export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeagues: builder.query({
      query: () => '/v3/football/leagues',
    }),
    getTopLeagues: builder.query({
      query: () => '/api/league/top-leagues',
    }),
    getSelectedPointTable: builder.query({
      query: () => '/api/league/selected-point-table',
    }),
    getCricketLeagueSeasons: builder.query({
      query: (id) =>
        `/v2/cricket/seasons/${id}?include=league,fixtures,fixtures.localteam,fixtures.visitorteam,teams`,
    }),
    getCricketLeagueStanding: builder.query({
      query: (id) =>
        `/v2/cricket/standings/season/${id}?include=league,stage,season`,
    }),
    getCricketSingleLeagueById: builder.query({
      query: (id) =>
        `/v2/cricket/leagues/${id}?include=seasons,country,season`,
    }),
  }),
});

export const {
  useGetTopLeaguesQuery,
  useGetSelectedPointTableQuery,
  useGetCricketLeagueSeasonsQuery,
  useGetCricketLeagueStandingQuery,
  useGetCricketSingleLeagueByIdQuery,
  useGetAllLeaguesQuery,
} = leagueApi;
