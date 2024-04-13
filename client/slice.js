import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'bathrooms',
    initialState: {
      isLoggedIn: false
    },
    reducers: {
      loginUser: (state, action) => {
        console.log('in login function');
        state.isLoggedIn = true;
      },
      logoutUser: (state, action) => {
        console.log('in add logout function');
        state.isLoggedIn = false;
      },
    }
  });
  
  export const { loginUser, logoutUser } = slice.actions;
  export default slice.reducer;