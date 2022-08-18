import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { Menu, Transition, Switch } from '@headlessui/react';
import Layout from '../layouts/Layout';
import Sidebar from '../layouts/SideBar';
import PostCard from '../components/PostCard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
];

export default function PublicationsNewsletterDetail() {
  const [createNewList, setCreateNewList] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Detail</title>
        <meta name="description" content="Altogic Medium Blog App Detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-[72px] lg:pb-0">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-4 lg:pt-4 lg:pb-10 lg:px-8">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                <img className="w-10 h-10" src="./hi-avatar.svg" alt="" />
                <span className="text-slate-500 text-sm tracking-sm">
                  Published in{' '}
                  <span className="text-slate-700 font-semibold">HiThemes</span>
                </span>
              </div>
              <div className="bg-purple-50 text-slate-600 px-8 py-4 mb-16 rounded-lg tracking-sm">
                This is an email from{' '}
                <span className="font-semibold">
                  HiThemes Biweekly Newsletter,
                </span>{' '}
                a newsletter by HiThemes.
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4 mb-8">
                <div className="flex items-center gap-3">
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
                <div className="flex items-center justify-center gap-6 border-y sm:border-0 border-gray-200">
                  <ul className="flex items-center">
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.8513 7.47974C20.8592 7.67764 20.8618 7.87546 20.8618 8.07336C20.8618 14.0734 16.5286 21 8.60453 21C6.1704 21 3.90702 20.2444 2 18.958C2.3371 18.994 2.67946 19.021 3.02706 19.021C5.04528 19.021 6.90415 18.2922 8.37863 17.0689C6.4935 17.0419 4.90169 15.7195 4.3527 13.9204C4.61625 13.9744 4.88767 14.0015 5.16523 14.0015C5.55661 14.0015 5.93661 13.9476 6.30085 13.8396C4.32817 13.4258 2.84232 11.5908 2.84232 9.38689C2.84232 9.3599 2.84232 9.35086 2.84232 9.33287C3.4237 9.6657 4.08914 9.87249 4.79573 9.89948C3.63821 9.08089 2.87732 7.68662 2.87732 6.11241C2.87732 5.28482 3.08921 4.50218 3.46221 3.82752C5.58637 6.58014 8.76214 8.38826 12.3424 8.57716C12.2689 8.24433 12.2312 7.89359 12.2312 7.54277C12.2312 5.03303 14.1601 3 16.5399 3C17.7789 3 18.8979 3.5488 19.6833 4.43036C20.6665 4.23246 21.5877 3.85468 22.4212 3.33294C22.0981 4.39441 21.416 5.28478 20.5247 5.8425C21.3968 5.73455 22.2286 5.49186 23 5.13204C22.4212 6.04058 21.6927 6.84106 20.8513 7.47974Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.888672 12.0118C0.888672 17.5059 4.90124 22.074 10.1484 23L10.2104 22.9505C10.1897 22.9465 10.1691 22.9424 10.1485 22.9383V15.0984H7.37054V12.0118H10.1485V9.5425C10.1485 6.76457 11.9387 5.22127 14.4697 5.22127C15.2722 5.22127 16.1365 5.34474 16.939 5.4682V8.30786H15.5191C14.161 8.30786 13.8524 8.98691 13.8524 9.85116V12.0118H16.8155L16.3217 15.0984H13.8524V22.9383C13.8317 22.9424 13.8111 22.9465 13.7904 22.9505L13.8524 23C19.0996 22.074 23.1121 17.5059 23.1121 12.0118C23.1121 5.9003 18.1119 0.900024 12.0004 0.900024C5.88895 0.900024 0.888672 5.9003 0.888672 12.0118Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.41961 2C2.63558 2 2 2.63558 2 3.41961V20.5804C2 21.3644 2.63558 22 3.41961 22H20.5804C21.3644 22 22 21.3644 22 20.5804V3.41961C22 2.63558 21.3644 2 20.5804 2H3.41961ZM6.48908 8.21103C7.44729 8.21103 8.22408 7.43424 8.22408 6.47603C8.22408 5.51781 7.44729 4.74102 6.48908 4.74102C5.53087 4.74102 4.75409 5.51781 4.75409 6.47603C4.75409 7.43424 5.53087 8.21103 6.48908 8.21103ZM9.81304 9.49324H12.6885V10.8105C12.6885 10.8105 13.4688 9.24991 15.5918 9.24991C17.4857 9.24991 19.0546 10.1829 19.0546 13.0266V19.0233H16.0748V13.7533C16.0748 12.0757 15.1792 11.8912 14.4967 11.8912C13.0804 11.8912 12.8379 13.1129 12.8379 13.9721V19.0233H9.81304V9.49324ZM8.00152 9.49325H4.97664V19.0233H8.00152V9.49325Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.801 12.401C10.4702 11.9588 9.84347 11.8685 9.40122 12.1993C8.95897 12.5301 8.86863 13.1568 9.19943 13.599L10.801 12.401ZM17.5402 13.54L16.8331 12.8329L16.833 12.833L17.5402 13.54ZM20.5402 10.54L21.2473 11.2471C21.2514 11.243 21.2555 11.2389 21.2595 11.2347L20.5402 10.54ZM13.4702 3.47003L12.7755 2.75074C12.772 2.75409 12.7686 2.75746 12.7652 2.76086L13.4702 3.47003ZM11.0452 4.47086C10.6535 4.86024 10.6516 5.49341 11.041 5.88507C11.4304 6.27673 12.0636 6.27858 12.4552 5.88919L11.0452 4.47086ZM13.1994 11.599C13.5302 12.0413 14.1569 12.1316 14.5992 11.8008C15.0414 11.47 15.1318 10.8433 14.801 10.401L13.1994 11.599ZM6.4602 10.46L7.16731 11.1671L7.16743 11.167L6.4602 10.46ZM3.4602 13.46L2.75309 12.7529C2.749 12.757 2.74494 12.7611 2.74091 12.7653L3.4602 13.46ZM10.5302 20.53L11.2249 21.2493C11.2291 21.2453 11.2332 21.2412 11.2373 21.2371L10.5302 20.53ZM12.9473 19.5271C13.3378 19.1366 13.3378 18.5034 12.9473 18.1129C12.5568 17.7224 11.9236 17.7224 11.5331 18.1129L12.9473 19.5271ZM9.19943 13.599C9.71478 14.288 10.3723 14.858 11.1273 15.2705L12.0862 13.5154C11.5829 13.2404 11.1445 12.8604 10.801 12.401L9.19943 13.599ZM11.1273 15.2705C11.8823 15.683 12.7172 15.9283 13.5754 15.9898L13.7183 13.9949C13.1462 13.9539 12.5896 13.7904 12.0862 13.5154L11.1273 15.2705ZM13.5754 15.9898C14.4336 16.0513 15.2949 15.9274 16.101 15.6267L15.402 13.7529C14.8646 13.9533 14.2904 14.0359 13.7183 13.9949L13.5754 15.9898ZM16.101 15.6267C16.9072 15.326 17.6392 14.8555 18.2474 14.247L16.833 12.833C16.4275 13.2387 15.9394 13.5524 15.402 13.7529L16.101 15.6267ZM18.2473 14.2471L21.2473 11.2471L19.8331 9.83292L16.8331 12.8329L18.2473 14.2471ZM21.2595 11.2347C22.3524 10.1031 22.9572 8.58751 22.9435 7.01433L20.9436 7.03171C20.9527 8.0805 20.5495 9.09091 19.8209 9.84531L21.2595 11.2347ZM22.9435 7.01433C22.9299 5.44115 22.2988 3.93628 21.1864 2.82383L19.7722 4.23804C20.5138 4.97967 20.9345 5.98292 20.9436 7.03171L22.9435 7.01433ZM21.1864 2.82383C20.074 1.71138 18.5691 1.08036 16.9959 1.06669L16.9785 3.06662C18.0273 3.07573 19.0306 3.49641 19.7722 4.23804L21.1864 2.82383ZM16.9959 1.06669C15.4227 1.05302 13.9071 1.65779 12.7755 2.75074L14.1649 4.18931C14.9193 3.46068 15.9297 3.0575 16.9785 3.06662L16.9959 1.06669ZM12.7652 2.76086L11.0452 4.47086L12.4552 5.88919L14.1752 4.17919L12.7652 2.76086ZM14.801 10.401C14.2856 9.71209 13.6281 9.14203 12.8731 8.72952L11.9142 10.4847C12.4175 10.7597 12.8559 11.1397 13.1994 11.599L14.801 10.401ZM12.8731 8.72952C12.1181 8.31701 11.2832 8.07171 10.425 8.01025L10.2821 10.0051C10.8542 10.0461 11.4108 10.2096 11.9142 10.4847L12.8731 8.72952ZM10.425 8.01025C9.56681 7.94879 8.70546 8.07261 7.89935 8.37331L8.59836 10.2472C9.13577 10.0467 9.71 9.96416 10.2821 10.0051L10.425 8.01025ZM7.89935 8.37331C7.09324 8.67401 6.36123 9.14456 5.75296 9.75305L7.16743 11.167C7.57294 10.7613 8.06095 10.4476 8.59836 10.2472L7.89935 8.37331ZM5.75309 9.75292L2.75309 12.7529L4.16731 14.1671L7.16731 11.1671L5.75309 9.75292ZM2.74091 12.7653C1.64796 13.8969 1.0432 15.4125 1.05687 16.9857L3.05679 16.9683C3.04768 15.9196 3.45086 14.9091 4.17949 14.1547L2.74091 12.7653ZM1.05687 16.9857C1.07054 18.5589 1.70155 20.0638 2.814 21.1762L4.22821 19.762C3.48658 19.0204 3.06591 18.0171 3.05679 16.9683L1.05687 16.9857ZM2.814 21.1762C3.92645 22.2887 5.43132 22.9197 7.0045 22.9334L7.02188 20.9334C5.9731 20.9243 4.96985 20.5036 4.22821 19.762L2.814 21.1762ZM7.0045 22.9334C8.57768 22.947 10.0933 22.3423 11.2249 21.2493L9.83549 19.8107C9.08108 20.5394 8.07067 20.9425 7.02188 20.9334L7.0045 22.9334ZM11.2373 21.2371L12.9473 19.5271L11.5331 18.1129L9.82309 19.8229L11.2373 21.2371Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <div className="flex items-center relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
                    <Menu
                      as="div"
                      className="relative inline-block text-left ml-4"
                    >
                      <div>
                        <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <svg
                            className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 21L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21H19ZM5 21H4C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L5 21ZM12 17L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L12 17ZM17.362 3.32698L17.816 2.43597L17.362 3.32698ZM18.673 4.63803L19.564 4.18404L18.673 4.63803ZM6.63803 3.32698L6.18404 2.43597L6.63803 3.32698ZM5.32698 4.63803L4.43597 4.18404L5.32698 4.63803ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7H13ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM9.8 4H14.2V2H9.8V4ZM18 7.8V21H20V7.8H18ZM6 21V7.8H4V21H6ZM19.4961 20.1318L12.4961 16.1318L11.5039 17.8682L18.5039 21.8682L19.4961 20.1318ZM11.5039 16.1318L4.50386 20.1318L5.49614 21.8682L12.4961 17.8682L11.5039 16.1318ZM14.2 4C15.0566 4 15.6389 4.00078 16.089 4.03755C16.5274 4.07337 16.7516 4.1383 16.908 4.21799L17.816 2.43597C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7014 1.99922 15.0236 2 14.2 2V4ZM20 7.8C20 6.97642 20.0008 6.2986 19.9558 5.74817C19.9099 5.18608 19.8113 4.66937 19.564 4.18404L17.782 5.09202C17.8617 5.24842 17.9266 5.47262 17.9624 5.91104C17.9992 6.36113 18 6.94342 18 7.8H20ZM16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202L19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43597L16.908 4.21799ZM9.8 2C8.97642 2 8.2986 1.99922 7.74817 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43597L7.09202 4.21799C7.24842 4.1383 7.47262 4.07337 7.91104 4.03755C8.36113 4.00078 8.94342 4 9.8 4V2ZM6 7.8C6 6.94342 6.00078 6.36113 6.03755 5.91104C6.07337 5.47262 6.1383 5.24842 6.21799 5.09202L4.43597 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74817C3.99922 6.2986 4 6.97642 4 7.8H6ZM6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404L6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799L6.18404 2.43597ZM13 13V7H11V13H13ZM9 11H15V9H9V11Z"
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
                          <div disabled>
                            <div className="relative flex items-center justify-between w-full px-6 py-4">
                              <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input
                                    id="private-list"
                                    name="list"
                                    type="checkbox"
                                    className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="private-list"
                                    className="text-sm font-medium text-slate-800 tracking-sm"
                                  >
                                    Private List
                                  </label>
                                </div>
                              </div>
                              <div>
                                <svg
                                  className="w-6 h-6 text-slate-400"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16 10.5C16 11.0523 16.4477 11.5 17 11.5C17.5523 11.5 18 11.0523 18 10.5H16ZM6 10.5C6 11.0523 6.44772 11.5 7 11.5C7.55228 11.5 8 11.0523 8 10.5H6ZM13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15H13ZM11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17H11ZM5.63803 21.173L5.18404 22.064L5.63803 21.173ZM4.32698 19.862L3.43597 20.316L4.32698 19.862ZM19.673 19.862L20.564 20.316L19.673 19.862ZM18.362 21.173L18.816 22.064L18.362 21.173ZM18.362 10.827L18.816 9.93597L18.362 10.827ZM19.673 12.138L20.564 11.684L19.673 12.138ZM5.63803 10.827L5.18404 9.93597L5.63803 10.827ZM4.32698 12.138L3.43597 11.684L4.32698 12.138ZM16 8.5V10.5H18V8.5H16ZM8 10.5V8.5H6V10.5H8ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H18C18 5.18629 15.3137 2.5 12 2.5V4.5ZM12 2.5C8.68629 2.5 6 5.18629 6 8.5H8C8 6.29086 9.79086 4.5 12 4.5V2.5ZM11 15V17H13V15H11ZM8.8 11.5H15.2V9.5H8.8V11.5ZM19 15.3V16.7H21V15.3H19ZM15.2 20.5H8.8V22.5H15.2V20.5ZM5 16.7V15.3H3V16.7H5ZM8.8 20.5C7.94342 20.5 7.36113 20.4992 6.91104 20.4624C6.47262 20.4266 6.24842 20.3617 6.09202 20.282L5.18404 22.064C5.66937 22.3113 6.18608 22.4099 6.74817 22.4558C7.2986 22.5008 7.97642 22.5 8.8 22.5V20.5ZM3 16.7C3 17.5236 2.99922 18.2014 3.04419 18.7518C3.09012 19.3139 3.18868 19.8306 3.43597 20.316L5.21799 19.408C5.1383 19.2516 5.07337 19.0274 5.03755 18.589C5.00078 18.1389 5 17.5566 5 16.7H3ZM6.09202 20.282C5.7157 20.0903 5.40973 19.7843 5.21799 19.408L3.43597 20.316C3.81947 21.0686 4.43139 21.6805 5.18404 22.064L6.09202 20.282ZM19 16.7C19 17.5566 18.9992 18.1389 18.9624 18.589C18.9266 19.0274 18.8617 19.2516 18.782 19.408L20.564 20.316C20.8113 19.8306 20.9099 19.3139 20.9558 18.7518C21.0008 18.2014 21 17.5236 21 16.7H19ZM15.2 22.5C16.0236 22.5 16.7014 22.5008 17.2518 22.4558C17.8139 22.4099 18.3306 22.3113 18.816 22.064L17.908 20.282C17.7516 20.3617 17.5274 20.4266 17.089 20.4624C16.6389 20.4992 16.0566 20.5 15.2 20.5V22.5ZM18.782 19.408C18.5903 19.7843 18.2843 20.0903 17.908 20.282L18.816 22.064C19.5686 21.6805 20.1805 21.0686 20.564 20.316L18.782 19.408ZM15.2 11.5C16.0566 11.5 16.6389 11.5008 17.089 11.5376C17.5274 11.5734 17.7516 11.6383 17.908 11.718L18.816 9.93597C18.3306 9.68868 17.8139 9.59012 17.2518 9.54419C16.7014 9.49922 16.0236 9.5 15.2 9.5V11.5ZM21 15.3C21 14.4764 21.0008 13.7986 20.9558 13.2482C20.9099 12.6861 20.8113 12.1694 20.564 11.684L18.782 12.592C18.8617 12.7484 18.9266 12.9726 18.9624 13.411C18.9992 13.8611 19 14.4434 19 15.3H21ZM17.908 11.718C18.2843 11.9097 18.5903 12.2157 18.782 12.592L20.564 11.684C20.1805 10.9314 19.5686 10.3195 18.816 9.93597L17.908 11.718ZM8.8 9.5C7.97642 9.5 7.2986 9.49922 6.74817 9.54419C6.18608 9.59012 5.66937 9.68868 5.18404 9.93597L6.09202 11.718C6.24842 11.6383 6.47262 11.5734 6.91104 11.5376C7.36113 11.5008 7.94342 11.5 8.8 11.5V9.5ZM5 15.3C5 14.4434 5.00078 13.8611 5.03755 13.411C5.07337 12.9726 5.1383 12.7484 5.21799 12.592L3.43597 11.684C3.18868 12.1694 3.09012 12.6861 3.04419 13.2482C2.99922 13.7986 3 14.4764 3 15.3H5ZM5.18404 9.93597C4.43139 10.3195 3.81947 10.9314 3.43597 11.684L5.21799 12.592C5.40973 12.2157 5.71569 11.9097 6.09202 11.718L5.18404 9.93597Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div disabled>
                            <div className="relative flex items-center w-full px-6 py-4">
                              <div className="flex items-center h-5">
                                <input
                                  id="public-list"
                                  name="list"
                                  type="checkbox"
                                  className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="public-list"
                                  className="text-sm font-medium text-slate-800 tracking-sm"
                                >
                                  Public List
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => setCreateNewList(true)}
                              className="flex items-center justify-center w-full px-6 py-4 text-purple-700 text-base tracking-sm text-center hover:bg-slate-50"
                            >
                              Create new list
                            </button>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
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
                              Show less like this
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            >
                              Unfollow this author
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            >
                              Mute this publication
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                            >
                              Report
                            </button>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col items-center justify-center">
                <div className="prose prose-img:rounded-none prose-figcaption:mt-0 prose-blockquote:text-2xl prose-blockquote:md:text-3xl prose-blockquote:pl-5 prose-blockquote:md:pl-6 prose-blockquote:not-italic prose-blockquote:border-purple-700 prose-blockquote:border-l-2 prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:text-slate-800 prose-h1:font-bold prose-h1:tracking-md prose-h2:text-xl prose-h2:font-semibold prose-p:text-base prose-p:text-slate-500 prose-p:tracking-sm max-w-full mb-10 sm:mb-24">
                  <figure>
                    <img
                      className="w-full rounded-lg"
                      src="https://images.unsplash.com/photo-1658195771962-93726079f35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                      alt=""
                    />
                  </figure>
                  <h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Enim natoque turpis.
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ullamcorper mattis lorem non. Ultrices praesent amet
                    ipsum justo massa. Eu dolor aliquet risus gravida nunc at
                    feugiat consequat purus. Non massa enim vitae duis mattis.
                    Vel in ultricies vel fringilla.
                  </p>
                  <hr />
                  <h2>Lorem Ipsum</h2>
                  <p>
                    Mi tincidunt elit, id quisque ligula ac diam, amet. Vel
                    etiam suspendisse morbi eleifend faucibus eget vestibulum
                    felis. Dictum quis montes, sit sit. Tellus aliquam enim
                    urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi,
                    tellus tincidunt. At feugiat sapien varius id.
                  </p>
                  <p>
                    Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                    volutpat mollis at volutpat lectus velit, sed auctor.
                    Porttitor fames arcu quis fusce augue enim. Quis at habitant
                    diam at. Suscipit tristique risus, at donec. In turpis vel
                    et quam imperdiet. Ipsum molestie aliquet sodales id est ac
                    volutpat.{' '}
                  </p>
                  <figure>
                    <img
                      className="w-full rounded-lg"
                      src="https://images.unsplash.com/photo-1658195771962-93726079f35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                      alt=""
                    />
                    <figcaption>
                      Image courtesy of Katie McBroom via Unsplash
                    </figcaption>
                  </figure>
                  <blockquote>
                    “In a world older and more complete than ours they move
                    finished and complete, gifted with extensions of the senses
                    we have lost or never attained, living by voices we shall
                    never hear.”
                  </blockquote>
                  <p>
                    Dolor enim eu tortor urna sed duis nulla. Aliquam
                    vestibulum, nulla odio nisl vitae. In aliquet pellentesque
                    aenean hac vestibulum turpis mi bibendum diam. Tempor
                    integer aliquam in vitae malesuada fringilla.
                  </p>
                  <p>
                    Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                    imperdiet commodo consectetur convallis risus. Sed
                    condimentum enim dignissim adipiscing faucibus consequat,
                    urna. Viverra purus et erat auctor aliquam. Risus, volutpat
                    vulputate posuere purus sit congue convallis aliquet. Arcu
                    id augue ut feugiat donec porttitor neque. Mauris, neque
                    ultricies eu vestibulum, bibendum quam lorem id. Dolor
                    lacus, eget nunc lectus in tellus, pharetra, porttitor.
                  </p>
                  <p>
                    Ipsum sit mattis nulla quam nulla. Gravida id gravida ac
                    enim mauris id. Non pellentesque congue eget consectetur
                    turpis. Sapien, dictum molestie sem tempor. Diam elit, orci,
                    tincidunt aenean tempus. Quis velit eget ut tortor tellus.
                    Sed vel, congue felis elit erat nam nibh orci.
                  </p>
                  <h2>Diam dui, vel bibendum aliquam in imperdiet mi </h2>
                  <p>
                    Mi tincidunt elit, id quisque ligula ac diam, amet. Vel
                    etiam suspendisse morbi eleifend faucibus eget vestibulum
                    felis. Dictum quis montes, sit sit. Tellus aliquam enim
                    urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi,
                    tellus tincidunt. At feugiat sapien varius id.
                  </p>
                  <h2>Feugiat nibh blandit</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa, in eu elit, vel aliquet sed scelerisque. Ante
                    facilisis adipiscing aliquam egestas nulla. Amet porta odio
                    leo, consequat, at diam amet in pharetra. Eget facilisis
                    vitae magna ullamcorper netus sed maecenas.
                  </p>
                  <ol role="list">
                    <li>Nunc eleifend tellus eu risus porta sollicitudin.</li>
                    <li>Nunc sagittis quam vitae fringilla efficitur.</li>
                    <li>
                      Sed ullamcorper neque et nisl efficitur, eget molestie
                      dolor ultrices.
                    </li>
                    <li>
                      Donec luctus ligula sed sapien dapibus tempus ac at velit.
                    </li>
                  </ol>
                  <figure>
                    <img
                      className="w-full rounded-lg"
                      src="https://images.unsplash.com/photo-1658195771962-93726079f35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                      alt=""
                    />
                    <figcaption>
                      Image courtesy of Omid Armin via Unsplash
                    </figcaption>
                  </figure>
                  <p>
                    Dolor enim eu tortor urna sed duis nulla. Aliquam
                    vestibulum, nulla odio nisl vitae. In aliquet pellentesque
                    aenean hac vestibulum turpis mi bibendum diam. Tempor
                    integer aliquam in vitae malesuada fringilla.
                  </p>
                  <p>
                    Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                    imperdiet commodo consectetur convallis risus. Sed
                    condimentum enim dignissim adipiscing faucibus consequat,
                    urna. Viverra purus et erat auctor aliquam. Risus, volutpat
                    vulputate posuere purus sit congue convallis aliquet. Arcu
                    id augue ut feugiat donec porttitor neque. Mauris, neque
                    ultricies eu vestibulum, bibendum quam lorem id. Dolor
                    lacus, eget nunc lectus in tellus, pharetra, porttitor.
                  </p>
                  <h2>Eu nulla tortor elementum pulvinar eu ipsum.</h2>
                  <p>
                    Mi tincidunt elit, id quisque ligula ac diam, amet. Vel
                    etiam suspendisse morbi eleifend faucibus eget vestibulum
                    felis. Dictum quis montes, sit sit. Tellus aliquam enim
                    urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi,
                    tellus tincidunt. At feugiat sapien varius id.
                  </p>
                  <ul role="list">
                    <li>Cras scelerisque leo quis molestie consectetur.</li>
                    <li>Donec sed risus eget ex rhoncus fermentum eu id mi.</li>
                    <li>
                      Cras et nibh tincidunt, imperdiet risus non, pretium
                      purus.
                    </li>
                    <li>Ut auctor dolor sed augue viverra ultricies.</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 sm:p-2 mb-10 sm:mb-24 w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-4 border-b-8 sm:border-0 border-white">
                    <button
                      type="button"
                      className="group flex items-center gap-3 text-slate-400 text-sm tracking-sm"
                    >
                      <span className="inline-flex items-center justify-center p-3 rounded-md group-hover:bg-slate-100">
                        <svg
                          className="w-6 h-6 text-slate-400 group-hover:text-slate-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9932 5.13581L11.2332 5.78583C11.4232 6.00794 11.7009 6.13581 11.9932 6.13581C12.2854 6.13581 12.5631 6.00794 12.7531 5.78583L11.9932 5.13581ZM3.2642 12.5604L4.0538 11.9468L3.2642 12.5604ZM20.7221 12.5604L19.9325 11.9468L20.7221 12.5604ZM11.4721 20.5408L12.1351 19.7922L11.4721 20.5408ZM11.8502 20.8135L11.5643 21.7718L11.8502 20.8135ZM12.5142 20.5408L11.8512 19.7922L12.5142 20.5408ZM12.1361 20.8135L12.422 21.7718L12.1361 20.8135ZM12.7531 4.4858C10.4594 1.80434 6.50161 0.989451 3.5051 3.54974L4.80429 5.07029C6.81788 3.34983 9.52816 3.79246 11.2332 5.78583L12.7531 4.4858ZM3.5051 3.54974C0.598307 6.03336 0.175977 10.2162 2.4746 13.174L4.0538 11.9468C2.41796 9.84179 2.70098 6.86741 4.80429 5.07029L3.5051 3.54974ZM21.5117 13.174C23.8015 10.2275 23.4444 6.01246 20.4708 3.54097L19.1924 5.07906C21.315 6.84328 21.5772 9.83042 19.9325 11.9468L21.5117 13.174ZM20.4708 3.54097C17.4415 1.02319 13.5344 1.79553 11.2332 4.4858L12.7531 5.78583C14.4506 3.80127 17.1255 3.36113 19.1924 5.07906L20.4708 3.54097ZM2.4746 13.174C3.34712 14.2968 5.05011 15.9836 6.68673 17.5283C8.3425 19.0912 9.99445 20.568 10.8091 21.2895L12.1351 19.7922C11.3274 19.0769 9.69323 17.6159 8.05954 16.0739C6.40669 14.5138 4.81689 12.9287 4.0538 11.9468L2.4746 13.174ZM13.1772 21.2895C13.9919 20.568 15.6438 19.0912 17.2996 17.5283C18.9362 15.9836 20.6392 14.2968 21.5117 13.174L19.9325 11.9468C19.1694 12.9287 17.5796 14.5138 15.9268 16.0739C14.2931 17.6159 12.6589 19.0769 11.8512 19.7922L13.1772 21.2895ZM10.8091 21.2895C10.8881 21.3594 10.9903 21.4509 11.088 21.5245C11.1974 21.6069 11.3545 21.7092 11.5643 21.7718L12.1361 19.8553C12.1859 19.8701 12.2264 19.8888 12.2555 19.9048C12.2821 19.9195 12.2954 19.93 12.2911 19.9268C12.2862 19.9231 12.2727 19.9125 12.2442 19.888C12.2156 19.8634 12.1821 19.8339 12.1351 19.7922L10.8091 21.2895ZM11.8512 19.7922C11.8042 19.8339 11.7707 19.8634 11.7421 19.888C11.7136 19.9125 11.7001 19.9231 11.6952 19.9268C11.6909 19.93 11.7042 19.9195 11.7308 19.9048C11.7599 19.8888 11.8004 19.8701 11.8502 19.8553L12.422 21.7718C12.6318 21.7092 12.7889 21.6069 12.8983 21.5245C12.996 21.4509 13.0982 21.3594 13.1772 21.2895L11.8512 19.7922ZM11.5643 21.7718C11.8433 21.855 12.1431 21.855 12.422 21.7718L11.8502 19.8553C11.9443 19.8272 12.042 19.8272 12.1361 19.8553L11.5643 21.7718Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      378
                    </button>
                    <button
                      type="button"
                      className="group flex items-center gap-3 text-slate-400 text-sm tracking-sm"
                    >
                      <span className="inline-flex items-center justify-center p-3 rounded-md group-hover:bg-slate-100">
                        <svg
                          className="w-6 h-6 text-slate-400 group-hover:text-slate-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 22L18.4292 22.8211C18.7348 23.0336 19.1333 23.0587 19.4632 22.8862C19.7932 22.7138 20 22.3723 20 22H19ZM19 19.9143V18.9143C18.4477 18.9143 18 19.362 18 19.9143H19ZM15.7356 19.9474L15.9168 18.964L15.7356 19.9474ZM16.8236 20.4869L16.2528 21.3079L16.8236 20.4869ZM16.1982 20.0924L15.7856 21.0034L16.1982 20.0924ZM10.218 18.8223L11.109 18.3683L10.218 18.8223ZM11.092 19.6963L11.546 18.8053L11.092 19.6963ZM11.092 11.218L11.546 12.109L11.092 11.218ZM10.218 12.092L11.109 12.546L10.218 12.092ZM21.8478 18.6797L20.9239 18.297L21.8478 18.6797ZM20.908 11.218L20.454 12.109L20.908 11.218ZM21.782 12.092L20.891 12.546L21.782 12.092ZM10.7115 15.7027C11.0996 15.3098 11.0956 14.6766 10.7027 14.2885C10.3098 13.9004 9.67661 13.9044 9.28852 14.2973L10.7115 15.7027ZM6.92474 18.1137L6.21326 17.411L6.92474 18.1137ZM18 11C18 11.5523 18.4477 12 19 12C19.5523 12 20 11.5523 20 11H18ZM5.67596 18.6076L6.43515 17.9568L6.43515 17.9568L5.67596 18.6076ZM6.09695 18.7805L6.01416 17.7839L6.01415 17.7839L6.09695 18.7805ZM2.03168 12.4348L1.04223 12.5797L2.03168 12.4348ZM17.362 2.32698L17.816 1.43597V1.43597L17.362 2.32698ZM18.673 3.63803L19.564 3.18404V3.18404L18.673 3.63803ZM3.63803 2.32698L4.09202 3.21799L3.63803 2.32698ZM2.32698 3.63803L3.21799 4.09202L2.32698 3.63803ZM18.8 10H13.2V12H18.8V10ZM9 14.2V16.7143H11V14.2H9ZM13.2 20.9143H14.9969V18.9143H13.2V20.9143ZM16.2528 21.3079L18.4292 22.8211L19.5708 21.1789L17.3944 19.6658L16.2528 21.3079ZM23 16.9143V14.2H21V16.9143H23ZM20 22V19.9143H18V22H20ZM14.9969 20.9143C15.4052 20.9143 15.4851 20.9181 15.5543 20.9308L15.9168 18.964C15.6265 18.9105 15.3339 18.9143 14.9969 18.9143V20.9143ZM17.3944 19.6658C17.1178 19.4735 16.8797 19.3033 16.6108 19.1815L15.7856 21.0034C15.8497 21.0324 15.9175 21.0749 16.2528 21.3079L17.3944 19.6658ZM15.5543 20.9308C15.6341 20.9455 15.7118 20.9699 15.7856 21.0034L16.6108 19.1815C16.3891 19.0811 16.1561 19.0081 15.9168 18.964L15.5543 20.9308ZM9 16.7143C9 17.2578 8.99922 17.7256 9.03057 18.1093C9.06287 18.5047 9.13419 18.8979 9.32698 19.2763L11.109 18.3683C11.0838 18.3188 11.0461 18.2181 11.0239 17.9465C11.0008 17.6631 11 17.2908 11 16.7143H9ZM13.2 18.9143C12.6234 18.9143 12.2512 18.9135 11.9678 18.8904C11.6962 18.8682 11.5955 18.8305 11.546 18.8053L10.638 20.5873C11.0164 20.7801 11.4096 20.8514 11.805 20.8837C12.1886 20.9151 12.6564 20.9143 13.2 20.9143V18.9143ZM9.32698 19.2763C9.6146 19.8407 10.0735 20.2997 10.638 20.5873L11.546 18.8053C11.3578 18.7094 11.2049 18.5564 11.109 18.3683L9.32698 19.2763ZM13.2 10C12.6564 10 12.1886 9.99922 11.805 10.0306C11.4096 10.0629 11.0164 10.1342 10.638 10.327L11.546 12.109C11.5955 12.0838 11.6962 12.0461 11.9678 12.0239C12.2512 12.0008 12.6234 12 13.2 12V10ZM11 14.2C11 13.6234 11.0008 13.2512 11.0239 12.9678C11.0461 12.6962 11.0838 12.5955 11.109 12.546L9.32698 11.638C9.13419 12.0164 9.06287 12.4096 9.03057 12.805C8.99922 13.1886 9 13.6564 9 14.2H11ZM10.638 10.327C10.0735 10.6146 9.6146 11.0735 9.32698 11.638L11.109 12.546C11.2049 12.3578 11.3578 12.2049 11.546 12.109L10.638 10.327ZM21 16.9143C21 17.3939 20.9995 17.7035 20.9833 17.9405C20.9677 18.1685 20.9411 18.2554 20.9239 18.297L22.7716 19.0623C22.9066 18.7364 22.9561 18.4065 22.9787 18.0767C23.0005 17.7558 23 17.3665 23 16.9143H21ZM19 20.9143C19.4523 20.9143 19.8415 20.9148 20.1624 20.8929C20.4922 20.8704 20.8221 20.8209 21.1481 20.6859L20.3827 18.8382C20.3411 18.8554 20.2542 18.882 20.0262 18.8976C19.7893 18.9137 19.4796 18.9143 19 18.9143V20.9143ZM20.9239 18.297C20.8224 18.542 20.6277 18.7367 20.3827 18.8382L21.1481 20.6859C21.8831 20.3814 22.4672 19.7974 22.7716 19.0623L20.9239 18.297ZM18.8 12C19.3766 12 19.7488 12.0008 20.0322 12.0239C20.3038 12.0461 20.4045 12.0838 20.454 12.109L21.362 10.327C20.9836 10.1342 20.5904 10.0629 20.195 10.0306C19.8114 9.99922 19.3436 10 18.8 10V12ZM23 14.2C23 13.6564 23.0008 13.1886 22.9694 12.805C22.9371 12.4096 22.8658 12.0164 22.673 11.638L20.891 12.546C20.9162 12.5955 20.9539 12.6962 20.9761 12.9678C20.9992 13.2512 21 13.6234 21 14.2H23ZM20.454 12.109C20.6422 12.2049 20.7951 12.3578 20.891 12.546L22.673 11.638C22.3854 11.0735 21.9265 10.6146 21.362 10.327L20.454 12.109ZM6.8 3H14.2V1H6.8V3ZM3 11.4444V6.8H1V11.4444H3ZM6.55556 17.5515V15.9916H4.55556V17.5515H6.55556ZM9.28852 14.2973L6.21326 17.411L7.63623 18.8164L10.7115 15.7027L9.28852 14.2973ZM18 6.8V11H20V6.8H18ZM4.55556 17.5515C4.55556 17.837 4.55461 18.1191 4.57449 18.3439C4.59139 18.5349 4.63564 18.9306 4.91677 19.2585L6.43515 17.9568C6.52357 18.0599 6.55632 18.1549 6.56616 18.1886C6.57498 18.2187 6.57138 18.2204 6.56672 18.1677C6.56232 18.118 6.55905 18.046 6.55731 17.9382C6.55558 17.8313 6.55556 17.7066 6.55556 17.5515H4.55556ZM6.21326 17.411C6.10432 17.5213 6.01666 17.61 5.9403 17.6849C5.8633 17.7604 5.81036 17.8093 5.77231 17.8416C5.73198 17.8758 5.7306 17.872 5.75808 17.8568C5.78873 17.8397 5.87877 17.7952 6.01416 17.7839L6.17975 19.7771C6.61018 19.7413 6.91969 19.4909 7.06593 19.3669C7.23809 19.2209 7.43564 19.0195 7.63623 18.8164L6.21326 17.411ZM4.91676 19.2585C5.23013 19.624 5.69992 19.8169 6.17975 19.7771L6.01415 17.7839C6.1741 17.7706 6.3307 17.8349 6.43515 17.9568L4.91676 19.2585ZM1 11.4444C1 11.9252 0.997339 12.2732 1.04223 12.5797L3.02112 12.2899C3.00266 12.1639 3 11.9959 3 11.4444H1ZM1.04223 12.5797C1.29837 14.3283 2.67166 15.7016 4.42027 15.9578L4.71014 13.9789C3.83583 13.8508 3.14918 13.1642 3.02112 12.2899L1.04223 12.5797ZM14.2 3C15.0566 3 15.6389 3.00078 16.089 3.03755C16.5274 3.07337 16.7516 3.1383 16.908 3.21799L17.816 1.43597C17.3306 1.18868 16.8139 1.09012 16.2518 1.04419C15.7014 0.999222 15.0236 1 14.2 1V3ZM20 6.8C20 5.97642 20.0008 5.2986 19.9558 4.74817C19.9099 4.18608 19.8113 3.66937 19.564 3.18404L17.782 4.09202C17.8617 4.24842 17.9266 4.47262 17.9624 4.91104C17.9992 5.36113 18 5.94342 18 6.8H20ZM16.908 3.21799C17.2843 3.40973 17.5903 3.71569 17.782 4.09202L19.564 3.18404C19.1805 2.43139 18.5686 1.81947 17.816 1.43597L16.908 3.21799ZM6.8 1C5.97642 1 5.2986 0.999222 4.74817 1.04419C4.18608 1.09012 3.66937 1.18868 3.18404 1.43597L4.09202 3.21799C4.24842 3.1383 4.47262 3.07337 4.91104 3.03755C5.36113 3.00078 5.94342 3 6.8 3V1ZM3 6.8C3 5.94342 3.00078 5.36113 3.03755 4.91104C3.07337 4.47262 3.1383 4.24842 3.21799 4.09202L1.43597 3.18404C1.18868 3.66937 1.09012 4.18608 1.04419 4.74817C0.999222 5.2986 1 5.97642 1 6.8H3ZM3.18404 1.43597C2.43139 1.81947 1.81947 2.43139 1.43597 3.18404L3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799L3.18404 1.43597ZM6.55556 15.9916C6.55556 14.8142 5.59828 14.109 4.71014 13.9789L4.42027 15.9578C4.50012 15.9695 4.54639 16.0016 4.56126 16.0162C4.56721 16.0221 4.56476 16.0216 4.56092 16.0128C4.5591 16.0086 4.55758 16.004 4.55659 15.9993C4.55613 15.997 4.55585 15.9952 4.5557 15.9937C4.55555 15.9923 4.55556 15.9915 4.55556 15.9916H6.55556Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      33
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-6 bg-white sm:bg-transparent border-y sm:border-0 border-gray-200">
                    <ul className="flex items-center">
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                        >
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.8513 7.47974C20.8592 7.67764 20.8618 7.87546 20.8618 8.07336C20.8618 14.0734 16.5286 21 8.60453 21C6.1704 21 3.90702 20.2444 2 18.958C2.3371 18.994 2.67946 19.021 3.02706 19.021C5.04528 19.021 6.90415 18.2922 8.37863 17.0689C6.4935 17.0419 4.90169 15.7195 4.3527 13.9204C4.61625 13.9744 4.88767 14.0015 5.16523 14.0015C5.55661 14.0015 5.93661 13.9476 6.30085 13.8396C4.32817 13.4258 2.84232 11.5908 2.84232 9.38689C2.84232 9.3599 2.84232 9.35086 2.84232 9.33287C3.4237 9.6657 4.08914 9.87249 4.79573 9.89948C3.63821 9.08089 2.87732 7.68662 2.87732 6.11241C2.87732 5.28482 3.08921 4.50218 3.46221 3.82752C5.58637 6.58014 8.76214 8.38826 12.3424 8.57716C12.2689 8.24433 12.2312 7.89359 12.2312 7.54277C12.2312 5.03303 14.1601 3 16.5399 3C17.7789 3 18.8979 3.5488 19.6833 4.43036C20.6665 4.23246 21.5877 3.85468 22.4212 3.33294C22.0981 4.39441 21.416 5.28478 20.5247 5.8425C21.3968 5.73455 22.2286 5.49186 23 5.13204C22.4212 6.04058 21.6927 6.84106 20.8513 7.47974Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                        >
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.888672 12.0118C0.888672 17.5059 4.90124 22.074 10.1484 23L10.2104 22.9505C10.1897 22.9465 10.1691 22.9424 10.1485 22.9383V15.0984H7.37054V12.0118H10.1485V9.5425C10.1485 6.76457 11.9387 5.22127 14.4697 5.22127C15.2722 5.22127 16.1365 5.34474 16.939 5.4682V8.30786H15.5191C14.161 8.30786 13.8524 8.98691 13.8524 9.85116V12.0118H16.8155L16.3217 15.0984H13.8524V22.9383C13.8317 22.9424 13.8111 22.9465 13.7904 22.9505L13.8524 23C19.0996 22.074 23.1121 17.5059 23.1121 12.0118C23.1121 5.9003 18.1119 0.900024 12.0004 0.900024C5.88895 0.900024 0.888672 5.9003 0.888672 12.0118Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                        >
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.41961 2C2.63558 2 2 2.63558 2 3.41961V20.5804C2 21.3644 2.63558 22 3.41961 22H20.5804C21.3644 22 22 21.3644 22 20.5804V3.41961C22 2.63558 21.3644 2 20.5804 2H3.41961ZM6.48908 8.21103C7.44729 8.21103 8.22408 7.43424 8.22408 6.47603C8.22408 5.51781 7.44729 4.74102 6.48908 4.74102C5.53087 4.74102 4.75409 5.51781 4.75409 6.47603C4.75409 7.43424 5.53087 8.21103 6.48908 8.21103ZM9.81304 9.49324H12.6885V10.8105C12.6885 10.8105 13.4688 9.24991 15.5918 9.24991C17.4857 9.24991 19.0546 10.1829 19.0546 13.0266V19.0233H16.0748V13.7533C16.0748 12.0757 15.1792 11.8912 14.4967 11.8912C13.0804 11.8912 12.8379 13.1129 12.8379 13.9721V19.0233H9.81304V9.49324ZM8.00152 9.49325H4.97664V19.0233H8.00152V9.49325Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                        >
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.801 12.401C10.4702 11.9588 9.84347 11.8685 9.40122 12.1993C8.95897 12.5301 8.86863 13.1568 9.19943 13.599L10.801 12.401ZM17.5402 13.54L16.8331 12.8329L16.833 12.833L17.5402 13.54ZM20.5402 10.54L21.2473 11.2471C21.2514 11.243 21.2555 11.2389 21.2595 11.2347L20.5402 10.54ZM13.4702 3.47003L12.7755 2.75074C12.772 2.75409 12.7686 2.75746 12.7652 2.76086L13.4702 3.47003ZM11.0452 4.47086C10.6535 4.86024 10.6516 5.49341 11.041 5.88507C11.4304 6.27673 12.0636 6.27858 12.4552 5.88919L11.0452 4.47086ZM13.1994 11.599C13.5302 12.0413 14.1569 12.1316 14.5992 11.8008C15.0414 11.47 15.1318 10.8433 14.801 10.401L13.1994 11.599ZM6.4602 10.46L7.16731 11.1671L7.16743 11.167L6.4602 10.46ZM3.4602 13.46L2.75309 12.7529C2.749 12.757 2.74494 12.7611 2.74091 12.7653L3.4602 13.46ZM10.5302 20.53L11.2249 21.2493C11.2291 21.2453 11.2332 21.2412 11.2373 21.2371L10.5302 20.53ZM12.9473 19.5271C13.3378 19.1366 13.3378 18.5034 12.9473 18.1129C12.5568 17.7224 11.9236 17.7224 11.5331 18.1129L12.9473 19.5271ZM9.19943 13.599C9.71478 14.288 10.3723 14.858 11.1273 15.2705L12.0862 13.5154C11.5829 13.2404 11.1445 12.8604 10.801 12.401L9.19943 13.599ZM11.1273 15.2705C11.8823 15.683 12.7172 15.9283 13.5754 15.9898L13.7183 13.9949C13.1462 13.9539 12.5896 13.7904 12.0862 13.5154L11.1273 15.2705ZM13.5754 15.9898C14.4336 16.0513 15.2949 15.9274 16.101 15.6267L15.402 13.7529C14.8646 13.9533 14.2904 14.0359 13.7183 13.9949L13.5754 15.9898ZM16.101 15.6267C16.9072 15.326 17.6392 14.8555 18.2474 14.247L16.833 12.833C16.4275 13.2387 15.9394 13.5524 15.402 13.7529L16.101 15.6267ZM18.2473 14.2471L21.2473 11.2471L19.8331 9.83292L16.8331 12.8329L18.2473 14.2471ZM21.2595 11.2347C22.3524 10.1031 22.9572 8.58751 22.9435 7.01433L20.9436 7.03171C20.9527 8.0805 20.5495 9.09091 19.8209 9.84531L21.2595 11.2347ZM22.9435 7.01433C22.9299 5.44115 22.2988 3.93628 21.1864 2.82383L19.7722 4.23804C20.5138 4.97967 20.9345 5.98292 20.9436 7.03171L22.9435 7.01433ZM21.1864 2.82383C20.074 1.71138 18.5691 1.08036 16.9959 1.06669L16.9785 3.06662C18.0273 3.07573 19.0306 3.49641 19.7722 4.23804L21.1864 2.82383ZM16.9959 1.06669C15.4227 1.05302 13.9071 1.65779 12.7755 2.75074L14.1649 4.18931C14.9193 3.46068 15.9297 3.0575 16.9785 3.06662L16.9959 1.06669ZM12.7652 2.76086L11.0452 4.47086L12.4552 5.88919L14.1752 4.17919L12.7652 2.76086ZM14.801 10.401C14.2856 9.71209 13.6281 9.14203 12.8731 8.72952L11.9142 10.4847C12.4175 10.7597 12.8559 11.1397 13.1994 11.599L14.801 10.401ZM12.8731 8.72952C12.1181 8.31701 11.2832 8.07171 10.425 8.01025L10.2821 10.0051C10.8542 10.0461 11.4108 10.2096 11.9142 10.4847L12.8731 8.72952ZM10.425 8.01025C9.56681 7.94879 8.70546 8.07261 7.89935 8.37331L8.59836 10.2472C9.13577 10.0467 9.71 9.96416 10.2821 10.0051L10.425 8.01025ZM7.89935 8.37331C7.09324 8.67401 6.36123 9.14456 5.75296 9.75305L7.16743 11.167C7.57294 10.7613 8.06095 10.4476 8.59836 10.2472L7.89935 8.37331ZM5.75309 9.75292L2.75309 12.7529L4.16731 14.1671L7.16731 11.1671L5.75309 9.75292ZM2.74091 12.7653C1.64796 13.8969 1.0432 15.4125 1.05687 16.9857L3.05679 16.9683C3.04768 15.9196 3.45086 14.9091 4.17949 14.1547L2.74091 12.7653ZM1.05687 16.9857C1.07054 18.5589 1.70155 20.0638 2.814 21.1762L4.22821 19.762C3.48658 19.0204 3.06591 18.0171 3.05679 16.9683L1.05687 16.9857ZM2.814 21.1762C3.92645 22.2887 5.43132 22.9197 7.0045 22.9334L7.02188 20.9334C5.9731 20.9243 4.96985 20.5036 4.22821 19.762L2.814 21.1762ZM7.0045 22.9334C8.57768 22.947 10.0933 22.3423 11.2249 21.2493L9.83549 19.8107C9.08108 20.5394 8.07067 20.9425 7.02188 20.9334L7.0045 22.9334ZM11.2373 21.2371L12.9473 19.5271L11.5331 18.1129L9.82309 19.8229L11.2373 21.2371Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="flex items-center relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
                      <Menu
                        as="div"
                        className="relative inline-block text-left ml-4"
                      >
                        <div>
                          <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <svg
                              className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 21L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21H19ZM5 21H4C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L5 21ZM12 17L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L12 17ZM17.362 3.32698L17.816 2.43597L17.362 3.32698ZM18.673 4.63803L19.564 4.18404L18.673 4.63803ZM6.63803 3.32698L6.18404 2.43597L6.63803 3.32698ZM5.32698 4.63803L4.43597 4.18404L5.32698 4.63803ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7H13ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM9.8 4H14.2V2H9.8V4ZM18 7.8V21H20V7.8H18ZM6 21V7.8H4V21H6ZM19.4961 20.1318L12.4961 16.1318L11.5039 17.8682L18.5039 21.8682L19.4961 20.1318ZM11.5039 16.1318L4.50386 20.1318L5.49614 21.8682L12.4961 17.8682L11.5039 16.1318ZM14.2 4C15.0566 4 15.6389 4.00078 16.089 4.03755C16.5274 4.07337 16.7516 4.1383 16.908 4.21799L17.816 2.43597C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7014 1.99922 15.0236 2 14.2 2V4ZM20 7.8C20 6.97642 20.0008 6.2986 19.9558 5.74817C19.9099 5.18608 19.8113 4.66937 19.564 4.18404L17.782 5.09202C17.8617 5.24842 17.9266 5.47262 17.9624 5.91104C17.9992 6.36113 18 6.94342 18 7.8H20ZM16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202L19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43597L16.908 4.21799ZM9.8 2C8.97642 2 8.2986 1.99922 7.74817 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43597L7.09202 4.21799C7.24842 4.1383 7.47262 4.07337 7.91104 4.03755C8.36113 4.00078 8.94342 4 9.8 4V2ZM6 7.8C6 6.94342 6.00078 6.36113 6.03755 5.91104C6.07337 5.47262 6.1383 5.24842 6.21799 5.09202L4.43597 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74817C3.99922 6.2986 4 6.97642 4 7.8H6ZM6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404L6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799L6.18404 2.43597ZM13 13V7H11V13H13ZM9 11H15V9H9V11Z"
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
                            <div disabled>
                              <div className="relative flex items-center justify-between w-full px-6 py-4">
                                <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      id="private-list"
                                      name="list"
                                      type="checkbox"
                                      className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label
                                      htmlFor="private-list"
                                      className="text-sm font-medium text-slate-800 tracking-sm"
                                    >
                                      Private List
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <svg
                                    className="w-6 h-6 text-slate-400"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16 10.5C16 11.0523 16.4477 11.5 17 11.5C17.5523 11.5 18 11.0523 18 10.5H16ZM6 10.5C6 11.0523 6.44772 11.5 7 11.5C7.55228 11.5 8 11.0523 8 10.5H6ZM13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15H13ZM11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17H11ZM5.63803 21.173L5.18404 22.064L5.63803 21.173ZM4.32698 19.862L3.43597 20.316L4.32698 19.862ZM19.673 19.862L20.564 20.316L19.673 19.862ZM18.362 21.173L18.816 22.064L18.362 21.173ZM18.362 10.827L18.816 9.93597L18.362 10.827ZM19.673 12.138L20.564 11.684L19.673 12.138ZM5.63803 10.827L5.18404 9.93597L5.63803 10.827ZM4.32698 12.138L3.43597 11.684L4.32698 12.138ZM16 8.5V10.5H18V8.5H16ZM8 10.5V8.5H6V10.5H8ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H18C18 5.18629 15.3137 2.5 12 2.5V4.5ZM12 2.5C8.68629 2.5 6 5.18629 6 8.5H8C8 6.29086 9.79086 4.5 12 4.5V2.5ZM11 15V17H13V15H11ZM8.8 11.5H15.2V9.5H8.8V11.5ZM19 15.3V16.7H21V15.3H19ZM15.2 20.5H8.8V22.5H15.2V20.5ZM5 16.7V15.3H3V16.7H5ZM8.8 20.5C7.94342 20.5 7.36113 20.4992 6.91104 20.4624C6.47262 20.4266 6.24842 20.3617 6.09202 20.282L5.18404 22.064C5.66937 22.3113 6.18608 22.4099 6.74817 22.4558C7.2986 22.5008 7.97642 22.5 8.8 22.5V20.5ZM3 16.7C3 17.5236 2.99922 18.2014 3.04419 18.7518C3.09012 19.3139 3.18868 19.8306 3.43597 20.316L5.21799 19.408C5.1383 19.2516 5.07337 19.0274 5.03755 18.589C5.00078 18.1389 5 17.5566 5 16.7H3ZM6.09202 20.282C5.7157 20.0903 5.40973 19.7843 5.21799 19.408L3.43597 20.316C3.81947 21.0686 4.43139 21.6805 5.18404 22.064L6.09202 20.282ZM19 16.7C19 17.5566 18.9992 18.1389 18.9624 18.589C18.9266 19.0274 18.8617 19.2516 18.782 19.408L20.564 20.316C20.8113 19.8306 20.9099 19.3139 20.9558 18.7518C21.0008 18.2014 21 17.5236 21 16.7H19ZM15.2 22.5C16.0236 22.5 16.7014 22.5008 17.2518 22.4558C17.8139 22.4099 18.3306 22.3113 18.816 22.064L17.908 20.282C17.7516 20.3617 17.5274 20.4266 17.089 20.4624C16.6389 20.4992 16.0566 20.5 15.2 20.5V22.5ZM18.782 19.408C18.5903 19.7843 18.2843 20.0903 17.908 20.282L18.816 22.064C19.5686 21.6805 20.1805 21.0686 20.564 20.316L18.782 19.408ZM15.2 11.5C16.0566 11.5 16.6389 11.5008 17.089 11.5376C17.5274 11.5734 17.7516 11.6383 17.908 11.718L18.816 9.93597C18.3306 9.68868 17.8139 9.59012 17.2518 9.54419C16.7014 9.49922 16.0236 9.5 15.2 9.5V11.5ZM21 15.3C21 14.4764 21.0008 13.7986 20.9558 13.2482C20.9099 12.6861 20.8113 12.1694 20.564 11.684L18.782 12.592C18.8617 12.7484 18.9266 12.9726 18.9624 13.411C18.9992 13.8611 19 14.4434 19 15.3H21ZM17.908 11.718C18.2843 11.9097 18.5903 12.2157 18.782 12.592L20.564 11.684C20.1805 10.9314 19.5686 10.3195 18.816 9.93597L17.908 11.718ZM8.8 9.5C7.97642 9.5 7.2986 9.49922 6.74817 9.54419C6.18608 9.59012 5.66937 9.68868 5.18404 9.93597L6.09202 11.718C6.24842 11.6383 6.47262 11.5734 6.91104 11.5376C7.36113 11.5008 7.94342 11.5 8.8 11.5V9.5ZM5 15.3C5 14.4434 5.00078 13.8611 5.03755 13.411C5.07337 12.9726 5.1383 12.7484 5.21799 12.592L3.43597 11.684C3.18868 12.1694 3.09012 12.6861 3.04419 13.2482C2.99922 13.7986 3 14.4764 3 15.3H5ZM5.18404 9.93597C4.43139 10.3195 3.81947 10.9314 3.43597 11.684L5.21799 12.592C5.40973 12.2157 5.71569 11.9097 6.09202 11.718L5.18404 9.93597Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div disabled>
                              <div className="relative flex items-center w-full px-6 py-4">
                                <div className="flex items-center h-5">
                                  <input
                                    id="public-list"
                                    name="list"
                                    type="checkbox"
                                    className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="public-list"
                                    className="text-sm font-medium text-slate-800 tracking-sm"
                                  >
                                    Public List
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => setCreateNewList(true)}
                                className="flex items-center justify-center w-full px-6 py-4 text-purple-700 text-base tracking-sm text-center hover:bg-slate-50"
                              >
                                Create new list
                              </button>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
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
                                Show less like this
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              >
                                Unfollow this author
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              >
                                Mute this publication
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-3 text-slate-600 text-base tracking-sm text-center transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
                              >
                                Report
                              </button>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 py-8 px-4 sm:p-8 rounded-md">
                  <div className="flex items-center justify-between gap-2 mb-10">
                    <div>
                      <p className="text-slate-600 mb-1 text-xl tracking-md">
                        More from{' '}
                        <span className="text-slate-700 font-semibold">
                          Olivia Rhye
                        </span>
                      </p>
                      <p className="max-w-xl text-slate-600 text-xs tracking-sm">
                        Faucibus consequat, massa risus, dignissim interdum
                        feugiat sollicitudin tortor. Volutpat, elementum diam id
                        nunc pellentesque suspendisse sagittis.{' '}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      Follow
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <PostCard
                        key={post.id}
                        noActiveBookmark={true}
                        normalMenu={true}
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
                  </div>
                  <div className="pt-10 border-t border-gray-200 text-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      Read more from Olivia Rhye
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar
                profile
                whoToFollow
                popularTopics
                popularStories
                followButton
              />
            </div>
          </div>
        </div>
        {createNewList && (
          <div className="relative z-30">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="relative max-w-[400px] w-full bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 ring-8 ring-purple-50">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 21V16M3.5 6V1M1 3.5H6M1 18.5H6M12 2L10.2658 6.50886C9.98381 7.24209 9.84281 7.60871 9.62353 7.91709C9.42919 8.1904 9.1904 8.42919 8.91709 8.62353C8.60871 8.8428 8.24209 8.98381 7.50886 9.26582L3 11L7.50886 12.7342C8.24209 13.0162 8.60871 13.1572 8.91709 13.3765C9.1904 13.5708 9.42919 13.8096 9.62353 14.0829C9.84281 14.3913 9.98381 14.7579 10.2658 15.4911L12 20L13.7342 15.4911C14.0162 14.7579 14.1572 14.3913 14.3765 14.0829C14.5708 13.8096 14.8096 13.5708 15.0829 13.3765C15.3913 13.1572 15.7579 13.0162 16.4911 12.7342L21 11L16.4911 9.26582C15.7579 8.98381 15.3913 8.8428 15.0829 8.62353C14.8096 8.42919 14.5708 8.1904 14.3765 7.91709C14.1572 7.60871 14.0162 7.24209 13.7342 6.50886L12 2Z"
                          stroke="#7C3AED"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCreateNewList(false)}
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
                        Create List
                      </h3>
                      <span className="text-slate-500 text-sm tracking-sm">
                        Please enter a name for this list.
                      </span>
                    </div>
                    <form action="">
                      <div className="mb-6">
                        <label
                          htmlFor="list-name"
                          className="block text-slate-700 text-sm font-medium tracking-sm mb-1.5"
                        >
                          {' '}
                          List name{' '}
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="list-name"
                            id="list-name"
                            placeholder="e.g. App"
                            className="block w-full min-h-[44px] text-slate-500 border-slate-300 rounded-md shadow-sm tracking-sm placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <Switch.Group as="div" className="flex items-center">
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          className={classNames(
                            enabled ? 'bg-purple-600' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              enabled ? 'translate-x-4' : 'translate-x-0',
                              'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                        <Switch.Label as="span" className="ml-3">
                          <span className="text-base font-medium tracking-sm text-slate-700">
                            Private
                          </span>
                        </Switch.Label>
                      </Switch.Group>
                    </form>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCreateNewList(false)}
                      className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Create
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
