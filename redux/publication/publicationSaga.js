import PublicationService from '@/services/publication';
import { call, put, takeEvery } from 'redux-saga/effects';
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
function* getPublicationStoriesSaga({ payload: publicationName }) {
  try {
    const { data, errors } = yield call(
      PublicationService.getPublicationStories,
      publicationName
    );
    if (data) {
      yield put(publicationActions.getPublicationStoriesSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(publicationActions.getPublicationStoriesFailure(e));
  }
}

export default function* rootSaga() {
  yield takeEvery(
    publicationActions.getPublicationFollowersRequest.type,
    getPublicationFollowersSaga
  )
  yield takeEvery(
    publicationActions.getPublicationRequest.type,
    getPublicationSaga
  );
  yield takeEvery(
    publicationActions.getPublicationStoriesRequest.type,
    getPublicationStoriesSaga
  );
  yield takeEvery(publicationActions.getPublicationRequest.type, getPublicationSaga);

}
