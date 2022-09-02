import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function BackToLogin() {
  return (
    <div className="text-center mt-8">
      <Link href="login">
        <a className="inline-flex items-center gap-2 text-sm font-medium tracking-sm text-slate-500">
          <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
          Back to login
        </a>
      </Link>
    </div>
  );
}
