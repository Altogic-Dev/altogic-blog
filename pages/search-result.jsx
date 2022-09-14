import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import PostCard from '@/components/PostCard';
import { classNames } from '@/utils/utils';
import { generalActions } from '@/redux/general/generalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import UserCard from '@/components/general/UserCard';
import { DateTime } from 'luxon';
import Topic from '@/components/basic/topic';

export default function SearchResult() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchResults = useSelector((state) => state.general.searchResult);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (router.query.search) {
      dispatch(
        generalActions.searchRequest({
          query: router.query.search,
          limit: 10,
        })
      );
    }
  }, [router.query.search]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Notifications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Notifications"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-8 lg:py-10 lg:px-8">
              <h1 className="text-slate-700 mb-14 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                <span className="text-slate-400">Result for </span>
                {router.query.search}
              </h1>
              <Tab.Group onChange={setSelectedIndex}>
                <Tab.List className="flex items-center gap-4 sm:gap-10 h-11 border-b border-gray-300">
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
                    People
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
                    Publication
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
                    Topics
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {searchResults?.stories.map((story) => (
                      <PostCard
                        key={story._id}
                        noActiveBookmark
                        normalMenu
                        authorUrl={`/${story.username}`}
                        authorName={story.username}
                        authorImage={story.userProfilePicture}
                        storyUrl={`/story/${story.storySlug}`}
                        timeAgo={DateTime.fromISO(story.createdAt).toRelative()}
                        title={story.title}
                        infoText={story.excerpt}
                        badgeUrl="badgeUrl"
                        badgeName={story.categoryNames[0]}
                        min={story.estimatedReadingTime}
                        images={story.storyImages[0]}
                        actionMenu
                      />
                    ))}
                  </Tab.Panel>
                  <Tab.Panel className="flex flex-col gap-6 mt-10">
                    <ul className="divide-y divide-gray-200">
                      {searchResults?.users.map((people) => (
                        <UserCard key={people.id} user={people} />
                      ))}
                    </ul>
                  </Tab.Panel>
                  <Tab.Panel className="mt-10">
                    <ul className="divide-y divide-gray-200">
                      {searchResults?.publications.map((publication) => (
                        <li
                          key={publication.id}
                          className="flex items-center justify-between gap-3 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              className="w-16 h-16 rounded-full"
                              src={publication.image}
                              alt={publication.name}
                            />
                            <div className="flex flex-col">
                              <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                                {publication.name}
                              </span>
                              <span className="text-slate-500 text-xs tracking-sm">
                                {publication.desc}
                              </span>
                            </div>
                          </div>
                          <a
                            href={publication.href}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Follow
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Tab.Panel>
                  <Tab.Panel className="mt-10">
                    <div className="flex flex-wrap gap-x-4 gap-y-6">
                      {searchResults?.topics.map((topic) => (
                        <Topic
                          key={topic._id}
                          title={topic.name}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        />
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar
                topics={searchResults?.topics.slice(0, 5)}
                peoples={searchResults?.users.slice(0, 5)}
                stories={searchResults?.stories.slice(0, 5)}
                popularStories={selectedIndex !== 0}
                topicMatch={selectedIndex !== 3}
                peopleMatch={selectedIndex !== 1}
                query={router.query.search}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
