import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userName = action.payload.userName;
    },
    setSignOut: state => {
      state.email = null;
      state.userName = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

// Selectors
export const selectUser = state => state.auth;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectEmail = state => state.auth.email;
export const selectUserName = state => state.auth.userName;

export default authSlice.reducer;
