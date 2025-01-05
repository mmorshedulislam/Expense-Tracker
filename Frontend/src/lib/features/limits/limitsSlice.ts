import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LimitsState {
    [category: string]: number;
}

const initialState: LimitsState = {
    Groceries: 0,
    Transportation: 0,
    Healthcare: 0,
    Utility: 100,
    Charity: 0,
    Miscellaneous: 0,
};

export const limitsSlice = createSlice({
    name: 'limits',
    initialState,
    reducers: {
        setLimit: (state, action: PayloadAction<{ category: string; limit: number }>) => {
            state[action.payload.category] = action.payload.limit;
        },
    },
});

export const { setLimit } = limitsSlice.actions;
export default limitsSlice.reducer;
