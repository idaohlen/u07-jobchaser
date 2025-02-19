import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  bookmarks: string[];
}

const initialState: DataState = {
  bookmarks: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('bookmarks') || '[]') : []
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = [...state.bookmarks, action.payload];
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark !== action.payload);
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    }
  }
});

export const { addBookmark, removeBookmark } = dataSlice.actions;
export default dataSlice.reducer;