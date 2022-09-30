import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
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
import Button from './basic/button';

export default function HeaderDropdown({ user, logout, className }) {
  const router = useRouter();
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
            alt={user?.name}
          />
          <div>
            <p className="text-slate-700 text-sm font-medium tracking-sm">
              {user?.name}
            </p>
            <p className="text-slate-500 text-sm tracking-sm">{user?.email}</p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div>
            <Menu.Item onClick={() => router.push(`/${user?.username}/about`)}>
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                <UserIcon className="w-4 h-4 text-slate-500" />
                View profile
              </a>
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/settings')}>
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                <CogIcon className="w-4 h-4 text-slate-500" />
                Settings
              </a>
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/stats')}>
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <ChartBarIcon className="w-4 h-4 text-slate-500" />
                Stats
              </a>
            </Menu.Item>
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
                <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                  <img
                    src={publication?.profilePicture}
                    alt={publication?.name}
                    className="w-5 h-5 rounded-full"
                  />
                  {publication?.name}
                </a>
              </Menu.Item>
            ))}
            <Menu.Item>
              <Link href="/publications">
                <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                  <ClipboardListIcon className="w-4 h-4 text-slate-500" />
                  Manage Publications
                </a>
              </Link>
            </Menu.Item>
          </div>
          <div>
            <Menu.Item>
              <a
                href="#"
                className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
              >
                <QuestionMarkCircleIcon className="w-4 h-4 text-slate-500" />
                Help
              </a>
            </Menu.Item>
            <Menu.Item>
              <Button
                className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
                onClick={logout}
              >
                <LogoutIcon className="w-4 h-4 text-slate-500" />
                Logout
              </Button>
            </Menu.Item>
          </div>
        </div>
      </Menu.Items>
    </Transition>
  );
}
