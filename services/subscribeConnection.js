import { db } from '@/utils/altogic';

const SubscribeConnectionService = {
  unsubscribe(subscribeUser, subscribingUser) {
    return db
      .model('subscribe_connection')
      .filter(
        `subscribeUser == '${subscribeUser}' && subscribingUser == '${subscribingUser}'`
      )
      .delete();
  },

  subscribe(subscribingUser, subscribeUser, subscribeUserEmail) {
    return db.model('subscribe_connection').create({
      subscribeUser,
      subscribeUserEmail,
      subscribingUser,
    });
  },
};

export default SubscribeConnectionService;
