import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '@/layouts/Layout';
import StatsCard from '@/components/StatsCard';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { statsActions } from '@/redux/stats/statsSlice';
import _ from 'lodash';
import Button from '@/components/basic/button';
import { DateTime } from 'luxon';
import PeriodButtons from '@/components/stats/PeriodButtons';

const ViewAreaChart = dynamic(import('@/components/ViewAreaChart'), {
  ssr: false,
});

const MemberAreaChart = dynamic(import('@/components/MemberAreaChart'), {
  ssr: false,
});

export default function StatsBlogPost() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [statCards, setStatCards] = useState([]);
  const [periodialTotalReadingTime, setPeriodialTotalReadingTime] = useState();
  const [viewStatsCards, setViewStatsCards] = useState([]);
  const [readingDateTypeState, setReadingDateTypeState] = useState();
  const [viewDateTypeState, setViewDateTypeState] = useState();

  const { storySlug } = router.query;

  const totalReadTime = useSelector((state) => state.stats.storyTotalReadTime);
  const externalViews = useSelector((state) => state.stats.externalViews);
  const internalViews = useSelector((state) => state.stats.internalViews);
  const totalLikes = useSelector((state) => state.stats.totalLikes);
  const storyCreatedAt = useSelector((state) => state.stats.storyCreatedAt);
  const storyName = useSelector((state) => state.stats.storyName);
  const readingDateType = useSelector((state) => state.stats.readingDateType);
  const viewDateType = useSelector((state) => state.stats.viewDateType);
  const internalViewsPeriodically = useSelector(
    (state) => state.stats.internalViewsPeriodically
  );
  const externalViewsPeriodically = useSelector(
    (state) => state.stats.externalViewsPeriodically
  );
  const storyTotalReadTimePeriodically = useSelector(
    (state) => state.stats.storyTotalReadTimePeriodically
  );

  const getStoryStatisticsPeriodically = (date, type) => {
    if (externalViewsPeriodically[type] === undefined) {
      dispatch(
        statsActions.getStoryStatisticsPeriodicallyRequest({
          storySlug,
          date,
          type,
        })
      );
    } else {
      setViewDateTypeState(type);
    }
  };
  const getStoryReadingTimePeriodically = (date, type) => {
    if (storyTotalReadTimePeriodically[type] === undefined) {
      dispatch(
        statsActions.getStoryReadingTimePeriodicallyRequest({
          storySlug,
          date,
          type,
        })
      );
    } else {
      setReadingDateTypeState(type);
    }
  };
  const getStoryStatistics = () => {
    dispatch(statsActions.getStoryStatisticsRequest(storySlug));
  };

  useEffect(() => {
    let periodicalExternalViews = 0;
    let periodicalInternalViews = 0;

    _.forEach(externalViewsPeriodically[viewDateTypeState], (item) => {
      periodicalExternalViews += item.count;
    });
    _.forEach(internalViewsPeriodically[viewDateTypeState], (item) => {
      periodicalInternalViews += item.count;
    });

    setViewStatsCards([
      {
        title: 'Views',
        number: periodicalExternalViews + periodicalInternalViews,
      },
      {
        title: 'Internal Views',
        number: periodicalInternalViews,
      },
      {
        title: 'External Views',
        number: periodicalExternalViews,
      },
    ]);
  }, [externalViewsPeriodically, internalViewsPeriodically, viewDateTypeState]);

  useEffect(() => {
    let periodicalTotalReadingTime = 0;
    _.forEach(storyTotalReadTimePeriodically[readingDateTypeState], (item) => {
      periodicalTotalReadingTime += item.sum;
    });

    setPeriodialTotalReadingTime(periodicalTotalReadingTime);
  }, [
    externalViewsPeriodically,
    internalViewsPeriodically,
    readingDateTypeState,
  ]);

  const getDataByTime = (date, dateType, dataType) => {
    if (dataType !== 'Read') {
      getStoryStatisticsPeriodically(date, dateType);
    } if (dataType !== 'View') {
      getStoryReadingTimePeriodically(date, dateType);
    }
  };

  useEffect(() => {
    setStatCards([
      {
        title: 'Views',
        number: externalViews + internalViews,
      },
      {
        title: 'Internal Views',
        number: internalViews,
      },
      {
        title: 'External Views',
        number: externalViews,
      },
      {
        title: 'Total Reading Time',
        number: totalReadTime,
      },
      {
        title: 'Average Reading Time',
        number: (totalReadTime / (externalViews + internalViews) > 0
          ? totalReadTime / (externalViews + internalViews)
          : 0
        ).toFixed(1),
      },
      {
        title: 'Likes',
        number: totalLikes,
      },
    ]);
  }, [externalViews, internalViews, totalReadTime]);

  useEffect(() => {
    if (
      !_.get(externalViews, 'viewDaysToShow') &&
      !_.get(internalViews, 'viewDaysToShow') &&
      storySlug
    ) {
      getDataByTime(
        DateTime.local().plus({ month: -1 }).toISODate(),
        '30 Days'
      );

      getStoryStatistics();
    }
  }, [storySlug]);

  useEffect(() => {
    if (readingDateType) {
      setReadingDateTypeState(readingDateType);
    }
  }, [readingDateType]);
  useEffect(() => {
    if (viewDateType) {
      setViewDateTypeState(viewDateType);
    }
  }, [viewDateType]);

  
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Stats Blog Post</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Stats Blog Post"
        />
        <link rel="icon" href="/favicon.svg" />
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
                Stats For <span className="text-purple-500">{storyName}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                router.push('/stats');
              }}
              className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Stats for all stories
            </Button>
          </div>
          <hr className="my-12" />
          <div>
            <div className="mb-8">
              <h2 className="text-slate-800 mb-2 text-2xl font-bold tracking-md">
                Lifetime Summary
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
                  {` ${DateTime.fromISO(storyCreatedAt).toFormat(
                    'dd MMM yyyy'
                  )}`}
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 lg:gap-4 xl:gap-6">
              {statCards.map((statCard) => (
                <StatsCard
                  key={statCard.title}
                  title={statCard.title}
                  number={statCard.number}
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
              <PeriodButtons dataType="View" onClick={getDataByTime} />
            </div>
            <div className="grid lg:grid-cols-[220px,1fr] xl:grid-cols-[280px,1fr] gap-8">
              <div className="flex flex-col gap-7">
                {viewStatsCards.map((viewStatsCard) => (
                  <StatsCard
                    key={viewStatsCard.title}
                    title={`Last ${viewDateTypeState} ${viewStatsCard.title}`}
                    number={viewStatsCard.number}
                  />
                ))}
              </div>

              <ViewAreaChart
                type={viewDateTypeState}
                firstData={internalViewsPeriodically[viewDateTypeState]}
                secondData={externalViewsPeriodically[viewDateTypeState]}
              />
            </div>
          </div>
          <hr className="my-10" />
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <h2 className="text-slate-700 text-2xl sm:text-3xl tracking-md">
                Member Reading Time
              </h2>
              <PeriodButtons dataType="Read" onClick={getDataByTime} />
            </div>
            <div className="grid lg:grid-cols-[220px,1fr] xl:grid-cols-[280px,1fr] gap-8">
              <div className="flex flex-col gap-7">
                <StatsCard
                  title={`${readingDateTypeState} Reading Time`}
                  number={periodialTotalReadingTime}
                />
              </div>
              <MemberAreaChart
                type={readingDateTypeState}
                rawData={storyTotalReadTimePeriodically[readingDateTypeState]}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
