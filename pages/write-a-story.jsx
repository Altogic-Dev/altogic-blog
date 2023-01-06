import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import { useRouter } from 'next/router';
import Button from '@/components/basic/button';
import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeadContent from '@/components/general/HeadContent';
import useStorage from '@/hooks/useStorage';
import dynamic from 'next/dynamic';
import { ClipLoader } from 'react-spinners';
import { parseHtml } from '@/utils/utils';
import Layout from '../layouts/Layout';

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id: id || null },
  };
}

export default function WriteAStory({ id }) {
  const [content, setContent] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [storyImages, setStoryImages] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [username, setUsername] = useState('');
  const [minRead, setMinRead] = useState(0);
  const [isShowSaving, setIsShowSaving] = useState(false);

  const [inpTitle, setInpTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const newStory = useSelector((state) => state.story.story);
  const [webworker, setWebworker] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const session = useStorage();
  const dispatch = useDispatch();
  const router = useRouter();
  const { topic } = router.query;

  const [isFetched, setIsFetched] = useState(false);
  const selectedPublication = useSelector(
    (state) => state.publication.selectedPublication
  );

  const storySchema = new yup.ObjectSchema({
    title: yup.string(),
  });

  const {
    register,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(storySchema),
  });

  useEffect(() => {
    if (!id || !newStory) {
      setValue('title', '');
      setInpTitle();
      setIsChanged(false);
      setIsCreated(false);
      setContent('');
      setIsFetched(false);
    }
  }, [id]);

  useEffect(() => {
    setWebworker(new Worker(new URL('@/utils/worker', import.meta.url)));
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (newStory?.title && newStory?._id === id && !isFetched && !_.isNil(id)) {
      setIsFetched(true);
      setInpTitle(newStory.title);
      setValue('title', newStory.title);
      setMinRead(newStory.estimatedReadingTime);
    }
    if (!id && _.get(newStory, '_id') && isCreated) {
      setLoading(false);
      router.push(`/write-a-story?id=${newStory._id}`);
    }
  }, [newStory]);

  useEffect(() => {
    if (router.isReady && id && !newStory) {
      dispatch(storyActions.getStoryRequest(id));
    } else if (newStory) {
      setLoading(false);
    }
  }, [router, id, newStory]);
  useEffect(() => {
    if (router.isReady) setIsMounted(true);
  }, [router.isReady]);

  useEffect(() => {
    console.log(
      _.size(_.trim(parseHtml(content))) > 0 && _.size(_.trim(inpTitle)) > 0
    );

    if (
      _.size(_.trim(parseHtml(content))) > 0 &&
      _.size(_.trim(inpTitle)) > 0 &&
      isChanged
    ) {
      setLoading(true);
      setMinRead(Math.ceil(content.split(' ').length / 200) || 1);
      const story = {
        user: user._id,
        username: user.username,
        userProfilePicture: user.profilePicture,
        content,
        storyImages: storyImages.filter((item) => item && item !== 'undefined'),
        title: inpTitle || 'Untitled',
        estimatedReadingTime: Math.ceil(content.length / 1000) || 1,
        isPublished: false,
        publication: !_.isNil(selectedPublication)
          ? selectedPublication._id
          : undefined,
      };
      setIsShowSaving(true);
      if (!isCreated && !id) {
        dispatch(
          storyActions.createStoryRequest({
            ...story,
            categoryNames: topic ? [topic] : [],
          })
        );
        setIsFetched(true);
        setIsCreated(true);
      } else if (!_.isNil(newStory)) {
        const dataObject = {
          story: {
            _id: newStory._id,
            ...story,
          },
          session,
        };
        webworker.postMessage(dataObject);
        webworker.onmessage = (e) => {
          if (e.data.data) {
            const temp = e.data;
            if (selectedPublication)
              temp.data.publication = selectedPublication;
            setLoading(false);
            dispatch(storyActions.updateStoryWorkerRequest(temp));
          }
        };
      }
    }
  }, [content, inpTitle, getValues('title'), router.isReady]);

  const handleChange = (e) => {
    if (!isChanged) {
      setIsChanged(true);
    }
    setContent(e);
  };
  const handleDebounceFn = (inputValue) => {
    setInpTitle(inputValue);
  };
  const debounceFn = useCallback(_.debounce(handleDebounceFn, 200), []);

  const handleChangeTitle = (e) => {
    if (!isChanged) {
      setIsChanged(true);
    }
    debounceFn(e.target.value);
  };
  const handlePublish = () => {
    if (_.size(_.trim(inpTitle))) {
      dispatch(
        storyActions.updateStoryRequest({
          story: {
            _id: newStory._id,
            content,
          },
        })
      );
      router.push(
        `/publish-settings/${_.get(
          newStory,
          'storySlug'
        )}?isEdited=${!!isCreated}${topic ? `&topic=${topic}` : ''}`
      );
    } else {
      setError('title', {
        type: 'manual',
        message: 'Please enter a title',
      });
    }
  };

  useEffect(
    () => () => {
      setLoading(false);
      setValue('title', '');
      setInpTitle();
      setIsChanged(false);
      setIsCreated(false);
      setContent('');
      setIsFetched(false);
    },
    []
  );

  return (
    <div>
      <HeadContent>
        <title>Opinate</title>
        <meta name="description" content="Opinate" />
      </HeadContent>
      <Layout loading={!isMounted || (id && !newStory)}>
        <div className="max-w-screen-xl mx-auto h-screen w-screen px-9 lg:px-8 pt-8 pb-[72px] lg:pb-0 flex flex-col items-center ">
          <div className="flex items-center justify-between gap-4 md:mb-5 w-full  ">
            <div className="text-slate-800 text-lg tracking-sm w-2/3 flex h-10 items-center">
              <div className="mr-4">
                Draft in{' '}
                <span className="font-semibold">
                  {selectedPublication ? selectedPublication.name : username}
                </span>
              </div>
            </div>

            <div className="w-1/3 flex justify-end">
              <Button
                disabled={!(isShowSaving && !loading && router.isReady)}
                onClick={handlePublish}
                className=" inline-flex items-center gap-2 px-[14px] py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-24"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Publish
              </Button>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <p className="py-4 md:py-0 text-slate-500 text-end">
              {minRead} min read
            </p>
            {isShowSaving && (
              <div className="text-green-700 font-semibold">
                {loading ? (
                  <span>
                    <span className="animate-pulse">Saving</span>...
                    <ClipLoader size={10} color="#15803c" loading={loading} />
                  </span>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Saved</span>
                    <CheckCircleIcon className="w-5 h-5 ml-2" />
                  </div>
                )}
              </div>
            )}
          </div>
          <form className="w-full  lg:px-0">
            <Input
              type="text"
              name="story-title"
              className="block text-black w-full px-0 py-8 text-4xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0"
              placeholder="Story Title"
              required
              register={register('title')}
              error={errors.title}
              onChange={handleChangeTitle}
            />

            <div className="mt-4 w-11/12">
              <Editor
                setIsShowSaving={setIsShowSaving}
                onChange={handleChange}
                setImages={setStoryImages}
                value={
                  !_.isNil(id) && _.get(newStory, 'content') !== '<p><br></p>'
                    ? _.get(newStory, 'content')
                    : null
                }
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
