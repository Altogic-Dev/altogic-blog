import { auth, db } from '@/utils/altogic';
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
  async setUsernameForProvider() {
    const { name } = auth.getUser();
    const nameArray = name && name.split(' ');
    const firstName = name
      ? nameArray.slice(0, nameArray.length - 1).join(' ')
      : 'Unnamed';
    const surname = name ? nameArray[nameArray.length - 1] : 'User';

    const username = `${lowerCaseFirstLetter(
      replaceTurkishChars(surname)
    )}${randomInt(10000, 999999)}`;

    return db
      .model('users')
      .object(auth.getUser()._id)
      .update({
        name: `${firstName} ${surname}`,
        username,
      });
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
};
export default AuthService;
