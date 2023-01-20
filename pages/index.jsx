import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { reportActions } from '@/redux/report/reportSlice';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { storyActions } from '@/redux/story/storySlice';
import { DateTime } from 'luxon';
import _ from 'lodash';
import ListObserver from '@/components/ListObserver';
import { classNames } from '@/utils/utils';

import Sidebar from '@/layouts/Sidebar';
import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';
import { blockConnectionActions } from '@/redux/blockConnection/blockConnectionSlice';
import HeadContent from '@/components/general/HeadContent';

export default function Home() {
  const [followingListPage, setFollowingListPage] = useState(1);
  const [recommendedListPage, setRecommendedListPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  const isLoading = useSelector((state) => state.story.loading);

  const userFromStorage = useSelector((state) => state.auth.user);
  const bookmarkLists = useSelector((state) =>
    _.get(state.bookmark.bookmarkLists, userFromStorage?.username)
  );
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const popularStories = useSelector((state) => state.story.popularStories);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getFollowingStories = (page) => {
    if (userFromStorage) {
      dispatch(
        storyActions.getFollowingStoriesRequest({
          userId: userFromStorage._id,
          page,
        })
      );
    }
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

  const storiesYouFollow = useSelector((state) =>
    _.filter(
      state.followerConnection.followingsData,
      (item) => item.unreadStories > 0
    )
  );

  useEffect(() => {
    dispatch(storyActions.popularStoriesRequest());
  }, []);

  useEffect(() => {
    if (!followingStories || followingListPage > 1)
      getFollowingStories(followingListPage);
  }, [followingListPage]);

  useEffect(() => {
    setUser(userFromStorage);
  }, [userFromStorage]);

  useEffect(() => {
    if (_.size(recommendedStories) < (recommendedStoriesInfo?.count || 1)) {
      getRecommendedStories(recommendedListPage);
    }
  }, [recommendedListPage]);

  useEffect(() => {
    if (
      !isLoading &&
      (!_.isNil(followingStories) || !_.isNil(recommendedStories))
    ) {
      setLoading(false);
    }
  }, [isLoading, followingStories, recommendedStories]);

  useEffect(() => {
    if (!_.size(followingStories)) {
      setSelectedIndex(2);
    }
  }, [followingStories]);
  return (
    <div>
      <HeadContent>
        <title>Opinate</title>
        <meta name="description" content="Opinate Blog" />
      </HeadContent>
      <Layout loading={loading}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 mt-10">
          <div className="flex lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-2 pb-24 lg:py-10 lg:pl-8 lg:pr-8">
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
                    Recommended
                  </Tab>
                  {user && !_.isEmpty(followingStories) && (
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
                    </Tab>
                  )}
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
                    <ListObserver onEnd={handleRecommendedEndOfList}>
                      {_.map(recommendedStories, (story, index) => (
                        <PostCard
                          publication={story.publication}
                          key={story._id + index}
                          noActiveBookmark
                          normalMenu
                          authorUrl={`/${story.username}`}
                          authorName={story.username}
                          authorImage={story.userProfilePicture}
                          storyUrl={`/story/${story.storySlug}`}
                          timeAgo={DateTime.fromISO(story.createdAt)
                            .setLocale('en')
                            .toRelative()}
                          title={story.title}
                          infoText={story.excerpt}
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
                                blockConnectionActions.blockUserRequest({
                                  blockedUserId: story.user,
                                  blockedUsername: story.username,
                                  blockedUserProfilePicture:
                                    story.userProfilePicture,
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
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {!_.isNil(followingStories) && (
                      <ListObserver onEnd={handleFollowingEndOfList}>
                        {_.map(followingStories, (story) => (
                          <PostCard
                            publication={story.publication}
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
                            badgeName={_.first(story.categoryNames)}
                            min={story.estimatedReadingTime}
                            images={_.first(story.storyImages)}
                            actionMenu
                            story={story}
                            optionButtons={{
                              unfollow: () =>
                                dispatch(
                                  followerConnectionActions.unfollowRequest({
                                    userId: user._id,
                                    followingUserId: story.user,
                                    followingUsername: _.get(story, 'username'),

                                    notUpdate: true,
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
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar
                storiesYouFollow={user && storiesYouFollow}
                topWriters={!userFromStorage}
                whoToFollow={userFromStorage}
                followingStoriesPage={storiesYouFollow.page}
                popularTopics
                popularStories
              />
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              <Sidebar
                mobilePopularStories
                storiesYouFollow={user && storiesYouFollow}
                followingStoriesPage={storiesYouFollow.page}
                stories={popularStories}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
