import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => 'events',
        }),
    }),
});

export const { useGetEventsQuery } = eventApi;
