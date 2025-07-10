import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../redux/Store";

export interface Batch {
  id: number;
  name: string;
  department: string;
  semester: string;
}

export interface UpdateBatchPayload {
  id: number;
  data: Partial<Batch>;
}

export const batchApi = createApi({
  reducerPath: "batchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://university-lp-backend.vercel.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Batch"],
  endpoints: (builder) => ({
    getBatches: builder.query<Batch[], void>({
      query: () => "batches",
      providesTags: ["Batch"],
    }),
    addBatch: builder.mutation<void, Omit<Batch, "id">>({
      query: (newBatch) => ({
        url: "batches",
        method: "POST",
        body: newBatch,
      }),
      invalidatesTags: ["Batch"],
    }),
    deleteBatch: builder.mutation<void, number>({
      query: (id) => ({
        url: `batches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Batch"],
    }),
    updateBatch: builder.mutation<void, UpdateBatchPayload>({
      query: ({ id, data }) => ({
        url: `batches/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Batch"],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useAddBatchMutation,
  useDeleteBatchMutation,
  useUpdateBatchMutation,
} = batchApi;
