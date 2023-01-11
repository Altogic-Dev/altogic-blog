import React, { useState, useEffect } from 'react';
import HeadContent from '@/components/general/HeadContent';
import { Tab } from '@headlessui/react';
import Layout from '@/layouts/Layout';
import dynamic from 'next/dynamic';
import { classNames, convertTime } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { statsActions } from '@/redux/stats/statsSlice';
import { DateTime } from 'luxon';
import _ from 'lodash';
import PeriodButtons from '@/components/stats/PeriodButtons';
import MonthlyStatsCard from '@/components/publication/MonthlyStatsCard';
import ListObserver from '@/components/ListObserver';

const ReadingBarChart = dynamic(import('@/components/ReadingBarChart'), {
  ssr: false,
});
export async function getServerSideProps({ query }) {
  const { publicationName } = query;
  return {
    props: { publicationName: publicationName || null },
  };
}

export default function PublicationsStats({ publicationName }) {
  const dispatch = useDispatch();

  const likesPeriodically = useSelector(
    (state) => state.stats.likesPeriodically
  );
  const viewsPeriodically = useSelector(
    (state) => state.stats.viewsPeriodically
  );
  const readsPeriodically = useSelector(
    (state) => state.stats.readsPeriodically
  );
  const publication = useSelector((state) =>
    _.get(state.publication.publication, '_id')
  );

  const viewsDateType = useSelector((state) => state.stats.viewsDateType);
  const readsDateType = useSelector((state) => state.stats.readsDateType);
  const likesDateType = useSelector((state) => state.stats.likesDateType);

  const publicationStories = useSelector(
    (state) => state.stats.publicationStories
  );

  const [tabIndex, setTabIndex] = useState(0);

  const [totalViewsCount, setTotalViewsCount] = useState(0);
  const [totalReadsCount, setTotalReadsCount] = useState(0);
  const [totalLikesCount, setTotalLikesCount] = useState(0);
  const [viewsDateTypeState, setViewsDateTypeState] = useState();
  const [readsDateTypeState, setReadsDateTypeState] = useState();
  const [likesDateTypeState, setLikesDateTypeState] = useState();
  const [page, setPage] = useState(0);
  const getPublicationViewsPeriodically = (date, type) => {
    dispatch(
      statsActions.getPublicationViewsPeriodicallyRequest({
        publication,
        date,
        type,
      })
    );
    setViewsDateTypeState(type);
  };
  const getPublicationLikesPeriodically = (date, type) => {
    dispatch(
      statsActions.getPublicationLikesPeriodicallyRequest({
        publication,
        date,
        type,
      })
    );
    setLikesDateTypeState(type);
  };
  const getPublicationReadsPeriodically = (date, type) => {
    dispatch(
      statsActions.getPublicationReadsPeriodicallyRequest({
        publication,
        date,
        type,
      })
    );
    setReadsDateTypeState(type);
  };
  const getPublicationsStoriesStats = (page) => {
    dispatch(
      statsActions.getPublicationsStoriesStatsRequest({
        publication,
        page,
      })
    );
  };

  useEffect(() => {
    if (publication && tabIndex === 0) {
      getPublicationReadsPeriodically(
        DateTime.local().plus({ month: -1 }).toISODate(),
        '30 Days'
      );
      getPublicationLikesPeriodically(
        DateTime.local().plus({ month: -1 }).toISODate(),
        '30 Days'
      );
      getPublicationViewsPeriodically(
        DateTime.local().plus({ month: -1 }).toISODate(),
        '30 Days'
      );
    }
  }, [publication, tabIndex]);

  useEffect(() => {
    if (
      (publication && _.isEmpty(publicationStories)) ||
      _.get(_.last(publicationStories)) < page
    )
      getPublicationsStoriesStats(page);
  }, [page, publication, tabIndex]);

  useEffect(() => {
    let temp = 0;
    if (readsDateType) {
      setReadsDateTypeState(readsDateType);
      _.forEach(readsPeriodically[readsDateType], (item) => {
        temp += item.count;
      });
      setTotalReadsCount(temp);
    }
  }, [readsDateType, readsPeriodically]);

  useEffect(() => {
    let temp = 0;
    if (viewsDateType) {
      setViewsDateTypeState(viewsDateType);
      _.forEach(viewsPeriodically[viewsDateType], (item) => {
        temp += item.count;
      });
      setTotalViewsCount(temp);
    }
  }, [viewsDateType, viewsPeriodically]);
  useEffect(() => {
    let temp = 0;
    if (likesDateType) {
      setLikesDateTypeState(likesDateType);
      _.forEach(likesPeriodically[likesDateType], (item) => {
        temp += item.count;
      });
      setTotalLikesCount(temp);
    }
  }, [likesDateType, likesPeriodically]);

  return (
    <div>
      <HeadContent>
        <title>Opinate Publications Story Page Published</title>
        <meta
          name="description"
          content="Opinate Publications Story Page Published"
        />
      </HeadContent>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <h1 className="text-slate-700 my-8 md:my-[60px] text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
            {publicationName} stats
          </h1>
          <Tab.Group onChange={setTabIndex}>
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
                    <p className="text-3xl font-semibold tracking-md">
                      {convertTime(totalReadsCount)}
                    </p>
                    <h2 className="text-slate-700 text-xl tracking-md">
                      Reads in{' '}
                      <span className="font-semibold">
                        {readsDateTypeState}
                      </span>
                    </h2>
                    <span className="text-slate-700 text-sm tracking-sm">
                      The total amount of time spent reading your publication.
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="mb-7 text-right">
                      <PeriodButtons
                        onClick={getPublicationReadsPeriodically}
                      />
                    </div>
                    <ReadingBarChart
                      timeUnit={convertTime(totalReadsCount).split(' ')[1]}
                      data={readsPeriodically[readsDateTypeState]}
                      type={readsDateTypeState}
                    />
                  </div>
                </div>
                <hr className="my-10" />
                <div className="flex flex-col xl:flex-row xl:items-center gap-[72px] mt-12 md:mt-20">
                  <div className="max-w-[344px] w-full space-y-2">
                    <p className="text-3xl font-semibold tracking-md">
                      {totalViewsCount}
                    </p>
                    <h2 className="text-slate-700 text-xl tracking-md">
                      Views in{' '}
                      <span className="font-semibold">
                        {viewsDateTypeState}
                      </span>
                    </h2>
                    <span className="text-slate-700 text-sm tracking-sm">
                      The total number of views your publication has received on
                      all posts and pages.
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="mb-7 text-right">
                      <PeriodButtons
                        onClick={getPublicationViewsPeriodically}
                      />
                    </div>
                    <ReadingBarChart
                      data={viewsPeriodically[viewsDateTypeState]}
                      type={viewsDateTypeState}
                    />
                  </div>
                </div>
                <hr className="my-10" />
                <div className="flex flex-col xl:flex-row xl:items-center gap-[72px] mt-12 md:mt-20">
                  <div className="max-w-[344px] w-full space-y-2">
                    <p className="text-3xl font-semibold tracking-md">
                      {totalLikesCount}
                    </p>
                    <h2 className="text-slate-700 text-xl tracking-md">
                      Likes{' '}
                      <span className="font-semibold">
                        {likesDateTypeState}
                      </span>
                    </h2>
                    <span className="text-slate-700 text-sm tracking-sm">
                      The total number of likes your publication has received on
                      all posts and pages.
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="mb-7 text-right">
                      <PeriodButtons
                        onClick={getPublicationLikesPeriodically}
                      />
                    </div>
                    <ReadingBarChart
                      data={likesPeriodically[likesDateTypeState]}
                      type={likesDateTypeState}
                    />
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <ListObserver onEnd={() => setPage((state) => state + 1)}>
                  {publicationStories.map((item) => (
                    <MonthlyStatsCard
                      key={item}
                      name={item.name}
                      statistics={item.data}
                    />
                  ))}
                </ListObserver>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Layout>
    </div>
  );
}
