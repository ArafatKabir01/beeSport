import { apiSlice } from "../../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: ({ page, limit }) => `/api/banners?page=${page}&limit=${limit}`
    })
  })
});

export const { useGetBannersQuery } = bannerApi;
