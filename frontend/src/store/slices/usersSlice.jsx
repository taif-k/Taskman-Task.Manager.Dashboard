
import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: storedUsers,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  },
  reducers: {
    signUp: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    signIn: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        state.currentUser = null;
      }
    },
    signOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signUp, signIn, signOut } = usersSlice.actions;
export default usersSlice.reducer;
