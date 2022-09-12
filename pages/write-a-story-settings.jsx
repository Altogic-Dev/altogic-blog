import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { DuplicateIcon } from '@heroicons/react/outline';
import Category from '@/components/Category';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { storyActions } from '@/redux/story/storySlice';
import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';

export default function WriteAStorySettings() {
  const router = useRouter();
  const dispatch = useDispatch();

  const story = useSelector((state) => state.story.story);
  const user = useSelector((state) => state.auth.user);

  const [userState, setUserState] = useState(null);
  const [basePath, setBasePath] = useState();

  const [inpSeoTitle, setInpSeoTitle] = useState(story?.seoTitle);
  const [inpSeoDescription, setInpSeoDescription] = useState('');
  const [inpStorySlug, setInpStorySlug] = useState('');
  const [inpCategory, setInpCategory] = useState('');
  const [inpCategoryNames, setInpCategoryNames] = useState([]);

  const [radioCustomizeLink, setRadioCustomizeLink] = useState('automatic');
  const [radiolicense, setRadioLicense] = useState('all');

  const { id } = router.query;
  const storyLink = `${basePath}/story/${_.get(story, 'storySlug')}`;

  const [deleteStoryModal, setDeleteStoryModal] = useState(false);

  const handleInsert = (e) => {
    if (
      e.key === 'Enter' &&
      _.size(inpCategoryNames) < 5 &&
      !_.includes(inpCategoryNames, inpCategory)
    ) {
      setInpCategoryNames((prev) => [inpCategory, ...prev]);
      setInpCategory('');
    }
  };

  const handleDelete = (categoryName) => {
    const newCategoryNames = _.reject(
      inpCategoryNames,
      (category) => category === categoryName
    );
    setInpCategoryNames(newCategoryNames);
  };

  const handleChangeLicense = (e) => {
    setRadioLicense(e.target.value);

    dispatch(
      storyActions.updateStoryFieldRequest({
        story,
        newStoryField: {
          license: e.target.value,
        },
      })
    );
  };

  const fillInputs = useCallback(() => {
    if (!_.isNil(story)) {
      setInpSeoTitle(story.seoTitle);
      setInpSeoDescription(story.seoDescription);
      setInpStorySlug(story.storySlug);
      setInpCategoryNames(story.categoryNames);
      setRadioLicense(story.license);
    }
  }, [story]);

  useEffect(() => {
    setBasePath(window.location.origin);
  }, []);

  useEffect(() => {
    fillInputs();
  }, [story]);

  useEffect(() => {
    if (id) {
      dispatch(storyActions.getStoryRequest(id));
      setUserState(user);
    }
  }, [id]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Write A Story Settings</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Write A Story Settings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 mt-10 mb-20">
          <div className="xl:grid xl:grid-cols-[125px,1fr] gap-24">
            <ul className="hidden xl:block sticky bottom-0">
              <li>
                <a
                  href="#story-preview"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Story Preview
                </a>
              </li>
              <li>
                <a
                  href="#author"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Author
                </a>
              </li>
              <li>
                <a
                  href="#reader-interest"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Reader Interest
                </a>
              </li>
              <li>
                <a
                  href="#seo-settings"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  SEO Settings
                </a>
              </li>
              <li>
                <a
                  href="#promotion"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Promotion
                </a>
              </li>
              <li>
                <a
                  href="#content-licensing"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Content Licensing
                </a>
              </li>
              <li>
                <a
                  href="#advanced-settings"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Advanced Settings
                </a>
              </li>
            </ul>
            <div className="max-w-[860px]">
              <h1 className="text-slate-900 pb-6 mb-10 text-3xl font-medium tracking-md border-b border-gray-200">
                Story Settings
              </h1>
              <div>
                <div id="story-preview">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Story Preview
                  </h2>
                  <div className="px-4 lg:px-8 border border-slate-50 shadow rounded-lg">
                    <PostCard
                      noActiveBookmark
                      normalMenu
                      authorUrl={`/${_.get(userState, 'username')}`}
                      authorName={_.get(userState, 'username')}
                      authorImage={_.get(userState, 'profilePicture')}
                      storyUrl={`/story/${_.get(userState, 'storySlug')}`}
                      timeAgo={DateTime.fromISO(
                        _.get(story, 'createdAt')
                      ).toRelative()}
                      title={_.get(story, 'title')}
                      infoText={_.get(story, 'excerpt')}
                      badgeUrl="badgeUrl"
                      badgeName={_.first(_.get(story, 'categoryNames'))}
                      min={_.get(story, 'estimatedReadingTime')}
                      images={_.first(_.get(story, 'storyImages'))}
                    />
                  </div>
                </div>
                <hr className="my-14" />
                <div id="author">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Author
                  </h2>
                  <div className="flex gap-6">
                    <img
                      className="w-20 h-20 mb-3 rounded-full"
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="tracking-sm">
                      <h2 className="text-slate-700 text-base font-medium">
                        {_.get(userState, 'name')}
                      </h2>
                      <span className="inline-block mb-3 text-slate-500 text-sm">
                        {_.get(userState, 'followerCount')} Followers
                      </span>
                      <p className="text-slate-500 text-xs mb-8">
                        {_.get(userState, 'about')}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <div id="reader-interest">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Reader Interest
                  </h2>
                  <div className="relative mb-4 md:mb-6">
                    <div className="flex flex-col mb-4">
                      <span className="inline-flex text-slate-600 mb-2 text-sm font-semibold tracking-sm">
                        Topics:
                      </span>
                      <span className="text-slate-600 text-sm tracking-sm">
                        Add topics (up to 5) so readers know what your story is
                        about.
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex flex-wrap items-center flex-1 w-full md:w-auto">
                        <div className="flex items-center">
                          <input
                            className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-slate-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                            placeholder="Category Name"
                            value={inpCategory}
                            onChange={(e) => setInpCategory(e.target.value)}
                            disabled={_.size(story?.categoryNames) >= 5}
                            onKeyDown={handleInsert}
                          />

                          {_.map(inpCategoryNames, (categoryName) => (
                            <Category
                              key={categoryName}
                              tag={categoryName}
                              onClick={() => handleDelete(categoryName)}
                              className="ml-2 text-xs"
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[42px] md:h-[48px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() =>
                          dispatch(
                            storyActions.updateCategoryNamesRequest({
                              storyId: _.get(story, '_id'),
                              newCategoryNames: inpCategoryNames,
                            })
                          )
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <div id="seo-settings">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    SEO Settings
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <div className="flex flex-col mb-4">
                        <span className="inline-flex text-slate-600 mb-2 text-sm font-semibold tracking-sm">
                          SEO Title
                        </span>
                        <span className="text-slate-600 text-sm tracking-sm">
                          The SEO Title is used in place of your Title on search
                          engine results pages, such as a Google search. SEO
                          titles over 60 characters will be truncated. SEO
                          titles between 40 and 50 characters with commonly
                          searched words have the best click-through-rates.
                        </span>
                      </div>
                      <span className="inline-block text-slate-600 mb-4 text-sm tracking-sm">
                        Title preview:{' '}
                        <span className="text-slate-700 text-base font-light">
                          Title | by İsmail Erüstün | Medium
                        </span>
                      </span>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Type title..."
                          required
                          className="appearance-none block w-full px-3 py-3 h-[44px] text-slate-500 border border-gray-300 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          onChange={(e) => setInpSeoTitle(e.target.value)}
                          value={inpSeoTitle}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          onClick={() =>
                            dispatch(
                              storyActions.updateStoryFieldRequest({
                                story,
                                newStoryField: {
                                  seoTitle: inpSeoTitle,
                                },
                              })
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col mb-4">
                        <span className="inline-flex text-slate-600 mb-2 text-sm font-semibold tracking-sm">
                          SEO Description
                        </span>
                        <span className="text-slate-600 text-sm tracking-sm">
                          The SEO Description is used in place of your Subtitle
                          on search engine results pages. Good SEO descriptions
                          utilize keywords, summarize the story and are between
                          140-156 characters long.
                        </span>
                      </div>
                      <span className="inline-block text-slate-600 mb-4 text-sm tracking-sm">
                        Title preview:{' '}
                        <span className="text-slate-700 text-base font-light">
                          Desc. Description | by İsmail Erüstün | Medium
                        </span>
                      </span>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <input
                          id="description"
                          name="description"
                          type="text"
                          placeholder="Type description..."
                          required
                          className="appearance-none block w-full px-3 py-3 h-[44px] text-slate-500 border border-gray-300 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          onChange={(e) => setInpSeoDescription(e.target.value)}
                          value={inpSeoDescription}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          onClick={() =>
                            dispatch(
                              storyActions.updateStoryFieldRequest({
                                story,
                                newStoryField: {
                                  seoDescription: inpSeoDescription,
                                },
                              })
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <div id="promotion">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Promotion
                  </h2>
                  <div className="flex flex-col mb-8">
                    <span className="inline-flex text-slate-600 mb-2 text-sm font-semibold tracking-sm">
                      Friend Link
                    </span>
                    <span className="text-slate-600 text-sm tracking-sm">
                      This link guarantees anyone free access to your story,
                      even if they’ve read all of their complimentary stories
                      for this month.
                    </span>
                  </div>
                  <div className="flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <input
                        type="text"
                        name="type"
                        id="type"
                        className="appearance-none block w-full px-3 py-3 h-[44px] text-slate-500 border border-gray-300 rounded-tl-md rounded-bl-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder={`${storyLink}?friendCode=${_.get(
                          story,
                          'friendCode'
                        )}`}
                        disabled
                      />
                    </div>
                    <button
                      type="button"
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-base font-medium rounded-r-md text-slate-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${storyLink}?friendCode=${_.get(
                            story,
                            'friendCode'
                          )}`
                        )
                      }
                    >
                      <DuplicateIcon
                        className="h-5 w-5 text-slate-700"
                        aria-hidden="true"
                      />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                <hr className="my-14" />
                <div id="content-licensing">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Content Licensing
                  </h2>
                  <div onChange={handleChangeLicense}>
                    <div className="flex mb-6">
                      <input
                        id="all-rights-reserved"
                        name="all-rights-reserved"
                        type="radio"
                        className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                        value="all"
                        checked={radiolicense === 'all'}
                      />
                      <label
                        htmlFor="all-rights-reserved"
                        className="ml-3 block"
                      >
                        <h2 className="text-base font-medium text-slate-700">
                          All rights reserved
                        </h2>
                        <p className="text-slate-500 tracking-sm">
                          Others cannot copy, distribute, or perform your work
                          without your permission (or as permitted by fair use).
                        </p>
                      </label>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center mb-2.5">
                        <input
                          // id="some-rights-reserved"
                          // name="some-rights-reserved"
                          type="radio"
                          className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                          disabled
                          checked={_.split(radiolicense, '-')[0] === 'some'}
                        />
                        <label
                          htmlFor="some-rights-reserved"
                          className="ml-3 block text-slate-700 text-base font-medium tracking-sm"
                        >
                          Some rights reserved
                        </label>
                      </div>
                      <div className="pl-5 space-y-2.5">
                        <div className="flex">
                          <input
                            id="attribution"
                            name="some-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="some-attribution"
                            checked={radiolicense === 'some-attribution'}
                          />
                          <label htmlFor="attribution" className="ml-3 block">
                            <h2 className="text-base font-medium text-slate-700">
                              Attribution
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              Others can distribute, remix, and build upon your
                              work as long as they credit you.
                            </p>
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            id="attribution-no-derrivates"
                            name="some-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="some-attributionNoDerrivates"
                            checked={
                              radiolicense === 'some-attributionNoDerrivates'
                            }
                          />
                          <label
                            htmlFor="attribution-no-derrivates"
                            className="ml-3 block"
                          >
                            <h2 className="text-base font-medium text-slate-700">
                              Attribution, no derrivates
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              Others can only distribute non-derivative copies
                              of your work.
                            </p>
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            id="attribution-share-a-like"
                            name="some-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="some-attributionShareALike"
                            checked={
                              radiolicense === 'some-attributionShareALike'
                            }
                          />
                          <label
                            htmlFor="attribution-share-a-like"
                            className="ml-3 block"
                          >
                            <h2 className="text-base font-medium text-slate-700">
                              Attribution, share a like
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              Others must distribute derivatives of your work
                              under the same license.
                            </p>
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            id="attribution-non-commercial"
                            name="some-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="some-attributionNonCommercial"
                            checked={
                              radiolicense === 'some-attributionNonCommercial'
                            }
                          />
                          <label
                            htmlFor="attribution-non-commercial"
                            className="ml-3 block"
                          >
                            <h2 className="text-base font-medium text-slate-700">
                              Attribution, non-commercial
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              Others can use your work for non-commercial
                              purposes only.
                            </p>
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            id="attribution-non-commercial-no-derrivates"
                            name="some-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="some-attributionNonCommercialNoDerrivates"
                            checked={
                              radiolicense ===
                              'some-attributionNonCommercialNoDerrivates'
                            }
                          />
                          <label
                            htmlFor="attribution-non-commercial-no-derrivates"
                            className="ml-3 block"
                          >
                            <h2 className="text-base font-medium text-slate-700">
                              Attribution, non-commercial, no derrivates
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              Others can use your work for non-commercial
                              purposes only. <br /> Others can only distribute
                              non-derivative copies of your work.
                            </p>
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            id="attribution-non-commercial-share-a-like"
                            name="some-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="some-attributionNonCommercialShareALike"
                            checked={
                              radiolicense ===
                              'some-attributionNonCommercialShareALike'
                            }
                          />
                          <label
                            htmlFor="attribution-non-commercial-share-a-like"
                            className="ml-3 block"
                          >
                            <h2 className="text-base font-medium text-slate-700">
                              Attribution, non-commercial, share a like
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              Others can use your work for non-commercial
                              purposes only. <br /> Others must distribute
                              derivatives of your work under the same license.
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center mb-2.5">
                        <input
                          // id="some-rights-reserved"
                          // name="some-rights-reserved"
                          type="radio"
                          className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                          disabled
                          checked={_.split(radiolicense, '-')[0] === 'no'}
                        />
                        <label
                          htmlFor="no-rights-reserved"
                          className="ml-3 block text-slate-700 text-base font-medium tracking-sm"
                        >
                          No rights reserved
                        </label>
                      </div>
                      <div className="pl-5 space-y-2.5">
                        <div className="flex">
                          <input
                            id="creative-commons-copyright-waiver"
                            name="no-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="no-creativeCommonsCopyrightWaiver"
                            checked={
                              radiolicense ===
                              'no-creativeCommonsCopyrightWaiver'
                            }
                          />
                          <label
                            htmlFor="creative-commons-copyright-waiver"
                            className="ml-3 block"
                          >
                            <h2 className="text-base font-medium text-slate-700">
                              Creative Commons copyright waiver
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              You waive all your copyright and related rights in
                              this work, worldwide.
                            </p>
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            id="public-domain"
                            name="no-rights-reserved"
                            type="radio"
                            className="h-5 w-5 text-purple-600 mt-1.5 border-gray-300 focus:ring-purple-500"
                            value="no-publicDomain"
                            checked={radiolicense === 'no-publicDomain'}
                          />
                          <label htmlFor="public-domain" className="ml-3 block">
                            <h2 className="text-base font-medium text-slate-700">
                              Public domain
                            </h2>
                            <p className="text-slate-500 tracking-sm">
                              This work is already in the public domain and free
                              of copyright restrictions.
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <div id="advanced-settings">
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Advanced Settings
                  </h2>
                  <div>
                    <div
                      onChange={(e) => setRadioCustomizeLink(e.target.value)}
                      className="space-y-2.5 mb-6"
                    >
                      <span className="inline-block text-slate-600 mb-6 text-base font-semibold tracking-sm">
                        Customize Story Link
                      </span>
                      <div className="flex items-center">
                        <input
                          id="automatic"
                          name="customize-story-link"
                          type="radio"
                          className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                          value="automatic"
                          checked={radioCustomizeLink === 'automatic'}
                        />
                        <label
                          htmlFor="automatic"
                          className="ml-3 block text-slate-700 text-base font-medium tracking-sm"
                        >
                          Automatic
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="custom"
                          name="customize-story-link"
                          type="radio"
                          className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                          value="custom"
                          checked={radioCustomizeLink === 'custom'}
                        />
                        <label
                          htmlFor="custom"
                          className="ml-3 block text-slate-700 text-base font-medium tracking-sm"
                        >
                          Custom
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2 mb-4">
                        <span className="inline-block text-slate-600 text-sm tracking-sm">
                          You can customize the way your story link appears.
                          After publishing, your link will be:
                        </span>
                        <br />
                        <span className="inline-block text-slate-600 mb-4 text-sm tracking-sm">
                          {storyLink}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder={_.get(story, 'storySlug')}
                          required
                          disabled={radioCustomizeLink === 'automatic'}
                          className="appearance-none block w-full px-3 py-3 h-[44px] text-slate-500 border border-gray-300 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          onChange={(e) => setInpStorySlug(e.target.value)}
                          value={inpStorySlug}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          disabled={radioCustomizeLink === 'automatic'}
                          onClick={() =>
                            dispatch(
                              storyActions.updateStoryFieldRequest({
                                story,
                                newStoryField: {
                                  storySlug: inpStorySlug,
                                },
                              })
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <div>
                  <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                    Delete Story
                  </h2>
                  <button
                    type="button"
                    onClick={() => setDeleteStoryModal(true)}
                    className="inline-flex items-center justify-center flex-shrink-0 h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {/* Delete Story Modal */}
      {deleteStoryModal && (
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
                    onClick={() => setDeleteStoryModal(false)}
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
                    onClick={() => setDeleteStoryModal(false)}
                    className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      dispatch(
                        storyActions.deleteStoryRequest({
                          storyId: _.get(story, '_id'),
                          onSuccess: () => router.back(),
                        })
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
