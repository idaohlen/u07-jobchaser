import { combineReducers } from '@reduxjs/toolkit';
import exampleSlice from './slices/exampleSlice';

const rootReducer = combineReducers({
  example: exampleSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;