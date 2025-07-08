import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface EnrollRequest {
  userEmail: string;
  batchId: number;
}

interface EnrollResponse {
  message: string;
}

export const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    enrollToBatch: builder.mutation<EnrollResponse, EnrollRequest>({
      query: ({ userEmail, batchId }) => ({
        url: "/enroll",
        method: "POST",
        body: { userEmail, batchId },
      }),
    }),
  }),
});

export const { useEnrollToBatchMutation } = enrollApi;
