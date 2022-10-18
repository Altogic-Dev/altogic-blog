import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import {
  CogIcon,
  UserIcon,
  ChartBarIcon,
  ClipboardListIcon,
  LogoutIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import Avatar from './profile/Avatar';

export default function HeaderDropdown({ user, logout, className }) {
  const dispatch = useDispatch();
  const publications = useSelector((state) => state.publication.publications);
  const selectPublication = (publication) => {
    dispatch(publicationActions.selectPublicationRequest(publication));
  };
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={`${className} right-0 mt-2 rounded-md shadow-lg bg-white overflow-hidden ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50 `}
      >
        <div className="py-3 px-4 flex items-center gap-3 border-b border-gray-200">
          <Avatar
            className="h-10 w-10 rounded-full"
            src={user?.profilePicture}
            alt={user?.username}
          />
          <div>
            <p className="text-slate-700 text-sm font-medium tracking-sm">
              {user?.name}
            </p>
            <p className="text-slate-500 text-sm tracking-sm text-ellipsis w-36 overflow-hidden">@{user?.username}</p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div>
            <Link href={`/${user?.username}/about`}>
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                <UserIcon className="w-4 h-4 text-slate-500" />
                View Profile
              </a>
            </Link>

            <Link href="/settings">
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                <CogIcon className="w-4 h-4 text-slate-500" />
                Settings
              </a>
            </Link>

            <Link href="/stats">
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <ChartBarIcon className="w-4 h-4 text-slate-500" />
                Stats
              </a>
            </Link>
          </div>
          <div>
            <span className="inline-flex px-6 pt-2.5 text-slate-400 text-xs tracking-sm">
              Publications
            </span>
            {publications?.slice(0, 3).map((publication) => (
              <Menu.Item
                key={publication._id}
                onClick={() => selectPublication(publication)}
              >
                <span className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                  <img
                    src={publication?.logo}
                    alt={publication?.name}
                    className="w-5 h-5 rounded-full"
                  />
                  {publication?.name}
                </span>
              </Menu.Item>
            ))}

            <Link href="/publications">
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <ClipboardListIcon className="w-4 h-4 text-slate-500" />
                Manage Publications
              </a>
            </Link>
          </div>
          <div>
            <Link href="/help">
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <QuestionMarkCircleIcon className="w-4 h-4 text-slate-500" />
                Help
              </a>
            </Link>
            <Menu.Item onClick={logout}>
              <span className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <LogoutIcon className="w-4 h-4 text-slate-500" />
                Logout
              </span>
            </Menu.Item>
          </div>
        </div>
      </Menu.Items>
    </Transition>
  );
}
