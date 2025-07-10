import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../redux/Store";

export interface Routine {
  id: number;
  course_name: string;
  day: string;
  time: string;
  room: string;
  batch_id: number;
}

export const routineApi = createApi({
  reducerPath: "routineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://university-lp-backend.vercel.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Routine"],
  endpoints: (builder) => ({
    getRoutines: builder.query<Routine[], string | void>({
      query: (department) =>
        department ? `routines?department=${department}` : "routines",
      providesTags: ["Routine"],
    }),
    deleteRoutine: builder.mutation<void, number>({
      query: (id) => ({
        url: `routines/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Routine"],
    }),
    createRoutine: builder.mutation<Routine, Partial<Routine>>({
      query: (routine) => ({
        url: "routines",
        method: "POST",
        body: routine,
      }),
      invalidatesTags: ["Routine"],
    }),
    updateRoutine: builder.mutation<
      Routine,
      { id: number; data: Partial<Routine> }
    >({
      query: ({ id, data }) => ({
        url: `routines/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Routine"],
    }),
  }),
});

export const {
  useGetRoutinesQuery,
  useDeleteRoutineMutation,
  useCreateRoutineMutation,
  useUpdateRoutineMutation,
} = routineApi;
