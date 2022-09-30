import Link from 'next/link';
import React from 'react';

export default function PublicationCard({ publication }) {
  return (
    <li className="flex items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-3">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={publication.profilePicture}
          alt={publication.name}
        />
        <div className="text-slate-700 font-medium tracking-sm">
          {publication.name}
        </div>
      </div>
      <Link href={publication.href}>
        <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Follow
        </a>
      </Link>
    </li>
  );
}
