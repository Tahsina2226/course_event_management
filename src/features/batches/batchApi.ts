import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    reducerPath: 'batchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Batch'],
    endpoints: (builder) => ({
        getBatches: builder.query < Batch[], void> ({
            query: () => 'batches',
            providesTags: ['Batch'],
        }),
        deleteBatch: builder.mutation < void, number> ({
            query: (id) => ({
                url: `batches/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Batch'],
        }),
        updateBatch: builder.mutation < void, UpdateBatchPayload> ({
            query: ({ id, data }) => ({
                url: `batches/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Batch'],
        }),
  }),
});

export const {
    useGetBatchesQuery,
    useDeleteBatchMutation,
    useUpdateBatchMutation,
} = batchApi;
