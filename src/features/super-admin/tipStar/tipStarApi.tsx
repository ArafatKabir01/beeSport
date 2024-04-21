import { apiSlice } from "@/features/api/apiSlice";

export const tipStarApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTipStar: builder.mutation({
      query: (data) => {
        return {
          url: "/api/admin/tipster",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["tipster"]
    }),

    getAllTipStar: builder.query({
      query: () => "api/admin/tipster",
      providesTags: ["tipster"]
    }),

    getSingleTipStar: builder.query({
      query: (bannerId) => `api/admin/tipster/${bannerId}`
    }),

    deleteTipStar: builder.mutation({
      query: (id) => ({
        url: `/api/admin/tipster/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["tipster"]
    }),
    updateTipStar: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/admin/tipster/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["tipster"]
    })
  })
});

export const {
  useAddTipStarMutation,
  useGetAllTipStarQuery,
  useDeleteTipStarMutation,
  useGetSingleTipStarQuery,
  useUpdateTipStarMutation
} = tipStarApi;
