import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  filters: JobFilters;
}

const initialState: SearchState = {
  query: '',
  filters: {
    category: '',
    candidate_required_location: '',
    job_type: '',
  }
}

interface JobFilters {
  category: string;
  candidate_required_location: string;
  job_type: string;
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setFilter(state, action: PayloadAction<{ type: keyof JobFilters, value: string }>) {
      state.filters[action.payload.type] = action.payload.value;
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
    // addFilter(state, action: PayloadAction<{ type: keyof SearchState['filters'], value: string }>) {
    //   state.filters[action.payload.type] = [...state.filters[action.payload.type], action.payload.value];
    // },
    // removeFilter(state, action: PayloadAction<{ type: keyof SearchState['filters'], value: string }>) {
    //   state.filters[action.payload.type] = state.filters[action.payload.type].filter(filter => filter !== action.payload.value);
    // }
  }
});

export const { setSearchQuery, setFilter, clearFilters } = searchSlice.actions;
export default searchSlice.reducer;