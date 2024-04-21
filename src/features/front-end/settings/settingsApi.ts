import { apiSlice } from "@/features/api/apiSlice";

export const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllowedStates: builder.query({
      query: () => "/api/allowed-states"
    }),
    getSettingInfo: builder.query({
      query: () => "/api/general-settings"
    })
  })
});

export const { useGetAllowedStatesQuery, useGetSettingInfoQuery } = settingApi;
