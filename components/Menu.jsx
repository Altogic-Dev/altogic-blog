import React, { useState, useEffect } from 'react';
import { Disclosure, Popover } from '@headlessui/react';
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
  const searchResults = useSelector((state) => state.general.searchPreview);
  const selectedPublicationState = useSelector(
    (state) => state.publication.selectedPublication
  );
  const [user, setUser] = useState();
  const [selectedPublication, setSelectedPublication] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
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
    if (user) {
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
            } flex items-center flex-row-reverse lg:flex-row justify-end lg:flex-1 gap-4`}
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
            {user ? (
              <>
                <Button
                  onClick={() => {
                    dispatch(storyActions.clearStory());
                    router.push('/write-a-story');
                  }}
                  className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <PencilIcon className="w-5 h-5" />
                </Button>
                <Notifications
                  mobileNotifications={mobileNotifications}
                  setMobileNotifications={setMobileNotifications}
                />
                <Disclosure
                  as="div"
                  className="relative hidden lg:inline-flex items-center"
                >
                  <Disclosure.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                    <Avatar
                      className="inline-block w-10 h-10 rounded-full"
                      placeholderName={user?.name}
                      src={user?.profilePicture}
                      alt={user?.username}
                    />
                  </Disclosure.Button>

                  <HeaderDropdown
                    user={user}
                    logout={logout}
                    className="origin-top-right absolute top-10 w-56"
                  />
                </Disclosure>
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
              <Disclosure
                as="div"
                className="relative hidden lg:inline-flex items-center"
              >
                <Disclosure.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                  <Avatar
                    className="inline-block w-10 h-10 rounded-full"
                    placeholderName={selectedPublication?.name}
                    src={selectedPublication?.logo}
                    alt={selectedPublication?.name}
                  />
                </Disclosure.Button>

                <PublicationDropdown
                  publication={selectedPublication}
                  className="origin-top-right absolute top-10 w-56"
                />
              </Disclosure>
            )}
          </div>
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-around gap-14 fixed bottom-0 left-0 w-full h-[72px] bg-white border-b border-gray-200 shadow p-4 z-10">
        <Link href="/">
          <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
            <HomeIcon
              className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
              viewBox="0 0 21 21"
            />
          </a>
        </Link>
        {user && (
          <Link href={`/${user?.username}/lists`}>
            <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
              <BookmarkIcon
                className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
                viewBox="0 0 21 21"
              />
            </a>
          </Link>
        )}
        {user && (
          <Link href="/my-stories">
            <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
              <BookOpenIcon
                className="w-8 h-7 text-slate-300 group-hover:text-purple-500"
                viewBox="0 0 21 21"
              />
            </a>
          </Link>
        )}
        {user && (
          <Disclosure
            as="div"
            className="relative inline-flex lg:hidden items-center"
          >
            <Disclosure.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
              <Avatar
                className="inline-block w-10 h-10 rounded-full"
                placeholderName={user?.name}
                src={user?.profilePicture}
                alt={user?.username}
              />
            </Disclosure.Button>

            <HeaderDropdown
              user={user}
              logout={logout}
              className="fixed bottom-20 w-full"
            />
          </Disclosure>
        )}
        {selectedPublication && (
          <Disclosure
            as="div"
            className="relative inline-flex lg:hidden items-center"
          >
            <Disclosure.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
              <Avatar
                className="inline-block w-10 h-10 rounded-full"
                placeholderName={selectedPublication?.name}
                src={selectedPublication?.logo}
                alt={selectedPublication?.username}
              />
            </Disclosure.Button>

            <PublicationDropdown
              publication={selectedPublication}
              className="origin-top-right absolute top-10 w-56"
            />
          </Disclosure>
        )}
      </div>
    </div>
  );
}
