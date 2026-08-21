import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '@/shared/model/types';
import { fetchCards } from '@/shared/api/cards-api';

interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
};

// Thunk для загрузки всех карточек
export const fetchCardsThunk = createAsyncThunk(
  'cards/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCards();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardsThunk.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCardsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cardsSlice.reducer;