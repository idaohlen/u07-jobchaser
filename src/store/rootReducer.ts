import { combineReducers } from '@reduxjs/toolkit';
import usersSlice from './slices/usersSlice';
import authSlice from './slices/authSlice';
import searchSlice from './slices/searchSlice';
import dataSlice from './slices/dataSlice';

const rootReducer = combineReducers({
  users: usersSlice,
  auth: authSlice,
  search: searchSlice,
  data: dataSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;