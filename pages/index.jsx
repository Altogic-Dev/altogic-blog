import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import PostCard from '../components/PostCard';
import Sidebar from '@/layout/SideBar';
import { storyActions } from '@/redux/story/storySlice';
import { DateTime } from "luxon"
import _ from 'lodash';
import ListObserver from '@/components/ListObserver';
import { wrapper } from '@/redux/store';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { reportActions } from '@/redux/report/reportSlice';

const posts = [
  {
    id: 0,
    href: '/post/first-post',
    title: 'Fermentum massa tincidunt placerat.',
    infoText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    badgeName: 'Technology',
    badgeUrl: '/test',
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
    actionMenu: true,
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
    actionMenu: true,
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
    actionMenu: true,
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
    actionMenu: true,
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
    actionMenu: true,
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
    actionMenu: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listPage, setListPage] = useState(1);
  
  const followingStories = useSelector(state => state.story.followingStories)
  const followingStoriesInfo = useSelector(state => state.story.followingStoriesInfo)
  const userId = useSelector(state => _.get(state.auth.user, "_id"))
  
  const dispatch = useDispatch();

  const getFollowingStories = (page) => {
        dispatch(storyActions.getFollowingStoriesRequest({ userId, page }));
  }

  const handleEndOfList = () => {
    if(_.isNil(followingStoriesInfo) || followingStoriesInfo.currentPage < followingStoriesInfo.totalPages) {
      setListPage(prev => prev + 1)
    }
  }
  
  useEffect(() => {
    getFollowingStories(listPage)
  }, [listPage]);

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
                        selectedIndex == 0 ? 'bg-purple-50 text-purple-900' : ''
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
                    <ListObserver onEnd={handleEndOfList}>
                      {_.map(followingStories, story => (
                        <PostCard
                          key={story._id}
                          noActiveBookmark
                          normalMenu
                          authorUrl={`/other-profile?id=${story.followerConnection.followingUser}`}
                          authorName={story.followerConnection.followingName}
                          authorImage={story.followerConnection.followingUserProfilePicture}
                          storyUrl={`/blog-detail?id=${story._id}`}
                          timeAgo={DateTime.fromISO(story.createdAt).toRelative()}
                          title={story.title}
                          infoText={story.excerpt}
                          badgeUrl={"badgeUrl"}
                          badgeName={_.first(story.categoryNames)}
                          min={story.estimatedReadingTime}
                          images={_.first(story.storyImages)}
                          actionMenu
                          optionButtons={{
                            unfollow: () => dispatch(followerConnectionActions.unfollowRequest({ 
                              userId, 
                              followingUserId: story.followerConnection.followingUser
                            })),
                            report: () => dispatch(reportActions.reportStoryRequest({
                              userId, 
                              storyId: story._id, 
                              reportedUserId: story.followerConnection.followingUser
                            }))
                          }}
                        />
                      ))}
                    </ListObserver>
                  )}
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
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar
                storiesYouFollow
                whoToFollow
                popularTopics
                popularStories
              />
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              <Sidebar mobilePopularStories storiesYouFollow />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
