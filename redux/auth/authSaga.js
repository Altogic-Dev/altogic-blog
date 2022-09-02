import AuthService from '@/services/auth';
import _ from 'lodash';
import { toast } from 'react-toastify';
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
    const res = yield call(AuthService.setUsernameForProvider, {
      userId: payload.user._id,
      name: payload.user.name,
      provider: payload.user.provider,
    });
    if (!res.errors) {
      yield call(AuthService.getUserFromDb);
      setUserFromLocalStorage();
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

function* authenticateWithProvider({ payload: provider }) {
  try {
    const { errors } = yield call(
      AuthService.authenticateWithProvider,
      provider
    );
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(authActions.authenticateWithProviderFailure(e));
  }
}
function* unfollowTopicSaga({ payload: { topics } }) {
  try {
    const { data, errors } = yield call(AuthService.unfollowTopic, topics);
    if (errors) {
      throw errors.items;
    }

    if (data) {
      yield call(AuthService.getUserFromDb);
      setUserFromLocalStorage();
    }
  } catch (e) {
    yield put(authActions.unfollowTopicFailure(e));
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
function* errorResetSaga() {
  yield put(authActions.resetErrors());
}

function* unmuteAuthorSaga({ payload: mutedUserId }) {
  try {
    const userFromLocal = yield select((state) => state.auth.user);

    const newMutedUsers = _.reject(userFromLocal.mutedUsers, mutedUserId);

    const { errors } = yield call(AuthService.updateUser, {
      mutedUser: newMutedUsers,
    });
    if (!errors) {
      yield put(
        authActions.unmuteAuthorSuccess({ newMutedUsers, mutedUserId })
      );
      AuthService.setUserFromLocal({
        ...userFromLocal,
        mutedUser: newMutedUsers,
      });
    }
  } catch (e) {
    console.log({ e });
  }
}

function* isMutedSaga({ payload: authorId }) {
  const user = yield select((state) => state.auth.user);
  const isMuted = _.includes(user.mutedUser, authorId);
  yield put(authActions.isMutedSuccess(isMuted));
}

function* changePasswordSaga({ payload }) {
  try {
    const { errors } = yield call(AuthService.changePassword, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.changePasswordSuccess());
    }
  } catch (e) {
    yield put(authActions.changePasswordFailure(e));
  }
}
function* updateUserProfileSaga({ payload }) {
  try {
    const { errors } = yield call(AuthService.updateUserProfile, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield call(AuthService.getUserFromDb);
      setUserFromLocalStorage();
      yield put(authActions.updateUserSuccess());
    }
  } catch (e) {
    yield put(authActions.updateUserFailure(e));
  }
}
function* checkUsernameSaga({ payload: username }) {
  try {
    const { data, errors } = yield call(
      AuthService.checkUsernameAvailability,
      username
    );
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.checkUsernameSuccess(data));
    }
  } catch (e) {
    yield put(authActions.checkUsernameFailure(e));
  }
}
function* getSessionsSaga() {
  try {
    const { sessions, errors } = yield call(AuthService.getAllSession);
    const currentSession = yield call(AuthService.getCurrentSession);
    if (errors) {
      throw errors.items;
    } else {
      sessions.find(
        (session) => session.token === currentSession.token
      ).isCurrent = true;
      yield put(authActions.getSessionsSuccess(sessions));
    }
  } catch (e) {
    yield put(authActions.getSessionsFailure(e));
  }
}
function* deleteSessionSaga({ payload: sessionToken }) {
  try {
    const { errors } = yield call(AuthService.deleteSession, sessionToken);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.deleteSessionSuccess(sessionToken));
      toast.success('Session deleted successfully');
    }
  } catch (e) {
    yield put(authActions.deleteSessionFailure(e));
  }
}

export function* updateUserSaga(newUser) {
  const user = yield select((state) => state.auth.user);
  AuthService.setUserFromLocal({
    ...user,
    ...newUser,
  });
  yield put(
    authActions.updateUser({
      ...user,
      ...newUser,
    })
  );
}
export function* logoutSaga() {
  yield call(AuthService.logout);
  yield put(authActions.logoutSuccess());
}

export default function* rootSaga() {
  yield all([
    takeEvery(authActions.registerRequest.type, registerSaga),
    takeEvery(authActions.getAuthGrantRequest.type, getAuthGrantSaga),
    takeEvery(authActions.loginRequest.type, loginSaga),
    takeEvery(authActions.forgotPasswordRequest.type, forgotPassword),
    takeEvery(
      authActions.resendVerificationEmailRequest.type,
      resendVerificationEmail
    ),
    takeEvery(authActions.unfollowTopicRequest.type, unfollowTopicSaga),
    takeEvery(authActions.muteAuthorRequest.type, muteAuthorSaga),
    takeEvery(authActions.unmuteAuthorRequest.type, unmuteAuthorSaga),
    takeEvery(authActions.isMutedRequest.type, isMutedSaga),
    takeEvery(authActions.resetPasswordRequest.type, resetPassword),
    takeEvery(
      authActions.authenticateWithProviderRequest.type,
      authenticateWithProvider
    ),
    takeEvery(authActions.resetErrorsRequest.type, errorResetSaga),
    takeEvery(authActions.changePasswordRequest.type, changePasswordSaga),
    takeEvery(authActions.updateUserRequest.type, updateUserProfileSaga),
    takeEvery(authActions.updateUserRequest.type, updateUserSaga),
    takeEvery(authActions.checkUsernameRequest.type, checkUsernameSaga),
    takeEvery(authActions.getSessionsRequest.type, getSessionsSaga),
    takeEvery(authActions.deleteSessionRequest.type, deleteSessionSaga),
    takeEvery(authActions.logoutRequest.type, logoutSaga),
  ]);
}
