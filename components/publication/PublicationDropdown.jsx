import React, { Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import _ from 'lodash';
import {
  CogIcon,
  ChartBarIcon,
  PencilAltIcon,
  UserAddIcon,
  DocumentDuplicateIcon,
  HomeIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import Image from 'next/image';

export default function PublicationDropdown({ publication, className }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const pubUser = _.find(
    publication.users,
    (person) => person.user === user?._id
  );

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
      <Popover.Panel
        className={`${className} right-0 mt-2 rounded-md shadow-lg bg-white overflow-hidden ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50`}
      >
        <div className="py-3 px-4 flex items-center gap-3 border-b border-gray-200 w-full h-full ">
          <Image
            width={40}
            height={40}
            src={publication?.logo}
            alt={publication?.name}
          />
          <span className="overflow-hidden text-ellipsis">
            {publication?.name}
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          <div>
            <Popover.Button
              className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer "
              onClick={() => {
                dispatch(storyActions.clearStory());
                router.push('/write-a-story');
              }}
            >
              <PencilAltIcon className="w-4 h-4 text-slate-500" />
              Write a Story
            </Popover.Button>

            <Popover.Button
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
              onClick={() => router.push(`/publication/${publication.name}`)}
            >
              <HomeIcon className="w-4 h-4 text-slate-500" />
              Home
            </Popover.Button>

            <Popover.Button
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
              onClick={() =>
                router.push(
                  `/publication/${publication.name}/publications-stats`
                )
              }
            >
              <ChartBarIcon className="w-4 h-4 text-slate-500" />
              Stats
            </Popover.Button>

            <Popover.Button
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
              onClick={() =>
                router.push(
                  `/publication/${publication.name}/publications-followers`
                )
              }
            >
              <UserAddIcon className="w-4 h-4 text-slate-500" />
              Followers
            </Popover.Button>
          </div>
          <div>
            {/* <Popover.Button
              className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
              onClick={() =>
                router.push(
                  `/publication/${publication.name}/publications-newsletter-detail`
                )
              }
            >
              <LocationMarkerIcon className="w-4 h-4 text-slate-500" />
              Newsletter
            </Popover.Button> */}
            {['admin', 'editor'].includes(pubUser?.role) && (
              <Popover.Button
                className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
                onClick={() =>
                  router.push(`/publication/${publication.name}/navigation`)
                }
              >
                <svg
                  className="w-4 h-4 text-slate-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                Navigation
              </Popover.Button>
            )}
            {['admin', 'editor'].includes(pubUser?.role) && (
              <Popover.Button
                className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
                onClick={() =>
                  router.push(`/publication/${publication.name}/feature`)
                }
              >
                <DocumentDuplicateIcon className="w-4 h-4 text-slate-500" />
                Features Pages
              </Popover.Button>
            )}
            {['admin'].includes(pubUser?.role) && (
              <Popover.Button
                className="w-full flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer hover:text-purple-700 hover:bg-purple-50 "
                onClick={() =>
                  router.push(
                    `/publication/${publication.name}/publications-settings`
                  )
                }
              >
                <CogIcon className="w-4 h-4 text-slate-500" />
                Home and Settings
              </Popover.Button>
            )}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
}
