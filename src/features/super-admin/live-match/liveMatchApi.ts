import { apiSlice } from "@/features/api/apiSlice";

export const liveMatchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLiveMatches: builder.query({
      query: ({ page, limit }) => `/api/admin/matches?page=${page}&limit=${limit}`,
      providesTags: ["liveMatches"]
    }),
    getLiveMatch: builder.query({
      query: (id) => `/api/admin/matches/${id}`,
      providesTags: (result, error, arg) => [{ type: "liveMatch", id: arg }]
    }),
    createLiveMatch: builder.mutation<{}, FormData>({
      query: (data) => {
        return {
          url: "/api/admin/matches/create",
          method: "POST",
          body: data
          // credentials: 'include',
        };
      },
      invalidatesTags: ["liveMatches"]
    }),
    updateLiveMatch: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/admin/matches/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: (result, error, arg: any) => ["liveMatches", { type: "liveMatch", id: arg.id }]
    }),
    sortLiveMatch: builder.mutation({
      query: (data) => {
        return {
          url: `/api/admin/matches/sort`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["liveMatches"]
    }),
    sortStreamSources: builder.mutation({
      query: (data) => {
        return {
          url: `/api/admin/matches/streaming-sort`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["liveMatches"]
    }),
    deleteLiveMatch: builder.mutation({
      query: (id) => ({
        url: `/api/admin/matches/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["liveMatches"]
    })
  })
});

export const {
  useGetLiveMatchQuery,
  useGetLiveMatchesQuery,
  useSortLiveMatchMutation,
  useCreateLiveMatchMutation,
  useUpdateLiveMatchMutation,
  useDeleteLiveMatchMutation,
  useSortStreamSourcesMutation
} = liveMatchApi;
