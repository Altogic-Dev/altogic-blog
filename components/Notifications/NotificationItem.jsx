import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Avatar from '../profile/Avatar';

export default function NotificationItem({ notification }) {
  const router = useRouter();
  const route = () => {
    switch (notification.type) {
      case 'story_like':
        router.push(`/story/${notification.targetSlug}`);
        break;
      case 'comment':
        router.push(`/story/${notification.targetSlug}`);
        break;
      case 'follow':
        router.push(`/${notification.username}`);
        break;
      case 'bookmark':
        router.push(`/story/${notification.targetSlug}`);
        break;
      default:
        router.push('/');
        break;
    }
  };
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-start w-full">
        <div className="flex items-center flex-1">
          <Link href={`/${notification.sentUsername}/about`}>
            <a className="flex-shrink-0">
              <Avatar
                src={notification?.sentUserProfilePicture}
                alt={notification?.sentUsername}
                className="w-6 h-6"
              />
            </a>
          </Link>
          <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
            <Link href={`/${notification.sentUsername}/about`}>
              <a className="font-semibold text-slate-900 hover:underline">
                <strong className="font-semibold">
                  {notification?.sentUsername}
                </strong>{' '}
              </a>
            </Link>
            {notification.intermediateText}
            <button
              type="button"
              onClick={() => route(notification.type)}
              className="hover:underline"
            >
              <strong className="font-semibold">
                {notification.targetTitle}{' '}
              </strong>
            </button>
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
