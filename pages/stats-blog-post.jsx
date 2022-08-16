import React from 'react';
import Head from 'next/head';
import Layout from '../layouts/Layout';
import StatsCard from '../components/StatsCard';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
const ViewAreaChart = dynamic(import('../components/ViewAreaChart'), {
  ssr: false,
});

const MemberAreaChart = dynamic(import('../components/MemberAreaChart'), {
  ssr: false,
});

const statCards = [
  {
    title: 'Views',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
  {
    title: 'Average Reading Time',
    number: '123',
    percentNumber: '2',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
];

const viewStatsCards = [
  {
    title: 'Lifetime Views',
    number: '5',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
  {
    title: 'Internal Views',
    number: '5',
    percentNumber: '2',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
  {
    title: 'External Views',
    number: '123',
    percentNumber: '2',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
];

const memberStatsCards = [
  {
    title: 'Lifetime Member Reading Times',
    number: '23455',
    percentNumber: '60',
    lastTime: 'last 12 Months',
    upDown: 1,
  },
];

export default function StatsBlogPost() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Stats Blog Post</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Stats Blog Post"
        />
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
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-12">
            <div className="max-w-[800px]">
              <h2 className="text-slate-800 mb-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-md">
                Fermentum massa tincidunt placerat.
              </h2>
              <p className="text-slate-500 text-base sm:text-lg tracking-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                amet, eu augue integer dui sodales viverra. Sapien dignissim
                euismod. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. In amet, eu augue integer dui sodales viverra. Sapien
                dignissim euismod.
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Stats for all stories
            </button>
          </div>
          <hr className="my-12" />
          <div>
            <div className="mb-8">
              <h2 className="text-slate-800 mb-2 text-2xl font-bold tracking-md">
                Lifetime summary
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-base tracking-sm">
                  Published
                </span>
                <span
                  className="text-slate-500 text-xl tracking-sm"
                  aria-hidden="true"
                >
                  &middot;
                </span>
                <span className="text-slate-500 text-sm tracking-sm">
                  June 03 2022
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 lg:gap-4 xl:gap-6">
              {statCards.map((statCard, index) => (
                <StatsCard
                  key={index}
                  title={statCard.title}
                  number={statCard.number}
                  percentNumber={statCard.percentNumber}
                  lastTime={statCard.lastTime}
                  upDown={statCard.upDown}
                />
              ))}
            </div>
          </div>
          <hr className="my-12" />
          <div className="mt-12 md:mt-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <h2 className="text-slate-700 text-2xl sm:text-3xl tracking-md">
                Views
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
            <div className="grid lg:grid-cols-[220px,1fr] xl:grid-cols-[280px,1fr] gap-8">
              <div className="flex flex-col gap-7">
                {viewStatsCards.map((viewStatsCard, index) => (
                  <StatsCard
                    key={index}
                    title={viewStatsCard.title}
                    number={viewStatsCard.number}
                    percentNumber={viewStatsCard.percentNumber}
                    lastTime={viewStatsCard.lastTime}
                    upDown={viewStatsCard.upDown}
                  />
                ))}
              </div>
              <ViewAreaChart />
            </div>
          </div>
          <hr className="my-10" />
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <h2 className="text-slate-700 text-2xl sm:text-3xl tracking-md">
                Member Reading Time
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
            <div className="grid lg:grid-cols-[220px,1fr] xl:grid-cols-[280px,1fr] gap-8">
              <div className="flex flex-col gap-7">
                {memberStatsCards.map((memberStatsCard, index) => (
                  <StatsCard
                    key={index}
                    title={memberStatsCard.title}
                    number={memberStatsCard.number}
                    percentNumber={memberStatsCard.percentNumber}
                    lastTime={memberStatsCard.lastTime}
                    upDown={memberStatsCard.upDown}
                  />
                ))}
              </div>
              <MemberAreaChart />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
