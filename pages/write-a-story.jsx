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
import dynamic from 'next/dynamic';
import { ClipLoader } from 'react-spinners';
import Layout from '../layouts/Layout';

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});

export default function WriteAStory() {
  const [content, setContent] = useState('');
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

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { topic } = router.query;

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
  } = useForm({
    resolver: yupResolver(storySchema),
  });
  useEffect(() => {
    setWebworker(new Worker(new URL('@/utils/worker', import.meta.url)));
  }, []);
  useEffect(() => {
    if (user) {
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (newStory && !_.isNil(id)) {
      setInpTitle(newStory.title);
      setValue('title', newStory.title);
    }
    if (_.get(newStory, '_id') && !isCreated) {
      setIsCreated(true);
      setLoading(false);
      router.push(`/write-a-story?id=${newStory._id}`);
    }
    console.log(newStory);
  }, [newStory]);

  useEffect(() => {
    if (id) {
      dispatch(storyActions.getStoryRequest(id));
      setIsCreated(true);
    } else {
      dispatch(storyActions.clearStory());
    }
  }, [id]);

  useEffect(() => {
    if (content || inpTitle) {
      setLoading(true);
      const story = {
        user: user._id,
        username: user.username,
        userProfilePicture: user.profilePicture,
        content,
        storyImages: storyImages.filter((item) => item && item !== 'undefined'),
        title: inpTitle,
        estimatedReadingTime: minRead,
        isPublished: false,
        publication: !_.isNil(selectedPublication)
          ? selectedPublication._id
          : undefined,
      };
      setIsShowSaving(true);
      if (!isCreated) {
        dispatch(storyActions.createStoryRequest(story));
      } else if (!_.isNil(newStory)) {
        webworker.postMessage({
          _id: newStory._id,
          ...story,
        });
        webworker.onmessage = (e) => {
          setLoading(false);
          dispatch(storyActions.updateStoryWorkerRequest(e.data));
        };
      }
    }
    setMinRead(Math.ceil(content.split(' ').length / 200));
  }, [content, inpTitle]);

  const handleDebounceFn = (inputValue) => {
    setInpTitle(inputValue);
  };
  const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);

  const handleChangeTitle = (e) => {
    debounceFn(e.target.value);
  };
  const handlePublish = () => {
    if (inpTitle) {
      dispatch(
        storyActions.updateStoryRequest({
          story: {
            _id: newStory._id,
            content,
          },
        })
      );
      dispatch(storyActions.cacheStoryRequest({ story: newStory }));
      router.push(
        `/publish-settings/${_.get(newStory, 'storySlug')}?isEdited=${!_.isNil(
          id
        )}${topic ? `&topic=${topic}` : ''}`
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
      dispatch(storyActions.clearStory());
    },
    []
  );
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto h-screen w-screen px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0 flex flex-col items-center">
        <div className="flex items-center justify-between gap-4 md:mb-12 w-full">
          <span className="text-slate-800 text-lg tracking-sm w-1/3">
            Draft in{' '}
            <span className="font-semibold">
              {selectedPublication ? selectedPublication.name : username}
            </span>
            {isCreated && isShowSaving && (
              <span className="text-green-400 font-semibold">
                {' - '}
                {loading ? (
                  <span>
                    <span className="animate-pulse">Saving</span>...
                    <ClipLoader size={10} color="#4ade80" loading={loading} />
                  </span>
                ) : (
                  'Saved'
                )}
              </span>
            )}
          </span>
          <p className="text-slate-500 w-1/3 text-center">{minRead} min read</p>

          {isCreated && (
            <div className="w-1/3 flex justify-end">
              <Button
                onClick={handlePublish}
                className=" inline-flex items-center gap-2 px-[14px] py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-24"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Publish
              </Button>
            </div>
          )}
        </div>
        <form className="w-full">
          <Input
            type="text"
            name="story-title"
            className="block w-full px-0 py-8 text-4xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0"
            placeholder="Story Title"
            required
            register={register('title')}
            error={errors.title}
            onChange={handleChangeTitle}
          />

          <div className="mt-4 w-full">
            <Editor
              setIsShowSaving={setIsShowSaving}
              onChange={setContent}
              setImages={setStoryImages}
              value={!_.isNil(id) && _.get(newStory, 'content')}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
