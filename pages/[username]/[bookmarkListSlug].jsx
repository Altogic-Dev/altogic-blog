import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import PostCard from '@/components/PostCard';
import ShareButtons from '@/components/ShareButtons';
import Avatar from '@/components/profile/Avatar';
import DeleteList from '@/components/bookmarks/DeleteList';
import Button from '@/components/basic/button';
import { useSelector, useDispatch } from 'react-redux';
import {
  getBookmarkListDetailRequest,
  updateBookmarkListRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { DateTime } from 'luxon';
import CreateBookmarkList from '@/components/bookmarks/CreateBookmarkList';
import _ from 'lodash';
import Layout from '../../layout/Layout';
import Sidebar from '../../layout/Sidebar';

export default function ListDetail() {
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [editBookmarkList, setEditBookmarkList] = useState(false);
  const [user, setUser] = useState();
  const [stories, setStories] = useState([]);

  const sessionUser = useSelector((state) => state.auth.user);
  const bookmarkList = useSelector((state) => state.bookmark.bookmarkList);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const router = useRouter();
  const dispatch = useDispatch();

  const { bookmarkListSlug } = router.query;
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);
  useEffect(() => {
    if (bookmarkListSlug) {
      dispatch(getBookmarkListDetailRequest({ slug: bookmarkListSlug }));
    }
  }, [bookmarkListSlug]);

  useEffect(() => {
    if (bookmarks) {
      setStories(bookmarks.map((bookmark) => bookmark.story));
    }
  }, [bookmarks]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App List Detail</title>
        <meta
          name="description"
          content="Altogic Medium Blog App List Detail"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-8 lg:py-10 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 sm:mb-[60px]">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <Avatar
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={user?.profilePicture}
                    alt={user?.username}
                  />
                  <div>
                    <span className="text-slate-700  text-base font-medium tracking-sm">
                      {user?.name}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 tracking-sm">
                      {DateTime.fromISO(
                        _.get(bookmarkList, 'createdAt')
                      ).toLocaleString({
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      <svg
                        className="h-1 w-1 text-slate-500"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      <span>{user?.storyCount} stories</span>
                    </div>
                  </div>
                </div>
                <ul className="flex items-center">
                  <ShareButtons />
                </ul>
              </div>
              <div className="flex items-center gap-8">
                <h1 className="text-slate-700 text-3xl font-semibold tracking-md">
                  {bookmarkList?.name}
                </h1>
                {bookmarkList?.isPrivate && (
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    <svg
                      className="w-3 h-3 mr-1"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.75 5C7.75 5.41421 8.08579 5.75 8.5 5.75C8.91421 5.75 9.25 5.41421 9.25 5H7.75ZM2.75 5C2.75 5.41421 3.08579 5.75 3.5 5.75C3.91421 5.75 4.25 5.41421 4.25 5H2.75ZM6.75 7.25C6.75 6.83579 6.41421 6.5 6 6.5C5.58579 6.5 5.25 6.83579 5.25 7.25H6.75ZM5.25 8.25C5.25 8.66421 5.58579 9 6 9C6.41421 9 6.75 8.66421 6.75 8.25H5.25ZM2.81901 10.3365L2.47852 11.0048L2.81901 10.3365ZM2.16349 9.68099L1.49524 10.0215L2.16349 9.68099ZM9.83651 9.68099L10.5048 10.0215L9.83651 9.68099ZM9.18099 10.3365L9.52148 11.0048L9.18099 10.3365ZM9.18099 5.16349L9.52148 4.49524L9.18099 5.16349ZM9.83651 5.81901L10.5048 5.47852L9.83651 5.81901ZM2.81901 5.16349L2.47852 4.49524L2.81901 5.16349ZM2.16349 5.81901L1.49524 5.47852L2.16349 5.81901ZM7.75 4V5H9.25V4H7.75ZM4.25 5V4H2.75V5H4.25ZM6 2.25C6.9665 2.25 7.75 3.0335 7.75 4H9.25C9.25 2.20507 7.79493 0.75 6 0.75V2.25ZM6 0.75C4.20507 0.75 2.75 2.20507 2.75 4H4.25C4.25 3.0335 5.0335 2.25 6 2.25V0.75ZM5.25 7.25V8.25H6.75V7.25H5.25ZM4.4 5.75H7.6V4.25H4.4V5.75ZM9.25 7.4V8.1H10.75V7.4H9.25ZM7.6 9.75H4.4V11.25H7.6V9.75ZM2.75 8.1V7.4H1.25V8.1H2.75ZM4.4 9.75C3.96759 9.75 3.68838 9.74942 3.47588 9.73205C3.27213 9.71541 3.19659 9.68715 3.15951 9.66825L2.47852 11.0048C2.76231 11.1494 3.05722 11.2028 3.35373 11.2271C3.64148 11.2506 3.99234 11.25 4.4 11.25V9.75ZM1.25 8.1C1.25 8.50766 1.24942 8.85852 1.27293 9.14627C1.29715 9.44278 1.35064 9.73769 1.49524 10.0215L2.83175 9.34049C2.81285 9.30341 2.78459 9.22787 2.76795 9.02412C2.75058 8.81162 2.75 8.53241 2.75 8.1H1.25ZM3.15951 9.66825C3.01839 9.59635 2.90365 9.48161 2.83175 9.34049L1.49524 10.0215C1.71095 10.4448 2.05516 10.789 2.47852 11.0048L3.15951 9.66825ZM9.25 8.1C9.25 8.53241 9.24942 8.81162 9.23205 9.02412C9.21541 9.22787 9.18715 9.30341 9.16825 9.34049L10.5048 10.0215C10.6494 9.73769 10.7028 9.44278 10.7271 9.14627C10.7506 8.85852 10.75 8.50766 10.75 8.1H9.25ZM7.6 11.25C8.00766 11.25 8.35852 11.2506 8.64627 11.2271C8.94278 11.2028 9.23769 11.1494 9.52148 11.0048L8.84049 9.66825C8.80341 9.68715 8.72787 9.71541 8.52412 9.73205C8.31162 9.74942 8.03241 9.75 7.6 9.75V11.25ZM9.16825 9.34049C9.09635 9.48161 8.98161 9.59635 8.84049 9.66825L9.52148 11.0048C9.94484 10.789 10.2891 10.4448 10.5048 10.0215L9.16825 9.34049ZM7.6 5.75C8.03241 5.75 8.31162 5.75058 8.52412 5.76795C8.72787 5.78459 8.80341 5.81285 8.84049 5.83175L9.52148 4.49524C9.23769 4.35064 8.94278 4.29715 8.64627 4.27293C8.35852 4.24942 8.00766 4.25 7.6 4.25V5.75ZM10.75 7.4C10.75 6.99234 10.7506 6.64148 10.7271 6.35373C10.7028 6.05722 10.6494 5.76231 10.5048 5.47852L9.16825 6.15951C9.18715 6.19659 9.21541 6.27213 9.23205 6.47588C9.24942 6.68838 9.25 6.96759 9.25 7.4H10.75ZM8.84049 5.83175C8.98161 5.90365 9.09635 6.01839 9.16825 6.15951L10.5048 5.47852C10.289 5.05516 9.94484 4.71095 9.52148 4.49524L8.84049 5.83175ZM4.4 4.25C3.99234 4.25 3.64148 4.24942 3.35373 4.27293C3.05722 4.29715 2.76231 4.35064 2.47852 4.49524L3.15951 5.83175C3.19659 5.81285 3.27213 5.78459 3.47588 5.76795C3.68838 5.75058 3.96759 5.75 4.4 5.75V4.25ZM2.75 7.4C2.75 6.96759 2.75058 6.68838 2.76795 6.47588C2.78459 6.27213 2.81285 6.19659 2.83175 6.15951L1.49524 5.47852C1.35064 5.76231 1.29715 6.05722 1.27293 6.35373C1.24942 6.64148 1.25 6.99234 1.25 7.4H2.75ZM2.47852 4.49524C2.05516 4.71095 1.71095 5.05516 1.49524 5.47852L2.83175 6.15951C2.90365 6.01839 3.01839 5.90365 3.15951 5.83175L2.47852 4.49524Z"
                        fill="currentColor"
                      />
                    </svg>
                    Private
                  </span>
                )}
                {bookmarkList?.name !== 'Reading List' && (
                  <div className="flex items-center gap-4 relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex items-center justify-center px-4 py-3 rounded-md">
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8955 10 12H12ZM12 12H14C14 10.8955 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8955 17 12H19ZM19 12H21C21 10.8955 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8955 3 12H5ZM5 12H7C7 10.8955 6.10457 10 5 10V12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none">
                          <Menu.Item>
                            <Button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              onClick={() => setEditBookmarkList(true)}
                            >
                              Rename list
                            </Button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            >
                              Remove items
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <Button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              onClick={() =>
                                dispatch(
                                  updateBookmarkListRequest({
                                    _id: bookmarkList._id,
                                    isPrivate: !bookmarkList.isPrivate,
                                  })
                                )
                              }
                            >
                              Make list{' '}
                              {bookmarkList?.isPrivate ? 'public' : 'private'}
                            </Button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              onClick={() => setDeleteListModal(true)}
                              className="flex items-center justify-center w-full px-6 py-3 text-red-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            >
                              Delete list
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
              <div>
                {stories.map((post) => (
                  <PostCard
                    key={post.id}
                    activeBookmark
                    listDetailMenu
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
                  />
                ))}
              </div>
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar following profile editButton />
            </div>
          </div>
        </div>
        {deleteListModal && (
          <DeleteList
            setDeleteList={setDeleteListModal}
            listId={bookmarkList._id}
          />
        )}
        {editBookmarkList && (
          <CreateBookmarkList
            setCreateNewList={setEditBookmarkList}
            list={bookmarkList}
          />
        )}
      </Layout>
    </div>
  );
}
