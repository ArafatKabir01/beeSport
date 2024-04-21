import { apiSlice } from '@/features/api/apiSlice';

export const playerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerDetails: builder.query({
      query: (id) =>
        `/v2/cricket/players/${id}`,
    }),
    getCountryDetails: builder.query({
      query: (id) =>
        `/v2/cricket/countries/${id}`,
    }),
   
  }),
});

export const { useGetPlayerDetailsQuery ,useGetCountryDetailsQuery} = playerApi;