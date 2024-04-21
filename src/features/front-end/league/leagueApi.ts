import { apiSlice } from "../../api/apiSlice";

export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeagues: builder.query({
      query: () => "/v3/football/leagues"
    }),
    getAllCricketLeagues: builder.query({
      query: () => "/api/cricket/leagues"
    }),
    getTopLeagues: builder.query({
      query: (category) => `/api/league/top-leagues?category=${category}`
    }),
    getSelectedPointTable: builder.query({
      query: (category) => `/api/league/selected-point-table/${category}`
    }),
    getLeagueStanding: builder.query({
      query: (id) =>
        `/v3/football/standings/seasons/${id}?include=details.type;group;participant;rule.type&filters=standingdetailTypes:129,130,131,132,133,134,179,187,135,136,137,138,139,140,185,141,142,143,144,145,146,186`
    }),
    getSingleLeagueById: builder.query({
      query: (id) =>
        `/v3/football/leagues/${id}?include=country;currentSeason;seasons;upcoming.participants;upcoming.scores;upcoming.state;latest.participants;latest.scores;latest.state`
    })
  })
});

export const {
  useGetTopLeaguesQuery,
  useGetSelectedPointTableQuery,
  useGetLeagueStandingQuery,
  useGetSingleLeagueByIdQuery,
  useGetAllLeaguesQuery,
  useGetAllCricketLeaguesQuery
} = leagueApi;
