import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/solid';

export default function SeeAllNotification() {
  return (
    <div className="px-4 py-2 bg-white rounded-lg text-center">
      <Link href="/notifications">
        <a className="inline-flex items-center gap-2 text-sm tracking-sm text-purple-700">
          See all notifications
          <ChevronRightIcon className="w-5 h-5 text-purple-700" />
        </a>
      </Link>
    </div>
  );
}
