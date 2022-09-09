import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { reportActions } from '@/redux/report/reportSlice';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { storyActions } from '@/redux/story/storySlice';
import { DateTime } from 'luxon';
import _ from 'lodash';
import YourTopics from '@/components/general/YourTopics';
import ListObserver from '@/components/ListObserver';
import { classNames } from '@/utils/utils';
import {
  getBookmarkListsRequest,
  getBookmarksRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { authActions } from '../redux/auth/authSlice';
import Sidebar from '../layouts/Sidebar';
import PostCard from '../components/PostCard';
import Layout from '../layouts/Layout';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [followingListPage, setFollowingListPage] = useState(1);
  const [recommendedListPage, setRecommendedListPage] = useState(1);

  const followingStories = useSelector((state) => state.story.followingStories);
  const followingStoriesInfo = useSelector(
    (state) => state.story.followingStoriesInfo
  );
  const recommendedStories = useSelector(
    (state) => state.story.recommendedStories
  );
  const recommendedStoriesInfo = useSelector(
    (state) => state.story.recommendedStoriesInfo
  );

  const user = useSelector((state) => state.auth.user);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const dispatch = useDispatch();

  const getFollowingStories = (page) => {
    dispatch(
      storyActions.getFollowingStoriesRequest({ userId: user._id, page })
    );
  };
  const getRecommendedStories = (page) => {
    dispatch(storyActions.getRecommendedStoriesRequest({ page }));
  };

  const handleFollowingEndOfList = () => {
    if (
      _.isNil(followingStoriesInfo) ||
      followingStoriesInfo.currentPage < followingStoriesInfo.totalPages
    ) {
      setFollowingListPage((prev) => prev + 1);
    }
  };

  const handleRecommendedEndOfList = () => {
    if (
      _.isNil(recommendedStoriesInfo) ||
      recommendedStoriesInfo.currentPage < recommendedStoriesInfo.totalPages
    ) {
      setRecommendedListPage((prev) => prev + 1);
    }
  };

  const storiesYouFollow = useSelector(
    (state) => state.followerConnection.userFollowings
  );

  const getFollowingRequest = (page) => {
    dispatch(
      followerConnectionActions.getFollowingUsersRequest({
        userId: _.get(user, '_id'),
        page,
      })
    );
  };

  useEffect(() => {
    if (storiesYouFollow.length === 0) {
      getFollowingRequest(1);
    }
  }, []);

  useEffect(() => {
    getFollowingStories(followingListPage);
  }, [followingListPage]);

  useEffect(() => {
    if (selectedIndex !== 0) getRecommendedStories(recommendedListPage);
  }, [recommendedListPage]);

  useEffect(() => {
    if (
      selectedIndex === 1 &&
      _.isNil(recommendedStories) &&
      recommendedListPage === 1
    ) {
      getRecommendedStories(followingListPage);
    }
  }, [selectedIndex]);

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
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-2 pb-24 lg:py-10 lg:pl-8 lg:pr-8">
              <YourTopics />
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
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
                    Your Following
                    {/* <span
                      className={classNames(
                        'inline-flex bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full',
                        selectedIndex === 0
                          ? 'bg-purple-50 text-purple-900'
                          : ''
                      )}
                    >
                      8
                    </span> */}
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
                    Recommended
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {!_.isNil(followingStories) && (
                      <ListObserver onEnd={handleFollowingEndOfList}>
                        {_.map(followingStories, (story) => (
                          <PostCard
                            key={story._id}
                            noActiveBookmark
                            normalMenu
                            authorUrl={`/${story.username}`}
                            authorName={story.username}
                            authorImage={story.userProfilePicture}
                            storyUrl={`/story/${story.storySlug}`}
                            timeAgo={DateTime.fromISO(
                              story.createdAt
                            ).toRelative()}
                            title={story.title}
                            infoText={story.excerpt}
                            badgeUrl="badgeUrl"
                            badgeName={_.first(story.categoryNames)}
                            min={story.estimatedReadingTime}
                            images={_.first(story.storyImages)}
                            actionMenu
                            bookmarkLists={bookmarkLists}
                            story={story}
                            bookmarks={bookmarks}
                            optionButtons={{
                              unfollow: () =>
                                dispatch(
                                  followerConnectionActions.unfollowRequest({
                                    userId: user._id,
                                    followingUserId: story.user,
                                  })
                                ),
                              report: () =>
                                dispatch(
                                  reportActions.reportStoryRequest({
                                    userId: user._id,
                                    storyId: story._id,
                                    reportedUserId: story.user,
                                  })
                                ),
                            }}
                          />
                        ))}
                      </ListObserver>
                    )}
                  </Tab.Panel>

                  <Tab.Panel className="divide-y divide-gray-200">
                    {!_.isNil(recommendedStories) && (
                      <ListObserver onEnd={handleRecommendedEndOfList}>
                        {_.map(recommendedStories, (story) => (
                          <PostCard
                            key={story._id}
                            noActiveBookmark
                            normalMenu
                            authorUrl={`/${story.username}`}
                            authorName={story.username}
                            authorImage={story.userProfilePicture}
                            storyUrl={`/story/${story.storySlug}`}
                            timeAgo={DateTime.fromISO(
                              story.createdAt
                            ).toRelative()}
                            title={story.title}
                            infoText={story.excerpt}
                            badgeUrl="badgeUrl"
                            badgeName={_.first(story.categoryNames)}
                            min={story.estimatedReadingTime}
                            images={_.first(story.storyImages)}
                            actionMenu
                            bookmarkList={bookmarkLists}
                            story={story}
                            bookmarks={bookmarks}
                            optionButtons={{
                              mute: () =>
                                dispatch(
                                  authActions.muteAuthorRequest(story.user)
                                ),
                              report: () =>
                                dispatch(
                                  reportActions.reportStoryRequest({
                                    userId: user._id,
                                    storyId: story._id,
                                    reportedUserId: story.user,
                                  })
                                ),
                            }}
                          />
                        ))}
                      </ListObserver>
                    )}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar
                storiesYouFollow={storiesYouFollow}
                getFollowingRequest={getFollowingRequest}
                whoToFollow
                popularTopics
                popularStories
              />
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              <Sidebar
                mobilePopularStories
                getFollowingRequest={getFollowingRequest}

                storiesYouFollow={storiesYouFollow}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
