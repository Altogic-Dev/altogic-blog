import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  subscribingUser: null,
  isSubscribed: false,
  isLoading: false,
  subscriptions: [],
  subscriptionsLoading: false,
};

// Actual Slice
export const subscribeConnectionSlice = createSlice({
  name: 'subscribeConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    getSubscriptionsRequest(state) {
      state.subscriptionsLoading = true
    },
    getSubscriptionsSuccess(state, action) {
      try {
        state.subscriptionsLoading = false
        state.subscriptions = action.payload.data
      } catch (error) {
        console.log(error)
      }

    },
    getSubscriptionsFailure(state, action) {
      state.subscriptionsLoading = false
      state.error = action.payload

    },
    unSubscribeRequest(state) {
      state.isLoading = true;
    },
    unSubscribeSuccess(state, action) {
      state.subscriptions = state.subscriptions.filter(item => item.subscribingUser._id !== action.payload)
      state.isLoading = false;
      state.isSubscribed = false;
    },
    unSubscribeFailure(state) {
      state.isLoading = false;
      state.isSubscribed = false;
    },

    subscribeRequest(state) {
      state.isLoading = true;
    },
    subscribeSuccess(state) {
      state.isLoading = false;
      state.isSubscribed = true;
    },
    subscribeFailure(state) {
      state.isLoading = false;
      state.isSubscribed = true;
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
