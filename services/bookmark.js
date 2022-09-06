import { db, endpoint } from '@/utils/altogic';

const BookmarkService = {
  getBookmarkList: ({ username, includePrivates, limit }) =>
    endpoint.get('/bookmark/list/', {
      username,
      includePrivates,
      limit,
    }),
  createBookmarkList: (list) => db.model('bookmark_list').create(list),
};
export default BookmarkService;
