import PublicationService from '@/services/publication';
import { call, debounce, put, takeEvery } from 'redux-saga/effects';
import { publicationActions } from './publicationSlice';

// function* followPublicationSaga({ payload: { followerUser, followingUser } }) {
//   try {
//     const { data, error } = yield call(
//       FollowerConnectionService.followUser,
//       followerUser,
//       followingUser
//     );
//     console.log({ data, error });
//     // yield put(followerConnectionActions.fetchDataSuccess());
//   } catch (e) {
//     console.error({ e });
//   }
// }

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

function* getPublicationSaga({ payload: publicationName }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublication,
      publicationName
    );
    if (data) {
      yield put(publicationActions.getPublicationSuccess(data[0]));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getPublicationFailure(e));
  }
}
function* getLatestPublicationStoriesSaga({ payload: publicationName }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getLatestPublicationStories,
      publicationName
    );
    if (data) {
      yield put(publicationActions.getLatestPublicationStoriesSuccess(data));
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

function* updatePublicationSaga({ payload: publication }) {
  try {
    const { data, errors } = yield call(
      PublicationService.updatePublication,
      publication
    );
    if (errors) throw errors.items;
    if (data)
      yield put(publicationActions.updatePublicationSuccess(publication));
  } catch (e) {
    console.error(e);
  }
}

export default function* rootSaga() {
  yield takeEvery(
    publicationActions.getPublicationFollowersRequest.type,
    getPublicationFollowersSaga
  );
  yield takeEvery(
    publicationActions.getPublicationRequest.type,
    getPublicationSaga
  );
  yield takeEvery(
    publicationActions.getLatestPublicationStoriesRequest.type,
    getLatestPublicationStoriesSaga
  );
  yield takeEvery(
    publicationActions.visitPublicationRequest.type,
    visitPublicationSaga
  );
  yield takeEvery(
    publicationActions.getFeaturePagesByPublicationRequest.type,
    getFeaturePagesByPublicationSaga
  );
  yield takeEvery(
    publicationActions.getPublicationNavigationRequest.type,
    getPublicationsNavigation
  );
  yield takeEvery(
    publicationActions.createPublicationNavigationRequest.type,
    createPublicationNavigation
  );
  yield takeEvery(
    publicationActions.updatePublicationNavigationRequest.type,
    updatePublicationNavigation
  );
  yield takeEvery(
    publicationActions.getPublicationRequest.type,
    getPublicationSaga
  );
  yield takeEvery(
    publicationActions.getPublicationByIdRequest.type,
    getPublicationByIdSaga
  );
  yield takeEvery(
    publicationActions.updatePublicationRequest.type,
    updatePublicationSaga
  );
  yield debounce(
    1500,
    publicationActions.isPublicationnameExistRequest.type,
    isPublicationnameExistSaga
  );
}
