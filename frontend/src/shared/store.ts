import resultReducer from "@/features/resultBlock/result-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {result: resultReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
