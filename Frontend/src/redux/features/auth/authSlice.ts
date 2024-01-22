import { createSlice } from "@reduxjs/toolkit";

type TInitialStateType = {
  user: null | object;
  token: null | string;
};

const initialState: TInitialStateType = {
  user: null,
  token: null,
};

const apiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setUser, logOut } = apiSlice.actions;
export default apiSlice.reducer;
