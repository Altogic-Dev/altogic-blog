import React from 'react';
import Head from 'next/head';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Layout from '../layout/Layout';
import StatsCard from '../components/StatsCard';

const ReadingBarChart = dynamic(import('../components/ReadingBarChart'), {
  ssr: false,
});

const statCards = [
  {
    title: 'Total Blogs',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
  {
    title: 'Total Blogs',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 0,
  },
  {
    title: 'Total Blogs',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
  {
    title: 'Total Blogs',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 0,
  },
  {
    title: 'Total Blogs',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
];

const statistics = [
  {
    title:
      'Tincidunt rhoncus, sit dolor mollis feugiat. Nibh nulla tristique ante fermentum tellus aliqu...',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    views: '431',
    reads: '33',
    readRatio: '33',
    fans: '33',
    href: '#',
  },
  {
    title:
      'Amet, sapien enim morbi nibh. Sit morbi velit aliquam turpis viverra diam at. Tortor elit.',
    description:
      'Urna vestibulum in vel vitae dictum. Vel vivamus nunc malesuada egestas et egestas. Nam.',
    views: '431',
    reads: '33',
    readRatio: '33',
    fans: '33',
    href: '#',
  },
  {
    title:
      'Tincidunt rhoncus, sit dolor mollis feugiat. Nibh nulla tristique ante fermentum tellus aliqu...',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    views: '431',
    reads: '33',
    readRatio: '33',
    fans: '33',
    href: '#',
  },
  {
    title:
      'Amet, sapien enim morbi nibh. Sit morbi velit aliquam turpis viverra diam at. Tortor elit.',
    description:
      'Urna vestibulum in vel vitae dictum. Vel vivamus nunc malesuada egestas et egestas. Nam.',
    views: '431',
    reads: '33',
    readRatio: '33',
    fans: '33',
    href: '#',
  },
  {
    title:
      'Amet, sapien enim morbi nibh. Sit morbi velit aliquam turpis viverra diam at. Tortor elit.',
    description:
      'Urna vestibulum in vel vitae dictum. Vel vivamus nunc malesuada egestas et egestas. Nam.',
    views: '431',
    reads: '33',
    readRatio: '33',
    fans: '33',
    href: '#',
  },
];

export default function Stats() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Stats</title>
        <meta name="description" content="Altogic Medium Blog App Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="flex items-center justify-between py-6 mb-6 border-b border-gray-200">
            <h1 className="text-slate-800 text-3xl font-medium tracking-md">
              My Stats
            </h1>
            <form action="" className="hidden lg:block">
              <div className="relative max-w-xs w-full rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full pl-10 sm:text-sm text-gray-500 border-gray-300 rounded-md placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 xl:gap-6">
            {statCards.map((statCard) => (
              <StatsCard
                key={statCard.title}
                title={statCard.title}
                number={statCard.number}
                percentNumber={statCard.percentNumber}
                lastTime={statCard.lastTime}
                upDown={statCard.upDown}
              />
            ))}
          </div>
          <div className="mt-12 md:mt-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
              <h2 className="text-slate-700 text-2xl sm:text-3xl tracking-md">
                Total Blogs last <span className="font-medium">12 Months</span>
              </h2>
              <div className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium tracking-sm text-slate-500 hover:bg-gray-50 hover:text-slate-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  24 Hours
                </button>
                <button
                  type="button"
                  className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium tracking-sm text-slate-500 hover:bg-gray-50 hover:text-slate-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  7 Days
                </button>
                <button
                  type="button"
                  className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium tracking-sm text-slate-500 hover:bg-gray-50 hover:text-slate-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  30 Days
                </button>
                <button
                  type="button"
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium tracking-sm text-slate-500 hover:bg-gray-50 hover:text-slate-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  12 Months
                </button>
              </div>
            </div>
            <ReadingBarChart />
          </div>
          <div>
            {/* Desktop Statistics */}
            <div className="hidden lg:block mt-12 md:mt-20 border border-gray-200 rounded-lg overflow-hidden">
              <div className="py-5 px-6">
                <h3 className="text-slate-800 text-lg font-medium tracking-sm">
                  Your Blogs Statistics
                </h3>
              </div>
              <div>
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-center text-xs font-medium text-slate-600 sm:pl-6"
                            >
                              <span className="sr-only">Name</span>
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                            >
                              View
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                            >
                              Reads
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                            >
                              Read Ratio
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                            >
                              Fans
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center text-xs font-medium text-slate-600"
                            >
                              See Details
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {statistics.map((statistic) => (
                            <tr key={statistic.email}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                <p className="text-slate-800 text-base font-medium tracking-sm">
                                  {statistic.title}
                                </p>
                                <p className="text-slate-500 text-sm tracking-sm">
                                  {statistic.description}
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                {statistic.views}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                {statistic.reads}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                %{statistic.readRatio}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                {statistic.fans}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium tracking-sm sm:pr-6">
                                <a
                                  href={statistic.href}
                                  className="text-purple-600 hover:text-purple-900"
                                >
                                  Detail
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5 px-6 border-t border-gray-200">
                <nav className="px-4 flex items-center justify-between sm:px-0">
                  <div className="-mt-px w-0 flex-1 flex">
                    <a
                      href="#"
                      className="inline-flex items-center text-slate-700 px-3.5 py-2 text-sm font-medium border border-gray-300 rounded-[128px] hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <ArrowNarrowLeftIcon
                        className="mr-3 h-5 w-5 text-slate-700"
                        aria-hidden="true"
                      />
                      Previous
                    </a>
                  </div>
                  <div className="hidden md:-mt-px md:flex gap-2">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-800 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-500 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-500 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-500 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      ...
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-500 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-500 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 text-slate-500 p-3 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      10
                    </a>
                  </div>
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    <a
                      href="#"
                      className="inline-flex items-center text-slate-700 px-3.5 py-2 text-sm font-medium border border-gray-300 rounded-[128px] hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Next
                      <ArrowNarrowRightIcon
                        className="ml-3 h-5 w-5 text-slate-700"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            {/* Mobile Statistics */}
            <div className="lg:hidden">
              <ul className="divide-y divide-gray-200">
                {statistics.map((statistic) => (
                  <li key={statistic.title} className="py-4">
                    <div className="p-4">
                      <p className="text-slate-800 text-base font-medium tracking-sm">
                        {statistic.title}
                      </p>
                      <p className="text-slate-500 text-sm tracking-sm">
                        {statistic.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        View
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.views}
                        </span>
                      </span>
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        Reads
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.reads}
                        </span>
                      </span>
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        Read Ratio
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.readRatio}
                        </span>
                      </span>
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        Fans
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.fans}
                        </span>
                      </span>
                      <a
                        href={statistic.href}
                        className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg"
                      >
                        Detail
                        <svg
                          className="w-6 h-6 text-purple-700"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.89941 12H20.8994M20.8994 12L14.8994 6M20.8994 12L14.8994 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="py-5 px-3 border-t border-gray-200">
                <nav className="flex items-center justify-between">
                  <div className="-mt-px w-0 flex-1 flex">
                    <a
                      href="#"
                      className="inline-flex items-center text-slate-700 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <ArrowNarrowLeftIcon
                        className="h-5 w-5 text-slate-700"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-6 h-6 text-slate-800 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      ...
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      10
                    </a>
                  </div>
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    <a
                      href="#"
                      className="inline-flex items-center text-slate-700 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <ArrowNarrowRightIcon
                        className="h-5 w-5 text-slate-700"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
