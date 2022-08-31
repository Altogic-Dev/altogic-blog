import React from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Link href="https://www.altogic.com/" target="_blank">
        <button
          type="button"
          className="whitespace-nowrap mr-5 mb-5 fixed z-50 bottom-0 right-0 text-xs inline-flex items-center justify-center px-2 py-2 border border-transparent rounded-md  bg-[#3b81f6] cursor-pointer text-white"
        >
          <Image width={150} height={40} src="/powered-by-altogic.svg" alt="" />
        </button>
      </Link>
      <ScrollToTop />
    </div>
  );
}
