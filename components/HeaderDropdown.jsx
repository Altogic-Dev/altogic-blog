import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Disclosure } from '@headlessui/react';
import { UserMinus } from 'react-feather';
import {
  CogIcon,
  UserIcon,
  ChartBarIcon,
  ClipboardListIcon,
  LogoutIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import { useRouter } from 'next/router';
import Avatar from './profile/Avatar';

export default function HeaderDropdown({
  user,
  logout,
  className,
  isOpen,
  setIsOpen,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const publications = useSelector((state) => state.publication.publications);
  const selectPublication = (publication) => {
    dispatch(publicationActions.selectPublicationRequest(publication));
  };

  const [publiationsState, setPublicationState] = useState([]);

  useEffect(() => {
    setPublicationState(publications);
  }, [publications]);

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      console.log(e.target)
      console.log(e.target.id)
      if (!e.target.id.includes('dropdown-menu') && isOpen) {
        setIsOpen(false);
      }
    });
    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  if(isOpen)
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
      <Disclosure.Panel
        className={`${className} right-0 mt-2 rounded-md shadow-lg bg-white overflow-hidden ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50 `}
      >
        <div className="py-3 px-4 flex items-center gap-3 border-b border-gray-200">
          <Avatar
            className="h-10 w-10 rounded-full"
            placeholderName={user?.name}
            src={user?.profilePicture}
            alt={user?.username}
          />
          <div>
            <p className="text-slate-700 text-sm font-medium tracking-sm">
              {user?.name}
            </p>
            <p className="text-slate-500 text-sm tracking-sm text-ellipsis w-36 overflow-hidden">
              @{user?.username}
            </p>
          </div>
        </div>
        <div className="divide-y divide-gray-200 w-full">
          <div>
            <Disclosure.Button
              onClick={() => router.push(`/${user?.username}?tab=about`)}
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
            >
              <UserIcon className="w-4 h-4 group-hover:text-purple-700" />
              View Profile
            </Disclosure.Button>

            <Disclosure.Button
              className='w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "'
              onClick={() => router.push(`/settings`)}
            >
              <CogIcon className="w-4 h-4 group-hover:text-purple-700" />
              Settings
            </Disclosure.Button>

            <Disclosure.Button
              onClick={() => router.push(`/muted-users`)}
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
            >
              <UserMinus className="w-4 h-4 group-hover:text-purple-700" />
              Muted Users
            </Disclosure.Button>

            <Disclosure.Button
              onClick={() => router.push(`/stats`)}
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50"
            >
              <ChartBarIcon className="w-4 h-4 group-hover:text-purple-700" />
              Stats
            </Disclosure.Button>
            <Disclosure.Button
              onClick={() => router.push(`/subscriptions`)}
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50"
            >
              <UsersIcon className="w-4 h-4 group-hover:text-purple-700" />
              Subscribtions
            </Disclosure.Button>
          </div>
          <div>
            <span className="flex flex-col px-6 pt-2.5 text-slate-400 text-xs tracking-sm">
              Publications
            </span>
            {publiationsState?.slice(0, 3).map((publication) => (
              <Disclosure.Button
                key={publication._id}
                onClick={() => selectPublication(publication)}
                className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50"
              >
                <img
                  src={publication?.logo}
                  alt={publication?.name}
                  className="w-5 h-5 rounded-full"
                />
                {publication?.name}
              </Disclosure.Button>
            ))}

            <Disclosure.Button
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50"
              onClick={() => router.push(`/publications`)}
            >
              <ClipboardListIcon className="w-4 h-4 group-hover:text-purple-700" />
              Manage Publications
            </Disclosure.Button>
          </div>
          <div>
            {/* <Link href="/help">
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50">
                <QuestionMarkCircleIcon className="w-4 h-4 hover:text-purple-700" />
                Help
              </a>
            </Link> */}
            <Disclosure.Button
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50"
              onClick={logout}
            >
              <LogoutIcon className="w-4 h-4 group-over:text-purple-700" />
              Logout
            </Disclosure.Button>
          </div>
        </div>
      </Disclosure.Panel>
    </Transition>
  );
}
