import React from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import Layout from '@/layout/Layout';
import dynamic from 'next/dynamic';
const ReadingBarChart = dynamic(import('../components/ReadingBarChart'), {
  ssr: false,
});

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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

export default function PublicationsStats() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Story Page Published</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Story Page Published"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <h1 className="text-slate-700 my-8 md:my-[60px] text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
            HiThemes stats
          </h1>
          <Tab.Group>
            <Tab.List className="flex items-center gap-4 md:gap-10 h-11 border-b border-gray-300 mb-6">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                    selected
                      ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                      : 'text-slate-500'
                  )
                }
              >
                Stats
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                    selected
                      ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                      : 'text-slate-500'
                  )
                }
              >
                Stories
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex flex-col xl:flex-row xl:items-center gap-[72px] mt-12 md:mt-20">
                  <div className="max-w-[344px] w-full space-y-2">
                    <p className="text-3xl font-semibold tracking-md">3,453</p>
                    <h2 className="text-slate-700 text-xl tracking-md">
                      Minutes read{' '}
                      <span className="font-semibold">12 Months</span>
                    </h2>
                    <span className="text-slate-700 text-sm tracking-sm">
                      The total amount of time spent reading your publication.
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="mb-7 text-right">
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
                </div>
                <hr className="my-10" />
                <div className="flex flex-col xl:flex-row xl:items-center gap-[72px] mt-12 md:mt-20">
                  <div className="max-w-[344px] w-full space-y-2">
                    <p className="text-3xl font-semibold tracking-md">45,452</p>
                    <h2 className="text-slate-700 text-xl tracking-md">
                      View <span className="font-semibold">12 Months</span>
                    </h2>
                    <span className="text-slate-700 text-sm tracking-sm">
                      The total number of views your publication has received on
                      all posts and pages.
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="mb-7 text-right">
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
                </div>
                <hr className="my-10" />
                <div className="flex flex-col xl:flex-row xl:items-center gap-[72px] mt-12 md:mt-20">
                  <div className="max-w-[344px] w-full space-y-2">
                    <p className="text-3xl font-semibold tracking-md">
                      123,452
                    </p>
                    <h2 className="text-slate-700 text-xl tracking-md">
                      Visitors <span className="font-semibold">12 Months</span>
                    </h2>
                    <span className="text-slate-700 text-sm tracking-sm">
                      The average number of unique daily visitors who have
                      visited your publication. Each visitor is counted once per
                      day, even if they view multiple pages or the same page
                      multiple times.
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="mb-7 text-right">
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
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {/* Desktop Statistics */}
                <div className="hidden lg:block mt-12 mb-14 border border-gray-200 rounded-lg overflow-hidden">
                  <div>
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-slate-500 sm:pl-6 uppercase"
                                >
                                  June 2022
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
                </div>
                {/* Mobile Statistics */}
                <div className="lg:hidden">
                  <span className="inline-block text-slate-700 mb-4 text-lg font-medium tracking-sm uppercase">
                    June 2022
                  </span>
                  <ul className="divide-y divide-gray-200">
                    {statistics.map((statistic, index) => (
                      <li key={index} className="py-4">
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
                </div>
                <hr className="my-10" />
                {/* Desktop Statistics */}
                <div className="hidden lg:block mt-12 mb-14 border border-gray-200 rounded-lg overflow-hidden">
                  <div>
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-slate-500 sm:pl-6 uppercase"
                                >
                                  June 2022
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
                </div>
                {/* Mobile Statistics */}
                <div className="lg:hidden">
                  <span className="inline-block text-slate-700 mb-4 text-lg font-medium tracking-sm uppercase">
                    June 2022
                  </span>
                  <ul className="divide-y divide-gray-200">
                    {statistics.map((statistic, index) => (
                      <li key={index} className="py-4">
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
                </div>
                <hr className="my-10" />
                {/* Desktop Statistics */}
                <div className="hidden lg:block mt-12 mb-14 border border-gray-200 rounded-lg overflow-hidden">
                  <div>
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-slate-500 sm:pl-6 uppercase"
                                >
                                  June 2022
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
                </div>
                {/* Mobile Statistics */}
                <div className="lg:hidden">
                  <span className="inline-block text-slate-700 mb-4 text-lg font-medium tracking-sm uppercase">
                    June 2022
                  </span>
                  <ul className="divide-y divide-gray-200">
                    {statistics.map((statistic, index) => (
                      <li key={index} className="py-4">
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
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Layout>
    </div>
  );
}
