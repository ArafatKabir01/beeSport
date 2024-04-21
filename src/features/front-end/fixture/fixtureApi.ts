import { apiSlice } from "@/features/api/apiSlice";

export const fixtureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFixtureData: builder.query({
      query: (selectedDate) => `/api/fixtures?page=1&limit=11`
    }),
    getFixtureDatabyId: builder.query({
      query: (id) => `/api/fixtures/${id}`
    })
  })
});

export const { useGetFixtureDataQuery, useGetFixtureDatabyIdQuery } = fixtureApi;
