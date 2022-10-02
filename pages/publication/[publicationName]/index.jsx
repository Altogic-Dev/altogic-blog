/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import _, { isNil } from 'lodash';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import SocialIcons from '@/components/publication/SocialIcons';
import Sidebar from '@/layouts/Sidebar';
import PublicationPostCard from '@/components/PublicationsPostCard';
import { DateTime } from 'luxon';
import PublicationTab from '@/components/PublicationTabs/PublicationTab';

export default function Publications() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { publicationName } = router.query;

  const publication = useSelector((state) => state.publication.publication);
  const latestPublicationStories = useSelector(
    (state) => state.publication.latestPublicationStories
  );
  const navigations = useSelector(
    (state) => state.publication.publicationNavigation
  );

  const [didMount, setDidMount] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const getPublication = () => {
    dispatch(
      publicationActions.getPublicationRequest(publicationName.toLowerCase())
    );
  };
  const getLatestPublicationStories = () => {
    dispatch(
      publicationActions.getLatestPublicationStoriesRequest(
        publicationName.toLowerCase()
      )
    );
  };
  useEffect(() => {
    if (!isNil(publicationName)) {
      getPublication();
      getLatestPublicationStories();
    }
  }, [publicationName]);

  useEffect(() => {
    if (publication && !didMount) {
      dispatch(
        publicationActions.getPublicationNavigationRequest(publication._id)
      );
      setDidMount(true);
    }
  }, [publication]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="mt-[100px] mb-20">
            <img
              className="mb-[60px] w-[300px] "
              src={publication?.logo}
              alt=""
            />
            <h2 className="text-slate-600 max-w-4xl text-2xl tracking-md">
              {publication?.description}
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4 py-3 mb-8 border-b border-gray-200">
              <ul className="flex items-center gap-4">
                {_.map(navigations, (nav, index) => (
                  <li
                    key={`${_.get(nav, 'tabName')}-${index}`}
                    className="flex items-center justify-center"
                  >
                    {nav?.tabType !== 'link' ? (
                      <button
                        type="button"
                        onClick={() => setSelectedTabIndex(index)}
                        className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                      >
                        {_.get(nav, 'tabName')}
                      </button>
                    ) : (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={_.get(nav, 'externalLink')}
                        className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                      >
                        {_.get(nav, 'tabName')}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <SocialIcons />
            </div>
            <div
              className={`flex flex-col-reverse ${
                _.get(navigations[selectedTabIndex], 'tabType') !== 'feature' &&
                'lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8 mb-[60px]'
              } `}
            >
              <div
                className={`divide-y divide-gray-200 ${
                  _.get(navigations[selectedTabIndex], 'tabType') !==
                    'feature' && 'lg:pl-8 lg:pr-8'
                }`}
              >
                <PublicationTab
                  tab={navigations[selectedTabIndex]}
                  publication={publication}
                />
              </div>
              {_.get(navigations[selectedTabIndex], 'tabType') !==
                'feature' && (
                <div className="lg:flex lg:flex-col lg:gap-10 px-8">
                  <Sidebar publicationProfile />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-slate-500 pb-5 text-lg tracking-sm border-b border-gray-200">
                Latest
              </h2>
              <div className="mt-5 flex items-center gap-8">
                {latestPublicationStories?.map((post) => (
                  <PublicationPostCard
                    key={post._id}
                    image={_.first(post.storyImages)}
                    title={post.title ?? 'Untitled'}
                    description={post.content ?? 'Test'}
                    readMoreUrl={`/publications/${publicationName}/${post.slug}`}
                    personName={post.username}
                    date={DateTime.fromISO(post.createdAt).toRelative()}
                    storiesCount={post.user.storyCount}
                    bookmark={post.bookmark}
                    firstPadding
                    bigImage={_.first(post.storyImages)}
                    Ï
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
