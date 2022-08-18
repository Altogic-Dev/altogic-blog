import React from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
      <Link href="https://www.altogic.com/" target="_blank">
        <img
          className="fixed bottom-8 right-8"
          src="./powered-by-altogic.svg"
          alt=""
        />
      </Link>
    </div>
  );
}
