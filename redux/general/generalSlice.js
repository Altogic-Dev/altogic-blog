import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  storyConnectInfo: null,
  isLoading: false,
  error: null,
  searchResult: null,
  searchPreview: null,
  
};

// Actual Slice
export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // Action to set the authentication status
    getConnectInformationStoryRequest(state) {
      state.isLoading = true;
    },
    getConnectInformationStorySuccess(state, action) {
      state.storyConnectInfo = action.payload;
      state.isLoading = false;

    },
    searchRequest(state) {
      state.isLoading = true;
    },
    searchSuccess(state, action) {
      state.searchResult = action.payload;
      state.searchLoading = false;
    },
    searchFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    searchPreviewRequest(state) {
      state.isLoading = true;
    },
    searchPreviewSuccess(state, action) {
      state.searchPreview = action.payload;
      state.isLoading = false;
    },
    searchPreviewFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getFollowAndSubscribedInfoRequest(state) {
      state.infoRequestLoading = true;
    },

    getFollowAndSubscribedInfoSuccess(state) {
      state.infoRequestLoading = false;
    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.general,
      }),
    },
  },
});

export const generalActions = generalSlice.actions;

export default generalSlice.reducer;
