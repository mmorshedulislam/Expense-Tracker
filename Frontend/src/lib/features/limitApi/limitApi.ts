import apiSlice from "./../api/apiSlice";

interface Limit {
  _id: string;
  category: string;
  limit: number;
  month: number;
  year: number;
}

interface LimitsResponse {
  success: boolean;
  data: Limit[];
}

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
    getLimits: builder.query<LimitsResponse, void>({
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
