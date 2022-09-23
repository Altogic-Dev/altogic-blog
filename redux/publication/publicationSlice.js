import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  publicationFollowers:[],
  publication:null,
  latestPublicationStories:[],
  error: null,
  isLoading: false,
};

export const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {

    getPublicationFollowersRequest(state) {
      state.followingStoriesLoading = true;
    },
    getPublicationFollowersRequestSuccess(state, action) {
      state.publicationFollowers = action.payload;
      state.isLoading = false;

    },
    getPublicationFollowersFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      
    },

    getPublicationRequest(state) {
      state.isLoading = true;
    },
    getPublicationSuccess(state, action) {
      state.publication = action.payload;
      state.isLoading = false;

    },
    getPublicationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      
    },
    getLatestPublicationStoriesRequest(state) {
      state.isLoading = true;
    },
    getLatestPublicationStoriesSuccess(state, action) {
      state.latestPublicationStories = action.payload;
      state.isLoading = false;

    },
    getLatestPublicationStoriesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      
    },
    visitPublicationRequest(state) {
      state.isLoading = true;
    },
    visitPublicationSuccess(state) {
      state.isLoading = false;

    },
    visitPublicationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      
    },

   
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.publication,
      }),
    },
  },
});

export const publicationActions = publicationSlice.actions;

export default publicationSlice.reducer;
