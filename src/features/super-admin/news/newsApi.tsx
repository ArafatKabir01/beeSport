import { apiSlice } from "@/features/api/apiSlice";

export const newsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNews: builder.mutation({
      query: (data) => {
        return {
          url: "/api/admin/news",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["allNews"]
    }),
    getNews: builder.query({
      query: (id) => `/api/admin/news/${id}`,
      providesTags: (result, error, arg) => [{ type: "singleNews", id: arg }]
    }),
    getAllNews: builder.query({
      query: () => "/api/admin/news",
      providesTags: ["allNews"]
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/api/admin/news/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["allNews"]
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/admin/news/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: (result, error, arg: any) => ["allNews", { type: "singleNews", id: arg.id }]
    })
  })
});

export const { useAddNewsMutation, useDeleteNewsMutation, useUpdateNewsMutation, useGetNewsQuery, useGetAllNewsQuery } =
  newsApi;
