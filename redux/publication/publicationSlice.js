import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  publicationFollowers: [],
  publication: null,
  publicationStories: [],
  isPublicationnameValid: true,
  publicationname: null,
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
    getPublicationStoriesRequest(state) {
      state.isLoading = true;
    },
    getPublicationStoriesSuccess(state, action) {
      state.publication = action.payload;
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
