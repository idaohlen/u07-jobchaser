import { combineReducers } from '@reduxjs/toolkit';
import exampleSlice from './slices/exampleSlice';
import usersSlice from './slices/usersSlice';
import authSlice from './slices/authSlice';
import searchSlice from './slices/searchSlice';

const rootReducer = combineReducers({
  example: exampleSlice,
  users: usersSlice,
  auth: authSlice,
  search: searchSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;