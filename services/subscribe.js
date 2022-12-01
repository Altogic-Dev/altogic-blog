import { db } from '@/utils/altogic';

const SubscribeService = {
  subscribeUser(subscriberUser, subscribingUser) {
    return db.model('subscribe_connection').create({
      subscriberUser,
      subscribingUser,
      subscribeUserEmail: subscribingUser.email,
    });
  },
  

};

export default SubscribeService;
