import { db, endpoint } from '@/utils/altogic';

const BookmarkService = {
  getBookmarkList: ({ username, includePrivates, limit }) =>
    endpoint.get('/bookmark/list/', {
      username,
      includePrivates,
      limit,
    }),
  createBookmarkList: (list) => db.model('bookmark_list').create(list),
  addBookmark: (bookmark) => endpoint.post('/bookmark', bookmark),
  deleteBookmark: ({ listId, storyId }) =>
    endpoint.delete(`bookmark?storyId=${storyId}&listId=${listId}`),
  getBookmarkListDetail: ({ slug, limit }) =>
    endpoint.get(`/bookmark/list/detail`, {
      slug,
      limit,
    }),
  deleteBookmarkList: (listId) => endpoint.delete(`/bookmark/list/${listId}`),
  updateBookmarkList: (list) =>
    db.model('bookmark_list').object(list._id).update(list),
  getBookmarks: ({ userId }) =>
    db.model('bookmark').filter(`user == '${userId}'`).get(),
  clearBookmarkList: (listId) =>
    endpoint.delete(`/bookmark-list/${listId}/clear`),
};
export default BookmarkService;
