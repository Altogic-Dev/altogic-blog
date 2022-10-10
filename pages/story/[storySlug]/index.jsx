/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { storyActions } from '@/redux/story/storySlice';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import _ from 'lodash';
import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { authActions } from '@/redux/auth/authSlice';
import { reportActions } from '@/redux/report/reportSlice';
import {
  getBookmarkListsRequest,
  getBookmarksRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { generalActions } from '@/redux/general/generalSlice';
import CreateBookmarkList from '@/components/bookmarks/CreateBookmarkList';
import Sidebar from '@/layouts/Sidebar';
import StoryContent from '@/components/StoryContent';
import { publicationActions } from '@/redux/publication/publicationSlice';
import Button from '@/components/basic/button';
import useUnload from '@/hooks/useUnload';
import Link from 'next/link';

export async function getServerSideProps({ req }) {
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  return {
    props: {
      ip,
    },
  };
}

export default function BlogDetail({ ip }) {
  const router = useRouter();
  const { storySlug, facebook, twitter, linkedin } = router.query;

  const dispatch = useDispatch();

  const story = useSelector((state) => state.story.story);
  const moreUserStories = useSelector((state) => state.story.moreUserStories);
  const user = useSelector((state) => state.auth.user);
  const isMuted = useSelector((state) => state.auth.isMuted);
  const isFollowing = useSelector(
    (state) => state.followerConnection.isFollowing
  );
  const isFollowingPublication = useSelector(
    (state) => state.publication.isFollowingPublication
  );
  const isSubscribed = useSelector(
    (state) => state.subscribeConnection.isSubscribed
  );

  const isReported = useSelector((state) => state.report.isReported);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const contentRef = useRef();
  const [createNewList, setCreateNewList] = useState(false);
  const [didMount, setDidMount] = useState(true);
  const [morePage, setMorePage] = useState(1);
  const [isRead, setIsRead] = useState(false);
  const [enterTime, setEnterTime] = useState(0);
  const isPublication = !_.isNil(_.get(story, 'publication._id'));
  const moreFromFollowing = isPublication
    ? isFollowingPublication
    : isFollowing;

  const toggleFollow = () => {
    if (isFollowing) {
      return dispatch(
        followerConnectionActions.unfollowRequest({
          userId: _.get(user, '_id'),
          followingUserId: _.get(story, 'user._id'),
        })
      );
    }
    return dispatch(
      followerConnectionActions.followRequest({
        followerUser: user,
        followingUser: {
          followingUser: _.get(story, 'user._id'),
          followingName: _.get(story, 'user.name'),
          followingUserProfilePicture: _.get(story, 'user.profilePicture'),
          followingUsername: _.get(story, 'user.username'),
        },
      })
    );
  };

  const visitStory = () => {
    dispatch(
      storyActions.visitStoryRequest({
        story: story._id,
        user: user._id,
        readingTime: DateTime.now().diff(enterTime, 'seconds').seconds,
        isRead,
        publication: _.get(story, 'publication._id'),
        isExternal: facebook || twitter || linkedin,
        author: story.user._id,
        categoryNames: story.categoryNames,
      })
    );
  };

  const togglePublicationFollow = () => {
    if (isFollowingPublication) {
      return dispatch(
        publicationActions.unfollowPublicationRequest({
          publication: _.get(story, 'publication._id'),
          user: {
            _id: user._id,
            userName: user.username,
            userAbout: user.about,
            userProfilePicture: user.profilePicture,
          },
        })
      );
    }
    return dispatch(
      publicationActions.followPublicationRequest({
        publication: {
          publication: _.get(story, 'publication._id'),
          publicationName: _.get(story, 'publication.name'),
          publicationDescription: _.get(story, 'publication.description'),
          publicationProfilePicture: _.get(story, 'publication.profilePicture'),
          publicationLogo: _.get(story, 'publication.logo'),
        },
        user: {
          _id: user._id,
          userName: user.username,
          userAbout: user.about,
          userProfilePicture: user.profilePicture,
        },
      })
    );
  };

  const onScroll = useCallback(() => {
    const { pageYOffset } = window;
    if (
      (contentRef.current.scrollHeightpageYOffset &&
        (pageYOffset /
          (contentRef.current.scrollHeight -
            100 -
            (_.isNil(isPublication) ? 0 : 100))) *
          100 >
          40) ||
      _.get(story, 'estimatedReadingTime') < 3
    ) {
      setIsRead(true);
    }
  }, []);

  useUnload((e) => {
    visitStory();
    e.preventDefault();
  });

  useEffect(() => {
    setEnterTime(DateTime.now());
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!_.isNil(story) && didMount) {
      dispatch(
        generalActions.getConnectInformationStoryRequest({
          storyId: _.get(story, '_id'),
          authorId: _.get(story, 'user._id'),
        })
      );
      dispatch(authActions.isMutedRequest(_.get(story, 'user._id')));
      if (isPublication) {
        dispatch(
          publicationActions.isFollowingPublicationRequest({
            publicationId: _.get(story, 'publication._id'),
            userId: user?._id,
          })
        );
      }
      setDidMount(false);
    }
    return () => {
      if (story) {
        visitStory();
        window.removeEventListener('scroll', onScroll, { passive: true });
        clearInterval();
      }
    };
  }, [story]);

  useEffect(() => {
    if (!_.isNil(story)) {
      dispatch(
        storyActions.getMoreUserStoriesRequest({
          authorId: _.get(story, 'user._id'),
          storyId: _.get(story, '_id'),
          publicationId: _.get(story, 'publication._id'),
          page: morePage,
        })
      );
    }
  }, [story, morePage]);

  useEffect(() => {
    if (storySlug && story?.storySlug !== storySlug) {
      dispatch(storyActions.getStoryBySlugRequest(storySlug));
    }
  }, [storySlug]);
  useEffect(() => {
    if (user) {
      dispatch(
        getBookmarkListsRequest({
          username: _.get(user, 'username'),
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
        <title>Altogic Medium Blog App Detail</title>
        <meta name="description" content="Altogic Medium Blog App Detail" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0 ">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-8 lg:py-5 lg:px-8">
              {isPublication && (
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                  <img
                    className="w-20"
                    src={_.get(story, 'publication.logo')}
                    alt=""
                  />
                  <span className="text-slate-500 text-sm tracking-sm">
                    Published in{' '}
                    <Link href={`/publication/${_.get(story, 'publication.name')}`}>
                      <a className="text-slate-700 font-semibold">
                        {_.get(story, 'publication.name')}
                      </a>
                    </Link>
                  </span>
                </div>
              )}
              <StoryContent
                forwardedRef={contentRef}
                bookmarkLists={bookmarkLists}
                setCreateNewList={setCreateNewList}
                bookmarks={bookmarks}
                toggleFollow={toggleFollow}
                isFollowing={isFollowing}
                isMuted={isMuted}
                isReported={isReported}
              />
              <div className="bg-slate-50 py-8 px-4 sm:p-8 rounded-md">
                <div className="flex items-center justify-between gap-2 mb-10">
                  <div>
                    <p className="text-slate-600 mb-1 text-xl tracking-md">
                      More from{' '}
                      <span className="text-slate-700 font-semibold">
                        {_.get(story, 'publication.name') ||
                          _.get(story, 'user.name')}
                      </span>
                    </p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          _.get(story, 'publication.description') ||
                          _.get(story, 'user.about'),
                      }}
                      className="max-w-xl text-slate-600 text-xs tracking-sm"
                    />
                  </div>
                  <Button
                    className="inline-flex itemvisitStorys-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    onClick={
                      isPublication ? togglePublicationFollow : toggleFollow
                    }
                  >
                    {moreFromFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                </div>
                <div className="divide-y divide-gray-200">
                  {_.map(moreUserStories, (moreStory) => (
                    <PostCard
                      key={moreStory._id}
                      noActiveBookmark
                      normalMenu
                      authorUrl={`/profile/${moreStory.username}`}
                      authorName={moreStory.username}
                      authorImage={moreStory.userProfilePicture}
                      storyUrl={`/story/${moreStory.storySlug}`}
                      timeAgo={DateTime.fromISO(
                        moreStory.createdAt
                      ).toRelative()}
                      title={moreStory.title}
                      infoText={moreStory.excerpt}
                      badgeUrl="badgeUrl"
                      badgeName={_.first(moreStory.categoryNames)}
                      min={moreStory.estimatedReadingTime}
                      images={_.first(moreStory.storyImages)}
                      actionMenu
                      storyId={moreStory._id}
                      optionButtons={{
                        unfollow: () =>
                          dispatch(
                            followerConnectionActions.unfollowRequest({
                              userId: _.get(user, '_id'),
                              followingUserId: _.get(moreStory, 'user'),
                            })
                          ),
                        report: () =>
                          dispatch(
                            reportActions.reportStoryRequest({
                              userId: _.get(user, '_id'),
                              storyId: _.get(moreStory, '_id'),
                              reportedUserId: _.get(moreStory, 'user'),
                            })
                          ),
                      }}
                    />
                  ))}
                </div>
                <div className="pt-10 border-t border-gray-200 text-center">
                  <Button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    onClick={() => setMorePage((prev) => prev + 1)}
                  >
                    Read more from{' '}
                    {_.get(story, 'publication.name') ||
                      _.get(story, 'user.name')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar
                profile={_.get(story, 'user')}
                isFollowing={isFollowing}
                isSubscribed={isSubscribed}
                whoToFollow
                popularTopics
                popularStories
              />
            </div>
          </div>
        </div>
        {createNewList && (
          <CreateBookmarkList setCreateNewList={setCreateNewList} />
        )}
      </Layout>
    </div>
  );
}
