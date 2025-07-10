import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Speaker {
  name: string;
  title: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  category?: string;
  time?: string;
  speakers?: Speaker[];
}

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://university-lp-backend.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => "events",
    }),
  }),
});

export const { useGetEventsQuery } = eventApi;
