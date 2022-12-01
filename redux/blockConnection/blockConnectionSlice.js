import ToastMessage from '@/utils/toast';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  blockedUsers: null,
  blockedUsersInfo: null,
  isBlocked: false,
  isLoading: false,
  error: null,
};

// Actual Slice
export const blockConnectionSlice = createSlice({
  name: 'blockConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    getBlockedUsersRequest(state) {
      state.isLoading = true;
    },
    getBlockedUsersSuccess(state, action) {
      state.isLoading = false;
      if (_.isArray(state.blockedUsers)) {
        state.blockedUsers = [...state.blockedUsers, ...action.payload.data];
      } else {
        state.blockedUsers = action.payload.data;
      }
      state.blockedUsersInfo = action.payload.info;
    },
    getBlockedUsersFailure(state) {
      state.isLoading = false;
    },

    blockUserRequest(state) {
      state.isLoading = true;
      state.blockedUsers = null;
    },
    blockUserSuccess(state, action) {
      state.isLoading = false;
      state.isBlocked = true;
      if (_.isArray(state.blockedUsers)) {
        state.blockedUsers = [...state.blockedUsers, {
          blockedUserId: action.payload.blockedUserId, username: action.payload.blockedUsername
          , blockedUserProfilePicture: action.payload.blockedUserProfilePicture
        }]
      }
      ToastMessage.success('Author is muted');
    },
    blockUserFailure(state) {
      state.isLoading = false;
    },

    unblockAuthorRequest(state) {
      state.isLoading = true;
    },
    unblockAuthorSuccess(state, action) {
      state.blockedUsers = _.reject(
        state.blockedUsers,
        (person) => person._id === action.payload
      );
      ToastMessage.success('Author is unmuted');
      state.isLoading = false;
    },
    unblockAuthorFailure(state) {
      state.isLoading = false;
    },

    setIsBlocked(state, action) {
      state.isBlocked = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.blockConnection,
      }),
    },
  },
});

export const blockConnectionActions = blockConnectionSlice.actions;

export default blockConnectionSlice.reducer;
