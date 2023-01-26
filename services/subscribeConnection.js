import { db, endpoint } from '@/utils/altogic';

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
    return endpoint.post('/subscribe_user', {
      subscribeUser,
      subscribeUserEmail,
      subscribingUser,
    });
  },

  getSubscriptions(userId, page = 1, limit = 5) {
    return db
      .model('subscribe_connection')
      .filter(`subscribeUser == '${userId}'`)
      .lookup({ field: 'subscribingUser' })
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get(true);
  },

};

export default SubscribeConnectionService;
