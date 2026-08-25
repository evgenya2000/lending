import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "@/entities/cart/model/cart-slice"
import { cardsApi } from '@/shared/api/cards-api';

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];