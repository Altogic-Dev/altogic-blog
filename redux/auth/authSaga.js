import AuthService from '@/services/auth';
import { takeEvery, put, call } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* registerSaga({ payload: user }) {
  try {
    const { data, errors } = yield call(AuthService.register, user);
    if (data) {
      yield put(authActions.registerSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(authActions.registerFailure(e));
  }
}
function* setUserFromLocalStorage() {
  const user = yield call(AuthService.getUser);
  if (user) {
    yield put(authActions.setUser(user));
  }
}
function* getAuthGrantSaga({ payload }) {
  try {
    yield call(AuthService.authStateChange, payload.session, payload.user);
    if (!payload.user.username) {
      const res = yield call(AuthService.setUsernameForProvider);
      if (!res.errors) {
        yield call(AuthService.getUserFromDb);
        setUserFromLocalStorage();
      }
    }
    if (payload.user && payload.session) {
      yield put(authActions.loginSuccess(payload.user));
    }
    if (payload.error) {
      throw payload.error.items;
    }
  } catch (e) {
    yield put(authActions.getAuthGrantFailure(e));
  }
}
function* loginSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      AuthService.login,
      payload.email,
      payload.password
    );
    if (data) {
      yield put(authActions.loginSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(authActions.loginFailure(e));
  }
}
function* forgotPassword({ payload }) {
  try {
    const { errors } = yield call(AuthService.forgotPassword, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.forgotPasswordSuccess());
    }
  } catch (e) {
    yield put(authActions.forgotPasswordFailure(e));
  }
}
function* resendVerificationEmail({ payload: email }) {
  try {
    const { errors } = yield call(AuthService.resendVerificationEmail, email);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.forgotPasswordSuccess());
    }
  } catch (e) {
    yield put(authActions.resendVerificationEmailFailure(e));
  }
}

function* authenticateWithProvider({payload:provider}) {
  try {
    const { errors } = yield call(AuthService.authenticateWithProvider,provider);
    if (errors) {
      throw errors.items;
    } 
  } catch (e) {
    yield put(authActions.authenticateWithProviderFailure(e));
  }
}


export default function* rootSaga() {
  yield takeEvery(authActions.registerRequested.type, registerSaga);
  yield takeEvery(authActions.getAuthGrantRequested.type, getAuthGrantSaga);
  yield takeEvery(authActions.loginRequested.type, loginSaga);
  yield takeEvery(authActions.forgotPasswordRequested.type, forgotPassword);
  yield takeEvery(
    authActions.resendVerificationEmailRequested.type,
    resendVerificationEmail
  );
  yield takeEvery(authActions.authenticateWithProviderRequested.type, authenticateWithProvider);

}
