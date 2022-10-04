import { db, endpoint } from '@/utils/altogic';

const PublicationService = {
  getPublicationFollowers(publicationId) {
    return db
      .model('publication_follower_connection')
      .filter(`publication == '${publicationId}`)
      .get();
  },

  getPublication(publicationName) {
    return endpoint.get('/publication/get-publication-by-name', {
      publicationName,
    });
  },

  getAllUserPublications(publications) {
    return db
      .model('publication')
      .filter(`IN(${JSON.stringify(publications)}, this._id)`)
      .get();
  },

  getPublicationStories(publicationName) {
    return db
      .model('story')
      .filter(`publicationName == '${publicationName}'`)
      .get();
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

  getLatestPublicationStories(publicationName) {
    return db
      .model('story')
      .filter(`publicationName == '${publicationName}'  `)
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
  getFeaturePage(featureId) {
    return db.model('feature_page').object(featureId).get();
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
  followPublication(publication, user) {
    return endpoint.post(`/publication/follow`, {
      ...publication,
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
  getNewsletters(publication) {
    return db
      .model('newsletter_stories')
      .filter(`this.publication == '${publication}'`)
      .get();
  },
  getSubscribers(newsletter) {
    return db.model('newsletter').object(newsletter).get();
  },
  createFeaturePage(feature) {
    return endpoint.post('/feature', feature);
  },
  getUsersPublications() {
    return endpoint.get('/user/publications');
  },
  getPublicationHomeLayout(publicationId) {
    return db
      .model('publication_homepage')
      .filter(`publication == '${publicationId}'`)
      .get();
  },
  updatePublicationHomeLayout(layout) {
    return db.model('publication_homepage').object(layout?._id).update(layout);
  },
};
export default PublicationService;
