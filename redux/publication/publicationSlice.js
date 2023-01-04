import ToastMessage from '@/utils/toast';
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
  latestPublicationStoriesCount: 0,
  latestPublicationStoriesPage: 0,
  featurePages: [],
  featurePage: null,
  publicationNavigation: null,
  error: null,
  isLoading: false,
  userPublications: null,
  followed_publications: [],
  userFollowingPublication: [],
  publicationFeatures: [],
  sections: [],
  homeLayout: null,
  selectedPublication: null,
  isFollowingPublication: false,
  isFeatureCreating: false,

};

export const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {
    getPublicationFollowersRequest(state) {
      state.isLoading = true;
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
      state.latestPublicationStories = [];
    },
    getLatestPublicationStoriesSuccess(state, action) {
      state.latestPublicationStories = [
        ...state.latestPublicationStories,
        ...action.payload.result,
      ];
      state.latestPublicationStoriesCount = action.payload.countInfo;
      state.latestPublicationStoriesPage = action.payload.page;
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
    getPublicationStoriesailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getPublicationByIdRequest() { },
    getPublicationByIdSuccess(state, action) {
      state.publication = action.payload;
    },

    isPublicationnameExistRequest() { },
    isPublicationnameExistSuccess(state, action) {
      state.isPublicationnameValid = !action.payload.isExist;
      if (!action.payload.isExist) {
        state.publicationname = action.payload.publicationname;
      }
    },

    updatePublicationRequest() { },
    updatePublicationSuccess(state, action) {
      ToastMessage.success('Publication updated successfully');
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
      state.publicationNavigation = null;
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
      ToastMessage.success('Navigation updated succesfully');

    },
    updatePublicationNavigationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setPublicationFromLocalStorage(state, action) {
      state.userPublications = action.payload;
    },

    clearFeaturePageRequest(state) {
      state.featurePage = null;
    },
    getFeaturePageRequest() { },
    getFeaturePageSuccess(state, action) {
      state.featurePage = action.payload;
    },

    setPublicationsRequest(state) {
      state.isLoading = true
    },
    setPublicationsSuccess(state, action) {
      state.publications = action.payload;
      state.isLoading = false
    },
    addPublicationsToUser(state, action) {
      state.publications = [...state.publications, action.payload];
    },

    followPublicationRequest(state) {
      state.isLoading = true;
    },
    followPublicationSuccess(state, action) {
      state.isLoading = false;
      state.publication.isFollowing = true;
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
      state.publication.isFollowing = false;
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
      state.publicationFeatures = state.publicationFeatures.filter(feature => feature._id !== action.payload.id)
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
    deletePublicationSectionSuccess(state, action) {
      state.sections = action.payload;
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
      state.isFeatureCreating = true;
    },
    createFeaturePageSuccess(state, action) {
      state.isFeatureCreating = false;
      state.publicationFeatures = [
        ...state.publicationFeatures,
        action.payload,
      ];
    },
    createFeaturePageFailure(state, action) {
      state.error = action.payload;
      state.isFeatureCreating = false;
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
      state.isLoading = false;
    },
    selectPublicationFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
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
      ToastMessage.success('Publication layout updated successfully');
      state.isLoading = false;
    },
    updatePublicationHomeLayoutFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    createPublicationRequest(state) {
      state.isLoading = true;
    },
    createPublicationSuccess(state, action) {
      state.userPublications = [...state.userPublications, action.payload];
      state.publication = action.payload;
      state.isLoading = false;
    },
    createPublicationFailure(state, action) {
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

    updateFeaturePageSuccessFromDelete(state, action) {
      state.isLoading = false;
      state.featurePage = action.payload
    },


    cleanFeaturePageRequest(state) {
      state.featurePage = null;
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
