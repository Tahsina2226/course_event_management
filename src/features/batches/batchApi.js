import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const batchApi = createApi({
    reducerPath: 'batchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getBatches: builder.query({
            query: () => 'batches',
        }),
        addBatch: builder.mutation({
            query: (newBatch) => ({
                url: 'batches',
                method: 'POST',
                body: newBatch,
            }),
        }),
    }),
});

export const { useGetBatchesQuery, useAddBatchMutation } = batchApi;
