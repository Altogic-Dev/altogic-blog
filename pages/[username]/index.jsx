/* eslint-disable no-nested-ternary */
import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import HeadContent from '@/components/general/HeadContent';
import { Tab, Menu, Transition, Dialog } from '@headlessui/react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import AboutComponent from '@/components/general/About';
import PostList from '@/components/PostList';
import AboutSubscribeCard from '@/components/AboutSubscribeCard';
import ProfilePageHome from '@/components/general/ProfilePageHome';
import Button from '@/components/basic/button';
import { getUserBookmarkListsRequest } from '@/redux/bookmarks/bookmarkSlice';
import { classNames } from '@/utils/utils';
import Layout from '@/layouts/Layout';
import { DateTime } from 'luxon';
import Sidebar from '@/layouts/Sidebar';
import { authActions } from '@/redux/auth/authSlice';
import { generalActions } from '@/redux/general/generalSlice';
import UserCard from '@/components/general/UserCard';
import CreateBookmarkList from '@/components/bookmarks/CreateBookmarkList';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import ToastMessage from '@/utils/toast';

export default function ProfilePage() {
  const BOOKMARK_LIST_LIMIT = 3;
  const FOLLOWING_PAGE_LIMIT = 5;
  const router = useRouter();
  const dispatch = useDispatch();
  const [createNewList, setCreateNewList] = useState(false);
  const { username, tab } = router.query;
  const tabNames = ['Home', 'Lists', 'About'];
  const [isLoading, setIsLoading] = useState(true);
  const userStories = useSelector((state) => state.story.userStories);
  const sessionUser = useSelector((state) => state.auth.user);
  const [showDialog, setShowDialog] = useState(false);
  const followLoading = useSelector(
    (state) => state.followerConnection.followingUserLoading
  );
  const followerConnectionLoading = useSelector(
    (state) => state.followerConnection.isLoading
  );
  const profileUser = useSelector((state) => state.auth.profileUser);

  const userFollowings = useSelector((state) =>
    _.get(state.followerConnection.followingsData[username], 'userFollowings')
  );
  const myFollowings = useSelector(
    (state) => state.followerConnection.myFollowings
  );

  const userFollowingsCount = useSelector((state) =>
    _.get(state.followerConnection.followingsData[username], 'count')
  );

  const bookmarkLists = useSelector(
    (state) => _.get(state.bookmark.bookmarkLists, username)?.bookmarkLists
  );
  const bookmarkListCount =
    useSelector(
      (state) => _.get(state.bookmark.bookmarkLists, username)?.count
    ) || 1;

  const [bookmarkListPage, setBookmarkListPage] = useState(
    useSelector(
      (state) => _.get(state.bookmark.bookmarkLists, username)?.page
    ) || 1
  );

  const bookmarkListsProfileLoading = useSelector(
    (state) => state.bookmark.bookmarkListsProfileLoading
  );

  const isFollowing = useSelector(
    (state) => state.followerConnection.isFollowing
  );
  const isSubscribed = useSelector(
    (state) => state.subscribeConnection.isSubscribed
  );

  const authLoading = useSelector((state) => state.auth.isLoading);
  const subcribeLoading = useSelector((state) => state.general.isLoading);
  const storyLoading = useSelector((state) => state.story.isLoading);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [blockModal, setBlockModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followingPage, setFollowingPage] = useState(1);

  const [isMyProfile, setIsMyProfile] = useState(true);
  const { ref: inViewRef, inView } = useInView();
  const ref = useRef();

  const isUnfollowed = useSelector(
    (state) => state.followerConnection.isUnfollowed
  );

  const copyToClipboard = () => {
    ToastMessage.success('Copied to clipboard');
    const basePath = window.location.origin;
    let profileUrl = `${basePath}/${username}`;
    if (tab) profileUrl += `?tab=${tab}`;
    navigator.clipboard.writeText(profileUrl);
  };
  const getFollowingUsers = useCallback(() => {
    dispatch(
      followerConnectionActions.getFollowingUsersRequest({
        userId: _.get(profileUser, '_id'),
        username: _.get(profileUser, 'username'),
        page: isUnfollowed ? followingPage - 1 : followingPage,
        limit: isUnfollowed ? FOLLOWING_PAGE_LIMIT * 2 : FOLLOWING_PAGE_LIMIT,
      })
    );
  }, [followingPage, _.get(profileUser, '_id')]);

  const toggleFollowingsModal = () => {
    setFollowingModal((prev) => !prev);
  };

  useEffect(() => {
    switch (_.lowerCase(tab)) {
      case 'list':
        setSelectedIndex(1);
        break;
      case 'about':
        setSelectedIndex(2);
        break;

      default:
        setSelectedIndex(0);
        break;
    }
  }, [tab]);

  useEffect(() => {
    if (profileUser && sessionUser) {
      dispatch(
        generalActions.getFollowAndSubscribedInfoRequest(
          _.get(profileUser, '_id')
        )
      );
    }
  }, [profileUser]);
  useEffect(() => {
    if (
      sessionUser &&
      profileUser &&
      (!userFollowingsCount ||
        (_.size(userFollowings) < FOLLOWING_PAGE_LIMIT * followingPage &&
          _.size(userFollowings) < userFollowingsCount))
    ) {
      getFollowingUsers();
    }
  }, [followingPage, _.get(profileUser, '_id')]);

  useEffect(() => {
    if (username && profileUser?.username !== username) {
      dispatch(authActions.getUserByUserNameRequest(username));
    }
    setFollowingModal(false);
  }, [username]);

  const getUserBookmarkLists = () => {
    dispatch(
      getUserBookmarkListsRequest({
        username,
        includePrivates: username === sessionUser?.username,
        page: bookmarkListPage,
        limit: BOOKMARK_LIST_LIMIT,
        fromProfile: true,
      })
    );
  };

  const handleBookmarkListEnd = () => {
    setBookmarkListPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!bookmarkListsProfileLoading && !_.isNil(bookmarkLists)) {
      setIsLoading(false);
    }
    if (!storyLoading && !_.isNil(userStories)) {
      setIsLoading(false);
    }
    if (!authLoading && !_.isNil(profileUser)) {
      setIsLoading(false);
    }
  }, [bookmarkListsProfileLoading, authLoading, storyLoading]);

  useEffect(() => {
    if (sessionUser && profileUser) {
      setIsMyProfile(sessionUser?._id === profileUser?._id);
    }
  }, [sessionUser, profileUser]);

  useEffect(() => {
    if (
      username &&
      username !== sessionUser?.username &&
      _.size(bookmarkLists) < BOOKMARK_LIST_LIMIT * bookmarkListPage &&
      _.size(bookmarkLists) < bookmarkListCount
    ) {
      getUserBookmarkLists();
    }
  }, [bookmarkListPage, username]);

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (inView && !_.isEmpty(bookmarkLists)) handleBookmarkListEnd();
  }, [inView]);

  useEffect(() => {
    setShowDialog(
      !subcribeLoading &&
        !isMyProfile &&
        !isSubscribed &&
        sessionUser &&
        !authLoading
    );
  }, [isSubscribed, authLoading, subcribeLoading]);

  console.log(
    _.some(myFollowings, (user) => user?.followingUser === profileUser?._id)
  );
  console.log(myFollowings)
  return (
    <div>
      <HeadContent>
        <title>Altogic Medium Blog App Notifications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Notifications"
        />
      </HeadContent>
      <Layout loading={isLoading}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="lg:py-10 lg:px-8">
              <div className="flex items-center justify-between gap-4 mb-8 md:mb-14">
                <h1 className="text-slate-700 text-2xl sm:text-3xl md:text-5xl font-bold tracking-md">
                  {profileUser ? (
                    selectedIndex !== 2 ? (
                      `${`${profileUser.name}\`s`} ${tabNames[selectedIndex]}`
                    ) : (
                      `About ${profileUser.name}`
                    )
                  ) : (
                    <ClipLoader />
                  )}
                </h1>

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
                            className="flex items-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            onClick={copyToClipboard}
                          >
                            Copy link to{' '}
                            {tab === 'list'
                              ? 'list'
                              : tab === 'about'
                              ? 'profile'
                              : 'stories'}
                          </Button>
                        </Menu.Item>
                        {isMyProfile && tab === 'list' && (
                          <Menu.Item>
                            <Button
                              type="button"
                              className='className="flex items-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"'
                              onClick={setCreateNewList}
                            >
                              Create New List
                            </Button>
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
              >
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
                  <Tab
                    onClick={() => router.push(`/${profileUser.username}`)}
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
                    onClick={() =>
                      router.push(`/${profileUser.username}?tab=list`)
                    }
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
                    onClick={() =>
                      router.push(`/${profileUser.username}?tab=about`)
                    }
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
                      isMyProfile={isMyProfile}
                      selectedIndex={selectedIndex}
                      userId={_.get(profileUser, '_id')}
                    />
                  </Tab.Panel>
                  <Tab.Panel className="flex flex-col gap-6 mt-10">
                    {bookmarkListsProfileLoading ? (
                      <ClipLoader />
                    ) : (
                      <>
                        {bookmarkLists?.map((list) => (
                          <PostList
                            key={list._id}
                            title={list.name}
                            storiesNumber={list.storyCount}
                            url={`/${username}/${list.slug}`}
                            badges={list.isPrivate}
                            images={list.coverImages}
                          />
                        ))}
                        <div ref={setRefs} />
                      </>
                    )}
                  </Tab.Panel>
                  <Tab.Panel className="mt-10">
                    <AboutComponent
                      username={username}
                      isMyProfile={isMyProfile}
                      userFollowings={userFollowings}
                      userId={_.get(profileUser, '_id')}
                      about={_.get(profileUser, 'about')}
                      signUpAt={
                        _.get(profileUser, 'signUpAt') ?? DateTime.now()
                      }
                      topWriterTopics={_.get(profileUser, 'topWriterTopics')}
                      followerCount={_.get(profileUser, 'followerCount')}
                      followingCount={userFollowingsCount}
                      toggleFollowingsModal={toggleFollowingsModal}
                    />
                    {showDialog && (
                      <AboutSubscribeCard
                        profileId={_.get(profileUser, '_id')}
                        name={_.get(profileUser, 'name')}
                        mailAddress={_.get(sessionUser, 'email')}
                      />
                    )}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              {!profileUser && !followingModal ? (
                <ClipLoader />
              ) : (
                <Sidebar
                  following={{
                    followings: sessionUser ? _.take(userFollowings, 5) : null,
                    count: userFollowingsCount,
                    seeAllButton: toggleFollowingsModal,
                  }}
                  followingTopics={isMyProfile}
                  profile={profileUser}
                  followLoading={followLoading}
                  isFollowing={
                    isFollowing ||
                    _.some(
                      myFollowings,
                      (user) => user?.followingUser === profileUser?._id
                    )
                  }
                  isSubscribed={isSubscribed}
                  popularStories={!isMyProfile}
                  userTopics={profileUser?.topWriterTopics}
                  stories={userStories?.slice(0, 5)}
                />
              )}
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              {(followerConnectionLoading || followLoading || !profileUser) &&
              !followingModal ? (
                <ClipLoader />
              ) : (
                <Sidebar
                  isSubscribed={isSubscribed}
                  following={{
                    followings: sessionUser ? _.take(userFollowings, 5) : null,
                    count: userFollowingsCount,
                    seeAllButton: toggleFollowingsModal,
                  }}
                  profile={profileUser}
                  isFollowing={
                    isFollowing ||
                    _.some(
                      myFollowings,
                      (user) => user?.followingUser === profileUser?._id
                    )
                  }
                />
              )}
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
                    <Button
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
                    </Button>
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
                    <Button
                      onClick={() => setBlockModal(false)}
                      className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </Button>
                    <Button className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Block
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {createNewList && (
          <CreateBookmarkList setCreateNewList={setCreateNewList} />
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
                      {_.map(userFollowings, (person) => (
                        <UserCard
                          key={person._id}
                          user={{
                            _id: person.followingUser,
                            name: person.followingName,
                            username: person.followingUsername,
                            profilePicture: person.followingUserProfilePicture,
                            about: person.followingAbout,
                          }}
                          isFollowing={_.some(
                            myFollowings,
                            (user) =>
                              user.followingUser === person.followingUser
                          )}
                        />
                      ))}
                    </ul>
                    <div className="text-center">
                      {userFollowingsCount > _.size(userFollowings) && (
                        <Button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                          onClick={() => setFollowingPage((prev) => prev + 1)}
                        >
                          Show more
                        </Button>
                      )}
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
