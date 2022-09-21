import { db } from '@/utils/altogic';

const PublicationService = {
  getPublicationFollowers(publicationId) {
    return db
      .model('publication_follower_connection')
      .filter(`publication == '${publicationId}`)
      .get();
  },

  getPublication(publicationName) {
    return db
      .model('publication')
      .filter(`name == '${publicationName}'`)
      .get();
  },

  getPublicationStories(publicationName) {
    return db
      .model('story')
      .filter(`publicationName == '${publicationName}' && isPublished == true`)
      .get();
  },
};
export default PublicationService;
