import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
    id: string;
    category: string;
    purpose: string;
    amount: number;
    date: string;
}

interface ExpensesState {
    items: Expense[];
}

const initialState: ExpensesState = {
    items: [],
};

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.items.push(action.payload);
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
