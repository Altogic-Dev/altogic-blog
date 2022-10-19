import { db } from '@/utils/altogic';

const BlockConnectionService = {
  getBlockedUsers(userId, page = 1, limit = 10) {
    return db
      .model('block_connection')
      .filter(`user == '${userId}'`)
      .lookup({ field: 'blockedUser' })
      .page(page)
      .limit(limit)
      .get(true);
  },

  blockUser(userId, blockedUserId) {
    return db.model('block_connection').create({
      user: userId,
      blockedUser: blockedUserId,
    });
  },

  unblockAuthor(userId, blockedUserId) {
    return db
      .model('block_connection')
      .filter(`user == '${userId}' && blockedUser == '${blockedUserId}'`)
      .delete();
  },
};
export default BlockConnectionService;
