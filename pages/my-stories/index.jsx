import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import Button from '@/components/basic/button';
import { storyActions } from '@/redux/story/storySlice';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import { classNames } from '@/utils/utils';
import {
  getBookmarkListsRequest,
  getBookmarksRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import MyStoriesPublished from '@/components/myStories/MyStoriesPublished';
import MyStoriesDraft from '@/components/myStories/MyStoriesDraft';
import DeleteStoryModal from '@/components/DeleteStoryModal';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

export default function MyStories() {
  const router = useRouter();
  const { tab } = router.query;
  const sessionUser = useSelector((state) => state.auth.user);
  const userStoriesInfo = useSelector((state) => state.story.userStoriesInfo);
  const userDraftStoriesInfo = useSelector(
    (state) => state.story.userDraftStoriesInfo
  );
  const userDraftStories = useSelector((state) => state.story.userDraftStories);
  const userStories = useSelector((state) => state.story.userStories);
  const userStoriesLoading = useSelector(
    (state) => state.story.userStoriesLoading
  );

  const dispatch = useDispatch();
  const [blockModal, setBlockModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [user, setUser] = useState();
  const [deletedStory, setDeletedStory] = useState(null);
  const [draftPage, setDraftPage] = useState(1);

  const [publishedPage, setPublishedPage] = useState(1);

  const PAGE_LIMIT = 3;

  useEffect(() => {
    setUser(sessionUser);
    dispatch(storyActions.popularStoriesRequest());
  }, []);

  useEffect(() => {
    switch (_.lowerCase(tab)) {
      case 'draft':
        setSelectedIndex(1);
        break;

      default:
        setSelectedIndex(0);
        break;
    }
  }, [tab]);

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

  const getUserDraftStories = useCallback(() => {
    dispatch(
      storyActions.getUserDraftStoriesRequest({
        draftPage,
        limit: PAGE_LIMIT,
        isPublishedFilter: false,
      })
    );
  }, [draftPage]);

  const getUserStories = useCallback(() => {
    dispatch(
      storyActions.getUserStoriesRequestNextPage({
        publishedPage,
        limit: PAGE_LIMIT,
        isPublishedFilter: false,
      })
    );
  }, [publishedPage]);

  useEffect(() => {
    if (
      _.size(userDraftStories) < draftPage * PAGE_LIMIT &&
      userDraftStoriesInfo?.count !== _.size(userDraftStories)
    )
      getUserDraftStories();
  }, [draftPage]);
  useEffect(() => {
    if (
      _.size(userStories) < publishedPage * PAGE_LIMIT &&
      userStoriesInfo?.count !== _.size(userStories)
    ) {
      getUserStories();
    }
  }, [publishedPage]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App My Stories</title>
        <meta name="description" content="Altogic Medium Blog App My Stories" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="lg:py-10 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-14">
                <div className="flex items-center justify-between mb-8 md:mb-0">
                  {selectedIndex === 0 ? (
                    <h1 className="text-slate-700 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                      Your Stories
                    </h1>
                  ) : (
                    <h1 className="text-slate-700 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                      Your Draft
                    </h1>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div className="grid grid-cols-2 md:flex items-center w-full sm:w-auto gap-6">
                    <Link href="/write-a-story">
                      <Button> Write a story</Button>
                    </Link>
                    {/* <Button>Import a story</Button> */}
                  </div>
                </div>
              </div>
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
                  <Link href="/my-stories">
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
                          selectedIndex === 0
                            ? 'bg-purple-50 text-purple-900'
                            : ''
                        )}
                      >
                        {_.get(userStoriesInfo, 'count')}
                      </span>
                    </Tab>
                  </Link>
                  <Link href="/my-stories?tab=draft">
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
                          selectedIndex === 0
                            ? ''
                            : 'bg-purple-50 text-purple-900'
                        )}
                      >
                        {_.get(userDraftStoriesInfo, 'count')}
                      </span>
                    </Tab>
                  </Link>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {userStoriesLoading && publishedPage === 1 ? (
                      <ClipLoader className="my-10" />
                    ) : (
                      <MyStoriesPublished
                        userStoriesInfo={userStoriesInfo}
                        setDeletedStory={setDeletedStory}
                        setPage={setPublishedPage}
                        userStories={userStories}
                      />
                    )}
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
                    {userStoriesLoading && draftPage === 1 ? (
                      <ClipLoader className="my-10" />
                    ) : (
                      <MyStoriesDraft
                        setPage={setDraftPage}
                        userDraftStories={userDraftStories}
                        userDraftStoriesInfo={userDraftStoriesInfo}
                        setDeletedStory={setDeletedStory}
                      />
                    )}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar whoToFollow popularTopics popularStories />
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              <Sidebar profile={user} />
            </div>
          </div>
        </div>
        {blockModal && (
          <div className="relative z-20">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="relative max-w-[400px] w-full bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 ring-8 ring-red-50">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2071 15.2929C16.8166 14.9024 16.1834 14.9024 15.7929 15.2929C15.4024 15.6834 15.4024 16.3166 15.7929 16.7071L17.2071 15.2929ZM20.7929 21.7071C21.1834 22.0976 21.8166 22.0976 22.2071 21.7071C22.5976 21.3166 22.5976 20.6834 22.2071 20.2929L20.7929 21.7071ZM22.2071 16.7071C22.5976 16.3166 22.5976 15.6834 22.2071 15.2929C21.8166 14.9024 21.1834 14.9024 20.7929 15.2929L22.2071 16.7071ZM15.7929 20.2929C15.4024 20.6834 15.4024 21.3166 15.7929 21.7071C16.1834 22.0976 16.8166 22.0976 17.2071 21.7071L15.7929 20.2929ZM12 16.5C12.5523 16.5 13 16.0523 13 15.5C13 14.9477 12.5523 14.5 12 14.5V16.5ZM4.83886 15.6722L5.12914 16.6292L4.83886 15.6722ZM1 21C1 21.5523 1.44772 22 2 22C2.55228 22 3 21.5523 3 21H1ZM2.17224 18.3389L3.12918 18.6291L2.17224 18.3389ZM15.7929 16.7071L20.7929 21.7071L22.2071 20.2929L17.2071 15.2929L15.7929 16.7071ZM20.7929 15.2929L15.7929 20.2929L17.2071 21.7071L22.2071 16.7071L20.7929 15.2929ZM7.5 16.5H12V14.5H7.5V16.5ZM7.5 14.5C6.17719 14.5 5.2941 14.4891 4.54857 14.7153L5.12914 16.6292C5.51921 16.5109 6.03168 16.5 7.5 16.5V14.5ZM3 21C3 19.5317 3.01085 19.0192 3.12918 18.6291L1.2153 18.0486C0.989146 18.7941 1 19.6772 1 21H3ZM4.54857 14.7153C2.95057 15.2 1.70005 16.4506 1.2153 18.0486L3.12918 18.6291C3.42003 17.6703 4.17034 16.92 5.12914 16.6292L4.54857 14.7153ZM13.5 7.5C13.5 9.433 11.933 11 10 11V13C13.0376 13 15.5 10.5376 15.5 7.5H13.5ZM10 11C8.067 11 6.5 9.433 6.5 7.5H4.5C4.5 10.5376 6.96243 13 10 13V11ZM6.5 7.5C6.5 5.567 8.067 4 10 4V2C6.96243 2 4.5 4.46243 4.5 7.5H6.5ZM10 4C11.933 4 13.5 5.567 13.5 7.5H15.5C15.5 4.46243 13.0376 2 10 2V4Z"
                          fill="#D92D20"
                        />
                      </svg>
                    </span>
                    <Button
                      onClick={() => setBlockModal(false)}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition ease-in-out duration-150 hover:bg-gray-100"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 1L1 13M1 1L13 13"
                          stroke="#667085"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                  <div className="text-left mb-8">
                    <div className="mb-5">
                      <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                        Block this author
                      </h3>
                      <span className="text-slate-500 text-sm tracking-sm">
                        They will no longer be able to follow you or view your
                        content.
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setBlockModal(false)}
                      className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </Button>
                    <Button className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Block
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
      {deletedStory && (
        <DeleteStoryModal
          setDeleteStoryModal={() => setDeletedStory(null)}
          clickDelete={() => {
            dispatch(storyActions.deleteStoryRequest(deletedStory));
          }}
        />
      )}
    </div>
  );
}
