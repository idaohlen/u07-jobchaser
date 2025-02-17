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
    setFilters(state, action: PayloadAction<string[]>) {
      state.filters = action.payload;
    },
  }
});

export const { setSearchQuery, setFilters } = searchSlice.actions;
export default searchSlice.reducer;