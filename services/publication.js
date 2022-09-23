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
      .filter(
        `publicationName == '${publicationName}' && isPublication == true'`
      )
      .get();
  },
  getFeaturePagesByPublication(publicationId) {
    return db
      .model('feature_page')
      .filter(`publication == '${publicationId}'`)
      .get();
  },

  visitPublication(publicationName, user) {
    return endpoint.get('/publication/visit', { publicationName, user });
  },
  getPublicationsNavigation(publicationId) {
    return endpoint.get(`publication/navigation/${publicationId}`);
  },
  cratePublicationNavigation(publication) {
    return db.model('publication_navigation').create(publication);
  },
  updatePublicationNavigation(publicationId, navigation) {
    return endpoint.put(`publication/navigation/${publicationId}`, navigation);
  },
};
export default PublicationService;
