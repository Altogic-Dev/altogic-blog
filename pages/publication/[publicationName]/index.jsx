/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
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

const posts = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
];

const latests = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: false,
    firstPadding: false,
    bigImage: false,
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: false,
    firstPadding: false,
    bigImage: false,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: false,
    firstPadding: false,
    bigImage: false,
  },
];

export default function Publications() {
  const router = useRouter();
  const { publicationName } = router.query;
  const publication = useSelector((state) => state.publication.publication);
  const latestPublicationStories = useSelector(
    (state) => state.publication.latestPublicationStories
  );
  const dispatch = useDispatch();

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

  console.log(latestPublicationStories);
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
                <li className="flex items-center justify-center">
                  <a
                    href="#"
                    className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                  >
                    Navigation One
                  </a>
                </li>
                <li className="flex items-center justify-center">
                  <a
                    href="#"
                    className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                  >
                    Navigation Two
                  </a>
                </li>
              </ul>
              <SocialIcons />
            </div>
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8 mb-[60px]">
              <div className="lg:pl-8 lg:pr-8 divide-y divide-gray-200">
                {posts.map((post) => (
                  <PublicationPostCard
                    key={post._id}
                    image={_.first(post.storyImages)}
                    title={post.title}
                    description={post.description}
                    readMoreUrl={`/publications/${publicationName}/${post.slug}`}
                    personName={post.username}
                    date={post.createdAt}
                    storiesCount={5}
                    bookmark={post.bookmark}
                    firstPadding
                    bigImage={_.first(post.storyImages)}
                  />
                ))}
              </div>
              <div className="lg:flex lg:flex-col lg:gap-10 px-8">
                <Sidebar publicationProfile />
              </div>
            </div>
            <div>
              <h2 className="text-slate-500 pb-5 text-lg tracking-sm border-b border-gray-200">
                Latest
              </h2>
              <div className="mt-5 flex items-center gap-8">
                {latestPublicationStories?.map((post) => (
                  <PublicationPostCard
                    key={post._id}
                    image={_.first(post.storyImages) ?? latests[0].image}
                    title={post.title ?? "Untitled"}
                    description={post.content ?? "Test"}
                    readMoreUrl={`/publications/${publicationName}/${post.slug}`}
                    personName={post.username}
                    date={DateTime.fromISO(
                      post.createdAt
                    ).toRelative()}
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
