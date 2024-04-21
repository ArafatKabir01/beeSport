import { apiSlice } from "@/features/api/apiSlice";

export const fixtureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHighlightsByID: builder.query({
      query: ({ fixtureId }) => `/api/highlights/${fixtureId}`
    }),
    getHighlights: builder.query({
      query: ({ page, limit, category, date }) => `/api/highlights/date/${date}?category=${category}`
    })
  })
});

export const { useGetHighlightsQuery, useGetHighlightsByIDQuery } = fixtureApi;
