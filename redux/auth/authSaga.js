import AuthService from '@/services/auth';
import _ from 'lodash';
import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* registerSaga({ payload: req }) {
  try {
    const { user, errors } = yield call(AuthService.register, req);
    if (user) {
      yield put(authActions.registerSuccess(user));
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
    const { user, errors } = yield call(
      AuthService.login,
      payload.email,
      payload.password
    );
    if (user) {
      yield put(authActions.loginSuccess(user));
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
function* resetPassword({ payload }) {
  try {
    const { errors } = yield call(AuthService.resetPassword, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.resetPasswordSuccess());
    }
  } catch (e) {
    yield put(authActions.resetPasswordFailure(e));
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


function* muteAuthorSaga({ payload: mutedUserId }) {
  try {
    const userFromLocal = yield select((state) => state.auth.user);
    if (
      !_.isNil(userFromLocal.mutedUsers) &&
      _.includes(userFromLocal.mutedUsers, mutedUserId)
    ) {
      throw 'This user is already muted.';
    } else {
      const newMutedUsers = _.isNil(userFromLocal.mutedUsers)
        ? [mutedUserId]
        : [...userFromLocal.mutedUsers, mutedUserId];
      const { errors } = yield call(AuthService.updateUser, {
        mutedUser: newMutedUsers,
      });
      if (!errors) {
        yield put(
          authActions.muteAuthorSuccess({ newMutedUsers, mutedUserId })
        );
        AuthService.setUserFromLocal({
          ...userFromLocal,
          mutedUser: newMutedUsers,
        });
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(authActions.registerRequested.type, registerSaga),
    takeEvery(authActions.getAuthGrantRequested.type, getAuthGrantSaga),
    takeEvery(authActions.loginRequested.type, loginSaga),
    takeEvery(authActions.forgotPasswordRequested.type, forgotPassword),
    takeEvery(
      authActions.resendVerificationEmailRequested.type,
      resendVerificationEmail
    ),
    takeEvery(authActions.muteAuthorRequested.type, muteAuthorSaga),
    takeEvery(authActions.authenticateWithProviderRequest.type, authenticateWithProvider)
  ]);
}
