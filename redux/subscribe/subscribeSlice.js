import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  subscribeUser: null,
  isLoading: false,
  error: null,
};

// Actual Slice
export const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {
    // Action to set the authentication status
    subscribeUserRequest(state) {
      state.isLoading = true;
    },
    subscribeUserSuccess(state, action) {
      state.subscribeUser = action.payload;
      state.isLoading = false;
    },
    gsubscribeUserFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
   

    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.subscribe,
      }),
    },
  },
});

export const subscribeActions = subscribeSlice.actions;

export default subscribeSlice.reducer;
