import apiSlice from "../api/apiSlice";

const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createExpense: builder.mutation<void, { category: string; amount: number; purpose?: string }>({
            query: (data) => ({
                url: `/api/expenses`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Expense"],
        }),
        getExpenses: builder.query<
            { category: string; amount: number; purpose?: string; date: string; month: number; year: number; }[],
            void
        >({
            query: () => ({
                url: `/api/expenses`,
                method: "GET",
            }),
            providesTags: ["Expense"],
        }),
        getCategoryUsagePercent: builder.query<any, { month: number; year: number }>({
            query: ({ month, year }) => ({
                url: `/api/expenses/category-usage?month=${month}&year=${year}`,
                method: "GET",
            }),
            providesTags: ["Expense"],
        }),
        getMonthlySummary: builder.query<any, { month: number; year: number }>({
            query: ({ month, year }) => ({
                url: `/api/expenses/monthly-summary?month=${month}&year=${year}`,
                method: "GET",
            }),
            providesTags: ["Expense"],
        }),
        getDailySummary: builder.query<any, { day: number, month: number; year: number, category: string }>({
            query: ({ day, month, year, category }) => ({
                url: `/api/expenses/daily-summary?category=${category}&day=${day}&month=${month}&year=${year}`,
                method: "GET",
            }),
            providesTags: ["Expense"],
        }),
        updateExpense: builder.mutation<
            void,
            { id: string; data: { category?: string; amount?: number; description?: string } }
        >({
            query: ({ id, data }) => ({
                url: `/api/expenses/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Expense"],
        }),
        deleteExpense: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/expenses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Expense"],
        }),
    }),
});

export const {
    useCreateExpenseMutation,
    useGetExpensesQuery,
    useGetCategoryUsagePercentQuery,
    useGetMonthlySummaryQuery,
    useGetDailySummaryQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation
} = expenseApi;

export default expenseApi;
