import React from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { ClipLoader } from 'react-spinners';
import Button from '@/components/basic/button';

export default function Layout({ children, loading, logo }) {
  return (
    <div>
      <Header logo={logo} />
      <main className=' overflow-scroll'>
        {loading ? (
          <div style={{height: "90vh"}} className="flex justify-center items-center">
            <ClipLoader color="#9333ea" loading={loading} size={80} />
          </div>
        ) : (
          children
        )}
      </main>

      <Link href="https://www.altogic.com/" target="_blank">
        <Button className="hidden lg:inline-flex bottom-0 sm:bottom-24 altogic-logo whitespace-nowrap mr-5 mb-4 fixed z-50 right-0 text-xs items-center justify-center px-2 py-2 border border-transparent rounded-md  bg-[#3b81f6] cursor-pointer text-white">
          <Image width={150} height={40} src="/powered-by-altogic.svg" alt="" />
        </Button>
      </Link>
      <ScrollToTop />
    </div>
  );
}
