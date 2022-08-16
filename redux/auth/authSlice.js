import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
  authState: false,
  isLoading: true,
  error: null
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    fetchDataRequest(state, action) {
      state.isLoading = true;
      console.log({state, action})
    },
    fetchDataSuccess(state, action) {
      state.isLoading = false;
      state.authState = action.payload;
    },
    fetchDataFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },

  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;