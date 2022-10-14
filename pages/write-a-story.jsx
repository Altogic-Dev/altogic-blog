import React, { useEffect, useState } from 'react';

import _ from 'lodash';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
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
  const [inpTitle, setInpTitle] = useState('');

  const user = useSelector((state) => state.auth.user);
  const newStory = useSelector((state) => state.story.story);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { topic } = router.query;
  const selectedPublication = useSelector(
    (state) => state.publication.selectedPublication
  );
  useEffect(() => {
    if (user) {
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (newStory && !_.isNil(id)) setInpTitle(newStory.title);
  }, [newStory]);

  useEffect(() => {
    if (id) {
      dispatch(storyActions.getStoryRequest(id));
    } else {
      dispatch(storyActions.clearStory());
    }
  }, [id]);

  useEffect(() => {
    if (newStory) setIsCreated(true);
  }, [newStory]);
  useEffect(() => {
    if (content) {
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
      if (!isCreated) {
        dispatch(storyActions.createStoryRequest(story));
        setIsCreated(true);
      } else {
        dispatch(
          storyActions.updateStoryRequest({
            story: {
              _id: newStory._id,
              ...story,
            },
          })
        );
      }
    }
    setMinRead(Math.ceil(content.split(' ').length / 200));
  }, [content, inpTitle]);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto h-screen w-screen px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0 flex flex-col items-center">
        <div className="flex items-center justify-between gap-4 md:mb-28 w-full">
          <span className="text-slate-800 text-lg tracking-sm">
            Draft in{' '}
            <span className="font-semibold">
              {selectedPublication ? selectedPublication.name : username}
            </span>
          </span>
          <p className="text-slate-500">{minRead} min read</p>

          {isCreated && (
            <button
              type="button"
              onClick={() => {
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
                  `/publish-settings/${_.get(
                    newStory,
                    'storySlug'
                  )}?isEdited=${!_.isNil(id)}${topic ? `&topic=${topic}` : ''}`
                );
              }}
              className="inline-flex items-center gap-2 px-[14px] py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-24"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Publish
            </button>
          )}
        </div>
        <form className="w-full">
          <input
            type="text"
            name="story-title"
            className="block w-full px-0 py-8 text-4xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0"
            placeholder="Story Title"
            required
            onChange={(e) => setInpTitle(e.currentTarget.value)}
            value={inpTitle}
          />
          <div className="mt-4 w-full">
            <Editor
              setMinRead={setMinRead}
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
