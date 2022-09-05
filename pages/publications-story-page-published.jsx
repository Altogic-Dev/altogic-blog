/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import Layout from '@/layout/Layout';
import PostCard from '../components/PostCard';
import PublicationsPostCard from '../components/PublicationsDraftCard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const posts = [
  {
    id: 0,
    href: '#',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'Technology',
    badgeUrl: '/',
    min: '9 min',
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Oliva Rhy',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      timeAgo: '2 Hours',
    },
    actionMenu: false,
  },
  {
    id: 1,
    href: '#',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'Money',
    badgeUrl: '/',
    min: '9 min',
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Oliva Rhy',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      timeAgo: '2 Hours',
    },
    actionMenu: false,
  },
  {
    id: 2,
    href: '#',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'App',
    badgeUrl: '/',
    min: '9 min',
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Oliva Rhy',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      timeAgo: '2 Hours',
    },
    actionMenu: false,
  },
  {
    id: 3,
    href: '#',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'Art',
    badgeUrl: '/',
    min: '9 min',
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Oliva Rhy',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      timeAgo: '2 Hours',
    },
    actionMenu: false,
  },
  {
    id: 4,
    href: '#',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'Mindfulness',
    badgeUrl: '/',
    min: '9 min',
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Oliva Rhy',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      timeAgo: '2 Hours',
    },
    actionMenu: false,
  },
  {
    id: 5,
    href: '#',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'Technology',
    badgeUrl: '/',
    min: '9 min',
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Oliva Rhy',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      timeAgo: '2 Hours',
    },
    actionMenu: false,
  },
];

const drafts = [
  {
    id: 0,
    authorName: 'Olivia Rhye',
    authorImage:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    timeAgo: '2 Hours',
    draftUrl: '#',
    title: 'Cras vitae aliquam enim lectus consequat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
  },
  {
    id: 1,
    authorName: 'Olivia Rhye',
    authorImage:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    timeAgo: '2 Hours',
    draftUrl: '#',
    title: 'Cras vitae aliquam enim lectus consequat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
  },
];

export default function PublicationsStoryPagePublished() {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-8 md:my-[60px]">
            {selectedIndex === 0 ? (
              <h1 className="text-slate-700 mb-4 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes published
              </h1>
            ) : selectedIndex === 1 ? (
              <h1 className="text-slate-700 mb-4 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes draft
              </h1>
            ) : (
              <h1 className="text-slate-700 mb-4 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes unlisted
              </h1>
            )}
            <div className="flex items-center w-full sm:w-auto gap-6">
              <button
                type="button"
                className="flex items-center justify-center w-full md:w-auto px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Write a story
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full md:w-auto px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Import a story
              </button>
            </div>
          </div>
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
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
                Published
                <span
                  className={classNames(
                    'inline-flex bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full',
                    selectedIndex === 0 ? 'bg-purple-50 text-purple-900' : ''
                  )}
                >
                  45
                </span>
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
                Drafts
                <span
                  className={classNames(
                    'inline-flex bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full',
                    selectedIndex === 0 ? '' : 'bg-purple-50 text-purple-900'
                  )}
                >
                  3
                </span>
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
                Unlisted
                <span
                  className={classNames(
                    'inline-flex bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full',
                    selectedIndex === 0 ? '' : 'bg-purple-50 text-purple-900'
                  )}
                >
                  3
                </span>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    noActiveBookmark
                    normalMenu
                    authorUrl={post.author.href}
                    authorName={post.author.name}
                    authorImage={post.author.image}
                    storyUrl={post.href}
                    timeAgo={post.author.timeAgo}
                    title={post.title}
                    infoText={post.infoText}
                    badgeUrl={post.badgeUrl}
                    badgeName={post.badgeName}
                    min={post.min}
                    images={post.image}
                    actionMenu={post.actionMenu}
                  />
                ))}
              </Tab.Panel>
              <Tab.Panel className="divide-y divide-gray-200">
                {drafts.map((draft) => (
                  <PublicationsPostCard
                    key={draft.id}
                    authorName={draft.authorName}
                    authorImage={draft.authorImage}
                    timeAgo={draft.timeAgo}
                    draftUrl={draft.draftUrl}
                    title={draft.title}
                    infoText={draft.infoText}
                  />
                ))}
              </Tab.Panel>
              <Tab.Panel className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    noActiveBookmark
                    normalMenu
                    authorUrl={post.author.href}
                    authorName={post.author.name}
                    authorImage={post.author.image}
                    storyUrl={post.href}
                    timeAgo={post.author.timeAgo}
                    title={post.title}
                    infoText={post.infoText}
                    badgeUrl={post.badgeUrl}
                    badgeName={post.badgeName}
                    min={post.min}
                    images={post.image}
                    actionMenu={post.actionMenu}
                  />
                ))}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Layout>
    </div>
  );
}
