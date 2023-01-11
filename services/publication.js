import { db, endpoint } from '@/utils/altogic';

const PublicationService = {
  getPublicationFollowers(publicationId) {
    return db
      .model('publication_follower_connection')
      .filter(`publication == '${publicationId}'`)
      .lookup({ field: 'user' })
      .get();
  },

  getPublication(publicationName, user) {
    return endpoint.get('/publication/get-publication-by-name', {
      publicationName,
      user
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
  deleteFeature(id) {
    return db.model('feature_page').filter(`_id == '${id}'`).delete();
  },

  getLatestPublicationStories(publicationName, page, pageSize) {
    return endpoint.get('/publication/latests', {
      publicationName,
      page,
      pageSize,
    });
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
  updateFeaturePage(feature, sections) {

    return endpoint.post('/feature_page/update', {
      feature,
      sections
    })
  },

  getUsersPublications() {
    return endpoint.get('/user/publications');
  },
  getPublicationHomeLayout(publication) {
    return endpoint.get(`/publication/${publication}/layout`);
  },
  updatePublicationHomeLayout(layout) {
    return db.model('publication_homepage').object(layout?._id).update(layout);
  },
  createPublication(publication, userIds) {
    return endpoint.post('/publication', publication, {
      userIds,
    });
  },
  isFollowingPublication(publicationId, userId) {
    return db
      .model('publication_follower_connection')
      .filter(`this.user == '${userId}' && publication == '${publicationId}'`)
      .get();
  },
};
export default PublicationService;
