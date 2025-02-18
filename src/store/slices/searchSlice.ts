import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  filters: string[];
}

const initialState: SearchState = {
  query: '',
  filters: []
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    addFilter(state, action: PayloadAction<string>) {
      state.filters = [...state.filters, action.payload];
    },
    removeFilter(state, action: PayloadAction<string>) {
      state.filters = state.filters.filter(filter => filter !== action.payload);
    }
  }
});

export const { setSearchQuery, addFilter, removeFilter } = searchSlice.actions;
export default searchSlice.reducer;