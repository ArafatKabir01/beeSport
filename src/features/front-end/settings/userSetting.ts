import { apiSlice } from "@/features/api/apiSlice";

export const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllowedStates: builder.query({
      query: () => "/api/allowed-states"
    }),
    getSettingInfo: builder.query({
      query: () => "/api/general-settings"
    }),
    userData: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/watch-time",
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["userData"]
    }),
    guestUserData: builder.mutation({
      query: (data) => {
        return {
          url: "/api/blocked/update",
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["userData"]
    })
  })
});

export const { useGetAllowedStatesQuery, useGetSettingInfoQuery, useUserDataMutation, useGuestUserDataMutation } =
  settingApi;
