import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const batchApi = createApi({
    reducerPath: 'batchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Batch'],
    endpoints: (builder) => ({
        getBatches: builder.query({
            query: () => 'batches',
            providesTags: ['Batch']
        }),
        deleteBatch: builder.mutation({
            query: (id) => ({
                url: `batches/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Batch']
        }),
        updateBatch: builder.mutation({
            query: ({ id, data }) => ({
                url: `batches/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Batch']
        })
    })
});

export const {
    useGetBatchesQuery,
    useDeleteBatchMutation,
    useUpdateBatchMutation
} = batchApi;
