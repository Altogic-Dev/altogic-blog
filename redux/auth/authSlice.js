import { createSlice } from '@reduxjs/toolkit';
import AuthService from '@/services/auth';
import { HYDRATE } from 'next-redux-wrapper';
import { toast } from 'react-toastify';
// Initial state
const initialState = {
  isLoading: false,
  error: null,
  loginError: null,
  registerError: null,
  changePasswordError: null,
  updateProfileError: null,
  changeEmailError: null,
  user: AuthService.getUser(),
  profileUser: null,
  isAuthenticated: false,
  sessions: [],
  foundUsers: [],
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
      state.registerError = action.payload;
    },
    getAuthGrantRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
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
      state.loginError = action.payload;
    },
    forgotPasswordRequest(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.isLoading = false;
      window.location.href = `/forgot-password-email?email=${action.payload.email}`;
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

    updateFollowingTopicsRequest(state) {
      state.isLoading = true;
    },
    updateFollowingTopicsSuccess(state) {
      state.isLoading = false;
      state.user = AuthService.getUser();
    },
    updateFollowingTopicsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetErrorsRequest() {},

    resetErrors(state) {
      state.isLoading = false;
      state.error = null;
    },
    changePasswordRequest(state) {
      state.isLoading = true;
    },
    changePasswordSuccess(state) {
      state.isLoading = false;
      toast.success('Password changed successfully');
    },
    changePasswordFailure(state, action) {
      state.isLoading = false;
      state.changePasswordError = action.payload;
    },
    updateUserRequest(state) {
      state.isLoading = true;
    },
    updateProfileRequest(state) {
      state.isLoading = true;
    },
    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      toast.success('Profile updated successfully');
    },
    updateUserFailure(state, action) {
      state.isLoading = false;
      state.updateProfileError = action.payload;
    },
    checkUsernameRequest(state) {
      state.isLoading = true;
    },
    checkUsernameSuccess(state, action) {
      state.isLoading = false;
      state.isUsernameAvailable = action.payload;
    },
    checkUsernameFailure(state, action) {
      state.isLoading = false;
      state.isUsernameAvailable = false;
      state.updateProfileError = action.payload;
    },
    getSessionsRequest(state) {
      state.isLoading = true;
    },
    getSessionsSuccess(state, action) {
      state.isLoading = false;
      state.sessions = action.payload;
    },
    getSessionsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteSessionRequest(state) {
      state.isLoading = true;
    },
    deleteSessionSuccess(state, action) {
      state.isLoading = false;
      state.sessions = state.sessions.filter(
        (session) => session.token !== action.payload
      );
    },
    deleteSessionFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.isLoading = true;
    },
    logoutSuccess(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.sessions = [];
      window.location.href = '/login';
    },
    changeEmailRequest(state) {
      state.isLoading = true;
    },
    changeEmailSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload.user;
      window.location.href = `/mail-verification?operation=change&email=${action.payload.email}`;
    },
    changeEmailFailure(state, action) {
      state.isLoading = false;
      state.changeEmailError = action.payload;
    },
    getUserByUserNameRequest(state) {
      state.isLoading = true;
      state.profileUser = null;
    },
    getUserByUserNameSuccess(state, action) {
      state.isLoading = false;
      state.profileUser = action.payload;
    },
    getUserByUserNameFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    updateProfileUser(state, action) {
      state.profileUser = action.payload;
    },

    searchUserByUsernameRequest(state) {
      state.isLoading = true;
    },
    searchUserByUsernameSuccess(state, action) {
      state.foundUsers = action.payload;
      state.isLoading = false;
    },
    searchUserByUsernameFailure(state) {
      state.isLoading = false;
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
