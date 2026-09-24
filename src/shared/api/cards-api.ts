import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Card, CreateOrderDto, Order } from '@/shared/model/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getCards: builder.query<Card[], void>({
      query: () => '/cards',
    }),
    getTastes: builder.query<string[], void>({
      query: () => '/cards/tastes',
    }),
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<Order, CreateOrderDto>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
    }),
    assembleOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/orders/${id}/assemble`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
    deliverOrder: builder.mutation<Order, { id: number; courierName: string }>({
      query: ({ id, courierName }) => ({
        url: `/orders/${id}/deliver`,
        method: 'PATCH',
        body: { courierName },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetTastesQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useAssembleOrderMutation,
  useDeliverOrderMutation,
} = cardsApi;