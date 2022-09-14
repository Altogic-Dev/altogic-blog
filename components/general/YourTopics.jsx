import { authActions } from '@/redux/auth/authSlice';
import { GlobeAltIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../basic/button';
import Topic from '../basic/topic';

export default function YourTopics({ Tag }) {
  const followingTopics = useSelector((state) =>
    _.get(state.auth.user, 'followingTopics')
  );

  const [followingTopicsState, setFollowingTopicsState] = useState([]);
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();

  const unfollowTopic = () => {
    const topics = followingTopicsState.filter(
      (topic) => topic !== Tag.replace('-', ' ')
    );

    setFollowingTopicsState(topics);
    dispatch(
      authActions.updateFollowingTopicsRequest({
        topics,
      })
    );
  };
  const followTopic = () => {
    dispatch(
      authActions.updateFollowingTopicsRequest({
        topics: [...followingTopicsState, Tag.replace('-', ' ')],
      })
    );
    setFollowingTopicsState((state) => [...state, Tag.replace('-', ' ')]);
  };

  const handleClick = (followed) => {
    if (followed) unfollowTopic();
    else followTopic();

    setFollowed((state) => !state);
  };
  useEffect(() => {
    if (Tag) {
      setFollowingTopicsState(followingTopics);
      setFollowed(
        followingTopics?.length > 0 &&
          followingTopics?.includes(Tag.replace('-', ' '))
      );
    }
  }, [followingTopics, Tag]);

  return (
    <>
      <div className="hidden lg:block mb-[0px]">
        {!_.isEmpty(followingTopicsState) && (
          <div className="flex items-center gap-4 mb-10">
            <span className="text-slate-500 text-sm tracking-sm whitespace-nowrap uppercase">
              Your Topics
            </span>
            <div className="flex gap-2">
              {followingTopicsState?.map((topic) => (
                <Topic key={topic} title={topic} />
              ))}
            </div>
          </div>
        )}
        {Tag && (
          <>
            <p className="text-5xl font-bold text-slate-700 mb-5 gap-2 flex">
              <GlobeAltIcon className="w-6" />
              {Tag}
            </p>
            <div className="inline-flex gap-4 mb-12">
              <Button primaryColor onClick={() => handleClick(followed)}>
                {followed ? 'Unfollow' : 'Follow'}
              </Button>
              <Button onClick={() => {}}>Start Writing</Button>
            </div>
          </>
        )}
      </div>
      {Tag && (
        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-slate-500 text-sm tracking-sm whitespace-nowrap uppercase">
              Your Topics
            </span>
            <div className="flex items-center gap-4 overflow-x-auto">
              {followingTopicsState?.map((topic) => (
                <Topic key={topic} title={topic} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100">
              <GlobeAltIcon className="w-6" />
            </span>
            <h1 className="text-slate-700 text-2xl md:text-3xl lg:text-5xl font-bold tracking-md">
              {Tag}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleClick(followed)}
              className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {followed ? 'Unfollow' : 'Follow'}
            </Button>
            <Button className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Start writing
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
