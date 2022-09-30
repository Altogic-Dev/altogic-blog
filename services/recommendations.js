import { db } from '@/utils/altogic';

const RecommendationsService = {
  getWhoToFollow2(limit, page) {
    return db
      .model('users')
      .sort('storyCount', 'desc')
      .limit(limit)
      .page(page)
      .getRandom(10);
  },
  getWhoToFollow(limit, page) {
    return db
      .model('users')
      .sort('storyCount', 'desc')
      .limit(limit)
      .page(page)
      .getRandom(10);
  },
  getWhoToFollowMinimized() {
    return db.model('users').sort('storyCount', 'desc').limit(100).getRandom(5);
  },
};

export default RecommendationsService;
