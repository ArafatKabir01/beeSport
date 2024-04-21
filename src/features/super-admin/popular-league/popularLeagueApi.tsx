import { apiSlice } from "@/features/api/apiSlice";

export const popularLeagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    leagueSearch: builder.query({
      query: (name) => `/v3/football/leagues/search/${name}?include=country;currentSeason`
    }),
    getCricketLeagues: builder.query({
      query: (name) => `/v2/cricket/leagues?include=country`
    }),
    getPopularFootballLeagues: builder.query({
      query: () => "/api/admin/popular/football-leagues"
    }),
    getPopularLeagues: builder.query({
      query: (category) => `/api/admin/popular-leagues?category=${category}`
    }),
    getPopularCricketLeagues: builder.query({
      query: () => "/api/admin/popular/cricket-leagues"
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
          url: `/api/admin/popular-leagues/create`,
          method: "POST",
          body: data
        };
      }
    }),
    addPopularCricketLeague: builder.mutation({
      query: (data) => {
        return {
          url: `/api/admin/popular/cricket-leagues/create`,
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
        url: `/api/admin/popular-leagues/${id}`,
        method: "DELETE"
      })
    }),
    deletePopularCricketLeague: builder.mutation({
      query: (id) => ({
        url: `/api/admin/popular/cricket-leagues/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useLeagueSearchQuery,
  useGetCricketLeaguesQuery,
  useGetPopularCricketLeaguesQuery,
  useGetPopularFootballLeaguesQuery,
  useAddPopularCricketLeagueMutation,
  useAddPopularFootballLeagueMutation,
  useDeletePopularCricketLeagueMutation,
  useDeletePopularFootballLeagueMutation,
  useAddPopularLeagueMutation,
  useGetPopularLeaguesQuery,
  useDeletePopularLeagueMutation
} = popularLeagueApi;
