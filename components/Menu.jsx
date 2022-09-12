import React, { useState, useEffect } from 'react';
import { Menu, Popover } from '@headlessui/react';
import {
  HomeIcon,
  BookmarkIcon,
  BookOpenIcon,
  CogIcon,
  PencilIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { notificationsActions } from '@/redux/notifications/notificationsSlice';
import { useRouter } from 'next/router';
import { realtime } from '@/utils/altogic';
import Avatar from './profile/Avatar';
import Button from './basic/button';
import Notifications from './Notifications/Notifications';
import HeaderDropdown from './HeaderDropdown';
import { authActions } from '../redux/auth/authSlice';

export default function HeaderMenu() {
  const router = useRouter();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

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
  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-4 lg:px-8 lg:py-6">
        <div className="flex justify-between items-center lg:justify-start md:space-x-10">
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
          <Popover.Group as="nav" className="hidden lg:flex gap-1">
            <Link href="/">
              <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                <HomeIcon className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
                Home
              </a>
            </Link>

            <Link href={`/${user?.username}/lists`}>
              <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                <BookmarkIcon className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
                Lists
              </a>
            </Link>
            <Link href="/my-stories">
              <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                <BookOpenIcon className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
                Stories
              </a>
            </Link>
          </Popover.Group>
          <div className="flex items-center flex-row-reverse lg:flex-row justify-end lg:flex-1 lg:w-0 gap-4">
            <Button
              onClick={() => {
                router.push('/write-a-story');
              }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <PencilIcon className="w-5 h-5" />
            </Button>
            <Notifications
              mobileNotifications={mobileNotifications}
              setMobileNotifications={setMobileNotifications}
            />
            <Button
              type="button"
              className="inline-flex lg:hidden items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <SearchCircleIcon className="w-5 h-5" />
            </Button>
            <Link href="/settings">
              <a className="hidden lg:inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <CogIcon className="w-5 h-5" />
              </a>
            </Link>
            {/* Desktop Profile Button */}
            <Menu
              as="div"
              className="relative hidden lg:inline-flex items-center"
            >
              <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                <Avatar
                  className="inline-block w-10 h-10 rounded-full"
                  src={user?.profilePicture}
                  alt={user?.name}
                />
              </Menu.Button>

              <HeaderDropdown
                user={user}
                logout={logout}
                className="origin-top-right absolute top-10 w-56"
              />
            </Menu>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-between fixed bottom-0 left-0 w-full h-[72px] bg-white border-b border-gray-200 shadow p-4 z-10">
        <Link href="/">
          <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
            <HomeIcon
              className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
              viewBox="0 0 21 21"
            />
          </a>
        </Link>
        <Link href={`/${user?.username}/lists`}>
          <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
            <BookmarkIcon
              className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
              viewBox="0 0 21 21"
            />
          </a>
        </Link>
        <Link href="/my-stories">
          <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
            <BookOpenIcon
              className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
              viewBox="0 0 21 21"
            />
          </a>
        </Link>
        <Menu as="div" className="relative inline-flex lg:hidden items-center">
          <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
            <Avatar
              className="inline-block w-10 h-10 rounded-full"
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
      </div>
    </div>
  );
}
