import { createSlice } from '@reduxjs/toolkit';
import AuthService from '@/services/auth';
import { HYDRATE } from 'next-redux-wrapper';
// Initial state
const initialState = {
  isLoading: true,
  error: null,
  user: AuthService.getUser(),
  isMuted: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequested(state) {
      state.isLoading = true;
    },
    registerSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      window.location.href = `/mail-verification?email=${state.user.email}`;
    },
    registerFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAuthGrantRequested(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      window.location.href = '/';
    },
    getAuthGrantFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    loginRequested(state) {
      state.isLoading = true;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    forgotPasswordRequested(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state) {
      state.isLoading = false;
      window.location.href = `/forgot-password-email?email=${state.user.email}`;
    },

    forgotPasswordFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resendVerificationEmailRequested(state) {
      state.isLoading = true;
    },
    resendVerificationEmailSuccess(state) {
      state.isLoading = false;
    },
    resendVerificationEmailFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    muteAuthorRequested() {},
    muteAuthorSuccess(state, action) {
      state.user = {
        ...state.user,
        mutedUser: action.payload.newMutedUsers,
      };
      state.isMuted = true;
    },

    isMutedRequest() {},
    isMutedSuccess(state, action) {
      state.isMuted = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.auth,
      }),
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
