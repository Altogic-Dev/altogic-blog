import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  publicationFollowers: [],
  publication: null,
  publicationStories: [],
  isPublicationnameValid: true,
  publicationname: null,
  latestPublicationStories: [],
  featurePages: [],
  publicationNavigation: [],
  error: null,
  isLoading: false,
  userPublications: [],
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
    getPublicationStoriesailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getPublicationByIdRequest() {},
    getPublicationByIdSuccess(state, action) {
      state.publication = action.payload;
    },

    isPublicationnameExistRequest() {},
    isPublicationnameExistSuccess(state, action) {
      state.isPublicationnameValid = !action.payload.isExist;
      if (!action.payload.isExist) {
        state.publicationname = action.payload.publicationname;
      }
    },

    updatePublicationRequest() {},
    updatePublicationSuccess(state, action) {
      state.publication = action.payload;
    },

    getFeaturePagesByPublicationRequest(state) {
      state.isLoading = true;
    },
    getFeaturePagesByPublicationSuccess(state, action) {
      state.featurePages = action.payload;
      state.isLoading = false;
    },
    getFeaturePagesByPublicationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPublicationNavigationRequest(state) {
      state.isLoading = true;
    },
    getPublicationNavigationSuccess(state, action) {
      state.publicationNavigation = action.payload;
      state.isLoading = false;
    },
    getPublicationNavigationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createPublicationNavigationRequest(state) {
      state.isLoading = true;
    },
    createPublicationNavigationSuccess(state, action) {
      state.publicationNavigation = action.payload;
      state.isLoading = false;
    },
    createPublicationNavigationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updatePublicationNavigationRequest(state) {
      state.isLoading = true;
    },
    updatePublicationNavigationSuccess(state, action) {
      state.publicationNavigation = action.payload;
      state.isLoading = false;
    },
    updatePublicationNavigationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setPublicationFromLocalStorage(state, action) {
      state.userPublications = action.payload;
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
