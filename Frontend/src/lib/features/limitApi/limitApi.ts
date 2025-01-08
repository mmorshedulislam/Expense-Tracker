import apiSlice from "./../api/apiSlice";

const limitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLimit: builder.mutation<void, { category: string; limit: number }>({
      query: (data) => ({
        url: `/api/limits`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Limit"],
    }),
    getLimits: builder.query<any[], void>({
      query: () => ({
        url: `/api/limits`,
        method: "GET",
      }),
      providesTags: ["Limit"],
    }),
    updateLimit: builder.mutation<void, { id: string; data: { amount: number } }>({
      query: ({ id, data }) => ({
        url: `/api/limits/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Limit"],
    }),
    deleteLimit: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/limits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Limit"],
    }),
  }),
});

export const {
  useCreateLimitMutation,
  useGetLimitsQuery,
  useUpdateLimitMutation,
  useDeleteLimitMutation
} = limitApi;

export default limitApi;
