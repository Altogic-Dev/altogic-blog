import FileService from '@/services/file';
import { takeEvery, put, call, all } from 'redux-saga/effects';
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
function* deleteFileSaga({ payload: { name, data } }) {
  yield put(fileActions.clearFileLink({ name }));
}
export function* clearFileLink() {
  yield put(fileActions.clearFileLink());
}

export default function* fileSaga() {
  yield all([
    takeEvery(fileActions.uploadFileRequest.type, uploadFileSaga),
    takeEvery(fileActions.deleteFileRequest.type, deleteFileSaga),
  ]);
}
