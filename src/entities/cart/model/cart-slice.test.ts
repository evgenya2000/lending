import reducer, {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
} from './cart-slice';
import { Card } from '@/shared/model/types';

const createCard = (id: number, price: number = 100): Card => ({
  id,
  title: `Macaron ${id}`,
  description: 'Test description',
  price,
  tastes: ['vanilla'],
  macaronConfig: {
    camera: { position: [0, 0, 5] },
    environment: { map: 'studio', intensity: 1 },
    light: { position: [1, 1, 1], intensity: 1 },
    macaronConfig: {
      colors: { Top: '#fff', Bottom: '#fff', Center: '#fff' },
      position: [0, 0, 0],
      speed: 1,
    },
  },
});

describe('cart-slice', () => {
  it('should add a new item to the cart', () => {
    const state = reducer(undefined, addItem(createCard(1)));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: 1, quantity: 1 });
  });

  it('should increment quantity when adding an existing item', () => {
    let state = reducer(undefined, addItem(createCard(1)));
    state = reducer(state, addItem(createCard(1)));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove an item by id', () => {
    let state = reducer(undefined, addItem(createCard(1)));
    state = reducer(state, addItem(createCard(2)));
    state = reducer(state, removeItem(1));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(2);
  });

  it('should increment quantity of an existing item', () => {
    let state = reducer(undefined, addItem(createCard(1)));
    state = reducer(state, incrementQuantity(1));

    expect(state.items[0].quantity).toBe(2);
  });

  it('should decrement quantity of an item', () => {
    let state = reducer(undefined, addItem(createCard(1)));
    state = reducer(state, addItem(createCard(1)));
    state = reducer(state, decrementQuantity(1));

    expect(state.items[0].quantity).toBe(1);
  });

  it('should remove an item when decrementing below one', () => {
    let state = reducer(undefined, addItem(createCard(1)));
    state = reducer(state, decrementQuantity(1));

    expect(state.items).toHaveLength(0);
  });

  it('should clear the cart', () => {
    let state = reducer(undefined, addItem(createCard(1)));
    state = reducer(state, addItem(createCard(2)));
    state = reducer(state, clearCart());

    expect(state.items).toHaveLength(0);
  });

  it('should select cart items from root state', () => {
    const state = { cart: reducer(undefined, addItem(createCard(1))) };

    expect(selectCartItems(state)).toHaveLength(1);
  });
});
