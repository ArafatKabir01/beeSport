import { apiSlice } from "@/features/api/apiSlice";

export const fixtureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFixtureData: builder.query({
      query: (selectedDate) => `/api/fixtures?page=1&limit=11`
    }),
    getFixtureDatabyId: builder.query({
      query: (id) => `/api/fixtures/${id}`
    }),
    getFixtureLiveId: builder.query({
      query: (id) => `/api/live-matches/${id}`
    }),
    getFixtureLive: builder.query({
      query: (id) => `/api/live-matches`
    })
  })
});

export const { useGetFixtureDataQuery, useGetFixtureDatabyIdQuery, useGetFixtureLiveIdQuery, useGetFixtureLiveQuery } =
  fixtureApi;
