import { apiSlice } from "@/features/api/apiSlice";

export const popularLeagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    leagueSearch: builder.query({
      query: (name) => `/v3/football/leagues/search/${name}?include=country;currentSeason`
    }),
    getPopularFootballLeagues: builder.query({
      query: () => "/api/admin/popular/football-leagues"
    }),
    getPopularLeagues: builder.query({
      query: () => `/api/v2/admin/leagues`
    }),
    addPopularFootballLeague: builder.mutation({
      query: (data) => {
        return {
          url: `/api/admin/popular/football-leagues/create`,
          method: "POST",
          body: data
        };
      }
    }),
    addPopularLeague: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v2/admin/leagues/create`,
          method: "POST",
          body: data
        };
      }
    }),
    deletePopularFootballLeague: builder.mutation({
      query: (id) => ({
        url: `/api/admin/popular/football-leagues/${id}`,
        method: "DELETE"
      })
    }),
    deletePopularLeague: builder.mutation({
      query: (id) => ({
        url: `/api/v2/admin/leagues/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useLeagueSearchQuery,
  useGetPopularFootballLeaguesQuery,
  useAddPopularFootballLeagueMutation,
  useDeletePopularFootballLeagueMutation,
  useAddPopularLeagueMutation,
  useGetPopularLeaguesQuery,
  useDeletePopularLeagueMutation
} = popularLeagueApi;
