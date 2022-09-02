import { db } from '@/utils/altogic';

const SubscribeConnectionService = {
  unsubscribe(userId, subscribingUserId) {
    return db
      .model('subscribe_connection')
      .filter(
        `subscribeUser == '${userId}' && subscribingUser == '${subscribingUserId}'`
      )
      .delete();
  },

  subscribe(userId, userEmail, subscribingUserId) {
    return db.model('subscribe_connection').create({
      subscribeUser: userId,
      subscribeUserEmail: userEmail,
      subscribingUser: subscribingUserId,
    });
  },

  getSubscribingUser(userId, subscribingUserId) {
    return db
      .model('subscribe_connection')
      .filter(
        `subscribeUser == '${userId}' && subscribingUser == '${subscribingUserId}'`
      )
      .get();
  },
};

export default SubscribeConnectionService;
