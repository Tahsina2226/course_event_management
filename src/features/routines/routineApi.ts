import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Routine {
    id: number;
    course: string;
    time: string;
    room: string;
}

export const routineApi = createApi({
    reducerPath: 'routineApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getRoutines: builder.query < Routine[], void> ({
            query: () => 'routines',
        }),
    }),
});

export const { useGetRoutinesQuery } = routineApi;
