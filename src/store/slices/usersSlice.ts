import { createSlice } from '@reduxjs/toolkit';

import User from '@/models/User';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, email: "demo@demo.demo", password: "demo1234", name: "Demo User" },
    { id: 2, email: "admin@demo.demo", password: "admin1234", name: "Demo Admin" }
  ]
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

export default usersSlice.reducer;