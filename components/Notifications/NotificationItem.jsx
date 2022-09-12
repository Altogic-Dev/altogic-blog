import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import Avatar from '../profile/Avatar';

export default function NotificationItem({ notification }) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-start w-full">
        <div className="flex items-center flex-1">
          <div className="flex-shrink-0">
            <Avatar
              src={notification?.sentUserProfilePicture}
              alt={notification?.sentUsername}
              className="w-6 h-6"
            />
          </div>
          <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
            <strong className="font-semibold">
              {notification?.sentUsername}
            </strong>{' '}
            {notification.intermediateText}
            <strong className="font-semibold">
              {notification.targetTitle}
            </strong>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
