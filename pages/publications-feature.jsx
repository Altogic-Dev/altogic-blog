import React from 'react';
import Head from 'next/head';
import Layout from '../layouts/Layout';

export default function PublicationsFeature() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Feature</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Feature"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="h-screen max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="flex flex-col gap-4 mt-8 mb-[80px] md:mt-[60px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-[60px]">
              <h1 className="text-slate-700 mb-8 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes feature pages
              </h1>
              <button
                type="button"
                className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                New feature page
              </button>
            </div>
            <h2 className="text-slate-500 tracking-sm">
              Use feature pages to build custom landing pages for your
              publication. These pages can contain a custom header and featured
              and tagged story sections. After you create a feature page you can
              also link to it from your{' '}
              <a href="#" className="text-purple-700">
                navigation.
              </a>
            </h2>
          </div>
          <div>
            <ul>
              <li className="py-4 border-b border-gray-200 mb-8">
                <h2 className="text-slate-700 mb-2 text-2xl font-bold tracking-md">
                  Featured Page One
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex text-slate-500 text-sm font-medium tracking-sm hover:text-purple-500"
                  >
                    Edit page
                  </button>
                  <svg
                    className="h-1 w-1 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <button
                    type="button"
                    className="inline-flex text-slate-500 text-sm font-medium tracking-sm hover:text-purple-500"
                  >
                    Go to page
                  </button>
                  <svg
                    className="h-1 w-1 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <button
                    type="button"
                    className="inline-flex text-slate-500 text-sm font-medium tracking-sm hover:text-purple-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
              <li className="py-4 border-b border-gray-200 mb-8">
                <h2 className="text-slate-700 mb-2 text-2xl font-bold tracking-md">
                  Featured Page Two
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex text-slate-500 text-sm font-medium tracking-sm hover:text-purple-500"
                  >
                    Edit page
                  </button>
                  <svg
                    className="h-1 w-1 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <button
                    type="button"
                    className="inline-flex text-slate-500 text-sm font-medium tracking-sm hover:text-purple-500"
                  >
                    Go to page
                  </button>
                  <svg
                    className="h-1 w-1 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <button
                    type="button"
                    className="inline-flex text-slate-500 text-sm font-medium tracking-sm hover:text-purple-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
