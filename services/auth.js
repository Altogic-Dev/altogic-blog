import { auth, db, endpoint } from '@/utils/altogic';
import {
  lowerCaseFirstLetter,
  randomInt,
  replaceTurkishChars,
} from '@/utils/utils';

const AuthService = {
  register(user) {
    return auth.signUpWithEmail(user.email, user.password, user);
  },
  getAuthGrant(token) {
    return auth.getAuthGrant(token);
  },
  authStateChange(newUser, newSession = null) {
    if (newSession) auth.setSession(newSession);
    if (newUser) auth.setUser(newUser);
  },
  setUsernameForProvider({ email, name, provider }) {
    let username = '';
    const req = {
      name,
      email,
      provider,
      color: `#${randomInt(0, 16777215).toString(16)}`,
    };
    if (provider !== 'altogic') {
      const nameArray = name && name.split(' ');
      const surname = name ? nameArray[nameArray.length - 1] : 'User';
      username = `${lowerCaseFirstLetter(
        replaceTurkishChars(surname)
      )}${randomInt(1000, 99999)}`;
      req.username = username;
    }
    return endpoint.post('/user/info', req);
  },
  async getUserFromDb() {
    const data = await auth.getUserFromDB();
    if (!data.errors) {
      auth.setUser(data.user);
      return data.user;
    }
    return data;
  },
  login(email, password) {
    return auth.signInWithEmail(email, password);
  },
  getUser() {
    return auth.getUser();
  },
  forgotPassword({ email }) {
    return auth.sendResetPwdEmail(email);
  },
  resendVerificationEmail(email) {
    return auth.resendVerificationEmail(email);
  },
  setUserFromLocal(user) {
    auth.setUser(user);
  },
  updateUser(newUser) {
    return db.model('users').object(auth.getUser()._id).update(newUser);
  },

  resetPassword({ accessToken, newPassword }) {
    return auth.resetPwdWithToken(accessToken, newPassword);
  },
  authenticateWithProvider(provider) {
    return auth.signInWithProvider(provider);
  },

  updateFollowingTopics(followingTopicsUpdated) {
    return db.model('users').object(auth.getUser()._id).update({
      followingTopics: followingTopicsUpdated,
    });
  },
  changePassword({ currentPassword, newPassword }) {
    return auth.changePassword(newPassword, currentPassword);
  },
  updateUserProfile(newUser) {
    return endpoint.put('/user', newUser);
  },
  checkUsernameAvailability(username) {
    return endpoint.post('/user/username', { username });
  },
  getAllSession() {
    return auth.getAllSessions();
  },
  deleteSession(session) {
    return auth.deleteSession(session);
  },
  getCurrentSession() {
    return auth.getSession();
  },
  logout() {
    return auth.signOut();
  },
  changeEmail({ email, password }) {
    return auth.changeEmail(password, email);
  },
  getUserByUsername(username) {
    return endpoint.get('user/username', { username });
  },
  searchUserByUsername(username) {
    return endpoint.get('/user/searchByUsername', { username });
  },
};
export default AuthService;
