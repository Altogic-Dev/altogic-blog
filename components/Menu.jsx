import React, { useState, useEffect } from 'react';
import { Menu, Popover } from '@headlessui/react';
import {
  HomeIcon,
  BookmarkIcon,
  BookOpenIcon,
  PencilIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { notificationsActions } from '@/redux/notifications/notificationsSlice';
import { useRouter } from 'next/router';
import { realtime } from '@/utils/altogic';
import { generalActions } from '@/redux/general/generalSlice';
import { storyActions } from '@/redux/story/storySlice';
import Avatar from './profile/Avatar';
import Button from './basic/button';
import Notifications from './Notifications/Notifications';
import HeaderDropdown from './HeaderDropdown';
import { authActions } from '../redux/auth/authSlice';
import Search from './AutoComplete/Search';
import PublicationDropdown from './publication/PublicationDropdown';

export default function HeaderMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const searchResults = useSelector((state) => state.general.searchPreview);
  const selectedPublicationState = useSelector(
    (state) => state.publication.selectedPublication
  );
  const [isMounted, setIsMounted] = useState(false);

  const [user, setUser] = useState('undefined');
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(true);

  const [selectedPublication, setSelectedPublication] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) setIsAuthenticatedState(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    setUser(sessionUser);
  }, [sessionUser]);

  useEffect(() => {
    if (selectedPublicationState) {
      setSelectedPublication(selectedPublicationState);
    }
  }, [selectedPublicationState]);

  const logout = () => {
    dispatch(authActions.logoutRequest());
  };

  const [mobileNotifications, setMobileNotifications] = useState(false);
  useEffect(() => {
    if (user) {
      dispatch(
        notificationsActions.getNotificationPreviewRequest({
          userId: user?._id,
          limit: 5,
        })
      );
    }
  }, [user]);

  useEffect(() => {
    if (user && !isMounted) {
      setIsMounted(true);
      realtime.join('notification');
      realtime.on(user?._id, (payload) => {
        dispatch(
          notificationsActions.getRealtimeNotificationsRequest(payload.message)
        );
      });
    }
  }, [user]);

  const handleOnSearch = (value) => {
    dispatch(
      generalActions.searchPreviewRequest({
        query: value,
      })
    );
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-4 lg:px-8 lg:py-6">
        <div className="flex justify-between items-center lg:justify-start md:space-x-5">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Altogic</span>
                <img
                  className="w-[114px] h-[39px] sm:w-[135px] sm:h-[46px]"
                  src="/logo.svg"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <Popover.Group
            as="nav"
            className={`${
              !hideMenu ? 'hidden lg:flex' : 'hidden'
            } gap-1 transition-all duration-1000`}
          >
            {user && (
              <Link href="/">
                <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                  <HomeIcon className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
                  Home
                </a>
              </Link>
            )}

            {user && (
              <Link href={`/${user?.username}?tab=list`}>
                <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                  <BookmarkIcon className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
                  Lists
                </a>
              </Link>
            )}
            {user && (
              <Link href="/my-stories">
                <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                  <BookOpenIcon className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
                  Stories
                </a>
              </Link>
            )}
          </Popover.Group>
          <div
            className={`${
              !hideMenu && 'lg:w-0'
            } flex items-center flex-row-reverse lg:flex-row lg:justify-end w-10/12 lg:flex-1 gap-4`}
          >
            <div
              className={`${
                hideMenu &&
                'w-[32rem] cursor-pointer border border-solid border-gray-300'
              } relative h-12 w-12 bg-white rounded-xl p-1`}
            >
              <Search
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                onSearch={handleOnSearch}
                suggestions={searchResults}
                className={`${
                  hideMenu ? 'block' : 'hidden'
                } absolute top-0 left-0 w-full h-[42.5px] leading-[30px] bg-white outline-none py-0 px-5 rounded-2xl`}
              />

              <Button
                onClick={() => {
                  setHideMenu((prev) => !prev);
                  if (hideMenu) {
                    setShowSuggestions(false);
                  }
                }}
                className="absolute top-0 right-0 border-none w-10 h-10 p-2 bg-transparent cursor-pointer shadow-none rounded-full text-center"
              >
                <SearchIcon className="w-5 h-5" />
              </Button>
            </div>
            {isAuthenticatedState ? (
              <>
                <Button
                  disabled={router.pathname === '/write-a-story'}
                  onClick={() => {
                    dispatch(storyActions.clearStory());
                    router.push('/write-a-story');
                  }}
                  className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                    router.pathname !== '/write-a-story'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <PencilIcon className="w-5 h-5" />
                </Button>
                <Notifications
                  mobileNotifications={mobileNotifications}
                  setMobileNotifications={setMobileNotifications}
                />
                <Menu
                  as="div"
                  className="relative hidden lg:inline-flex items-center"
                >
                  <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-purple-500">
                    <Avatar
                      width={40}
                      height={40}
                      className="inline-block w-10 h-10 rounded-full"
                      placeholderName={user?.name}
                      src={user?.profilePicture}
                      alt={user?.username}
                    />
                  </Menu.Button>

                  <HeaderDropdown
                    user={user}
                    logout={logout}
                    className="origin-top-right absolute top-10 w-56"
                  />
                </Menu>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <a className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Login
                  </a>
                </Link>
                <Link href="/create-an-account">
                  <a className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Sign Up
                  </a>
                </Link>
              </div>
            )}
            {selectedPublication && (
              <Menu
                as="div"
                className="relative hidden lg:inline-flex items-center"
              >
                <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                  <Avatar
                    width={40}
                    height={40}
                    className="inline-block w-10 h-10 rounded-full"
                    placeholderName={selectedPublication?.name}
                    src={selectedPublication?.logo}
                    alt={selectedPublication?.name}
                  />
                </Menu.Button>

                <PublicationDropdown
                  publication={selectedPublication}
                  className="origin-top-right absolute top-10 w-56"
                />
              </Menu>
            )}
          </div>
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-around gap-8 fixed bottom-0 left-0 w-full h-[72px] bg-white border-b border-gray-200 shadow p-4 z-10">
        <Link href="/">
          <a className="group inline-flex items-center gap-3 text-slate-800 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
            <HomeIcon
              className={`w-8 h-7  group-hover:text-purple-500 ${
                router.asPath === '/' ? 'text-purple-500' : 'text-slate-300'
              }`}
              viewBox="0 0 21 21"
            />
          </a>
        </Link>
        {user && (
          <Link href={`/${user?.username}?tab=list`}>
            <a className="group inline-flex items-center gap-3 text-slate-800 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
              <BookmarkIcon
                className={`w-8 h-7  group-hover:text-purple-500 ${
                  router.asPath.includes('?tab=list')
                    ? 'text-purple-500'
                    : 'text-slate-300'
                }`}
                viewBox="0 0 21 21"
              />
            </a>
          </Link>
        )}
        {user && (
          <Link href="/my-stories">
            <a className="group inline-flex items-center gap-3 text-slate-800  py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
              <BookOpenIcon
                className={`w-8 h-7  group-hover:text-purple-500 ${
                  router.asPath === '/my-stories'
                    ? 'text-purple-500'
                    : 'text-slate-300'
                }`}
                viewBox="0 0 21 21"
              />
            </a>
          </Link>
        )}
        {user && (
          <Menu
            as="div"
            className="relative inline-flex lg:hidden items-center"
          >
            <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
              <Avatar
                width={40}
                height={40}
                className="inline-block w-10 h-10 rounded-full"
                placeholderName={user?.name}
                src={user?.profilePicture}
                alt={user?.username}
              />
            </Menu.Button>
            <HeaderDropdown
              user={user}
              logout={logout}
              className="fixed bottom-20 w-full"
            />
          </Menu>
        )}
        {selectedPublication && (
          <Menu
            as="div"
            className="relative inline-flex lg:hidden items-center"
          >
            <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
              <Avatar
                width={40}
                height={40}
                className="inline-block w-10 h-10 rounded-full"
                placeholderName={selectedPublication?.name}
                src={selectedPublication?.logo}
                alt={selectedPublication?.username}
              />
            </Menu.Button>

            <PublicationDropdown
              publication={selectedPublication}
              className="fixed bottom-20 w-full"
            />
          </Menu>
        )}
      </div>
    </div>
  );
}
