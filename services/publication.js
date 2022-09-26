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
  getPublicationFeatures(publication) {
    return db
      .model('feature_page')
      .filter(`publication == '${publication}'`)
      .get();
  },
  deleteFeature(publication) {
    return db.model('feature_page').delete(publication).get();
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
      .filter(`publicationName == '${publicationName}' && isPublished == true`)
      .sort('createdAt', 'desc')
      .limit(10)
      .lookup({ field: 'user' })
      .get();
  },

  visitPublication(publicationName, user) {
    return endpoint.get('/publication/visit', { publicationName, user });
  },

  followPublication(publication, user) {
    return endpoint.post(`/publication/follow`, {
      publication,
      userAbout: user.userAbout,
      userName: user.userName,
      user: user._id,
      userProfilePicture: user.userProfilePicture,
    });
  },

  unfollowPublication(publication, user) {
    return endpoint.delete(`/publication/unfollow/${publication}/${user._id}`);
  },
  checkPublicationFollowing(user) {
    return db
      .model('publication_follower_connection')
      .filter(`this.user == '${user}'`)
      .get();
  },
};
export default PublicationService;
