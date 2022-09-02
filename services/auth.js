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
  async getAuthGrant(token) {
    return auth.getAuthGrant(token);
  },
  authStateChange(newSession, newUser) {
    auth.setSession(newSession);
    auth.setUser(newUser);
  },
  async setUsernameForProvider({ userId, name, provider }) {
    let username = '';
    const req = {
      name,
      userId,
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
    debugger;
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
  async login(email, password) {
    return auth.signInWithEmail(email, password);
  },
  getUser() {
    return auth.getUser();
  },
  async forgotPassword({ email }) {
    return auth.sendResetPwdEmail(email);
  },
  async resendVerificationEmail(email) {
    return auth.resendVerificationEmail(email);
  },
  setUserFromLocal(user) {
    auth.setUser(user);
  },
  async updateUser(newUser) {
    return db.model('users').object(auth.getUser()._id).update(newUser);
  },

  async resetPassword({ accessToken, newPassword }) {
    return auth.resetPwdWithToken(accessToken, newPassword);
  },
  async authenticateWithProvider(provider) {
    return auth.signInWithProvider(provider);
  },
  unfollowTopic(followingTopicsUpdated) {
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
  async getAllSession() {
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
};
export default AuthService;
