// src/redux/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import { batchApi } from "../features/batches/batchApi";
import { routineApi } from "../features/routines/routineApi";
import { eventApi } from "../features/events/eventApi";
import { newsApi } from "../features/news/newsApi";
import { enrollApi } from "../features/enroll/enrollApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [batchApi.reducerPath]: batchApi.reducer,
    [routineApi.reducerPath]: routineApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [enrollApi.reducerPath]: enrollApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      batchApi.middleware,
      routineApi.middleware,
      eventApi.middleware,
      newsApi.middleware,
      enrollApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
