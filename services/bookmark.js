import { db, endpoint } from '@/utils/altogic';

const BookmarkService = {
  getBookmarkList: ({ username, includePrivates, page, limit }) =>
    endpoint.get('/bookmark/list/', {
      username,
      includePrivates,
      page,
      limit,
    }),
  createBookmarkList: (list) => db.model('bookmark_list').create(list),
  addBookmark: (bookmark) => endpoint.post('/bookmark', bookmark),
  deleteBookmark: ({ listId, storyId, newImages }) =>
    endpoint.post(`delete-bookmark?storyId=${storyId}&listId=${listId}`, {newImages}),
  getBookmarkListDetail: ({ slug, limit, page }) =>
    endpoint.get(`/bookmark/list/detail`, {
      slug,
      page,
      limit,
    }),
  deleteBookmarkList: (listId) => endpoint.delete(`/bookmark/list/${listId}`),
  updateBookmarkList: (list) =>
    db.model('bookmark_list').object(list._id).update(list),
  getMyBookmarks: (userId) =>
    db.model('bookmark').filter(`user == '${userId}'`).lookup({ field: 'story' }).get(),
  clearBookmarkList: (listId) =>
    endpoint.delete(`/bookmark-list/${listId}/clear`),
};
export default BookmarkService;
