import React, { useState } from "react";
import Head from "next/head";
import { Tab } from "@headlessui/react";
import Layout from "../components/Layout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const peoples = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Oliva Rhy",
    desc: "Author, The Straight Dope, or What I learned from my first...",
    href: "#",
  },
];

export default function PublicationsFollowers() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Followers</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Followers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <h1 className="text-slate-700 my-[60px] text-5xl font-bold tracking-md">
            HiThemes followers
          </h1>
          <div className="max-w-[800px] mx-auto">
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300 mb-[60px]">
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
                  Followers
                  <span
                    className={classNames(
                      "inline-flex bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full",
                      selectedIndex == 0 ? "bg-purple-50 text-purple-900" : ""
                    )}
                  >
                    255
                  </span>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="divide-y divide-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {peoples.map((people) => (
                      <li
                        key={people.id}
                        className="flex items-center justify-between gap-3 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-16 h-16 rounded-full"
                            src={people.image}
                            alt={people.name}
                          />
                          <div className="flex flex-col">
                            <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                              {people.name}
                            </span>
                            <span className="text-slate-500 text-xs tracking-sm">
                              {people.desc}
                            </span>
                          </div>
                        </div>
                        <a
                          href={people.href}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Follow
                        </a>
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </Layout>
    </div>
  );
}
