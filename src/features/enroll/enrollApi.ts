import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../redux/Store";

export interface EnrollmentPayload {
  userEmail: string;
  batchId: number;
}

export interface EnrollmentResponse {
  message: string;
}

export const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    enrollToBatch: builder.mutation<EnrollmentResponse, EnrollmentPayload>({
      query: (payload) => ({
        url: "enrollments",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useEnrollToBatchMutation } = enrollApi;
