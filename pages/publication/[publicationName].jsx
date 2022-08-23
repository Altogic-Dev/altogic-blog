/* eslint-disable import/no-unresolved */
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from '@/layout/SideBar';
import Layout from '@/layout/Layout';
import PublicationPostCard from '../../components/PublicationsPostCard';

const posts = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: true,
    firstPadding: true,
    bigImage: true,
  },
];

const latests = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: false,
    firstPadding: false,
    bigImage: false,
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: false,
    firstPadding: false,
    bigImage: false,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    title: 'Fermentum massa tincidunt placerat.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, euaugue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.',
    readMoreUrl: '#',
    personName: 'Olivia Rhye',
    date: 'June 29',
    storiesCount: '2',
    bookmark: false,
    firstPadding: false,
    bigImage: false,
  },
];

export default function Publications() {
  const router = useRouter();
  const { publicationName } = router.query;

  console.log(publicationName);
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="mt-[100px] mb-20">
            <img
              className="mb-[60px] w-[300px] h-[76px]"
              src="/logo-hithemes.svg"
              alt=""
            />
            <h2 className="text-slate-600 max-w-4xl text-2xl tracking-md">
              Beautiful, responsive, and easy-to-use HiThemes themes for your
              website are now with you.
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4 py-3 mb-8 border-b border-gray-200">
              <ul className="flex items-center gap-4">
                <li className="flex items-center justify-center">
                  <a
                    href="#"
                    className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                  >
                    Navigation One
                  </a>
                </li>
                <li className="flex items-center justify-center">
                  <a
                    href="#"
                    className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                  >
                    Navigation Two
                  </a>
                </li>
              </ul>
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
              </ul>
            </div>
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8 mb-[60px]">
              <div className="lg:pl-8 lg:pr-8 divide-y divide-gray-200">
                {posts.map((post, index) => (
                  <PublicationPostCard
                    key={index}
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    readMoreUrl={post.readMoreUrl}
                    personName={post.personName}
                    date={post.date}
                    storiesCount={post.storiesCount}
                    bookmark={post.bookmark}
                    firstPadding={post.firstPadding}
                    bigImage={post.bigImage}
                  />
                ))}
              </div>
              <div className="lg:flex lg:flex-col lg:gap-10 px-8">
                <Sidebar publicationProfile />
              </div>
            </div>
            <div>
              <h2 className="text-slate-500 pb-5 text-lg tracking-sm border-b border-gray-200">
                Latest
              </h2>
              <div className="flex items-center gap-8">
                {latests.map((latest, index) => (
                  <PublicationPostCard
                    key={index}
                    image={latest.image}
                    title={latest.title}
                    description={latest.description}
                    readMoreUrl={latest.readMoreUrl}
                    personName={latest.personName}
                    date={latest.date}
                    storiesCount={latest.storiesCount}
                    bookmark={latest.bookmark}
                    firstPadding={latest.firstPadding}
                    bigImage={latest.bigImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
