import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CartItem } from '@/shared/model/types';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Card>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                const cardData = JSON.parse(JSON.stringify(action.payload)) as CartItem;
                                cardData.quantity = 1;
                                // Проблема совместимости readonly-типов @react-three/drei с WritableDraft Redux Toolkit
                                // JSON.parse/JSON.stringify создаёт глубокую копию без readonly, но типы сохраняются
                                // @ts-expect-error - WritableDraft<CartItem> несовместим с CartItem из-за readonly в EnvironmentProps
                                state.items.push(cardData);
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    state.items = state.items.filter(i => i.id !== action.payload);
                } else {
                    item.quantity -= 1;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;