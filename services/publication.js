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

  getPublicationStories(publicationName) {
    return db
      .model('story')
      .filter(
        `publicationName == '${publicationName}' && isPublication == true'`
      )
      .get();
  },
  getAllUserPublications(publications) {
    return db
      .model('publication')
      .filter(`IN(${JSON.stringify(publications)}, this._id)`)
      .get();
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

  getPublicationById(publicationId) {
    return db.model('publication').object(publicationId).get();
  },

  isPublicationExist(publicationId, publicationname) {
    return endpoint.get('/publication/isExistName', {
      publicationId,
      publicationname,
    });
  },

  updatePublication(publication) {
    return endpoint.put(`publication/${publication._id}`, publication);
  },
};
export default PublicationService;
