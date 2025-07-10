import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/enroll",
  }),
  endpoints: (builder) => ({
    enrollUser: builder.mutation<
      { message: string },
      { email: string; batchId: string }
    >({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useEnrollUserMutation } = enrollApi;
