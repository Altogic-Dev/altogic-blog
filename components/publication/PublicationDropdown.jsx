import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import {
  CogIcon,
  ChartBarIcon,
  PencilAltIcon,
  BookOpenIcon,
  UserAddIcon,
  LocationMarkerIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function PublicationDropdown({ publication, className }) {
  const router = useRouter();
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
        <div className="py-3 px-4 flex items-center gap-3 border-b border-gray-200 w-full h-full">
          <img src={publication?.profilePicture} alt={publication?.name} />
        </div>
        <div className="divide-y divide-gray-200">
          <div>
            <Menu.Item onClick={() => router.push('/write-a-story')}>
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                <PencilAltIcon className="w-4 h-4 text-slate-500" />
                Write A Story
              </a>
            </Menu.Item>
            <Menu.Item
              onClick={() => router.push(`/publication/${publication.name}`)}
            >
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                <BookOpenIcon className="w-4 h-4 text-slate-500" />
                Stories
              </a>
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                router.push(
                  `/publication/${publication.name}/publications-stats`
                )
              }
            >
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <ChartBarIcon className="w-4 h-4 text-slate-500" />
                Stats
              </a>
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                router.push(
                  `publication/${publication.name}/publications-followers`
                )
              }
            >
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <UserAddIcon className="w-4 h-4 text-slate-500" />
                Followers
              </a>
            </Menu.Item>
          </div>
          <div>
            <Menu.Item
              onClick={() =>
                router.push(
                  `/publication/${publication.name}/publications-newsletter-detail`
                )
              }
            >
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <LocationMarkerIcon className="w-4 h-4 text-slate-500" />
                Newsletter
              </a>
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                router.push(`/publication/${publication.name}/navigation`)
              }
            >
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
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
              </a>
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                router.push(`/publication/${publication.name}/feature`)
              }
            >
              <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                <DocumentDuplicateIcon className="w-4 h-4 text-slate-500" />
                Features Pages
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                nClick={() =>
                  router.push(
                    `/publication/${publication.name}/publications-settings`
                  )
                }
                className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
              >
                <CogIcon className="w-4 h-4 text-slate-500" />
                Home and Settings
              </a>
            </Menu.Item>
          </div>
        </div>
      </Menu.Items>
    </Transition>
  );
}
