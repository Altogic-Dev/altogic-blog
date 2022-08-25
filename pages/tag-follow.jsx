import React, { useState } from "react";
import Head from "next/head";
import { Tab } from "@headlessui/react";
import Layout from "@/layout/Layout";
import PostCard from "../components/PostCard";
import Sidebar from "@/layout/Sidebar";
import YourTopics from "@/components/general/YourTopics";

const posts = [
  {
    id: 0,
    href: "#",
    title: "Fermentum massa tincidunt placerat.",
    infoText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
    badgeName: "Technology",
    badgeUrl: "/",
    min: "9 min",
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    author: {
      name: "Oliva Rhy",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      timeAgo: "2 Hours",
    },
    actionMenu: true,
  },
  {
    id: 1,
    href: "#",
    title: "Fermentum massa tincidunt placerat.",
    infoText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
    badgeName: "Money",
    badgeUrl: "/",
    min: "9 min",
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    author: {
      name: "Oliva Rhy",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      timeAgo: "2 Hours",
    },
    actionMenu: true,
  },
  {
    id: 2,
    href: "#",
    title: "Fermentum massa tincidunt placerat.",
    infoText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
    badgeName: "App",
    badgeUrl: "/",
    min: "9 min",
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    author: {
      name: "Oliva Rhy",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      timeAgo: "2 Hours",
    },
    actionMenu: true,
  },
  {
    id: 3,
    href: "#",
    title: "Fermentum massa tincidunt placerat.",
    infoText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
    badgeName: "Art",
    badgeUrl: "/",
    min: "9 min",
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    author: {
      name: "Oliva Rhy",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      timeAgo: "2 Hours",
    },
    actionMenu: true,
  },
  {
    id: 4,
    href: "#",
    title: "Fermentum massa tincidunt placerat.",
    infoText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
    badgeName: "Mindfulness",
    badgeUrl: "/",
    min: "9 min",
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    author: {
      name: "Oliva Rhy",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      timeAgo: "2 Hours",
    },
    actionMenu: true,
  },
  {
    id: 5,
    href: "#",
    title: "Fermentum massa tincidunt placerat.",
    infoText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
    badgeName: "Technology",
    badgeUrl: "/",
    min: "9 min",
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    author: {
      name: "Oliva Rhy",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      timeAgo: "2 Hours",
    },
    actionMenu: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TagFollow() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App</title>
        <meta name="description" content="Altogic Medium Blog App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-4 lg:py-0">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr,352px] lg:divide-x lg:divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="pt-2 pb-24 lg:py-10 lg:pl-8 lg:pr-8">
              {/* Desktop */}
              <div className="hidden lg:block mb-[60px]">
               <YourTopics/>
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100">
                    <svg
                      className="w-3 h-3 text-gray-500"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4H4.005M1 2.6L1 4.83726C1 5.08185 1 5.20414 1.02763 5.31923C1.05213 5.42127 1.09253 5.51881 1.14736 5.60828C1.2092 5.7092 1.29568 5.79568 1.46863 5.96863L5.30294 9.80294C5.89697 10.397 6.19398 10.694 6.53647 10.8053C6.83774 10.9031 7.16226 10.9031 7.46352 10.8053C7.80602 10.694 8.10303 10.397 8.69706 9.80294L9.80294 8.69706C10.397 8.10303 10.694 7.80602 10.8053 7.46352C10.9031 7.16226 10.9031 6.83774 10.8053 6.53647C10.694 6.19398 10.397 5.89697 9.80294 5.30294L5.96863 1.46863C5.79568 1.29568 5.7092 1.2092 5.60828 1.14736C5.51881 1.09253 5.42127 1.05213 5.31923 1.02763C5.20414 1 5.08185 1 4.83726 1L2.6 1C2.03995 1 1.75992 1 1.54601 1.10899C1.35785 1.20487 1.20487 1.35785 1.10899 1.54601C1 1.75992 1 2.03995 1 2.6ZM4.25 4C4.25 4.13807 4.13807 4.25 4 4.25C3.86193 4.25 3.75 4.13807 3.75 4C3.75 3.86193 3.86193 3.75 4 3.75C4.13807 3.75 4.25 3.86193 4.25 4Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <h1 className="text-slate-700 text-5xl font-bold tracking-md">
                    Front End Development
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Unfollow
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Start writing
                  </button>
                </div>
              </div>
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none",
                        selected
                          ? "text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700"
                          : "text-slate-500"
                      )
                    }
                  >
                    Trending
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none",
                        selected
                          ? "text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700"
                          : "text-slate-500"
                      )
                    }
                  >
                    Latest
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none",
                        selected
                          ? "text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700"
                          : "text-slate-500"
                      )
                    }
                  >
                    Best
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="divide-y divide-gray-200">
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
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
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
                  </Tab.Panel>
                  <Tab.Panel className="divide-y divide-gray-200">
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
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-10 p-8">
              <Sidebar personalFullStatistic whoToFollow relatedTopics />
            </div>
            {/* Mobile Sidebar */}
            <div className="flex flex-col gap-6 lg:hidden py-8 lg:p-8">
              <Sidebar personalFullStatistic />
            </div>
            {/* Mobile */}
            <div className="lg:hidden mb-4">
              
              <YourTopics mobile />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
