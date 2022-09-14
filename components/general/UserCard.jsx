import React from 'react';
import { parseHtml } from '@/utils/utils';
import Link from 'next/link';
import Avatar from '../profile/Avatar';

export default function UserCard({ user }) {
  return (
    <li key={user._id} className="flex items-start justify-between gap-3 py-4">
      <Link href={`/${user.username}`}>
        <a className="flex items-center gap-3">
          <div className="flex gap-3">
            <Avatar
              className="w-10 h-10 rounded-full"
              src={user.profilePicture}
              alt={user.name}
            />
            <div className="flex flex-col">
              <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                {user.name}
              </span>
              {user?.about && (
                <span className="text-slate-500 text-xs tracking-sm">
                  {parseHtml(user.about)}
                </span>
              )}
            </div>
          </div>
        </a>
      </Link>
      <a
        href={user.href}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        Follow
      </a>
    </li>
  );
}
