/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import HeadContent from '@/components/general/HeadContent';
import { Tab } from '@headlessui/react';
import PostCard from '@/components/PostCard';
import YourTopics from '@/components/general/YourTopics';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { topicsActions } from '@/redux/topics/topicsSlice';
import { DateTime } from 'luxon';
import { reportActions } from '@/redux/report/reportSlice';
import { classNames } from '@/utils/utils';
import _ from 'lodash';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import { ClipLoader } from 'react-spinners';
import { FlagIcon } from '@heroicons/react/outline';

export default function TagPage() {
  const user = useSelector((state) => state.auth.user);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { tag, tab } = router.query;
  const dispatch = useDispatch();

  const latestTopics = useSelector((state) => state.topics.latestTopics);
  const bestTopics = useSelector((state) => state.topics.bestTopics);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const trendingTopics = useSelector((state) => state.topics.trendingTopics);
  const trendingLoading = useSelector((state) => state.topics.trendingLoading);
  const bestLoading = useSelector((state) => state.topics.bestLoading);
  const latestLoading = useSelector((state) => state.topics.latestLoading);
  const [posts, setPosts] = useState([]);

  const getLatests = () => {
    dispatch(
      topicsActions.getLatestsOfTopicRequest({
        topic: tag,
      })
    );
  };
  const getBests = () => {
    dispatch(
      topicsActions.getBestsOfTopicRequest({
        topic: tag,
      })
    );
  };
  const getTrendingTopics = () => {
    dispatch(topicsActions.getTrendingTopicsRequest(tag));
  };
  useEffect(() => {
    if (tag) {
      if (_.lowerCase(tab) === 'latest' && latestTopics.length === 0) {
        getLatests(1);
        setSelectedIndex(1);
      } else if (_.lowerCase(tab) === 'best' && bestTopics.length === 0) {
        getBests(1);
        setSelectedIndex(2);
      } else if (latestTopics.length === 0) {
        getTrendingTopics();
        setSelectedIndex(0);
      }
      dispatch(topicsActions.getTopicAnalyticsRequest(tag));
    }
  }, [tag, tab]);

  useEffect(() => {
    if (_.lowerCase(tab) === 'latest') {
      setPosts(latestTopics);
    } else if (_.lowerCase(tab) === 'best') {
      setPosts(bestTopics);
    } else {
      setPosts(trendingTopics);
    }
  }, [latestTopics, bestTopics, trendingTopics, tab]);

  return (
    <div>
      <HeadContent>
        <title>Opinate</title>
        <meta name="description" content="Opinate" />
      </HeadContent>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-4 lg:py-0">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-2 pb-24 lg:py-10 lg:pl-8 lg:pr-8">
              {/* Desktop */}
              <YourTopics Tag={tag} />

              {/* Mobile Sidebar */}
              <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
                <Sidebar personalFullStatistic />
              </div>
              <Tab.Group selectedIndex={selectedIndex}>
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
                  <Tab
                    onClick={() => router.push(`/tag/${tag}`)}
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    Trending
                  </Tab>
                  <Tab
                    onClick={() => router.push(`/tag/${tag}?tab=latest`)}
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    Latest
                  </Tab>
                  <Tab
                    onClick={() => router.push(`/tag/${tag}?tab=best`)}
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    Best
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {trendingLoading || _.size(posts) === 0 ? (
                      trendingLoading ? (
                        <div className="p-20 flex justify-center">
                          <ClipLoader color="#9333ea" size={80} />
                        </div>
                      ) : (
                        <div className="items-center flex flex-col">
                          <span className="mt-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                            <FlagIcon className="w-7 h-7 text-purple-600" />
                          </span>
                          <p className="text-slate-500 text-md">
                            No trending stories here.
                          </p>
                        </div>
                      )
                    ) : (
                      posts.map((post) => (
                        <PostCard
                          publication={post.publication}
                          key={post._id}
                          normalMenu
                          authorUrl={`/${post.username}`}
                          authorName={post.username}
                          authorImage={post.userProfilePicture}
                          storyUrl={`/story/${post.storySlug}`}
                          timeAgo={DateTime.fromISO(
                            post.createdAt
                          ).toRelative()}
                          title={post.title}
                          infoText={post.excerpt}
                          badgeName={_.first(post.categoryNames)}
                          min={post.estimatedReadingTime}
                          images={_.first(post.storyImages)}
                          actionMenu
                          bookmarkList={bookmarkLists}
                          story={post}
                          bookmarks={bookmarks}
                          optionButtons={{
                            report: () =>
                              dispatch(
                                reportActions.reportStoryRequest({
                                  userId: user?._id,
                                  storyId: post._id,
                                  reportedUserId: post.user,
                                })
                              ),
                          }}
                        />
                      ))
                    )}
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {latestLoading && _.size(posts) === 0 ? (
                      <div className="p-20 flex justify-center">
                        <ClipLoader color="#9333ea" size={80} />
                      </div>
                    ) : (
                      posts.map((post) => (
                        <PostCard
                          publication={post.publication}
                          key={post._id}
                          normalMenu
                          actionMenu
                          authorUrl={`/${post.username}`}
                          authorName={post.username}
                          authorImage={post.userProfilePicture}
                          storyUrl={`/story/${post.storySlug}`}
                          timeAgo={DateTime.fromISO(
                            post.createdAt
                          ).toRelative()}
                          title={post.title}
                          infoText={post.excerpt}
                          badgeName={_.first(post.categoryNames)}
                          min={post.estimatedReadingTime}
                          images={_.first(post.storyImages)}
                          bookmarkList={bookmarkLists}
                          story={post}
                          bookmarks={bookmarks}
                          optionButtons={{
                            report: () =>
                              dispatch(
                                reportActions.reportStoryRequest({
                                  userId: user?._id,
                                  storyId: post._id,
                                  reportedUserId: post.user,
                                })
                              ),
                          }}
                        />
                      ))
                    )}
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {bestLoading && _.size(posts) === 0 ? (
                      <div className="p-20 flex justify-center">
                        <ClipLoader color="#9333ea" size={80} />
                      </div>
                    ) : (
                      posts.map((post) => (
                        <PostCard
                          publication={post.publication}
                          key={post._id}
                          noActiveBookmark
                          normalMenu
                          authorUrl={`/${post.username}`}
                          authorName={post.username}
                          authorImage={post.userProfilePicture}
                          storyUrl={`/story/${post.storySlug}`}
                          timeAgo={DateTime.fromISO(
                            post.createdAt
                          ).toRelative()}
                          title={post.title}
                          infoText={post.excerpt}
                          badgeName={_.first(post.categoryNames)}
                          min={post.estimatedReadingTime}
                          images={_.first(post.storyImages)}
                          actionMenu
                          bookmarkList={bookmarkLists}
                          story={post}
                          bookmarks={bookmarks}
                          optionButtons={{
                            report: () =>
                              dispatch(
                                reportActions.reportStoryRequest({
                                  userId: user?._id,
                                  storyId: post._id,
                                  reportedUserId: post.user,
                                })
                              ),
                          }}
                        />
                      ))
                    )}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar
                personalFullStatistic
                topicWriters
                relatedTopics
                Tag={tag}
              />
            </div>
            {/* Mobile */}
          </div>
        </div>
      </Layout>
    </div>
  );
}
