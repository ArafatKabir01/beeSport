import { apiSlice } from "@/features/api/apiSlice";

export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamInfo: builder.query({
      query: (id) => `/v2/cricket/teams/${id}?include=country,fixtures`
    }),

    getTeamSquadDetails: builder.query({
      query: ({ id, season_ID }) => `/v2/cricket/teams/${id}/squad/${season_ID}`
    })
  })
});

export const { useGetTeamInfoQuery, useGetTeamSquadDetailsQuery } = leagueApi;
