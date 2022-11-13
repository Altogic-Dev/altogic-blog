import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { DateTime } from 'luxon';
import _ from 'lodash';
import Category from '@/components/Category';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { storyActions } from '@/redux/story/storySlice';
import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';
import DeleteStoryModal from '@/components/DeleteStoryModal';
import { topicsActions } from '@/redux/topics/topicsSlice';
import PublicationSettingsSuggestions from '@/components/publicationsSettings/suggestions/PublicationSettingsSuggestions';
import Button from '@/components/basic/button';
import Input from '@/components/Input';

export default function WriteAStorySettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryInputRef = useRef(null);
  const story = useSelector((state) => state.story.story);
  const isLoading = useSelector((state) => state.story.isLoading);
  const error = useSelector((state) => state.story.error);
  const user = useSelector((state) => state.auth.user);
  const foundTopics = useSelector((state) => state.topics.searchTopics);
  const topicLoading = useSelector((state) => state.topics.isLoading);

  const [userState, setUserState] = useState(null);
  const [basePath, setBasePath] = useState();

  const [inpSeoTitle, setInpSeoTitle] = useState();
  const [inpSeoDescription, setInpSeoDescription] = useState('');
  const [inpStorySlug, setInpStorySlug] = useState('');
  const [inpCategory, setInpCategory] = useState('');
  const [inpCategoryNames, setInpCategoryNames] = useState([]);
  const [inpPinStory, setInpPinStory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [sortingLoading, setSortingLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [seoTitleLoading, setSeoTitleLoading] = useState(false);
  const [seoDescLoading, setSeoDescLoading] = useState(false);
  const [licenseLoading, setLicenseLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);

  const [radioCustomizeLink, setRadioCustomizeLink] = useState('automatic');
  const [radiolicense, setRadioLicense] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { id } = router.query;
  const storyLink = `${basePath}/story/${_.get(story, 'storySlug')}`;

  const [deleteStoryModal, setDeleteStoryModal] = useState(false);

  const debouncedSearch = useCallback(
    _.debounce((category) => {
      dispatch(topicsActions.searchTopicsRequest(category));
      setIsSearchOpen(true);
    }, 500),
    []
  );

  const handleAddTopic = (topic) => {
    setIsSearchOpen(false);
    if (
      !inpCategoryNames?.some(
        (item) => item.toLowerCase() === topic.name.toLowerCase()
      ) &&
      _.size(inpCategoryNames) < 5
    ) {
      setInpCategoryNames((prev) => [...prev, topic.name]);
      setInpCategory('');
    }
  };
  const handleInsert = (e) => {
    if (e.key === 'Enter' && _.size(inpCategoryNames) < 5) {
      if (!isSearchOpen) {
        setInpCategoryNames((prev) => [...prev, inpCategory]);
        setInpCategory('');
      } else if (
        _.some(foundTopics, (topic) =>
          _.includes(topic.name.toLowerCase(), inpCategory.toLowerCase())
        )
      ) {
        handleAddTopic(foundTopics[selectedIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (selectedIndex < foundTopics.length - 1) {
        setSelectedIndex((state) => state + 1);
      } else {
        setSelectedIndex(0);
      }
    } else if (e.key === 'ArrowUp') {
      if (selectedIndex > 0) setSelectedIndex((state) => state - 1);
      else setSelectedIndex(foundTopics.length - 1);
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
  };

  const fillInputs = useCallback(() => {
    if (!_.isNil(story)) {
      setInpSeoTitle(story?.seoTitle || _.get(story, 'title'));
      setInpSeoDescription(
        story.seoDescription || _.get(story, 'excerpt')?.slice(0, 156)
      );
      setInpStorySlug(story.storySlug);
      setInpCategoryNames(story.categoryNames);
      setRadioLicense(story.license);
      setInpPinStory(Boolean(story.pinnedStory));
    }
  }, [story]);

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setIsSearchOpen(false);
    });
    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    if (inpCategory) debouncedSearch(inpCategory);
  }, [inpCategory]);

  useEffect(() => {
    categoryInputRef.current.focus();
  }, [isSearchOpen]);

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

  useEffect(() => {
    if (!isLoading) {
      setSortingLoading(false);
      setCategoryLoading(false);
      setSeoTitleLoading(false);
      setSeoDescLoading(false);
      setLicenseLoading(false);
      setLinkLoading(false);
    }
  }, [isLoading]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Write A Story Settings</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Write A Story Settings"
        />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 mt-10 mb-20">
          <div className="xl:grid xl:grid-cols-[175px,1fr] gap-24">
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
                      storyUrl={`/story/${_.get(story, 'storySlug')}`}
                      timeAgo={DateTime.fromISO(
                        _.get(story, 'createdAt')
                      ).toRelative()}
                      title={_.get(story, 'title')}
                      infoText={_.get(story, 'excerpt')}
                      badgeUrl="badgeUrl"
                      badgeName={_.first(_.get(story, 'categoryNames'))}
                      min={_.get(story, 'estimatedReadingTime')}
                      images={_.first(_.get(story, 'storyImages'))}
                      showImages={!_.isEmpty(_.get(story, 'storyImages'))}
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
                      src={_.get(userState, 'profilePicture')}
                      alt=""
                    />
                    <div className="tracking-sm">
                      <h2 className="text-slate-700 text-base font-medium">
                        {_.get(userState, 'name')}
                      </h2>
                      <span className="inline-block mb-3 text-slate-500 text-sm">
                        {_.get(userState, 'followerCount')} Followers
                      </span>
                      <p
                        className="text-slate-500 text-xs mb-8"
                        dangerouslySetInnerHTML={{
                          __html: _.get(userState, 'about'),
                        }}
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <h2 className="text-slate-700 mb-8 text-2xl font-medium tracking-md">
                  Story Sorting
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="pin-story"
                      name="pinStory"
                      type="checkbox"
                      className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                      onChange={() => setInpPinStory((prev) => !prev)}
                      checked={inpPinStory}
                    />
                    <label htmlFor="all-rights-reserved" className="ml-3 block">
                      <h2 className="text-base font-medium text-slate-700">
                        Pin Story
                      </h2>
                    </label>
                  </div>
                  <Button
                    type="button"
                    className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[42px] md:h-[48px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    loading={sortingLoading}
                    onClick={() => {
                      setSortingLoading(true);
                      dispatch(
                        storyActions.updateStoryFieldRequest({
                          story,
                          newStoryField: {
                            pinnedStory: inpPinStory,
                          },
                        })
                      );
                    }}
                  >
                    Save
                  </Button>
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
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="flex flex-wrap items-center flex-1 w-full md:w-auto">
                        <div className="flex items-start flex-col gap-5">
                          <div className="relative">
                            <input
                              className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-slate-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                              placeholder="Category Name"
                              value={inpCategory}
                              onChange={(e) => setInpCategory(e.target.value)}
                              onKeyDown={handleInsert}
                              ref={categoryInputRef}
                            />
                            {!_.isEmpty(foundTopics) &&
                              !topicLoading &&
                              isSearchOpen && (
                                <PublicationSettingsSuggestions
                                  name="Topics"
                                  selectedIndex={selectedIndex}
                                  suggestions={foundTopics}
                                  onClick={(e, topicId, topic) =>
                                    handleAddTopic(topic)
                                  }
                                />
                              )}
                          </div>
                          <div className="flex flex-row mb-5">
                            {_.map(inpCategoryNames, (category) => (
                              <Category
                                key={category}
                                tag={category}
                                onClick={() => handleDelete(category)}
                                className="mr-2 text-xs"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[42px] md:h-[48px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        loading={categoryLoading}
                        onClick={() => {
                          setCategoryLoading(true);
                          dispatch(
                            storyActions.updateCategoryNamesRequest({
                              storyId: _.get(story, '_id'),
                              newCategoryNames: inpCategoryNames,
                            })
                          );
                        }}
                      >
                        Save
                      </Button>
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
                          {_.get(story, 'seoTitle') || _.get(story, 'title')} |
                          by {_.get(story, 'user.name')} | Opinate
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
                        <Button
                          className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          loading={seoTitleLoading}
                          onClick={() => {
                            setSeoTitleLoading(true);
                            dispatch(
                              storyActions.updateStoryFieldRequest({
                                story,
                                newStoryField: {
                                  seoTitle:
                                    inpSeoTitle || _.get(story, 'title'),
                                },
                              })
                            );
                          }}
                        >
                          Save
                        </Button>
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
                          {_.slice(
                            _.get(story, 'seoDescription') ||
                              _.get(story, 'excerpt'),
                            0,
                            20
                          )}
                          ... | by {_.get(story, 'user.name')} | Opinate
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
                        <Button
                          className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          loading={seoDescLoading}
                          onClick={() => {
                            setSeoDescLoading(true);
                            dispatch(
                              storyActions.updateStoryFieldRequest({
                                story,
                                newStoryField: {
                                  seoDescription:
                                    inpSeoDescription ||
                                    _.get(story, 'excerpt').slice(0, 156),
                                },
                              })
                            );
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                {/* <div id="promotion">
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
                </div> */}
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
                  <div className="flex flex-row-reverse">
                    <Button
                      type="button"
                      className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      loading={licenseLoading}
                      onClick={() => {
                        setLicenseLoading(true);
                        dispatch(
                          storyActions.updateStoryFieldRequest({
                            story,
                            newStoryField: {
                              license: radiolicense,
                            },
                          })
                        );
                      }}
                    >
                      Save
                    </Button>
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
                        <Input
                          error={
                            error
                              ? { message: 'This slug is already taken' }
                              : null
                          }
                          id="title"
                          name="title"
                          type="text"
                          placeholder={_.get(story, 'storySlug')}
                          required
                          disabled={radioCustomizeLink === 'automatic'}
                          className="appearance-none block w-full px-3 py-3 h-[44px] text-slate-500 border border-gray-300 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          onChange={(e) =>
                            setInpStorySlug(e.target.value.toLowerCase())
                          }
                          value={inpStorySlug}
                        />
                        <Button
                          className="inline-flex items-center justify-center flex-shrink-0 w-full md:w-auto h-[44px] px-10 py-1.5 sm:py-2 border border-transparent text-sm md:text-base leading-5 rounded-full tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          disabled={radioCustomizeLink === 'automatic'}
                          loading={linkLoading}
                          onClick={() => {
                            setLinkLoading(true);
                            dispatch(
                              storyActions.updateStoryFieldRequest({
                                story,
                                newStoryField: {
                                  storySlug: inpStorySlug.toLowerCase(),
                                },
                              })
                            );
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-14" />
                <div className="mb-12">
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
      {deleteStoryModal && (
        <DeleteStoryModal
          setDeleteStoryModal={setDeleteStoryModal}
          clickDelete={() => {
            dispatch(
              storyActions.deleteStoryRequest({
                storyId: _.get(story, '_id'),
                categoryNames: _.get(story, 'categoryNames'),
                isPublished: story.isPublished,
                onSuccess: () => router.push('/my-stories'),
              })
            );
          }}
        />
      )}
    </div>
  );
}
