import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Card, CreateOrderDto, Order } from '@/shared/model/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCards: builder.query<Card[], void>({
      query: () => '/cards',
    }),
    getTastes: builder.query<string[], void>({
      query: () => '/cards/tastes',
    }),
    createOrder: builder.mutation<Order, CreateOrderDto>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetCardsQuery, useGetTastesQuery, useCreateOrderMutation } = cardsApi;