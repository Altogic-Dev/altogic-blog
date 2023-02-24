import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Avatar from '../profile/Avatar';
import Button from '../basic/button';

export default function NotificationItem({ notification }) {
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
                {notification.targetTitle}
              </strong>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
