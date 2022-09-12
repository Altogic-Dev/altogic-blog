import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  notifications: [],
  responseNotifications: [],
  notificationPreview: [],
  notificationsLoading: false,
  unreadNotificationsCount: 0,
  errors: [],
};

// Actual Slice
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Action to set the authentication status
    getNotificationsRequest(state) {
      state.notificationsLoading = true;
    },
    getNotificationsSuccess(state, action) {
      state.notificationsLoading = false;
      state.notifications = action.payload;
      state.responseNotifications = action.payload.filter(
        (notification) => notification.type === 'reply'
      );
    },
    getNotificationsFailure(state, action) {
      state.notificationsLoading = false;
      state.errors = action.payload;
    },
    createNotificationRequest(state) {
      state.notificationsLoading = true;
    },
    createNotificationSuccess(state, action) {
      state.notificationsLoading = false;
      state.notifications = [...state.notifications, action.payload];
    },
    createNotificationFailure(state, action) {
      state.notificationsLoading = false;
      state.errors = action.payload;
    },
    getRealtimeNotificationsRequest(state) {
      state.notificationsLoading = true;
    },
    getRealtimeNotificationsSuccess(state, action) {
      state.notificationsLoading = false;
      state.notifications = [...state.notifications, action.payload];
      state.unreadNotificationsCount += 1;
    },
    getRealtimeNotificationsFailure(state, action) {
      state.notificationsLoading = false;
      state.errors = action.payload;
    },
    setUnreadNotificationsCount(state, action) {
      state.unreadNotificationsCount = action.payload.count;
    },
    getNotificationPreviewRequest(state) {
      state.notificationsLoading = true;
    },
    getNotificationPreviewSuccess(state, action) {
      state.notificationsLoading = false;
      state.notificationPreview = action.payload;
    },
    getNotificationPreviewFailure(state, action) {
      state.notificationsLoading = false;
      state.errors = action.payload;
    },
    markAsSeenRequest(state) {
      state.notificationsLoading = true;
    },
    markAsSeenSuccess(state) {
      state.notificationsLoading = false;
      state.unreadNotificationsCount = 0;
    },
    markAsSeenFailure(state, action) {
      state.notificationsLoading = false;
      state.errors = action.payload;
    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.notifications,
    }),
  },
});
export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice.reducer;
