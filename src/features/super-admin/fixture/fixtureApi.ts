import { apiSlice } from "@/features/api/apiSlice";

export const fixtureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFootballFixtures: builder.query({
      query: (selectedDate) =>
        `/v3/football/fixtures/formatted/date/${selectedDate}?include=league.country;round.stage;participants;state;scores;periods`
    }),
    getCricketV2Fixtures: builder.query({
      query: ({ previousDate, nextDate }) =>
        `/v2/cricket/fixtures?include=scoreboards,localteam,visitorteam,league&filter[starts_between]=${previousDate},${nextDate}&sort=starting_at`
    }),
    checkHighlights: builder.query({
      query: (fixtureId) => `/api/admin/fixtures/highlights/${fixtureId}`,
      keepUnusedDataFor: 0
    })
  })
});

export const { useGetFootballFixturesQuery, useCheckHighlightsQuery, useGetCricketV2FixturesQuery } = fixtureApi;
