import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  publicationFollowers: [],
  publication: null,
  latestPublicationStories: [],
  featurePages: [],
  publicationNavigation: [],
  error: null,
  isLoading: false,
  userPublications: [],
  userFollowingPublication: [],
  publicationFeatures: [],
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
    getPublicationFeaturesRequest(state) {
      state.isLoading = true;
    },
    getPublicationFeaturesSuccess(state, action) {
      state.publicationFeatures = action.payload;
      state.isLoading = false;
    },
    getPublicationFeaturesFailure(state, action) {
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

    followPublicationRequest(state) {
      state.isLoading = true;
    },
    followPublicationSuccess(state, action) {
      state.isLoading = false;
      state.publication.followerCount += 1;
      state.publicationFollowers = [
        ...state.publicationFollowers,
        action.payload.user,
      ];
      state.userFollowingPublication = [
        ...state.userFollowingPublication,
        action.payload.publication,
      ];
    },
    followPublicationFailure(state) {
      state.isLoading = false;
    },
    unfollowPublicationRequest(state) {
      state.isLoading = true;
    },
    unfollowPublicationSuccess(state, action) {
      state.isLoading = false;
      state.publication.followerCount -= 1;
      state.userFollowingPublication = state.userFollowingPublication.filter(
        (item) => item !== action.payload
      );
    },
    unfollowPublicationFailure(state) {
      state.isLoading = false;
    },
    checkPublicationFollowingRequest(state) {
      state.isLoading = true;
    },
    checkPublicationFollowingSuccess(state, action) {
      state.isLoading = false;
      state.userFollowingPublication = action.payload.map(
        (item) => item.publication
      );
    },
    checkPublicationFollowingFailure(state) {
      state.isLoading = false;
    },
    deleteFeatureRequest(state) {
      state.isLoading = true;
    },
    deleteFeatureSuccess(state, action) {
      state.isLoading = false;
      state.userFollowingPublication = state.userFollowingPublication.filter(
        (item) => item._id !== action.payload._id
      );
    },
    deleteFeatureFailure(state) {
      state.isLoading = false;
    },
    getNewslettersRequest(state) {
      state.isLoading = true;
    },
    getNewslettersSuccess(state, action) {
      state.isLoading = false;
      state.newsletters = action.payload;
    },
    getNewslettersFailure(state) {
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
