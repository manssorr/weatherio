import {createSlice} from '@reduxjs/toolkit';

export interface IAuth {
  email: string;
  username: string;
  isLoggedIn: boolean;
}

const initialState: IAuth = {
  isLoggedIn: false,
  email: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state: IAuth, action: {payload: IAuth}) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
    },
    setSignOut: (state: IAuth) => {
      state.email = null;
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

// Selectors
export const selectUser = state => state.auth;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectEmail = state => state.auth.email;
export const selectUsername = state => state.auth.username;

export default authSlice.reducer;
