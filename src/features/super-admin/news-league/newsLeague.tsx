import { apiSlice } from "@/features/api/apiSlice";

export const newsLeague = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewsLeague: builder.mutation({
      query: (data) => {
        return {
          url: `/api/admin/news-league`,
          method: "POST",
          body: data
        };
      }
    }),
    deleteLeague: builder.mutation({
      query: (id) => ({
        url: `/api/admin/news-league/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const { useAddNewsLeagueMutation, useDeleteLeagueMutation } = newsLeague;
