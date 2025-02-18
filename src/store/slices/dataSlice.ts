import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  bookmarks: string[];
}

const initialState: DataState = {
  bookmarks: []
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark !== action.payload);
    }
  }
});

export const { addBookmark, removeBookmark } = dataSlice.actions;
export default dataSlice.reducer;