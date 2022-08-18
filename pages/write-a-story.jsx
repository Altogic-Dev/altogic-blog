import React from 'react';
import Head from 'next/head';
import Layout from '../layout/Layout';
import Editor from '../components/Editor';

export default function WriteAStory() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Write a Story</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Write a Story"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto h-screen px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0">
          <div className="flex items-center justify-between gap-4 mb-10 md:mb-28">
            <span className="text-slate-800 text-lg tracking-sm">
              Draft in <span className="font-semibold">Olivia Rhye</span>
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-[14px] py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3337 9.23812C19.3337 8.68584 18.8859 8.23812 18.3337 8.23812C17.7814 8.23812 17.3337 8.68584 17.3337 9.23812H19.3337ZM18.3337 10.0048L19.3337 10.0054V10.0048H18.3337ZM12.985 3.30155C13.4895 3.52633 14.0806 3.2996 14.3054 2.79512C14.5302 2.29065 14.3035 1.69948 13.799 1.4747L12.985 3.30155ZM19.0411 4.04011C19.4314 3.64939 19.4311 3.01622 19.0404 2.62589C18.6497 2.23556 18.0165 2.23588 17.6262 2.6266L19.0411 4.04011ZM10.0003 11.675L9.29322 12.3821C9.48082 12.5697 9.73527 12.6751 10.0006 12.675C10.2659 12.675 10.5203 12.5695 10.7078 12.3818L10.0003 11.675ZM8.20743 8.46791C7.81691 8.07739 7.18374 8.07739 6.79322 8.46791C6.40269 8.85844 6.40269 9.4916 6.79322 9.88213L8.20743 8.46791ZM17.3337 9.23812V10.0048H19.3337V9.23812H17.3337ZM17.3337 10.0042C17.3328 11.5856 16.8207 13.1243 15.8738 14.3909L17.4757 15.5884C18.6808 13.9764 19.3325 12.018 19.3337 10.0054L17.3337 10.0042ZM15.8738 14.3909C14.927 15.6575 13.5961 16.584 12.0796 17.0324L12.6467 18.9503C14.5767 18.3797 16.2706 17.2004 17.4757 15.5884L15.8738 14.3909ZM12.0796 17.0324C10.5631 17.4808 8.94232 17.4269 7.45894 16.8789L6.76583 18.755C8.65377 19.4525 10.7166 19.521 12.6467 18.9503L12.0796 17.0324ZM7.45894 16.8789C5.97556 16.3309 4.70907 15.318 3.84836 13.9914L2.17055 15.08C3.266 16.7684 4.87789 18.0575 6.76583 18.755L7.45894 16.8789ZM3.84836 13.9914C2.98765 12.6648 2.57884 11.0955 2.68289 9.51752L0.687223 9.38592C0.554797 11.3942 1.07511 13.3915 2.17055 15.08L3.84836 13.9914ZM2.68289 9.51752C2.78694 7.93957 3.39828 6.43752 4.42573 5.23541L2.90539 3.93596C1.59772 5.46593 0.81965 7.37762 0.687223 9.38592L2.68289 9.51752ZM4.42573 5.23541C5.45319 4.03329 6.8417 3.1955 8.3842 2.84699L7.94344 0.896165C5.98026 1.33972 4.21305 2.40599 2.90539 3.93596L4.42573 5.23541ZM8.3842 2.84699C9.92669 2.49849 11.5405 2.65793 12.985 3.30155L13.799 1.4747C11.9606 0.655543 9.90661 0.452611 7.94344 0.896165L8.3842 2.84699ZM17.6262 2.6266L9.29287 10.9683L10.7078 12.3818L19.0411 4.04011L17.6262 2.6266ZM10.7074 10.9679L8.20743 8.46791L6.79322 9.88213L9.29322 12.3821L10.7074 10.9679Z"
                  fill="currentColor"
                />
              </svg>
              Publish
            </button>
          </div>
          <form action="" className="max-w-[800px] mx-auto">
            <input
              type="text"
              name="story-title"
              className="block w-full text-slate-500 px-0 py-8 text-4xl md:text-5xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0"
              placeholder="Story Title"
            />
            <div className="mt-4">
              <Editor />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
