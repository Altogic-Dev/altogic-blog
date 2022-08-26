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
    registerRequest(state) {
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
    getAuthGrantRequest(state) {
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
    loginRequest(state) {
      state.isLoading = true;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest(state) {
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
    resendVerificationEmailRequest(state) {
      state.isLoading = true;
    },
    resendVerificationEmailSuccess(state) {
      state.isLoading = false;
    },
    resendVerificationEmailFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state) {
      state.isLoading = true;
    },
    resetPasswordSuccess(state) {
      state.isLoading = false;
      window.location.href = '/reset-password-successfull';
    },
    resetPasswordFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    authenticateWithProviderRequest(state) {
      state.isLoading = false;
    },
    authenticateWithProviderFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    unfollowTopicRequest(state) {
      state.isLoading = true;
    },
    unfollowTopicSuccess(state) {
      state.isLoading = false;
    },
    unfollowTopicFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    muteAuthorRequest() {},
    muteAuthorSuccess(state, action) {
      state.user = {
        ...state.user,
        mutedUser: action.payload.newMutedUsers,
      };
      state.isMuted = true;
    },

    unmuteAuthorRequest() {},
    unmuteAuthorSuccess(state, action) {
      state.user = {
        ...state.user,
        mutedUser: action.payload.newMutedUsers,
      };
      state.isMuted = false;
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
