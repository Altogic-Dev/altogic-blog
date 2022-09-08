import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import Layout from '@/layout/Layout';
import PostCard from '@/components/PostCard';
import YourTopics from '@/components/general/YourTopics';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { topicsActions } from '@/redux/topics/topicsSlice';
import { DateTime } from 'luxon';
import { authActions } from '@/redux/auth/authSlice';
import { reportActions } from '@/redux/report/reportSlice';
import {
  getBookmarkListsRequest,
  getBookmarksRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { classNames } from '@/utils/utils';
import _ from 'lodash';
import Sidebar from '../../layout/Sidebar';

export default function TagPage({ Home, Latest, Best }) {
  const user = useSelector((state) => state.auth.user);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { tag } = router.query;
  const dispatch = useDispatch();
  const latestTopics = useSelector((state) => state.topics.latestTopics);
  const bestTopics = useSelector((state) => state.topics.bestTopics);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const trendingTopicsIdList = useSelector(
    (state) => state.topics.trendingTopicsIdList
  );
  const trendingTopics = useSelector((state) => state.topics.trendingTopics);

  const [posts, setPosts] = useState([]);

  const getLatests = (page) => {
    dispatch(
      topicsActions.getLatestsOfTopicRequest({
        topic: tag,
        page,
        limit: 10,
      })
    );
  };
  const getBests = (page) => {
    dispatch(
      topicsActions.getBestsOfTopicRequest({
        topic: tag,
        page,
        limit: 10,
      })
    );
  };
  const getTrendings = (stories) => {
    dispatch(
      topicsActions.getTrendingsOfTopicRequest(
        stories.map((person) => person.groupby.story)
      )
    );
  };
  const getTopicTopWritersIdListRequest = () => {
    dispatch(
      topicsActions.getIdListTrendingsOfTopicRequest({
        topic: tag,
        limit: 10,
        page: 1,
        date: DateTime.local().plus({ weeks: -1 }).toISODate(),
      })
    );
  };

  useEffect(() => {
    if (tag) {
      if (Home) {
        getTopicTopWritersIdListRequest();
        setSelectedIndex(0);
      } else if (Latest) {
        getLatests(1);
        setSelectedIndex(1);
      } else if (Best) {
        getBests(1);
        setSelectedIndex(2);
      }
    }
  }, [tag]);

  useEffect(() => {
    if (Home) {
      setPosts(trendingTopics);
    } else if (Latest) {
      setPosts(latestTopics);
    } else if (Best) {
      setPosts(bestTopics);
    }
  }, [latestTopics, bestTopics, trendingTopics]);

  useEffect(() => {
    if (trendingTopicsIdList.length > 0) {
      getTrendings(trendingTopicsIdList);
    }
  }, [trendingTopicsIdList]);

  useEffect(() => {
    if (user) {
      dispatch(
        getBookmarkListsRequest({
          username: user.username,
          includePrivates: true,
        })
      );
      dispatch(
        getBookmarksRequest({
          userId: _.get(user, '_id'),
        })
      );
    }
  }, [user]);
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App</title>
        <meta name="description" content="Altogic Medium Blog App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                    onClick={() => router.push(`/tag/${tag}/latest`)}
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
                    onClick={() => router.push(`/tag/${tag}/best`)}
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
                    {posts.map((post) => (
                      <PostCard
                        key={post._id}
                        noActiveBookmark
                        normalMenu
                        authorUrl={`/${post.username}`}
                        authorName={post.username}
                        authorImage={post.userProfilePicture}
                        storyUrl={`/story/${post.storySlug}`}
                        timeAgo={DateTime.fromISO(post.createdAt).toRelative()}
                        title={post.title}
                        infoText={post.infoText}
                        badgeUrl={post.badgeUrl}
                        badgeName={_.first(post.categoryNames)}
                        min={post.estimatedReadingTime}
                        images={_.first(post.storyImages)}
                        actionMenu
                        bookmarkList={bookmarkLists}
                        story={post}
                        bookmarks={bookmarks}
                        optionButtons={{
                          mute: () =>
                            dispatch(authActions.muteAuthorRequest(post.user)),
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
                    ))}
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <PostCard
                        key={post._id}
                        noActiveBookmark
                        normalMenu
                        actionMenu
                        authorUrl={`/${post.username}`}
                        authorName={post.username}
                        authorImage={post.userProfilePicture}
                        storyUrl={`/story/${post.storySlug}`}
                        timeAgo={DateTime.fromISO(post.createdAt).toRelative()}
                        title={post.title}
                        infoText={post.infoText}
                        badgeUrl={post.badgeUrl}
                        badgeName={_.first(post.categoryNames)}
                        min={post.estimatedReadingTime}
                        images={_.first(post.storyImages)}
                        bookmarkList={bookmarkLists}
                        story={post}
                        bookmarks={bookmarks}
                        optionButtons={{
                          mute: () =>
                            dispatch(authActions.muteAuthorRequest(post.user)),
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
                    ))}
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <PostCard
                        key={post._id}
                        noActiveBookmark
                        normalMenu
                        authorUrl={`/${post.username}`}
                        authorName={post.username}
                        authorImage={post.userProfilePicture}
                        storyUrl={`/story/${post.storySlug}`}
                        timeAgo={DateTime.fromISO(post.createdAt).toRelative()}
                        title={post.title}
                        infoText={post.infoText}
                        badgeUrl={post.badgeUrl}
                        badgeName={_.first(post.categoryNames)}
                        min={post.estimatedReadingTime}
                        images={_.first(post.storyImages)}
                        actionMenu
                        bookmarkList={bookmarkLists}
                        story={post}
                        bookmarks={bookmarks}
                        optionButtons={{
                          mute: () =>
                            dispatch(authActions.muteAuthorRequest(post.user)),
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
                    ))}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar
                personalFullStatistic
                topWriters
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
