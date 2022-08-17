import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from '@/components/ScrollToTop';

export default function Layout({ children }) {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
      <a href="https://www.altogic.com/" target="_blank">
        <img
          className="fixed bottom-8 right-8"
          src="./powered-by-altogic.svg"
          alt=""
        />
      </a>
    </div>
  );
}
