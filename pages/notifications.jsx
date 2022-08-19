import React from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import Layout from '@/layout/Layout';
import Sidebar from '@/layout/SideBar';

const allNotifications = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'published',
    time: '1 hour ago',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Omar Lipshutz',
    desc: 'Sed ullamcorper neque et nisl efficitur, eget molestie dolor ultrices.',
    intermediateText: 'clapped for',
    time: '3 days ago',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'published',
    time: '1 hour ago',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'published',
    time: '1 hour ago',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'published',
    time: '1 hour ago',
  },
];

const responses = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'responsed to',
    time: '1 hour ago',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Omar Lipshutz',
    desc: 'Sed ullamcorper neque et nisl efficitur, eget molestie dolor ultrices.',
    intermediateText: 'responsed to',
    time: '3 days ago',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'responsed to',
    time: '1 hour ago',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'responsed to',
    time: '1 hour ago',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
    desc: 'Lorem Ipsum Dolor Sit Amet',
    intermediateText: 'responsed to',
    time: '1 hour ago',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Notifications() {
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
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="py-8 lg:py-10 lg:px-8">
              <h1 className="text-slate-700 mb-10 lg:mb-12 text-2xl lg:text-3xl font-semibold tracking-md">
                Notifications
              </h1>
              <Tab.Group>
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
                    All
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
                    Responses
                  </Tab>
                </Tab.List>
                <Tab.Panels className="py-10 lg:py-12">
                  <Tab.Panel>
                    <ul className="space-y-4">
                      {allNotifications.map((allNotification) => (
                        <li
                          key={allNotification.id}
                          className="flex items-center gap-3"
                        >
                          <img
                            className="rounded-full w-[30px] h-[30px]"
                            src={allNotification.image}
                            alt={allNotification.name}
                          />
                          <span className="text-sm font-light tracking-sm text-slate-500">
                            <strong className="text-slate-600 font-semibold">
                              {allNotification.name}
                            </strong>{' '}
                            {allNotification.intermediateText}{' '}
                            <strong className="text-slate-600 font-semibold">
                              {allNotification.desc}
                            </strong>{' '}
                            <span className="text-slate-400 text-xs">
                              {allNotification.time}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Tab.Panel>
                  <Tab.Panel>
                    <ul className="space-y-4">
                      {responses.map((response) => (
                        <li
                          key={response.id}
                          className="flex items-center gap-3"
                        >
                          <img
                            className="rounded-full w-[30px] h-[30px]"
                            src={response.image}
                            alt={response.name}
                          />
                          <span className="text-sm font-light tracking-sm text-slate-500">
                            <strong className="text-slate-600 font-semibold">
                              {response.name}
                            </strong>{' '}
                            {response.intermediateText}{' '}
                            <strong className="text-slate-600 font-semibold">
                              {response.desc}
                            </strong>{' '}
                            <span className="text-slate-400 text-xs">
                              {response.time}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar
                storiesYouFollow
                whoToFollow
                popularTopics
                popularStories
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
