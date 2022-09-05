import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  subscribingUser: null,
  isSubscribed: false,
};

// Actual Slice
export const subscribeConnectionSlice = createSlice({
  name: 'subscribeConnection',
  initialState,
  reducers: {
    // Action to set the authentication status

    unSubscribeRequest() {},
    unSubscribeSuccess(state) {
      state.isSubscribed = false;
    },

    subscribeRequest() {},
    subscribeSuccess(state) {
      state.isSubscribed = true;
    },

    getSubscribeRequest() {},
    getSubscribeSuccess(state, action) {
      state.subscribingUser = action.payload;
      state.isSubscribed = !_.isNull(action.payload);
    },

    setIsSubscribed(state, action) {
      state.isSubscribed = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.subscribeConnection,
      }),
    },
  },
});

export const subscribeConnectionActions = subscribeConnectionSlice.actions;

export default subscribeConnectionSlice.reducer;
