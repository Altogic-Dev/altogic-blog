import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  publicationFollowers: [],
  publications: [],
  publication: null,
  publicationStories: [],
  isPublicationnameValid: true,
  publicationname: null,
  latestPublicationStories: [],
  featurePages: [],
  featurePage: null,
  publicationNavigation: [],
  error: null,
  isLoading: false,
  userPublications: [],
  followed_publications: [],
  userFollowingPublication: [],
  publicationFeatures: [],
  sections: [],
  homeLayout: null,
  selectedPublication: null,
  isFollowingPublication: false,
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

    getFeaturePageRequest() {},
    getFeaturePageSuccess(state, action) {
      state.featurePage = action.payload;
    },
    setPublicationsOnLogin(state, action) {
      state.publications = action.payload;
    },

    followPublicationRequest(state) {
      state.isLoading = true;
    },
    followPublicationSuccess(state, action) {
      state.isLoading = false;
      state.isFollowingPublication = true;
      console.log(state.isFollowingPublication);
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
      state.isFollowingPublication = false;
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
    getSubscribersRequest(state) {
      state.isLoading = true;
    },
    getSubscribersSuccess(state, action) {
      state.isLoading = false;
      state.subscribers = action.payload;
    },
    getSubscribersFailure(state) {
      state.isLoading = false;
    },

    deletePublicationSectionRequest(state) {
      state.isLoading = true;
    },
    setFeaturePageSectionsRequest(state) {
      state.isLoading = true;
    },
    setFeaturePageSectionsSuccess(state, action) {
      state.sections = action.payload;
      state.isLoading = false;
    },
    setFeaturePageSectionsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createFeaturePageRequest(state) {
      state.isLoading = true;
    },
    createFeaturePageSuccess(state, action) {
      state.isLoading = false;
      state.publicationFeatures = [
        ...state.publicationFeatures,
        action.payload,
      ];
    },
    createFeaturePageFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateFeaturePageRequest(state) {
      state.isLoading = true;
    },
    updateFeaturePageSuccess(state, action) {
      state.isLoading = false;
      state.publicationFeatures = state.publicationFeatures.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    updateFeaturePageFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setPublicationsRequest(state, action) {
      state.publications = action.payload;
    },
    getUserPublicationsRequest(state) {
      state.isLoading = true;
    },
    getUserPublicationsSuccess(state, action) {
      state.isLoading = false;
      state.userPublications = action.payload.publications;
      state.followed_publications = action.payload.followed_publications;
    },
    getUserPublicationsFailure(state) {
      state.isLoading = false;
    },
    selectPublicationRequest(state) {
      state.isLoading = true;
    },
    selectPublicationSuccess(state, action) {
      state.selectedPublication = action.payload;
    },

    getPublicationHomeLayoutRequest(state) {
      state.isLoading = true;
    },
    getPublicationHomeLayoutSuccess(state, action) {
      state.homeLayout = action.payload;
      state.isLoading = false;
    },
    getPublicationHomeLayoutFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    updatePublicationHomeLayoutRequest(state) {
      state.isLoading = true;
    },
    updatePublicationHomeLayoutSuccess(state, action) {
      state.homeLayout = action.payload;
      state.isLoading = false;
    },
    updatePublicationHomeLayoutFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    isFollowingPublicationRequest(state) {
      state.isLoading = true;
    },
    isFollowingPublicationSuccess(state, action) {
      state.isFollowingPublication = action.payload;
      state.isLoading = false;
    },
    isFollowingPublicationFailure(state, action) {
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
