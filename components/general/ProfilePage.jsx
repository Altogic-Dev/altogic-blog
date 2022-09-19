/* eslint-disable no-nested-ternary */
import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import Head from 'next/head';
import { Tab, Menu, Transition, Dialog } from '@headlessui/react';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import AboutComponent from '@/components/general/About';
import PostList from '@/components/PostList';
import AboutSubscribeCard from '@/components/AboutSubscribeCard';
import ProfilePageHome from '@/components/general/ProfilePageHome';
import ListObserver from '@/components/ListObserver';
import Button from '@/components/basic/button';
import { getBookmarkListsRequest } from '@/redux/bookmarks/bookmarkSlice';
import { classNames } from '@/utils/utils';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import { authActions } from '@/redux/auth/authSlice';
import { generalActions } from '@/redux/general/generalSlice';

export default function ProfilePage({ About, Home, List }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username } = router.query;

  const sessionUser = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.auth.profileUser);
  const userFollowings = useSelector(
    (state) => state.followerConnection.userFollowings
  );
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const isFollowing = useSelector(
    (state) => state.followerConnection.isFollowing
  );
  const isSubscribed = useSelector(
    (state) => state.subscribeConnection.isSubscribed
  );

  const [userState, setUserState] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [blockModal, setBlockModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followingPage, setFollowingPage] = useState(1);
  const [isMyProfileState, setIsMyProfileState] = useState(false);
  const [bookmarkListLimit, setBookmarkListLimit] = useState(3);
  const [unfollowed, setUnfollowed] = useState([]);

  const copyToClipboard = () => {
    const basePath = window.location.origin;
    const profileUrl = `${basePath}/${username}`;
    navigator.clipboard.writeText(profileUrl);
  };

  const getFollowingUsers = useCallback(() => {
    dispatch(
      followerConnectionActions.getFollowingUsersRequest({
        userId: _.get(userState, '_id'),
        page: followingPage,
      })
    );
  }, [followingPage, _.get(userState, '_id')]);

  const toggleFollowingsModal = () => {
    if (!followingModal && _.isNil(userFollowings)) {
      dispatch(
        followerConnectionActions.getFollowingUsersRequest({
          userId: _.get(userState, '_id'),
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
    if (Home) {
      setSelectedIndex(0);
    } else if (List) {
      setSelectedIndex(1);
    } else if (About) {
      setSelectedIndex(2);
    }
  }, []);

  useEffect(() => {
    if (
      followingPage > 1 ||
      (_.isEmpty(userFollowings) && _.get(userState, '_id'))
    ) {
      getFollowingUsers();
    }
  }, [followingPage, _.get(userState, '_id')]);

  useEffect(() => {
    if (username) {
      setIsMyProfileState(username === _.get(sessionUser, 'username'));
    }
  }, [username]);

  useLayoutEffect(() => {
    if (!isMyProfileState && username) {
      dispatch(authActions.getUserByUserNameRequest(username));
    }
  }, [username]);

  useLayoutEffect(() => {
    if (sessionUser) {
      setUserState(isMyProfileState ? sessionUser : profileUser);
      if (!isMyProfileState && profileUser) {
        dispatch(
          generalActions.getFollowAndSubscribedInfoRequest(
            _.get(profileUser, '_id')
          )
        );
      }
    }
  }, [isMyProfileState, profileUser, sessionUser]);

  useEffect(() => {
    if (username && selectedIndex === 1) {
      dispatch(
        getBookmarkListsRequest({
          username,
          includePrivates: username === sessionUser?.username,
          limit: bookmarkListLimit,
        })
      );
    }
  }, [username]);

  const handleBookmarkListEnd = useCallback(() => {
    setBookmarkListLimit((prev) => prev + 10);
  }, []);
  useEffect(() => {
    if (username) {
      dispatch(
        getBookmarkListsRequest({
          username,
          includePrivates: username === sessionUser?.username,
          limit: bookmarkListLimit,
        })
      );
    }
  }, [bookmarkListLimit]);
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Notifications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Notifications"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="lg:py-10 lg:px-8">
              <div className="flex items-center justify-between gap-4 mb-8 md:mb-14">
                {selectedIndex === 0 ? (
                  <h1 className="text-slate-700 text-2xl sm:text-3xl md:text-5xl font-bold tracking-md">
                    {userState?.name}&apos;s Stories
                  </h1>
                ) : selectedIndex === 1 ? (
                  <h1 className="text-slate-700 text-2xl sm:text-3xl md:text-5xl font-bold tracking-md">
                    {userState?.name}&apos;s Lists
                  </h1>
                ) : (
                  <h1 className="text-slate-700 text-2xl sm:text-3xl md:text-5xl font-bold tracking-md">
                    {userState?.name}&apos;s About
                  </h1>
                )}
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
                          <button
                            type="button"
                            className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            onClick={copyToClipboard}
                          >
                            Copy link to profile
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <Link href="/settings">
                            <a className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105">
                              Settings
                            </a>
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <Tab.Group selectedIndex={selectedIndex}>
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
                  <Tab
                    onClick={() => router.push(`/${userState.username}`)}
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    Home
                  </Tab>
                  <Tab
                    onClick={() => router.push(`/${userState.username}/lists`)}
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    Lists
                  </Tab>
                  <Tab
                    onClick={() => router.push(`/${userState.username}/about`)}
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    About
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
                    <ProfilePageHome
                      userId={_.get(userState, '_id')}
                      bookmarkLists={bookmarkLists}
                    />
                  </Tab.Panel>
                  <Tab.Panel className="flex flex-col gap-6 mt-10">
                    <ListObserver onEnd={handleBookmarkListEnd}>
                      {bookmarkLists?.map((list) => (
                        <PostList
                          key={list.id}
                          title={list.name}
                          storiesNumber={list.storyCount}
                          url={`/${username}/${list.slug}`}
                          badges={list.isPrivate}
                          images={list.coverImages}
                        />
                      ))}
                    </ListObserver>
                  </Tab.Panel>
                  <Tab.Panel className="mt-10">
                    <AboutComponent
                      userId={_.get(userState, '_id')}
                      about={_.get(userState, 'about')}
                      signUpAt={_.get(userState, 'signUpAt')}
                      topWriterTopics={_.get(userState, 'topWriterTopics')}
                      followerCount={_.get(userState, 'followerCount')}
                      followingCount={_.get(userState, 'followingCount')}
                      toggleFollowingsModal={toggleFollowingsModal}
                    />
                    {!isMyProfileState && (
                      <AboutSubscribeCard
                        name={_.get(userState, 'name')}
                        mailAddress={_.get(userState, 'mailAddress')}
                      />
                    )}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar
                following={{
                  followings: _.take(userFollowings, 5),
                  count: _.get(userState, 'followingCount'),
                  seeAllButton: toggleFollowingsModal,
                }}
                profile={{
                  id: _.get(userState, '_id'),
                  name: _.get(userState, 'name'),
                  profilePicture: _.get(userState, 'profilePicture'),
                  followerCount: _.get(userState, 'followerCount'),
                  username: _.get(userState, 'username'),
                  about: _.get(userState, 'about'),
                }}
                isFollowing={isFollowing}
                isSubscribed={isSubscribed}
              />
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              <Sidebar
                following={{
                  followings: _.take(userFollowings, 5),
                  count: _.get(userState, 'followingCount'),
                  seeAllButton: toggleFollowingsModal,
                }}
                profile={{
                  id: _.get(userState, '_id'),
                  name: _.get(userState, 'name'),
                  profilePicture: _.get(userState, 'profilePicture'),
                  followerCount: _.get(userState, 'followerCount'),
                  username: _.get(userState, 'username'),
                  about: _.get(userState, 'about'),
                }}
              />
            </div>
          </div>
        </div>
        {blockModal && (
          <div className="relative z-20">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="relative max-w-[400px] w-full bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 ring-8 ring-red-50">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2071 15.2929C16.8166 14.9024 16.1834 14.9024 15.7929 15.2929C15.4024 15.6834 15.4024 16.3166 15.7929 16.7071L17.2071 15.2929ZM20.7929 21.7071C21.1834 22.0976 21.8166 22.0976 22.2071 21.7071C22.5976 21.3166 22.5976 20.6834 22.2071 20.2929L20.7929 21.7071ZM22.2071 16.7071C22.5976 16.3166 22.5976 15.6834 22.2071 15.2929C21.8166 14.9024 21.1834 14.9024 20.7929 15.2929L22.2071 16.7071ZM15.7929 20.2929C15.4024 20.6834 15.4024 21.3166 15.7929 21.7071C16.1834 22.0976 16.8166 22.0976 17.2071 21.7071L15.7929 20.2929ZM12 16.5C12.5523 16.5 13 16.0523 13 15.5C13 14.9477 12.5523 14.5 12 14.5V16.5ZM4.83886 15.6722L5.12914 16.6292L4.83886 15.6722ZM1 21C1 21.5523 1.44772 22 2 22C2.55228 22 3 21.5523 3 21H1ZM2.17224 18.3389L3.12918 18.6291L2.17224 18.3389ZM15.7929 16.7071L20.7929 21.7071L22.2071 20.2929L17.2071 15.2929L15.7929 16.7071ZM20.7929 15.2929L15.7929 20.2929L17.2071 21.7071L22.2071 16.7071L20.7929 15.2929ZM7.5 16.5H12V14.5H7.5V16.5ZM7.5 14.5C6.17719 14.5 5.2941 14.4891 4.54857 14.7153L5.12914 16.6292C5.51921 16.5109 6.03168 16.5 7.5 16.5V14.5ZM3 21C3 19.5317 3.01085 19.0192 3.12918 18.6291L1.2153 18.0486C0.989146 18.7941 1 19.6772 1 21H3ZM4.54857 14.7153C2.95057 15.2 1.70005 16.4506 1.2153 18.0486L3.12918 18.6291C3.42003 17.6703 4.17034 16.92 5.12914 16.6292L4.54857 14.7153ZM13.5 7.5C13.5 9.433 11.933 11 10 11V13C13.0376 13 15.5 10.5376 15.5 7.5H13.5ZM10 11C8.067 11 6.5 9.433 6.5 7.5H4.5C4.5 10.5376 6.96243 13 10 13V11ZM6.5 7.5C6.5 5.567 8.067 4 10 4V2C6.96243 2 4.5 4.46243 4.5 7.5H6.5ZM10 4C11.933 4 13.5 5.567 13.5 7.5H15.5C15.5 4.46243 13.0376 2 10 2V4Z"
                          fill="#D92D20"
                        />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setBlockModal(false)}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition ease-in-out duration-150 hover:bg-gray-100"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 1L1 13M1 1L13 13"
                          stroke="#667085"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="text-left mb-8">
                    <div className="mb-5">
                      <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                        Block this author
                      </h3>
                      <span className="text-slate-500 text-sm tracking-sm">
                        They will no longer be able to follow you or view your
                        content.
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBlockModal(false)}
                      className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Block
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    {_.get(userState, 'followingCount')} Following
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
