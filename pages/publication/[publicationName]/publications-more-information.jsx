import React from 'react';
import HeadContent from '@/components/general/HeadContent';
import Layout from '@/layouts/Layout';

const editors = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
];

const writers = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 10,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 11,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 12,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 13,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
  {
    id: 14,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Oliva Rhy',
    desc: 'Author, The Straight Dope, or What I learned from my first...',
    href: '#',
  },
];

export default function PublicationsMoreInformation() {
  return (
    <div>
      <HeadContent>
        <title>Altogic Medium Blog App Publications More Information</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications More Information"
        />
        
      </HeadContent>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="flex items-center gap-8 py-3 border-b border-gray-200">
            <img
              className="w-[156px] h-[40px]"
              src="./logo-hithemes.svg"
              alt=""
            />
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
          </div>
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center gap-3 mb-8 py-8 border-b border-gray-200">
              <img src="./hi-avatar.svg" alt="" />
              <div>
                <h1 className="text-slate-700 mb-1 text-lg font-medium tracking-sm">
                  HiThemes
                </h1>
                <p className="text-slate-500 text-xs tracking-sm">
                  Powerful backend service development and execution platform
                  helping you to easily build, deploy and manage scalable web
                  services.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-slate-600 tracking-sm uppercase">
                Note From The Editor
              </h2>
              <h2 className="text-slate-600 text-2xl tracking-md">
                Beautiful, responsive, and easy-to-use HiThemes themes for your
                website are now with you.
              </h2>
            </div>
            <div className="mt-16">
              <div className="py-8 border-t border-gray-200">
                <h2 className="text-slate-600 mb-4 text-sm font-medium tracking-sm uppercase">
                  Editors
                </h2>
                <div>
                  <ul className="divide-y divide-gray-200">
                    {editors.map((editor) => (
                      <li
                        key={editor.id}
                        className="flex items-center justify-between gap-3 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-16 h-16 rounded-full"
                            src={editor.image}
                            alt={editor.name}
                          />
                          <div className="flex flex-col">
                            <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                              {editor.name}
                            </span>
                            <span className="text-slate-500 text-xs tracking-sm">
                              {editor.desc}
                            </span>
                          </div>
                        </div>
                        <a
                          href={editor.href}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Follow
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-8 border-t border-gray-200">
                <h2 className="text-slate-600 mb-4 text-sm font-medium tracking-sm uppercase">
                  Writers
                </h2>
                <div>
                  <ul className="divide-y divide-gray-200">
                    {writers.map((writer) => (
                      <li
                        key={writer.id}
                        className="flex items-center justify-between gap-3 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-16 h-16 rounded-full"
                            src={writer.image}
                            alt={writer.name}
                          />
                          <div className="flex flex-col">
                            <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                              {writer.name}
                            </span>
                            <span className="text-slate-500 text-xs tracking-sm">
                              {writer.desc}
                            </span>
                          </div>
                        </div>
                        <a
                          href={writer.href}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Follow
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
