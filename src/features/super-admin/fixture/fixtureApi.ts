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
    }),
    createFixture : builder.mutation({
      query : (data) => {
        return {
          url : `/api/v2/admin/fixtures`,
          method : 'POST',
          body : data
        }
      },
      invalidatesTags : ["fixtures"]
    }),
    getAllFixture: builder.query({
      query: ({page, limit}) =>
        `/api/v2/admin/fixtures?page=${page}&limit=${limit}`,
      providesTags : ["fixtures"]
    }),
    getAllOwnFixture: builder.query({
      query: () =>
        `/api/v2/admin/fixtures/own-fixtures`,
      providesTags : ["fixtures"]
    }),
    getFixtureById: builder.query({
      query: (fixtureId) =>
        `/api/v2/admin/fixtures/${fixtureId}`,
      providesTags : ["fixtures"]
    }),
    updateFixture: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/v2/admin/fixtures/${id}`,
          method: "PATCH",
          body: data
        };
      },
      invalidatesTags : ["fixtures"]
    }),
    refreashFixture: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v2/admin/fixtures/refreash/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags : ["fixtures"]
    }),
    deleteFixture: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v2/admin/fixtures/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags : ["fixtures"]
    }),
  })
});

export const { useGetFootballFixturesQuery, useCheckHighlightsQuery, useGetCricketV2FixturesQuery, useCreateFixtureMutation, useGetAllFixtureQuery, useGetFixtureByIdQuery, useUpdateFixtureMutation, useDeleteFixtureMutation, useRefreashFixtureMutation, useGetAllOwnFixtureQuery} = fixtureApi;
