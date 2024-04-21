import { apiSlice } from "@/features/api/apiSlice";

export const tipStar = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getTipStar: builder.query({
      query: (id) => `api/tipster`
    })
  })
});

export const { useGetTipStarQuery } = tipStar;
