import { configureStore } from '@reduxjs/toolkit'
import { expensesSlice } from './features/expenses/expensesSlice'
import { limitsSlice } from './features/limits/limitsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      expense: expensesSlice.reducer,
      limit: limitsSlice.reducer,
    },
    devTools: true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']