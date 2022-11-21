import {  endpoint } from '@/utils/altogic';

const RecommendationsService = {
  getTopWriters(page, limit) {
    return endpoint.get('/user/top-writers', { page, limit });
  },
  getWhoToFollow(page, limit, userId) {
    return endpoint.get('/recommendations/who-to-follow', { page, limit, userId });

  },
  getTopicTopWriters(topic) {
    return endpoint.get('/topic/topWriters', { topic });
  },
};

export default RecommendationsService;
