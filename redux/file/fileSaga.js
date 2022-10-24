import FileService from '@/services/file';
import _ from 'lodash';
import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import { setDefaultAvatarSaga } from '../auth/authSaga';
import { fileActions } from './fileSlice';

function* uploadFileSaga({ payload }) {
  try {
    if (payload.existingFile) {
      yield call(FileService.deleteFile, payload.existingFile);
    }
    const { data, errors } = yield call(
      FileService.uploadFile,
      payload.file,
      payload.name
    );
    if (data) {
      yield put(fileActions.uploadFileSuccess(data.publicPath));
      yield put(
        fileActions.uploadFilesSuccess({
          name: payload.name.split('-')[1],
          data: data.publicPath,
        })
      );
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(fileActions.uploadFileFailure(e));
  }
}

function* deleteFileSaga({ payload }) {
  yield put(fileActions.clearFileLink({ name: _.get(payload, 'name') }));
}

export function* clearFileLink() {
  yield put(fileActions.clearFileLink());
}

function* setDefaultAvatarFileSaga() {
  const { data, errors } = yield call(setDefaultAvatarSaga);
  if (errors) yield put(fileActions.setDefaultAvatarFileFailure(errors));
  else if (data)
    yield put(fileActions.setDefaultAvatarFileSuccess(data.profilePicture));
}

function* setFileLinkByProfilePictureSaga() {
  const user = yield select((state) => state.auth.user);
  yield put(fileActions.uploadFileSuccess(user.profilePicture));
}

export default function* fileSaga() {
  yield all([
    takeEvery(fileActions.uploadFileRequest.type, uploadFileSaga),
    takeEvery(fileActions.deleteFileRequest.type, deleteFileSaga),
    takeEvery(
      fileActions.setDefaultAvatarFileRequest.type,
      setDefaultAvatarFileSaga
    ),
    takeEvery(
      fileActions.setFileLinkByProfilePictureRequest.type,
      setFileLinkByProfilePictureSaga
    ),
  ]);
}
