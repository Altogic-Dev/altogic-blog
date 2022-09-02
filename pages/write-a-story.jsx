import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import dynamic from 'next/dynamic';
import Layout from '../layout/Layout';

const Editor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

export default function WriteAStory() {
  const [content, setContent] = useState('');
  const [storyImages, setStoryImages] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [username, setUsername] = useState('');
  const user = useSelector((state) => state.auth.user);
  const newStory = useSelector((state) => state.story.story);
  const dispatch = useDispatch();
  const input = useRef();

  useEffect(() => {
    if (user) {
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (content) {
      const story = {
        user: user._id,
        username: user.username,
        userProfilePicture: user.profilePicture,
        content,
        storyImages: storyImages.filter(Boolean),
        title: input.current.value,
      };
      if (!isCreated) {
        dispatch(storyActions.createStoryRequest(story));
        setIsCreated(true);
      } else {
        dispatch(
          storyActions.updateStoryRequest({
            _id: newStory._id,
            ...story,
          })
        );
      }
    }
  }, [content]);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto h-screen w-screen px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0 flex flex-col items-center">
        <div className="flex items-center justify-between gap-4 md:mb-28 w-full">
          <span className="text-slate-800 text-lg tracking-sm">
            Draft in <span className="font-semibold">{username}</span>
          </span>
          {isCreated && (
            <Link href="publish-settings">
              <a className="inline-flex items-center gap-2 px-[14px] py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-24">
                <CheckCircleIcon className="w-5 h-5" />
                Publish
              </a>
            </Link>
          )}
        </div>
        <form className="w-full">
          <input
            type="text"
            name="story-title"
            className="block w-2/3 text-slate-500 px-0 py-8 text-4xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0"
            placeholder="Story Title"
            required
            ref={input}
          />
          <div className="mt-4 w-2/3">
            <Editor onChange={setContent} setImages={setStoryImages} />
          </div>
        </form>
      </div>
    </Layout>
  );
}
