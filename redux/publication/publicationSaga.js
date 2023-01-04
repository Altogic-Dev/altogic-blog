import PublicationService from '@/services/publication';
import {
  call,
  debounce,
  put,
  takeEvery,
  select,
  fork,
  all,
} from 'redux-saga/effects';
import LocalStorageUtil from '@/utils/localStorageUtil';
import _ from 'lodash';
import { publicationActions } from './publicationSlice';
import { storyActions } from '../story/storySlice';
import { clearFileLink } from '../file/fileSaga';
import { updateUserSaga } from '../auth/authSaga';
import { fileActions } from '../file/fileSlice';

function* getPublicationFollowersSaga({ payload: publicationId }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublicationFollowers,
      publicationId
    );
    if (data) {
      yield put(publicationActions.getPublicationFollowersSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getPublicationFollowersFailure(e));
  }
}

function* getPublicationSaga({ payload: { publicationName, user } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublication,
      publicationName,
      user
    );
    if (data) {
      yield put(publicationActions.getPublicationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getPublicationFailure(e));
  }
}
function* getLatestPublicationStoriesSaga({
  payload: { publicationName, page, pageSize },
}) {
  try {
    const { data, errors } = yield call(
      PublicationService.getLatestPublicationStories,
      publicationName,
      page,
      pageSize
    );
    if (data) {
      yield put(
        publicationActions.getLatestPublicationStoriesSuccess(data, page)
      );
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getLatestPublicationStoriesFailure(e));
  }
}
function* visitPublicationSaga({ payload: { publicationName, user } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.visitPublication,
      publicationName,
      user
    );
    if (data) {
      yield put(publicationActions.visitPublicationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.visitPublicationFailure(e));
  }
}
function* getFeaturePagesByPublicationSaga({ payload: publicationId }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getFeaturePagesByPublication,
      publicationId
    );
    if (data) {
      yield put(publicationActions.getFeaturePagesByPublicationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getFeaturePagesByPublicationFailure(e));
  }
}
function* getPublicationsNavigation({ payload: publicationId }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublicationsNavigation,
      publicationId
    );
    if (data) {
      yield put(publicationActions.getPublicationNavigationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getPublicationNavigationFailure(e));
  }
}
function* createPublicationNavigation({ payload: publication }) {
  try {
    const { data, errors } = yield call(
      PublicationService.cratePublicationNavigation,
      publication
    );
    if (data) {
      yield put(publicationActions.createPublicationNavigationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.createPublicationNavigationFailure(e));
  }
}
function* updatePublicationNavigation({
  payload: { publicationId, navigation },
}) {
  try {
    const { data, errors } = yield call(
      PublicationService.updatePublicationNavigation,
      publicationId,
      navigation
    );
    if (data) {
      yield put(publicationActions.updatePublicationNavigationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.updatePublicationNavigationFailure(e));
  }
}
function* deletePublicationSectionRequest({ payload: { sectionIndex } }) {
  try {
    const selectedFeatureStories = yield select(
      (state) => state.story.featureStories
    );
    const sections = yield select((state) => state.publication.sections);
    const featurePage = yield select((state) => state.publication.featurePage);
    const newSections = sections.filter(
      (section) => section.sectionIndex !== sectionIndex
    );
    const newFeatureStories = { ...selectedFeatureStories };
    delete newFeatureStories[`section-${sectionIndex}`];
    newSections.splice(sectionIndex, 1);
    const tempSections = featurePage.sections.filter(
      (section) => section.sectionIndex !== sectionIndex
    );


    const newFeaturePage = {
      ...featurePage,
      sections: tempSections.map((section, index) => {

        if (index >= sectionIndex) {
          return {
            ...section,
            sectionIndex: section.sectionIndex - 1
          }
        }
        return section
      })
    };


    newSections.forEach((section, index) => {
      if (index >= sectionIndex) {
        const newSection = {
          ...section,
          sectionIndex: section.sectionIndex - 1,
        };
        newSections[index] = newSection;
      }
    });

    yield put(storyActions.selectFeatureStoriesSuccess(newFeatureStories));
    yield put(publicationActions.updateFeaturePageSuccessFromDelete(newFeaturePage));
    yield put(publicationActions.deletePublicationSectionSuccess(newSections));
  } catch (error) {
    console.log(error)
  }
}
function* setPublicationSectionSaga({ payload: { sectionIndex, section } }) {
  try {
    const sections = yield select((state) => state.publication.sections);
    const newSections = [...sections];
    newSections[sectionIndex] = section;
    yield put(publicationActions.setFeaturePageSectionsSuccess(newSections));
  } catch (error) {
    console.log(error)
  }
}

function* getPublicationByIdSaga({ payload: publicationId }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublicationById,
      publicationId
    );
    if (errors) throw errors.items;
    if (data) yield put(publicationActions.getPublicationByIdSuccess(data));
  } catch (e) {
    console.error(e);
  }
}

