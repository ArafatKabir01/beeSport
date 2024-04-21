import { apiSlice } from "@/features/api/apiSlice";

export const fixtureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFixtureByDate: builder.query({
      query: ({ previousDate, nextDate }) =>
        `/v2/cricket/fixtures?include=scoreboards,localteam,visitorteam,league&filter[starts_between]=${previousDate},${nextDate}&sort=starting_at`
    }),
    getCrickFixturesByIds: builder.query({
      query: (ids) =>
        `/api/cricket/fixtures?include=league,localteam,visitorteam,scoreboards,runs,venue,balls,lineup&ids=${ids}`,
    }),
    getCrickFixturesById: builder.query({
      query: (id) =>
        `/v2/cricket/fixtures/${id}?include=league,localteam,visitorteam,scoreboards,runs,venue,balls,lineup`
    })
  }),
});

export const { useGetFixtureByDateQuery, useGetCrickFixturesByIdQuery, useGetCrickFixturesByIdsQuery } =
  fixtureApi;
