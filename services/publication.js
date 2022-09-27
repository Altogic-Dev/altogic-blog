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
