import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MAHASCORE_BACKEND_URL as string,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).authSlice?.accessToken;
      console.log("token", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("x-api-key", process.env.NEXT_PUBLIC_MAHASCORE_API_KEY as string);

      return headers;
    }
  }),
  endpoints: () => ({}),
  tagTypes: [
    "liveMatches",
    "liveMatch",
    "userProfile",
    "allNews",
    "singleNews",
    "highlights",
    "highlight",
    "allBanners",
    "tipster",
    "fixtures",
    "teams",
    "userData"
  ]
});
