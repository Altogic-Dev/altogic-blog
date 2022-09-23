import { db, endpoint } from '@/utils/altogic';

const PublicationService = {
  getPublicationFollowers(publicationId) {
    return db
      .model('publication_follower_connection')
      .filter(`publication == '${publicationId}`)
      .get();
  },

  getPublication(publicationName) {
    return db.model('publication').filter(`name == '${publicationName}'`).get();
  },

  getLatestPublicationStories(publicationName) {
    return db
      .model('story')
      .filter(`publicationName == '${publicationName}' && isPublished == true`)
      .sort('createdAt', 'desc')
      .limit(10)
      .lookup({ field: 'user' })
      .get();
  },

  visitPublication(publicationName, user) {
    return endpoint.get('/publication/visit', { publicationName, user });
  },
};
export default PublicationService;
