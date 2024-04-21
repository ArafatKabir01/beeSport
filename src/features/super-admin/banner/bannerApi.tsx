import { apiSlice } from "@/features/api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (data) => {
        return {
          url: "/api/admin/banner",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["allBanners"]
    }),

    getAllBanner: builder.query({
      query: () => "api/admin/banner",
      providesTags: ["allBanners"]
    }),
    getSingleBanner: builder.query({
      query: (bannerId) => `api/admin/banner/${bannerId}`
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/admin/banner/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["allBanners"]
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/admin/banner/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["allBanners"]
    })
  })
});

export const {
  useAddBannerMutation,
  useGetAllBannerQuery,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
  useGetSingleBannerQuery
} = bannerApi;
