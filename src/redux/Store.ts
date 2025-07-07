import { configureStore } from "@reduxjs/toolkit";
import { batchApi } from "../features/batches/batchApi";

export const store = configureStore({
  reducer: {
    [batchApi.reducerPath]: batchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(batchApi.middleware),
});
