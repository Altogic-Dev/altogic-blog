import React, { useState } from 'react';
import Link from 'next/link';
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';

const lipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus risus at bibendum eleifend. Nam sit amet dignissim ex. Donec in diam at est porta imperdiet in sed metus.';

function HoverDetails(props) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className="absolute left-0 shadow bg-white w-70 border border-gray-200 z-10 rounded-lg">
      <div className="w-full flex flex-col justify-between p-6">
        <div className="relative rounded-lg flex items-center gap-6 mb-6">
          <div className="flex-shrink-0">
            <img
              className="h-14 w-14 rounded-full object-cover"
              src={
                props?.profilePicture ||
                'https://www.disscusy.com/default-avatar.jpeg'
              }
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={props?.profileHref || '#'}>
              <a className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true"></span>
                <p className="text-sm font-medium text-slate-800">
                  {props?.name || 'Name Surname'}
                </p>
                <p className="text-sm text-slate-400 truncate">
                  @{props?.username || 'username'}
                </p>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <h6 className="text-slate-800 mb-2 text-sm font-semibold leading-5 tracking-[-0.4px]">
            About
          </h6>
          <p className="text-slate-600 text-sm leading-5 tracking-[-0.4px]">
            {props?.about || lipsum}
          </p>
        </div>
      </div>
      <div>
        <div className="-mt-px flex border-t border-gray-200 divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <Link href={props?.profileHref || '#'}>
              <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm tracking-[-0.4px] text-slate-500 font-medium border border-transparent rounded-bl-lg hover:bg-gray-50">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-3">View Profile</span>
              </a>
            </Link>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              type="button"
              className="flex-1 flex items-center justify-center w-full px-[45px] py-4 border border-transparent shadow-sm text-base font-medium text-slate-50 bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setIsFollowed(!isFollowed);
              }}
            >
              <div>
                {isFollowed ? (
                  <UserRemoveIcon className="mr-3 h-6 w-6" aria-hidden="true" />
                ) : (
                  <UserAddIcon className="mr-3 h-6 w-6" aria-hidden="true" />
                )}
              </div>
              {isFollowed ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverDetails;
