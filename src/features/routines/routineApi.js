import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const routineApi = createApi({
    reducerPath: 'routineApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getRoutines: builder.query({
            query: () => 'routines',
        }),
    }),
});

export const { useGetRoutinesQuery } = routineApi;
