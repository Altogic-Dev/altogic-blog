import { db, endpoint } from '@/utils/altogic';

const NotificationService = {
  getNotifications: async ({ userId, limit }) =>
    db
      .model('notification')
      .filter(`user == '${userId}'`)
      .limit(limit)
      .sort('createdAt', 'desc')
      .get(),

  createNotification: async (notification) =>
    endpoint.post('/notification', notification),

  getUnreadNotificationsCount: async ({ userId }) =>
    db
      .model('notification')
      .filter(`user == '${userId}' && isSeen == false`)
      .compute({ name: 'count', type: 'count', sort: 'desc' }),

  markAsSeen: async ({ userId }) =>
    db
      .model('notification')
      .filter(`user == '${userId}' && isSeen == false`)
      .updateFields([
        {
          field: 'isSeen',
          value: true,
          updateType: 'set',
        },
      ]),
};
export default NotificationService;
