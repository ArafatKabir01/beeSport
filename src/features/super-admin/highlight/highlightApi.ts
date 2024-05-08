import { apiSlice } from "@/features/api/apiSlice";

export const highlightApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHighlights: builder.query({
      query: ({ page, limit }) => `/api/v2/admin/highlights?page=${page}&limit=${limit}`,
      providesTags: ["highlights"]
    }),
    getHighlight: builder.query({
      query: (id) => `/api/v2/admin/highlights/${id}`,
      providesTags: (result, error, arg) => [{ type: "highlight", id: arg }]
    }),
    createHighlight: builder.mutation({
      query: (data) => {
        return {
          url: "/api/v2/admin/highlights/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["highlights"]
    }),
    updateHighlight: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/v2/admin/highlights/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: (result, error, arg: any) => ["highlights", { type: "highlight", id: arg.id }]
    }),
    deleteHighlight: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v2/admin/highlights/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["highlights"]
    })
  })
});

export const {
  useGetHighlightQuery,
  useGetHighlightsQuery,
  useCreateHighlightMutation,
  useDeleteHighlightMutation,
  useUpdateHighlightMutation
} = highlightApi;
