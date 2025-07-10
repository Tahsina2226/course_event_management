import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface News {
  id: number;
  title: string;
  description: string;
  category?: string;
  date?: string;
  imageUrl?: string;
  readTime?: string;
  views?: number;
  likes?: number;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://university-lp-backend.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<News[], void>({
      query: () => "news",
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
