import { apiSlice } from "../../api/apiSlice";

export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamInfo: builder.query({
      query: () => `/api/teams`
    })
  })
});

export const { useGetTeamInfoQuery } = leagueApi;
