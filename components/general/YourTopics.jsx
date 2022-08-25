import { authActions } from '@/redux/auth/authSlice';
import { GlobeAltIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../basic/button';
import Topic from '../basic/topic';

export default function YourTopics() {
  const [selectedTopic, setSelectedTopic] = useState();
  const [followingTopicsState, setFollowingTopicsState] = useState([]);
  const dispatch = useDispatch();
  const followingTopics = useSelector((state) =>
    _.get(state.auth.user, 'followingTopics')
  );
  const unfollowTopic = () => {
    const topics = followingTopicsState.filter(
      (topic) => topic !== selectedTopic
    );
    setFollowingTopicsState(topics);
    setSelectedTopic();
    dispatch(
      authActions.unfollowTopicRequest({
        topics,
      })
    );
  };
  useEffect(() => {
    setFollowingTopicsState(followingTopics);
  }, [followingTopics]);

  return (
    <>
      {!_.isEmpty(followingTopicsState) && (
        <div className="flex items-center gap-4 mb-10">
          <span className="text-slate-500 text-sm tracking-sm whitespace-nowrap uppercase">
            Your Topics
          </span>
          <div className="flex gap-2">
            {followingTopicsState?.map((topic) => (
              <Topic
                onClick={() =>
                  setSelectedTopic((state) => (state === topic ? null : topic))
                }
                key={topic}
                title={topic}
              />
            ))}
          </div>
        </div>
      )}
      {selectedTopic && (
        <div className="">
          <p className="text-5xl font-bold text-slate-700 mb-5 gap-2 flex">
            <GlobeAltIcon className="w-6" />
            {selectedTopic}
          </p>
          <div className="inline-flex gap-4 mb-12">
            <Button primaryColor onClick={unfollowTopic}>
              Unfollow
            </Button>
            <Button onClick={() => {}}>Start Writing</Button>
          </div>
        </div>
      )}
    </>
  );
}
