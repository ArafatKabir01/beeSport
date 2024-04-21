import { apiSlice } from "@/features/api/apiSlice";

export const adsApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getAds: builder.query({
      query: (id) => `api/banner`
    })
  })
});

export const { useGetAdsQuery } = adsApi;