function* isPublicationnameExistSaga({
  payload: { publicationId, publicationname },
}) {
  try {
    const { data, errors } = yield call(
      PublicationService.isPublicationExist,
      publicationId,
      publicationname
    );
    if (errors) throw errors.items;
    if (data)
      yield put(
        publicationActions.isPublicationnameExistSuccess({
          isExist: data.isExist,
          publicationname,
        })
      );
  } catch (e) {
    console.error(e);
  }
}

function* selectPublicationSaga({ payload }) {
  console.log(payload)
  LocalStorageUtil.set(LocalStorageUtil.SELECTED_PUBLICATION, payload);
  yield put(publicationActions.selectPublicationSuccess(payload));
}

function* updatePublicationSaga({ payload: { publication, onSuccess } }) {
  try {
    const { data: updatedPublication, errors } = yield call(
      PublicationService.updatePublication,
      publication
    );
    if (errors) throw errors.items;
    if (updatedPublication) {
      console.log(updatedPublication)
      if (_.isFunction(onSuccess)) onSuccess();
      yield put(
        publicationActions.updatePublicationSuccess(updatedPublication)
      );
      yield fork(selectPublicationSaga, { payload: updatedPublication });
    }
  } catch (e) {
    console.error(e);
  }
}

function* followPublicationSaga({ payload: { publication, user } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.followPublication,
      publication,
      user
    );
    if (data) {
      data.user = user;
      yield put(publicationActions.followPublicationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.followPublicationFailure(e));
  }
}
function* unfollowPublicationSaga({ payload: { publication, user } }) {
  try {
    const { data } = yield call(
      PublicationService.unfollowPublication,
      publication,
      user
    );

    if (data.deleted > 0) {
      yield put(publicationActions.unfollowPublicationSuccess(publication));
    }
  } catch (e) {
    yield put(publicationActions.unfollowPublicationFailure(e));
  }
}
function* checkPublicationFollowingSaga({ payload: { user } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.checkPublicationFollowing,
      user
    );
    if (data) {
      yield put(publicationActions.checkPublicationFollowingSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.checkPublicationFollowingFailure(e));
  }
}
function* getPublicationFeaturesSaga({ payload: { publication } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublicationFeatures,
      publication
    );
    if (data) {
      yield put(publicationActions.getPublicationFeaturesSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getPublicationFeaturesFailure(e));
  }
}
function* deleteFeatureSaga({ payload: { id } }) {
  try {

    const { data, errors } = yield call(
      PublicationService.deleteFeature,
      id
    );
    if (data) {
      data.id = id;
      yield put(publicationActions.deleteFeatureSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.deleteFeatureFailure(e));
  }
}
function* getNewslettersSaga({ payload: { publication } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getNewsletters,
      publication
    );
    if (data) {
      yield put(publicationActions.getNewslettersSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getNewslettersFailure(e));
  }
}
function* getSubscribersSaga({ payload: { newsletter } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getSubscribers,
      newsletter
    );
    if (data) {
      yield put(publicationActions.getSubscribersSucces(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getSubscribersFailure(e));
  }
}
function* createFeaturePage({ payload }) {
  try {
    const { data, errors } = yield call(
      PublicationService.createFeaturePage,
      payload
    );
    if (data) {
      yield put(publicationActions.createFeaturePageSuccess(data));
      yield fork(clearFileLink);
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.createFeaturePageFailure(e));
  }
}
function* updateFeaturePage({ payload: { feature, sections } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.updateFeaturePage,
      {
        ...feature,
        customLink: feature._id,
      },
      sections


    );
    if (errors) {
      throw errors.items;
    }
    if (data) {
      yield put(publicationActions.updateFeaturePageSuccess(data));
      yield fork(clearFileLink);
    }

  } catch (e) {
    yield put(publicationActions.updateFeaturePageFailure(e));
  }
}
function* setPublications({ payload }) {
  const { data } = yield call(
    PublicationService.getAllUserPublications,
    payload
  );
  yield put(publicationActions.setPublicationsSuccess(data));
}
function* addPublicationToUser({ payload: publication }) {
  yield put(publicationActions.addPublicationsToUser(publication));
}
function* getUserPublicationsSaga() {
  try {
    const { data, errors } = yield call(
      PublicationService.getUsersPublications
    );
    if (data) {
      yield put(publicationActions.getUserPublicationsSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getUserPublicationsFailure(e));
  }
}

function* getFeaturePageSaga({ payload: { featureId } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getFeaturePage,
      featureId
    );
    if (errors) {
      throw errors.items;
    }
    if (data) {
      yield put(publicationActions.getFeaturePageSuccess(data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* getPublicationHomeLayoutSaga({ payload: publication }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublicationHomeLayout,
      publication
    );
    if (errors) {
      throw errors.items;
    }
    if (data) {
      yield put(
        publicationActions.getPublicationHomeLayoutSuccess(_.first(data))
      );
    }
  } catch (e) {
    yield put(publicationActions.getPublicationHomeLayoutFailure());
  }
}

function* updatePublicationHomeLayoutSaga({ payload: layout }) {
  try {
    const { data, errors } = yield call(
      PublicationService.updatePublicationHomeLayout,
      layout
    );
    if (errors) {
      throw errors.items;
    }
    if (data) {
      yield put(publicationActions.updatePublicationHomeLayoutSuccess(layout));
    }
  } catch (e) {
    yield put(publicationActions.updatePublicationHomeLayoutFailure());
  }
}

function* createPublicationSaga({ payload: { publication, onSuccess } }) {
  try {
    const userIds = _.uniq(_.map(publication.users, 'user'));
    const { data, errors } = yield call(
      PublicationService.createPublication,
      publication,
      userIds
    );
    if (errors) {
      throw errors.items;
    }
    if (data) {
      yield put(publicationActions.createPublicationSuccess(data));
      yield put(fileActions.createPublicationSuccess());
      yield fork(selectPublicationSaga, { payload: data });
      yield fork(addPublicationToUser, { payload: data });
      const user = yield select((state) => state.auth.user);
      yield fork(updateUserSaga, {
        publications: [...user.publications, data._id],
      });
      if (_.isFunction(onSuccess)) onSuccess();
    }
  } catch (e) {
    yield put(publicationActions.createPublicationFailure());
  }
}

function* isFollowingPublicationSaga({ payload: { publicationId, userId } }) {
  try {
    const { data, errors } = yield call(
      PublicationService.isFollowingPublication,
      publicationId,
      userId
    );
    if (errors) throw errors.items;
    if (_.isEmpty(data)) {
      yield put(publicationActions.isFollowingPublicationSuccess(false));
    } else {
      yield put(publicationActions.isFollowingPublicationSuccess(true));
    }
  } catch (e) {
    yield put(publicationActions.isFollowingPublicationFailure(e));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(
      publicationActions.getPublicationFollowersRequest.type,
      getPublicationFollowersSaga
    ),
    takeEvery(
      publicationActions.getPublicationRequest.type,
      getPublicationSaga
    ),
    takeEvery(
      publicationActions.getLatestPublicationStoriesRequest.type,
      getLatestPublicationStoriesSaga
    ),
    takeEvery(
      publicationActions.visitPublicationRequest.type,
      visitPublicationSaga
    ),
    takeEvery(
      publicationActions.followPublicationRequest.type,
      followPublicationSaga
    ),
    takeEvery(
      publicationActions.unfollowPublicationRequest.type,
      unfollowPublicationSaga
    ),
    takeEvery(
      publicationActions.checkPublicationFollowingRequest.type,
      checkPublicationFollowingSaga
    ),
    takeEvery(
      publicationActions.getPublicationFeaturesRequest.type,
      getPublicationFeaturesSaga
    ),
    takeEvery(publicationActions.deleteFeatureRequest.type, deleteFeatureSaga),
    takeEvery(
      publicationActions.getNewslettersRequest.type,
      getNewslettersSaga
    ),
    takeEvery(
      publicationActions.getFeaturePagesByPublicationRequest.type,
      getFeaturePagesByPublicationSaga
    ),
    takeEvery(
      publicationActions.getPublicationNavigationRequest.type,
      getPublicationsNavigation
    ),
    takeEvery(
      publicationActions.createPublicationNavigationRequest.type,
      createPublicationNavigation
    ),
    takeEvery(
      publicationActions.updatePublicationNavigationRequest.type,
      updatePublicationNavigation
    ),
    takeEvery(
      publicationActions.getFeaturePageRequest.type,
      getFeaturePageSaga
    ),
    takeEvery(
      publicationActions.getSubscribersRequest.type,
      getSubscribersSaga
    ),
    takeEvery(
      publicationActions.getPublicationByIdRequest.type,
      getPublicationByIdSaga
    ),
    takeEvery(
      publicationActions.updatePublicationRequest.type,
      updatePublicationSaga
    ),
    debounce(
      1500,
      publicationActions.isPublicationnameExistRequest.type,
      isPublicationnameExistSaga
    ),
    takeEvery(
      publicationActions.deletePublicationSectionRequest.type,
      deletePublicationSectionRequest
    ),
    takeEvery(
      publicationActions.setFeaturePageSectionsRequest.type,
      setPublicationSectionSaga
    ),
    takeEvery(
      publicationActions.createFeaturePageRequest.type,
      createFeaturePage
    ),
    takeEvery(
      publicationActions.updateFeaturePageRequest.type,
      updateFeaturePage
    ),
    takeEvery(publicationActions.setPublicationsRequest.type, setPublications),
    takeEvery(
      publicationActions.getUserPublicationsRequest.type,
      getUserPublicationsSaga
    ),
    takeEvery(
      publicationActions.selectPublicationRequest.type,
      selectPublicationSaga
    ),
    takeEvery(
      publicationActions.getPublicationHomeLayoutRequest.type,
      getPublicationHomeLayoutSaga
    ),
    takeEvery(
      publicationActions.updatePublicationHomeLayoutRequest.type,
      updatePublicationHomeLayoutSaga
    ),
    takeEvery(
      publicationActions.createPublicationRequest.type,
      createPublicationSaga
    ),
    takeEvery(
      publicationActions.isFollowingPublicationRequest.type,
      isFollowingPublicationSaga
    ),
  ]);
}
