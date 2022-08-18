import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { Menu, Transition } from '@headlessui/react';
import Layout from '../layout/Layout';
import Sidebar from '../layout/Sidebar';
import PostCard from '@/components/PostCard';
import ShareButtons from '@/components/ShareButtons';

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
  },
];

export default function ListDetail() {
  const [deleteListModal, setDeleteListModal] = useState(false);

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
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div>
                    <span className="text-slate-700  text-base font-medium tracking-sm">
                      Olivia Rhye
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 tracking-sm">
                      <span>June 29</span>
                      <svg
                        className="h-1 w-1 text-slate-500"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      <span>2 stories</span>
                    </div>
                  </div>
                </div>
                <ul className="flex items-center">
                  <ShareButtons />
                </ul>
              </div>
              <div className="flex items-center gap-8">
                <h1 className="text-slate-700 text-3xl font-semibold tracking-md">
                  List Name
                </h1>
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
                        <div>
                          <button
                            type="button"
                            className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                          >
                            Rename list
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                          >
                            Remove items
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                          >
                            Make list public
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                          >
                            Reorder items
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => setDeleteListModal(true)}
                            className="flex items-center justify-center w-full px-6 py-3 text-red-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                          >
                            Delete list
                          </button>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    activeBookmark={true}
                    listDetailMenu={true}
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
          <div className="relative z-20">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="relative max-w-[400px] w-full bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 ring-8 ring-red-50">
                      <svg
                        className="w-6 h-6 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4V2ZM15 4C15.5523 4 16 3.55228 16 3C16 2.44772 15.5523 2 15 2V4ZM3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7V5ZM21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5V7ZM19.9978 6.06652C20.0345 5.51546 19.6176 5.03895 19.0665 5.00221C18.5155 4.96548 18.039 5.38242 18.0022 5.93348L19.9978 6.06652ZM18.2987 16.5193L17.3009 16.4528L18.2987 16.5193ZM5.70129 16.5193L4.7035 16.5858L5.70129 16.5193ZM5.99779 5.93348C5.96105 5.38242 5.48454 4.96548 4.93348 5.00221C4.38242 5.03895 3.96548 5.51546 4.00221 6.06652L5.99779 5.93348ZM7.49834 20.6997L7.06223 21.5996H7.06223L7.49834 20.6997ZM6.19998 19.485L7.06888 18.99L6.19998 19.485ZM17.8 19.485L18.6689 19.98H18.6689L17.8 19.485ZM16.5017 20.6997L16.9378 21.5996H16.9378L16.5017 20.6997ZM11 10.5C11 9.94772 10.5523 9.5 10 9.5C9.44772 9.5 9 9.94772 9 10.5H11ZM9 15.5C9 16.0523 9.44772 16.5 10 16.5C10.5523 16.5 11 16.0523 11 15.5H9ZM15 10.5C15 9.94772 14.5523 9.5 14 9.5C13.4477 9.5 13 9.94772 13 10.5H15ZM13 15.5C13 16.0523 13.4477 16.5 14 16.5C14.5523 16.5 15 16.0523 15 15.5H13ZM9 4H15V2H9V4ZM3 7H21V5H3V7ZM18.0022 5.93348L17.3009 16.4528L19.2965 16.5858L19.9978 6.06652L18.0022 5.93348ZM13.5093 20H10.4907V22H13.5093V20ZM6.69907 16.4528L5.99779 5.93348L4.00221 6.06652L4.7035 16.5858L6.69907 16.4528ZM10.4907 20C9.68385 20 9.13703 19.9993 8.71286 19.9656C8.30086 19.9329 8.08684 19.8736 7.93444 19.7998L7.06223 21.5996C7.52952 21.826 8.0208 21.917 8.55459 21.9593C9.07622 22.0007 9.71571 22 10.4907 22V20ZM4.7035 16.5858C4.75505 17.359 4.79686 17.9972 4.87287 18.5149C4.95066 19.0447 5.07405 19.5288 5.33109 19.98L7.06888 18.99C6.98505 18.8429 6.9117 18.6333 6.85166 18.2243C6.78984 17.8034 6.75274 17.2578 6.69907 16.4528L4.7035 16.5858ZM7.93444 19.7998C7.57072 19.6235 7.26895 19.3412 7.06888 18.99L5.33109 19.98C5.73123 20.6824 6.33479 21.247 7.06223 21.5996L7.93444 19.7998ZM17.3009 16.4528C17.2473 17.2578 17.2102 17.8034 17.1483 18.2243C17.0883 18.6333 17.015 18.8429 16.9311 18.99L18.6689 19.98C18.926 19.5288 19.0493 19.0447 19.1271 18.5149C19.2031 17.9972 19.245 17.359 19.2965 16.5858L17.3009 16.4528ZM13.5093 22C14.2843 22 14.9238 22.0007 15.4454 21.9593C15.9792 21.917 16.4705 21.826 16.9378 21.5996L16.0656 19.7998C15.9132 19.8736 15.6991 19.9329 15.2871 19.9656C14.863 19.9993 14.3161 20 13.5093 20V22ZM16.9311 18.99C16.7311 19.3412 16.4293 19.6235 16.0656 19.7998L16.9378 21.5996C17.6652 21.247 18.2688 20.6824 18.6689 19.98L16.9311 18.99ZM9 10.5V15.5H11V10.5H9ZM13 10.5V15.5H15V10.5H13Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeleteListModal(false)}
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
                    </button>
                  </div>
                  <div className="text-left mb-8">
                    <div className="mb-5">
                      <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                        Delete list
                      </h3>
                      <span className="text-slate-500 text-sm tracking-sm">
                        Deleting this list will not delete the stories in it.
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeleteListModal(false)}
                      className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
