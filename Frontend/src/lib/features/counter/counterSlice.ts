import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface CounterState {
    value: number;
}

// Set the initial state with type annotation
const initialState: CounterState = {
    value: 0,
};

// Create the slice
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload; // PayloadAction ensures `action.payload` is typed as a `number`
        },
    },
});

// Export the generated action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer
export default counterSlice.reducer;
