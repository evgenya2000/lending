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
                const newItem = {
                    ...structuredClone(action.payload),
                    quantity: 1,
                } as any;

                state.items.push(newItem);
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