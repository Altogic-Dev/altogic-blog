/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import _, { isNil } from 'lodash';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import PublicationPostCard from '@/components/PublicationsPostCard';
import { DateTime } from 'luxon';
import PublicationTab from '@/components/PublicationTabs/PublicationTab';
import AligmentPublicationLayout from '@/components/AligmentPublicationLayout';

export default function Publications() {
  const pageSize = 3;
  const router = useRouter();
  const dispatch = useDispatch();
  const { publicationName } = router.query;

  const publication = useSelector((state) => state.publication.publication);
  const latestPublicationStories = useSelector(
    (state) => state.publication.latestPublicationStories
  );
  const latestPublicationStoriesPage = useSelector(
    (state) => state.publication.latestPublicationStoriesPage
  );
  const latestPublicationStoriesCount = useSelector(
    (state) => state.publication.latestPublicationStoriesCount
  );
  const navigations = useSelector(
    (state) => state.publication.publicationNavigation
  );
  const homeLayout = useSelector((state) => state.publication.homeLayout);

  const [didMount, setDidMount] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const getLatestPublicationStories = () => {
    if (
      publicationName &&
      latestPublicationStoriesCount >= latestPublicationStories.length
    ) {
      dispatch(
        publicationActions.getLatestPublicationStoriesRequest({
          publicationName,
          page: latestPublicationStoriesPage + 1 ?? 1,
          pageSize,
        })
      );
    }
  };

  useEffect(() => {
    if (!isNil(publicationName)) {
      getLatestPublicationStories();
    }
  }, [publicationName]);

  useEffect(() => {
    if (publication && !didMount) {
      dispatch(
        publicationActions.getPublicationNavigationRequest(publication._id)
      );
      dispatch(
        publicationActions.getPublicationHomeLayoutRequest(publication._id)
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
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <AligmentPublicationLayout
          layout={homeLayout?.layout}
          bgColor={homeLayout?.backgroundColor}
          color={homeLayout?.textColor}
          logo={publication?.logo}
          isCentered={homeLayout?.isCentered}
          title={publication?.name}
          content={publication?.description}
          bgImage={homeLayout?.backgroundImage}
          navigations={navigations}
          setSelectedTabIndex={setSelectedTabIndex}
          twitter={publication?.twitter}
          facebook={publication?.facebook}
          linkedin={publication?.linkedin}
        />
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div>
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
              <div className="mt-5 flex items-start gap-8 overflow-x-auto">
                {latestPublicationStories?.map((post) => (
                  <PublicationPostCard
                    key={post._id}
                    image={_.first(post.storyImages)}
                    title={post.title ?? 'Untitled'}
                    description={post.content ?? 'Test'}
                    readMoreUrl={`/story/${post.storySlug}`}
                    personName={post.username}
                    profilePicture={post.user?.profilePicture}
                    date={DateTime.fromISO(post.createdAt).toRelative()}
                    storiesCount={post.user?.storyCount}
                    bookmark={post.bookmark}
                    firstPadding={false}
                    bigImage={_.first(post.storyImages)}
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
