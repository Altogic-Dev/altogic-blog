import WhoToFollow from '@/components/sidebar/WhoToFollow';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import SidebarTitle from '../components/SidebarTitle';

const storiesFollows = [
  {
    id: 0,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    badge: 3,
  },
  {
    id: 1,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    badge: 5,
  },
  {
    id: 2,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    badge: 7,
  },
  {
    id: 3,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 4,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 5,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 6,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 7,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 8,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 9,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    id: 10,
    name: 'Oliva Rhy',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
];

const topics = [
  {
    id: 0,
    name: 'Technology',
    href: '#',
  },
  {
    id: 1,
    name: 'Money',
    href: '#',
  },
  {
    id: 2,
    name: 'App',
    href: '#',
  },
  {
    id: 3,
    name: 'Mindfulness',
    href: '#',
  },
  {
    id: 4,
    name: 'Art',
    href: '#',
  },
  {
    id: 5,
    name: 'Yoga',
    href: '#',
  },
  {
    id: 6,
    name: 'Caravan Camping',
    href: '#',
  },
];

const stories = [
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

const followings = [
  {
    id: 0,
    href: '#',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Emilia Gates',
  },
  {
    id: 1,
    href: '#',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Marley Rhiel Madsen',
  },
  {
    id: 2,
    href: '#',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Omar Lipshutz',
  },
  {
    id: 3,
    href: '#',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Emma Laurden',
  },
  {
    id: 4,
    href: '#',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Olivia Rhye',
  },
];

export default function Sidebar({
  topicMatch,

  storiesYouFollow,
  popularTopics,
  popularStories,
  mobilePopularStories,
  profile,
  following,
  followButton,
  editButton,
  publicationProfile,
}) {
  return (
    <>
      <form action="" className="hidden lg:block">
        <div>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-purple-500 focus:border-purple-500 block w-full h-11 pl-10 sm:text-sm text-gray-500 border-gray-300 rounded-md placeholder:text-gray-500"
              placeholder="Search"
            />
          </div>
        </div>
      </form>
      {publicationProfile && (
        <div className="space-y-6">
          <img
            className="w-[200px] h-[51px]"
            src="./logo-hithemes.svg"
            alt="HiThemes"
          />
          <p className="text-slate-500 text-sm tracking-sm">
            Faucibus consequat, massa risus, dignissim interdum feugiat
            sollicitudin tortor. Volutpat, elementum diam id nunc pellentesque
            suspendisse sagittis. Pharetra, pulvinar augue nunc ut.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700"
          >
            More information
            <svg
              className="w-5 h-5 text-purple-700"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-slate-600 mb-2 text-base tracking-sm">
              Followers
            </h2>
            <span className="text-slate-500 text-sm tracking-sm">13</span>
          </div>
          <div>
            <h2 className="text-slate-600 mb-2 text-base tracking-sm">
              Elsewhere
            </h2>
            <ul className="flex items-center">
              <li>
                <button
                  type="button"
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
                </button>
              </li>
              <li>
                <button
                  type="button"
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
                </button>
              </li>
              <li>
                <button
                  type="button"
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
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {topicMatch && (
        <div>
          <SidebarTitle title="Topics matching Development" spacing="mb-4" />
          <div className="flex flex-wrap gap-x-2 gap-y-4">
            {topics.map((topic) => (
              <a
                key={topic.id}
                href={topic.href}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>
      )}
      {profile && (
        <div>
          <img
            className="w-20 h-20 mb-3 rounded-full"
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div className="tracking-sm">
            <h2 className="text-slate-700 text-base font-medium">
              Olivia Rhye
            </h2>
            <span className="inline-block mb-3 text-slate-500 text-sm">
              9.5k Followers
            </span>
            <p className="text-slate-500 text-xs mb-8">
              Faucibus consequat, massa risus, dignissim interdum feugiat
              sollicitudin tortor. Volutpat, elementum diam id nunc pellentesque
              suspendisse sagittis. Pharetra, pulvinar augue nunc ut malesuada
              sed laoreet. Interdum pellentesque adipiscing sagittis, tincidunt.
              Varius nec egestas eget venenatis, risus adipiscing auctor.
            </p>
            <div className="grid grid-cols-2 lg:flex lg:items-center gap-4">
              {followButton && (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M10.0001 13.75C10.4603 13.75 10.8334 13.3769 10.8334 12.9167C10.8334 12.4564 10.4603 12.0833 10.0001 12.0833V13.75ZM4.03246 13.0602L4.27437 13.8576L4.03246 13.0602ZM0.833415 17.5C0.833415 17.9602 1.20651 18.3333 1.66675 18.3333C2.12699 18.3333 2.50008 17.9602 2.50008 17.5H0.833415ZM1.81028 15.2824L2.60773 15.5243L1.81028 15.2824ZM15.0001 17.5C15.0001 17.9602 15.3732 18.3333 15.8334 18.3333C16.2937 18.3333 16.6667 17.9602 16.6667 17.5H15.0001ZM16.6667 12.5C16.6667 12.0398 16.2937 11.6667 15.8334 11.6667C15.3732 11.6667 15.0001 12.0398 15.0001 12.5H16.6667ZM13.3334 14.1667C12.8732 14.1667 12.5001 14.5398 12.5001 15C12.5001 15.4602 12.8732 15.8333 13.3334 15.8333V14.1667ZM18.3334 15.8333C18.7937 15.8333 19.1667 15.4602 19.1667 15C19.1667 14.5398 18.7937 14.1667 18.3334 14.1667V15.8333ZM6.25009 13.75H10.0001V12.0833H6.25009V13.75ZM6.25009 12.0833C5.14774 12.0833 4.41183 12.0743 3.79056 12.2627L4.27437 13.8576C4.59942 13.759 5.02648 13.75 6.25009 13.75V12.0833ZM2.50008 17.5C2.50008 16.2764 2.50913 15.8493 2.60773 15.5243L1.01283 15.0405C0.824369 15.6617 0.833415 16.3977 0.833415 17.5H2.50008ZM3.79056 12.2627C2.45889 12.6667 1.41679 13.7088 1.01283 15.0405L2.60773 15.5243C2.85011 14.7253 3.47537 14.1 4.27437 13.8576L3.79056 12.2627ZM11.2501 6.25C11.2501 7.86083 9.94425 9.16667 8.33342 9.16667V10.8333C10.8647 10.8333 12.9167 8.78131 12.9167 6.25H11.2501ZM8.33342 9.16667C6.72258 9.16667 5.41675 7.86083 5.41675 6.25H3.75008C3.75008 8.78131 5.80211 10.8333 8.33342 10.8333V9.16667ZM5.41675 6.25C5.41675 4.63917 6.72258 3.33333 8.33342 3.33333V1.66667C5.80211 1.66667 3.75008 3.71869 3.75008 6.25H5.41675ZM8.33342 3.33333C9.94425 3.33333 11.2501 4.63917 11.2501 6.25H12.9167C12.9167 3.71869 10.8647 1.66667 8.33342 1.66667V3.33333ZM16.6667 17.5V12.5H15.0001V17.5H16.6667ZM13.3334 15.8333H18.3334V14.1667H13.3334V15.8333Z"
                        fill="currentColor"
                      />
                    </svg>
                    Follow
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <g clipPath="url(#clip0_736_24616)">
                        <path
                          d="M11.5293 3.33333H5.66675C4.26662 3.33333 3.56655 3.33333 3.03177 3.60581C2.56137 3.8455 2.17892 4.22795 1.93923 4.69835C1.66675 5.23313 1.66675 5.9332 1.66675 7.33333V12.6667C1.66675 14.0668 1.66675 14.7669 1.93923 15.3016C2.17892 15.772 2.56137 16.1545 3.03177 16.3942C3.56655 16.6667 4.26662 16.6667 5.66675 16.6667H14.3334C15.7335 16.6667 16.4336 16.6667 16.9684 16.3942C17.4388 16.1545 17.8212 15.772 18.0609 15.3016C18.3334 14.7669 18.3334 14.0668 18.3334 12.6667V8.33333M1.66675 5.83333L8.47085 10.5962C9.02182 10.9819 9.29731 11.1747 9.59697 11.2494C9.86166 11.3154 10.1385 11.3154 10.4032 11.2494C10.7029 11.1747 10.9783 10.9819 11.5293 10.5962L14.3334 8.33333"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.6667 5.83333C15.6667 6.38561 16.1145 6.83333 16.6667 6.83333C17.219 6.83333 17.6667 6.38561 17.6667 5.83333H15.6667ZM17.6667 0.833328C17.6667 0.281043 17.219 -0.166672 16.6667 -0.166672C16.1145 -0.166672 15.6667 0.281043 15.6667 0.833328H17.6667ZM14.1667 2.33333C13.6145 2.33333 13.1667 2.78104 13.1667 3.33333C13.1667 3.88561 13.6145 4.33333 14.1667 4.33333V2.33333ZM19.1667 4.33333C19.719 4.33333 20.1667 3.88561 20.1667 3.33333C20.1667 2.78104 19.719 2.33333 19.1667 2.33333V4.33333ZM17.6667 5.83333V0.833328H15.6667V5.83333H17.6667ZM14.1667 4.33333H19.1667V2.33333H14.1667V4.33333Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_736_24616">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Subscribe
                  </button>
                </>
              )}
              {editButton && (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 col-span-2 w-full lg:w-auto px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {following && (
        <div>
          <SidebarTitle title="Following" spacing="mb-4" />
          <div className="flex flex-col gap-3">
            {followings.map((following) => (
              <a
                key={following.id}
                href={following.href}
                className="inline-flex items-center gap-2 text-slate-700 text-sm font-medium tracking-sm hover:text-purple-700"
              >
                <img
                  className="w-6 h-6 rounded-full"
                  src={following.image}
                  alt={following.name}
                />
                <span>{following.name}</span>
              </a>
            ))}
            <Link href="#">
              <a className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700">
                See all (221)
                <svg
                  className="w-5 h-5 text-purple-700"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      )}
      {mobilePopularStories && (
        <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
          <span className="text-slate-700 text-sm font-semibold tracking-sm">
            Popular Stories
          </span>
          <Link href="#">
            <p className="inline-flex items-center gap-2 text-xs tracking-sm text-purple-700">
              See all popular stories
              <svg
                className="w-5 h-5 text-purple-700"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </Link>
        </div>
      )}
      {storiesYouFollow && (
        <div>
          <SidebarTitle title="Stories you follow" spacing="mb-4" />
          <div className="flex items-center gap-3 overflow-x-auto">
            {storiesFollows.map((storiesFollow) => (
              <a
                key={storiesFollow.id}
                href={storiesFollow.href}
                className="relative w-14 h-14 flex-shrink-0"
              >
                <img
                  className="rounded-full"
                  src={storiesFollow.image}
                  alt={storiesFollow.name}
                />
                {storiesFollow.badge && (
                  <span className="inline-flex items-center justify-center absolute bottom-0 right-0 w-[18px] h-[18px] bg-purple-500 text-white text-xs tracking-sm rounded-full ring-2 ring-white">
                    {storiesFollow.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
      <WhoToFollow />
      {popularTopics && (
        <div>
          <SidebarTitle title="Popular Topics" spacing="mb-4" />
          <div className="flex flex-wrap gap-x-2 gap-y-4">
            {topics.map((topic) => (
              <a
                key={topic.id}
                href={topic.href}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>
      )}
      {popularStories && (
        <div>
          <SidebarTitle title="Popular Stories" spacing="mb-4" />
          <ul className="space-y-3">
            {stories.map((story) => (
              <li key={story.id} className="flex gap-3">
                <img
                  className="rounded-full w-[30px] h-[30px]"
                  src={story.image}
                  alt={story.name}
                />
                <span className="text-sm font-light tracking-sm text-slate-500">
                  <strong className="text-slate-600 font-semibold">
                    {story.name}
                  </strong>{' '}
                  {story.intermediateText}{' '}
                  <strong className="text-slate-600 font-semibold">
                    {story.desc}
                  </strong>{' '}
                  <span className="text-slate-400 text-xs">{story.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
