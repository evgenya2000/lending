// features/cart/hooks/useCart.ts
import { useSelector, useDispatch } from 'react-redux';
import { Card, CartItem } from '@/shared/model/types';
import { AppDispatch, RootState } from '@/app/store';
import { addItem, clearCart, decrementQuantity, incrementQuantity, removeItem } from '@/entities/cart/model/cart-slice';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const getQuantityInCart = (cardId: number): number => {
        const cartItem = items.find(item => item.id === cardId);
        return cartItem ? cartItem.quantity : 0;
  };
  return {
    items,
    totalQuantity,
    totalPrice,
    addItem: (card: Card) => dispatch(addItem(card)),
    removeItem: (id: number) => dispatch(removeItem(id)),
    increment: (id: number) => dispatch(incrementQuantity(id)),
    decrement: (id: number) => dispatch(decrementQuantity(id)),
    clearCart: () => dispatch(clearCart()),
    getQuantityInCart,
  };
};