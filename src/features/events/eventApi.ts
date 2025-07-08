import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Event {
    id: number;
    name: string;
    date: string;
}

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getEvents: builder.query < Event[], void> ({
            query: () => 'events',
        }),
    }),
});

export const { useGetEventsQuery } = eventApi;
