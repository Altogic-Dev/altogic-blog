import React, { Fragment, useState, useEffect, useCallback } from 'react';
import HeadContent from '@/components/general/HeadContent';
import { useRouter } from 'next/router';
import { Menu, Transition, Dialog } from '@headlessui/react';
import PostCard from '@/components/PostCard';
import ShareButtons from '@/components/ShareButtons';
import Avatar from '@/components/profile/Avatar';
import DeleteList from '@/components/bookmarks/DeleteList';
import Button from '@/components/basic/button';
import { useSelector, useDispatch } from 'react-redux';
import {
  getBookmarkListDetailRequest,
  updateBookmarkListRequest,
  clearBookmarkListRequest,
  deleteBookmarkRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { DateTime } from 'luxon';
import CreateBookmarkList from '@/components/bookmarks/CreateBookmarkList';
import _ from 'lodash';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import ListObserver from '@/components/ListObserver';
import { generalActions } from '@/redux/general/generalSlice';
import { authActions } from '@/redux/auth/authSlice';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { reportActions } from '@/redux/report/reportSlice';
import {
  FlagIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/outline';
import { parseHtml } from '@/utils/utils';

export default function ListDetail() {
  const BOOKMARK_LIST_LIMIT = 5;
  const router = useRouter();
  const dispatch = useDispatch();

  const { username, bookmarkListSlug } = router.query;

  const [deleteListModal, setDeleteListModal] = useState(false);
  const [editBookmarkList, setEditBookmarkList] = useState(false);
  const [user, setUser] = useState();
  const [isMyProfileState, setIsMyProfileState] = useState(false);
  const [stories, setStories] = useState();
  const [bookmarkListState, setBookmarkListState] = useState();
  const [bookmarkListPage, setBookmarkListPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [followingModal, setFollowingModal] = useState(false);
  const [unfollowed, setUnfollowed] = useState([]);
  const sessionUser = useSelector((state) => state.auth.user);
  const bookmarkError = useSelector((state) => state.bookmark.error);
  const bookmarkLoading = useSelector(
    (state) => state.bookmark.bookmarkListLoading
  );
  // const [loading, setLoading] = useState(true);
  const bookmarkList = useSelector((state) =>
    _.get(state.bookmark.bookmarkLists, username)?.bookmarkLists.find(
      (list) => list.slug === bookmarkListSlug
    )
  );

  const bookmarks = useSelector((state) =>
    _.get(state.bookmark.bookmarks, bookmarkList?._id)
  );
  const updatedBookmark = useSelector(
    (state) => state.bookmark.updatedBookmark
  );

  const profileUser = useSelector((state) => state.auth.profileUser);
  const userFollowingsCount = useSelector(
    (state) => state.followerConnection.userFollowingsCount
  );

  const userFollowings = useSelector(
    (state) => state.followerConnection.userFollowings
  );
  const isFollowing = useSelector(
    (state) => state.followerConnection.isFollowing
  );
  const isSubscribed = useSelector(
    (state) => state.subscribeConnection.isSubscribed
  );

  const getFollowingUsers = useCallback(() => {
    dispatch(
      followerConnectionActions.getFollowingUsersRequest({
        userId: _.get(user, '_id'),
        username: _.get(user, 'username'),
        page: followingPage,
      })
    );
  }, [followingPage, _.get(user, '_id')]);

  const toggleFollowingsModal = () => {
    if (!followingModal && _.isEmpty(userFollowings)) {
      dispatch(
        followerConnectionActions.getFollowingUsersRequest({
          userId: _.get(user, '_id'),
          username: _.get(user, 'username'),
          page: followingPage,
        })
      );
    }
    setFollowingModal((prev) => !prev);
  };

  const handleFollow = (user, index) => {
    if (unfollowed[index] === false)
      dispatch(
        followerConnectionActions.unfollowRequest({
          userId: _.get(sessionUser, '_id'),
          followingUserId: _.get(user, '_id'),
          followingUsername: _.get(user, 'username'),
        })
      );
    else {
      dispatch(
        followerConnectionActions.followRequest({
          followerUser: sessionUser,
          followingUser: {
            followingUser: _.get(user, '_id'),
            followingName: _.get(user, '_name'),
            followingUserProfilePicture: _.get(user, '_profilePicture'),
            followingUsername: _.get(user, '_username'),
          },
        })
      );
    }
    setUnfollowed((state) => {
      const newState = [...state];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    if (username) {
      setIsMyProfileState(username === _.get(sessionUser, 'username'));
    }
  }, [username]);

  useEffect(() => {
    if (!isMyProfileState && username) {
      dispatch(authActions.getUserByUserNameRequest(username));
    }
  }, [username]);

  useEffect(() => {
    setUser(isMyProfileState ? sessionUser : profileUser);
    if (!isMyProfileState && profileUser && sessionUser) {
      dispatch(
        generalActions.getFollowAndSubscribedInfoRequest(
          _.get(profileUser, '_id')
        )
      );
    }
  }, [isMyProfileState, profileUser, sessionUser]);

  useEffect(() => {
    if (bookmarkList?.user !== sessionUser?._id && bookmarkList?.isPrivate) {
      router.push('/');
    }
  }, [sessionUser, bookmarkList]);

  useEffect(() => {
    if (
      sessionUser?.username !== username &&
      bookmarkListSlug &&
      _.size(bookmarks) < (bookmarkList?.storyCount || 1)
    ) {
      dispatch(
        getBookmarkListDetailRequest({
          slug: bookmarkListSlug,
          page: bookmarkListPage,
          limit: BOOKMARK_LIST_LIMIT,
        })
      );
    }
  }, [bookmarkListPage, bookmarkListSlug]);

  useEffect(() => {
    if (
      sessionUser &&
      (followingPage > 1 || (_.isEmpty(userFollowings) && _.get(user, '_id')))
    ) {
      getFollowingUsers();
    }
  }, [followingPage, _.get(user, '_id')]);

  useEffect(() => {
    if (
      bookmarkListSlug &&
      bookmarkListState &&
      updatedBookmark &&
      bookmarkListState._id === updatedBookmark._id &&
      bookmarkListState.slug !== updatedBookmark.slug
    ) {
      router.push(`/${username}/${updatedBookmark.slug}`);
    } else {
      setBookmarkListState(bookmarkList);
    }
  }, [updatedBookmark]);
  useEffect(() => {
    if (bookmarks) {
      setStories(bookmarks.map((bookmark) => bookmark.story));
    } else {
      setStories([]);
    }
  }, [bookmarks]);
  useEffect(() => {
    if (bookmarkError) {
      router.push('/');
    }
  }, [bookmarkError]);

  return (
    <div>
      <HeadContent>
        <title>Opinate Bookmark List Detail</title>
        <meta
          name="description"
          content="Opinate List Detail"
        />
      </HeadContent>
      <Layout loading={bookmarkLoading}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-8 lg:py-10 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 sm:mb-[60px]">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <Avatar
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={user?.profilePicture}
                    alt={user?.username}
                    placeholderName={user?.name}
                  />
                  <div>
                    <span className="text-slate-700  text-base font-medium tracking-sm">
                      {user?.name}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 tracking-sm">
                      {DateTime.fromISO(
                        _.get(bookmarkList, 'createdAt')
                      ).toLocaleString({
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      <svg
                        className="h-1 w-1 text-slate-500"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      <span>{user?.storyCount} stories</span>
                    </div>
                  </div>
                </div>
                {!bookmarkList?.isPrivate && (
                  <ul className="flex items-center">
                    <ShareButtons />
                  </ul>
                )}
              </div>
              <div className="flex items-center gap-8">
                <h1 className="text-slate-700 text-3xl font-semibold tracking-md">
                  {bookmarkList?.name}
                </h1>

                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                    bookmarkList?.isPrivate
                      ? 'bg-purple-100 text-purple-800 '
                      : 'bg-green-100 text-green-800 '
                  }`}
                >
                  {bookmarkList?.isPrivate ? (
                    <LockClosedIcon className="w-3 h-3 mr-1" />
                  ) : (
                    <LockOpenIcon className="w-3 h-3 mr-1" />
                  )}

                  {bookmarkList?.isPrivate ? 'Private' : 'Public'}
                </span>

                {bookmarkList?.user === sessionUser?._id && (
                  <div className="flex items-center gap-4 relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex items-center justify-center px-4 py-3 rounded-md">
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8955 10 12H12ZM12 12H14C14 10.8955 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8955 17 12H19ZM19 12H21C21 10.8955 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8955 3 12H5ZM5 12H7C7 10.8955 6.10457 10 5 10V12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none">
                          <Menu.Item>
                            <Button
                              className="w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              onClick={() => setEditBookmarkList(true)}
                            >
                              Rename list
                            </Button>
                          </Menu.Item>

                          <Menu.Item>
                            <Button
                              className="w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              onClick={() =>
                                dispatch(
                                  clearBookmarkListRequest(bookmarkList._id)
                                )
                              }
                            >
                              Remove items
                            </Button>
                          </Menu.Item>

                          <Menu.Item>
                            <Button
                              className="w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              onClick={() =>
                                dispatch(
                                  updateBookmarkListRequest({
                                    _id: bookmarkList._id,
                                    isPrivate: !bookmarkList.isPrivate,
                                  })
                                )
                              }
                            >
                              Make list{' '}
                              {bookmarkList?.isPrivate ? 'public' : 'private'}
                            </Button>
                          </Menu.Item>
                          {!bookmarkList?.isDefault && (
                            <Menu.Item>
                              <Button
                                onClick={() => setDeleteListModal(true)}
                                className="w-full px-6 py-3 text-red-600 text-base tracking-sm transform transition text-start ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              >
                                Delete list
                              </Button>
                            </Menu.Item>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>

              {_.size(bookmarks) === 0 ? (
                <div className="items-center flex flex-col">
                  <span className="mt-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                    <FlagIcon className="w-7 h-7 text-purple-600" />
                  </span>
                  <p className="text-slate-500 text-md">
                    No stories has been bookmarked to this list yet!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  <ListObserver
                    onEnd={() => setBookmarkListPage((prev) => prev + 1)}
                  >
                    {stories?.map((post) => (
                      <PostCard
                        key={post.id}
                        listDetailMenu
                        authorUrl={`/${post?.username}`}
                        authorName={post.username}
                        authorImage={post.userProfilePicture}
                        storyUrl={`/story/${post.storySlug}`}
                        timeAgo={DateTime.fromISO(post.createdAt).toRelative()}
                        title={post.title}
                        isDeleted={
                          post.isDeleted || post.isPrivate || !post.isPublished
                        }
                        infoText={parseHtml(post?.content).slice(0, 300)}
                        badgeUrl={post.badgeUrl}
                        badgeName={_.first(post.categoryNames)}
                        min={post.estimatedReadingTime}
                        images={_.first(post.storyImages)}
                        actionMenu
                        story={post}
                        bookmarks={bookmarks}
                        optionButtons={{
                          unBookmark:
                            bookmarkList?.user === sessionUser?._id
                              ? () =>
                                  dispatch(
                                    deleteBookmarkRequest({
                                      listId: bookmarkList._id,
                                      storyId: post._id,
                                    })
                                  )
                              : null,

                          report: () =>
                            dispatch(
                              reportActions.reportStoryRequest({
                                userId: user._id,
                                storyId: post._id,
                                reportedUserId: post.user,
                              })
                            ),
                        }}
                      />
                    ))}
                  </ListObserver>
                </div>
              )}
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar
                following={{
                  followings: _.take(userFollowings, 5),
                  count: userFollowingsCount,
                  seeAllButton: toggleFollowingsModal,
                }}
                profile={user}
                isFollowing={isFollowing}
                isSubscribed={isSubscribed}
              />
            </div>
          </div>
        </div>
        {deleteListModal && (
          <DeleteList
            setDeleteList={setDeleteListModal}
            listId={bookmarkList._id}
          />
        )}
        {editBookmarkList && (
          <CreateBookmarkList
            bookmarkList={bookmarkList}
            setCreateNewList={setEditBookmarkList}
            list={bookmarkList}
          />
        )}
      </Layout>

      <Transition appear show={followingModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={toggleFollowingsModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold text-slate-700 mb-6 tracking-md text-center"
                  >
                    {userFollowingsCount} Following
                  </Dialog.Title>
                  <div>
                    <ul className="mb-6">
                      {_.map(userFollowings, (following, index) => (
                        <li
                          key={following._id}
                          className="flex items-start justify-between gap-6 py-4"
                        >
                          <div className="flex gap-3">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={following.followingUserProfilePicture}
                              alt={following.followingName}
                            />
                            <div className="flex flex-col">
                              <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                                {following.followingName}
                              </span>
                              <span className="text-slate-500 text-xs tracking-sm">
                                {following.followingAbout}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleFollow(following, index)}
                          >
                            {unfollowed[index] === true ? 'Follow' : 'Unfollow'}
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        onClick={() => setFollowingPage((prev) => prev + 1)}
                      >
                        Show more
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
