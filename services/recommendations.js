import { db } from '@/utils/altogic';

const RecommendationsService = {
  getWhoToFollow() {
    return db.model('users').sort('storyCount', 'desc').limit(10).getRandom(10);
  },
};

export default RecommendationsService;
