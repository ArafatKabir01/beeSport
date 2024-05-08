import { apiSlice } from "@/features/api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (data) => {
        return {
          url: "/api/v2/admin/banners",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["allBanners"]
    }),

    getAllBanner: builder.query({
      query: () => "/api/v2/admin/banners",
      providesTags: ["allBanners"]
    }),
    getSingleBanner: builder.query({
      query: (bannerId) => `/api/v2/admin/banners/${bannerId}`,
      providesTags: ["allBanners"]
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/v2/admin/banners/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["allBanners"]
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/v2/admin/banners/${id}`,
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
