/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import _, { isNil } from 'lodash';
import HeadContent from '@/components/general/HeadContent';
import Layout from '@/layouts/Layout';
import PublicationPostCard from '@/components/PublicationsPostCard';
import { DateTime } from 'luxon';
import PublicationTab from '@/components/PublicationTabs/PublicationTab';
import AligmentPublicationLayout from '@/components/AligmentPublicationLayout';
import { parseHtml } from '@/utils/utils';

export async function getServerSideProps({ query }) {
  const { tabName } = query;
  return {
    props: { tabName: tabName || null },
  };
}

export default function Publications({ tabName }) {
  const pageSize = 3;
  const router = useRouter();
  const dispatch = useDispatch();
  const { publicationName } = router.query;

  const publication = useSelector((state) => state.publication.publication);
  const latestPublicationStories = useSelector(
    (state) => state.publication.latestPublicationStories
  );
  const isLoading = useSelector((state) => state.publication.isLoading);

  const navigations = useSelector(
    (state) => state.publication.publicationNavigation
  );
  const homeLayout = useSelector((state) => state.publication.homeLayout);

  const getLatestPublicationStories = () => {
    if (publicationName) {
      dispatch(
        publicationActions.getLatestPublicationStoriesRequest({
          publicationName,
          page: 1,
          pageSize,
        })
      );
    }
  };

  const getPublicationNavigations = (publication) => {
    dispatch(
      publicationActions.getPublicationNavigationRequest(publication._id)
    );
  };
  const selectedTab = _.find(
    navigations,
    (navigation) => navigation.tabName === tabName
  );

  useEffect(() => {
    if (!isNil(publicationName)) {
      getLatestPublicationStories();
    }
  }, [publicationName]);

  useEffect(() => {
    if (publication && _.first(navigations)?.publication !== publication._id) {
      getPublicationNavigations(publication);
    }
    if (publication) {
      dispatch(
        publicationActions.getPublicationHomeLayoutRequest(publication._id)
      );
    }
  }, [publication?.name]);

  return (
    <div>
      <HeadContent>
        <title>Opinate Publications</title>
        <meta
          name="description"
          content="Opinate Publications"
        />
      </HeadContent>
      <Layout loading={isLoading}>
        <AligmentPublicationLayout
          layout={homeLayout?.layout}
          bottomColor={homeLayout?.bottomColor}
          bgColor={homeLayout?.backgroundColor}
          color={homeLayout?.textColor}
          logo={publication?.logo}
          isCentered={homeLayout?.isCentered}
          title={publication?.name}
          content={publication?.description}
          bgImage={homeLayout?.backgroundImage}
          navigations={navigations}
          twitter={publication?.twitter}
          facebook={publication?.facebook}
          linkedin={publication?.linkedin}
        />
        <div className="w-full flex justify-center pb-16 ">
          <div>
            <div
              className={`${
                _.get(selectedTab, 'tabType') !== 'feature' &&
                'grid lg:divide-x lg:divide-gray-200 mb-[60px]'
              } `}
            >
              <div className="divide-y divide-gray-200 w-full overflow-hidden">
                <PublicationTab tab={selectedTab} publication={publication} />
              </div>
            </div>
            <div className="px-8 md:w-[100vw] max-w-screen-xl w-full mx-auto ">
              <h2 className="text-slate-500 pb-5 text-lg tracking-sm border-b border-gray-200">
                Latest
              </h2>
              <div className="mt-5 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {latestPublicationStories?.map((post) => (
                  <PublicationPostCard
                    key={post._id}
                    image={_.first(post.storyImages)}
                    title={post.title ?? 'Untitled'}
                    description={parseHtml(post.content) ?? ''}
                    readMoreUrl={`/story/${post.storySlug}`}
                    personName={post.username}
                    profilePicture={post.user?.profilePicture}
                    date={DateTime.fromISO(post.createdAt).toRelative()}
                    storiesCount={post.user?.storyCount}
                    bookmark={post.bookmark}
                    firstPadding={false}
                    bigImage={_.first(post.storyImages)}
                    story={post}
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
