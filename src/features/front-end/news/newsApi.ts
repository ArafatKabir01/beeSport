import { apiSlice } from "@/features/api/apiSlice";

export const newsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewsLeague: builder.query({
      query: () => "/api/admin/news-league"
    }),
    getGroupByNews: builder.query({
      query: (category) => `/api/news/group-by-league?category=${category}`
    }),
    getSingleNews: builder.query({
      query: (slug) => `/api/news/${slug}`
    })
  })
});

export const { useGetAllNewsLeagueQuery, useGetGroupByNewsQuery, useGetSingleNewsQuery } = newsApi;
