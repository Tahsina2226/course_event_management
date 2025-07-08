import { configureStore } from "@reduxjs/toolkit";
import { batchApi } from "../features/batches/batchApi";
import { routineApi } from "../features/routines/routineApi";
import { eventApi } from "../features/events/eventApi";
import { newsApi } from "../features/news/newsApi";

export const store = configureStore({
  reducer: {
    [batchApi.reducerPath]: batchApi.reducer,
    [routineApi.reducerPath]: routineApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(batchApi.middleware)
      .concat(routineApi.middleware)
      .concat(eventApi.middleware)
      .concat(newsApi.middleware),
});
