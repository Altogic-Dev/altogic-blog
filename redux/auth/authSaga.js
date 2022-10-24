import AuthService from '@/services/auth';
import PublicationService from '@/services/publication';
import { toast } from 'react-toastify';
import {
  takeEvery,
  put,
  call,
  all,
  select,
  debounce,
} from 'redux-saga/effects';
import { publicationActions } from '../publication/publicationSlice';
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
  yield call(AuthService.getUserFromDb);
  const user = yield call(AuthService.getUser);
  if (user) {
    yield put(authActions.setUser(user));
  }
}
function* getAuthGrantSaga({ payload }) {
  try {
    yield call(AuthService.authStateChange, payload.user, payload.session);
    yield put(authActions.loginSuccess(payload.user));
    if (!payload.user.username || !payload.user.profilePicture) {
      const { data, errors } = yield call(AuthService.setUsernameForProvider, {
        email: payload.user.email,
        name: payload.user.name,
        provider: payload.user.provider,
        username: payload.user.username,
      });
      if (!errors) {
        yield call(AuthService.authStateChange, data, payload.session);
        yield put(authActions.loginSuccess(data));
      }
      if (payload.error) {
        throw payload.error.items;
      }
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
      if (user.publications) {
        const { data } = yield call(
          PublicationService.getAllUserPublications,
          user.publications
        );
        yield put(publicationActions.setPublicationsOnLogin(data));
      }
      yield put(authActions.loginSuccess(user));

      payload.onSuccess();
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
      yield put(authActions.forgotPasswordSuccess(payload));
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
function* updateFollowingTopicsSaga({ payload: { topics } }) {
  try {
    const { data, errors } = yield call(
      AuthService.updateFollowingTopics,
      topics
    );
    if (errors) {
      throw errors.items;
    }

    if (data) {
      AuthService.setUserFromLocal(data);
      yield put(authActions.updateFollowingTopicsSuccess());
    }
  } catch (e) {
    yield put(authActions.updateFollowingTopicsFailure(e));
  }
}

function* errorResetSaga() {
  yield put(authActions.resetErrors());
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
    const { data, errors } = yield call(AuthService.updateUserProfile, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield call(AuthService.authStateChange, data);
      yield put(authActions.updateUserSuccess(data));
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
      toast.success('Session deleted successfully',{hideProgressBar: true});
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
export function* updateProfileUserSaga(newUser) {
  const user = yield select((state) => state.auth.profileUser);
  yield put(
    authActions.updateProfileUser({
      ...user,
      ...newUser,
    })
  );
}
function* logoutSaga() {
  yield call(AuthService.logout);
  yield put(authActions.logoutSuccess());
}
function* changeEmailSaga({ payload }) {
  try {
    const { user, errors } = yield call(AuthService.changeEmail, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.changeEmailSuccess({ user, email: payload.email }));
    }
  } catch (e) {
    yield put(authActions.changeEmailFailure(e));
  }
}
function* getUserByUsernameSaga({ payload }) {
  try {
    const { data, errors } = yield call(AuthService.getUserByUsername, payload);
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.getUserByUserNameSuccess(data));
    }
  } catch (e) {
    yield put(authActions.getUserByUserNameFailure(e));
  }
}

function* searchUserByUsernameSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      AuthService.searchUserByUsername,
      payload
    );
    if (errors) {
      throw errors.items;
    } else {
      yield put(authActions.searchUserByUsernameSuccess(data));
    }
  } catch (e) {
    yield put(authActions.searchUserByUsernameFailure());
    console.error(e);
  }
}

export function* setDefaultAvatarSaga() {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      AuthService.setDefaultAvatar,
      user.name
    );
    if (errors) throw errors;
    if (data) {
      yield call(AuthService.authStateChange, data);
      yield put(authActions.updateUserSuccess(data));
    }
    return { data, errors: null };
  } catch (e) {
    return { data: null, errors: e };
  }
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
    takeEvery(
      authActions.updateFollowingTopicsRequest.type,
      updateFollowingTopicsSaga
    ),
    takeEvery(authActions.resetPasswordRequest.type, resetPassword),
    takeEvery(
      authActions.authenticateWithProviderRequest.type,
      authenticateWithProvider
    ),
    takeEvery(authActions.resetErrorsRequest.type, errorResetSaga),
    takeEvery(authActions.changePasswordRequest.type, changePasswordSaga),
    takeEvery(authActions.updateProfileRequest.type, updateUserProfileSaga),
    takeEvery(authActions.updateUserRequest.type, updateUserSaga),
    takeEvery(authActions.checkUsernameRequest.type, checkUsernameSaga),
    takeEvery(authActions.getSessionsRequest.type, getSessionsSaga),
    takeEvery(authActions.deleteSessionRequest.type, deleteSessionSaga),
    takeEvery(authActions.logoutRequest.type, logoutSaga),
    takeEvery(authActions.changeEmailRequest.type, changeEmailSaga),
    takeEvery(authActions.updateUserSuccess.type, setUserFromLocalStorage),
    takeEvery(authActions.getUserByUserNameRequest.type, getUserByUsernameSaga),
    debounce(
      800,
      authActions.searchUserByUsernameRequest.type,
      searchUserByUsernameSaga
    ),
  ]);
}
