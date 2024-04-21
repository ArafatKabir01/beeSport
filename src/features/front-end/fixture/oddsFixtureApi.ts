import { apiSlice } from "@/features/api/apiSlice";

export const oddsFixtureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOddsFixture: builder.query({
      query: ({ fixtureId, bookmakersId, marketsID }) =>
        `/v3/football/fixtures/${fixtureId}?&include=odds&filters=bookmakers:${bookmakersId};markets:${marketsID}`
    }),
    getAllOddsFixture: builder.query({
      query: () => `/v3/football/odds/pre-match`
    })
    // getLiveOddsFixture: builder.query({
    //   query: ({fixtureId , bookmakersId , marketsID}) =>
    //     `/v2/cricket/fixtures/${fixtureId}?&include=inplayOdds&filters=bookmakers:${bookmakersId};markets:${marketsID}`,
    // }),
  })
});

export const { useGetOddsFixtureQuery, useGetAllOddsFixtureQuery } = oddsFixtureApi;
