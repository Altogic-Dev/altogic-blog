import Layout from '@/layouts/Layout';
import HeadContent from '@/components/general/HeadContent';
import StatsCard from '@/components/StatsCard';
import { useDispatch, useSelector } from 'react-redux';
import { statsActions } from '@/redux/stats/statsSlice';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Chart from '@/components/stats/chart';
import { convertTime, parseHtml } from '@/utils/utils';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

const statCards = [
  {
    title: 'Total Blogs',
  },
  {
    title: 'Total Views Received',
  },
  {
    title: 'Average Reading Time',
  },
  {
    title: 'Total Likes Received',
  },
  {
    title: 'Total Replies Received',
  },
];

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [percentages, setPercentages] = useState();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const statisticsData = useSelector((state) => state.stats.statistics);
  const storiesStatistics = useSelector(
    (state) => state.stats.storiesStatistics
  );
  const isLoading = useSelector((state) => state.stats.cardsLoading);
  const getStatistics = () => {
    dispatch(statsActions.getStatisticsRequest({ userId: user._id }));
  };
  const getAllStoriesStatistics = () => {
    dispatch(statsActions.getAllStoriesStatisticsRequest(user._id));
  };

  useEffect(() => {
    getStatistics();
    getAllStoriesStatistics();
  }, []);

 
  useEffect(() => {
    if (statisticsData) {
      setStats(() => {
        const temp = [];

        temp['Total Blogs'] = _.first(statisticsData.totalBlogs)?.count ?? 0;
        temp['Total Reading Time'] =
          _.first(statisticsData.totalReading)?.sum ?? 0;
        temp['Average Reading Time'] = convertTime(
          _.first(statisticsData.totalReading)?.count
            ? _.first(statisticsData.totalReading).sum /
                _.first(statisticsData.totalReading).count
            : 0,
          true
        );
        temp['Total Likes Received'] =
          _.first(statisticsData.totalLikes)?.count ?? 0;
        temp['Total Views Received'] =
          _.first(statisticsData.totalViews)?.count ?? 0;

        temp['Total Replies Received'] =
          _.first(statisticsData.totalReplies)?.count ?? 0;

        return temp;
      });
      setPercentages(() => {
        const temp = [];
        try {
          temp['Total Blogs'] =
            (100 *
              (_.first(statisticsData.totalBlogsThisYear).count -
                _.first(statisticsData.totalBlogsLastYear).count)) /
            _.first(statisticsData.totalBlogsLastYear).count;
        } catch (error) {
          temp['Total Blogs'] = 100;
        }

        try {
          temp['Total Replies Received'] =
            (100 *
              (_.first(statisticsData.totalRepliesThisYear).count -
                _.first(statisticsData.totalRepliesLastYear).count)) /
            _.first(statisticsData.totalRepliesLastYear).count;
        } catch (error) {
          temp['Total Replies Received'] = 100;
        }
        try {
          temp['Total Likes Received'] =
            (100 *
              (_.first(statisticsData.totalLikesThisYear).count -
                _.first(statisticsData.totalLikesLastYear).count)) /
            _.first(statisticsData.totalLikesLastYear).count;
        } catch (error) {
          temp['Total Likes Received'] = 100;
        }
        try {
          temp['Total Likes Received'] =
            (100 *
              (_.first(statisticsData.totalViewsThisYear).count -
                _.first(statisticsData.totalViewsLastYear).count)) /
            _.first(statisticsData.totalViewsLastYear).count;
        } catch (error) {
          temp['Total Views Received'] = 100;
        }
        try {
          temp['Total Reading Time'] =
            (100 *
              (_.first(statisticsData.totalReadingThisYear).sum -
                _.first(statisticsData.totalReadingLastYear).count)) /
            _.first(statisticsData.totalReadingLastYear).count;
        } catch (error) {
          temp['Total Reading Time'] = 100;
        }
        try {
          temp['Average Reading Time'] = (
            (100 *
              (_.first(statisticsData.totalReadingThisYear).sum /
                _.first(statisticsData.totalReadingThisYear).count -
                _.first(statisticsData.totalReadingLastYear).sum /
                  _.first(statisticsData.totalReadingLastYear).count)) /
            (_.first(statisticsData.totalReadingLastYear).sum /
              _.first(statisticsData.totalReadingLastYear).count)
          ).toFixed(1);
        } catch (error) {
          if (
            !_.first(statisticsData.totalReadingThisYear)?.count &&
            _.first(statisticsData.totalReadingLastYear)?.count
          ) {
            temp['Average Reading Time'] = -100;
          } else {
            temp['Average Reading Time'] = 100;
          }
        }

        return temp;
      });
    }
  }, [statisticsData]);

  return (
    <div>
      <HeadContent>
        <title>Opinate Stats</title>
        <meta name="description" content="Opinate Stats" />
      </HeadContent>
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 xl:gap-6 w-full h-[400px] lg:h-[200px]">
            {!isLoading && stats && percentages ? (
              statCards.map((statCard) => (
                <StatsCard
                  key={statCard.title}
                  title={statCard.title}
                  number={stats[statCard.title]}
                  percentNumber={percentages[statCard.title]}
                  lastTime="last 12 Months"
                  upDown={percentages[statCard.title] >= 0 ? 1 : -1}
                />
              ))
            ) : (
              <div className="flex justify-center items-center w-[100vw] lg:w-[1200px]">
                <ClipLoader color="#9333ea" size={40} />
              </div>
            )}
          </div>
          <hr className="mt-10 pb-10" />

          <Chart />
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
                              className="py-3.5 pl-4 pr-3 text-start text-xs font-medium text-slate-600 sm:pl-6"
                            >
                              Title
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
                          {storiesStatistics.map((statistic) => (
                            <tr key={statistic._id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                <p className="text-slate-800 text-base font-medium tracking-sm">
                                  {statistic.title ?? 'Untitled'}
                                </p>
                                <p className="text-slate-500 text-sm tracking-sm text-ellipsis w-96 overflow-hidden">
                                  {parseHtml(statistic.content) ?? ''}
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                                {statistic.viewCount ?? 0}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                                {statistic.readingCount ?? 0}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                                %
                                {Math.ceil(
                                  (statistic.readingCount /
                                    statistic.viewCount) *
                                    100 || 0
                                )}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                                {statistic.fanCount ?? 0}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium tracking-sm sm:pr-6">
                                <Link
                                  href={`/story/${statistic.storySlug}/stats`}
                                >
                                  <a className="text-purple-600 hover:text-purple-900">
                                    Detail
                                  </a>
                                </Link>
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
              <ul className="divide-y divide-gray-200">
                {storiesStatistics.map((statistic) => (
                  <li key={statistic.title} className="py-4">
                    <div className="p-4">
                      <p className="text-slate-800 text-base font-medium tracking-sm">
                        {statistic.title ?? 'Untitled'}
                      </p>
                      <p className="text-slate-500 text-sm tracking-sm w-96 line-clamp-1 overflow-hidden text-ellipsis">
                        {parseHtml(statistic.content) ?? ''}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        View
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.viewCount ?? 0}
                        </span>
                      </span>
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        Reads
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.readCount ?? 0}
                        </span>
                      </span>
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        Read Ratio
                        <span className="text-purple-700 text-lg font-semibold">
                          %
                          {statistic.readingCount > 0
                            ? statistic.viewCount / statistic.readingCount
                            : 0}
                        </span>
                      </span>
                      <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                        Fans
                        <span className="text-purple-700 text-lg font-semibold">
                          {statistic.fanCount ?? 0}
                        </span>
                      </span>
                      <Link href={`/story/${statistic.storySlug}/stats`}>
                        <a className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
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
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
