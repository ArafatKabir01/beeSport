import { apiSlice } from "@/features/api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    teamSearch: builder.query({
      query: (name) => `/api/v2/admin/teams/search/${name}`
    }),
    getPopularFootballLeagues: builder.query({
      query: () => "/api/admin/popular/football-leagues"
    }),
    getTeams: builder.query({
      query: () => `/api/v2/admin/teams`,
      providesTags: ["teams"]
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
    addTeam: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v2/admin/teams`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["teams"]
    }),
    deletePopularFootballLeague: builder.mutation({
      query: (id) => ({
        url: `/api/admin/popular/football-leagues/${id}`,
        method: "DELETE"
      })
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/api/v2/admin/teams/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["teams"]
    })
  })
});

export const {
  useTeamSearchQuery,
  useGetPopularFootballLeaguesQuery,
  useAddPopularFootballLeagueMutation,
  useDeletePopularFootballLeagueMutation,
  useAddTeamMutation,
  useGetTeamsQuery,
  useDeleteTeamMutation
} = teamApi;
