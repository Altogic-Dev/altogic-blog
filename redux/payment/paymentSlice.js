import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  currentSubscription: {},
  invoices: [],
  isLoading: false,
  error: null,
  plans: [],
};
export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    getSubscriptionsRequest(state) {
      state.isLoading = true;
    },
    getSubscriptionsSuccess(state, action) {
      [state.currentSubscription] = action.payload;
      state.isLoading = false;
    },
    getSubscriptionsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getInvoicesRequest(state) {
      state.isLoading = true;
    },
    getInvoicesSuccess(state, action) {
      state.invoices = action.payload;
      state.isLoading = false;
    },
    getInvoicesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPlansRequest(state) {
      state.isLoading = true;
    },
    getPlansSuccess(state, action) {
      state.plans = action.payload;
      state.isLoading = false;
    },
    getPlansFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    subscribeRequest(state) {
      state.isLoading = true;
    },
    subscribeSuccess(state, action) {
      state.isLoading = false;
      state.subscriptions = [...state.subscriptions, action.payload];
    },
    subscribeFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    cancelSubscriptionRequest(state) {
      state.isLoading = true;
    },
    cancelSubscriptionSuccess(state, action) {
      state.isLoading = false;
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.id !== action.payload.id
      );
    },
    cancelSubscriptionFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.payment,
    }),
  },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;
