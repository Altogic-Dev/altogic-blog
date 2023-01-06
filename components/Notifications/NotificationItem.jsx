import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Avatar from '../profile/Avatar';
import Button from '../basic/button';

export default function NotificationItem({ notification, fromPage }) {
  const router = useRouter();
  const route = () => {
    switch (notification.type) {
      case 'story_like':
        router.push(`/story/${notification.targetSlug}`);
        break;
      case 'reply_like':
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
      case 'reply':
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
          <Link href={`/${notification.sentUsername}?tab=about`}>
            <a className="flex-shrink-0">
              <Avatar
                placeholderName={notification?.sentUsername}
                src={notification?.sentUserProfilePicture}
                alt={notification?.sentUsername}
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </a>
          </Link>
          <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
            <Link href={`/${notification.sentUsername}?tab=about`}>
              <a className="font-semibold text-slate-900 hover:underline">
                <strong className="font-semibold">
                  {notification?.sentUsername}
                </strong>{' '}
              </a>
            </Link>
            {notification.intermediateText}
            <Button
              type="button"
              onClick={route}
              className="hover:underline text-left"
            >
              <strong className="font-semibold">
                {notification.targetTitle}{' '}
              </strong>
            </Button>
          </div>
        </div>
        {!fromPage && (
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
