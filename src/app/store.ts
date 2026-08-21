import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "@/entities/cart/model/cart-slice"
import cardsReducer from "@/entities/cards/model/cards-slice"
import orderReducer from "@/entities/order/model/order-slice"

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      cards: cardsReducer,
      order: orderReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];