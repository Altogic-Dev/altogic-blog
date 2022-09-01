import { authActions } from '@/redux/auth/authSlice';
import { GlobeAltIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../basic/button';
import Topic from '../basic/topic';

export default function YourTopics({Tag}) {
  const router = useRouter();

  const [selected, setSelected] = useState(true);
  const [followingTopicsState, setFollowingTopicsState] = useState([]);
  const dispatch = useDispatch();
  const followingTopics = useSelector((state) =>
    _.get(state.auth.user, 'followingTopics')
  );
  const unfollowTopic = () => {
    const topics = followingTopicsState.filter((topic) => topic !== Tag);
    setFollowingTopicsState(topics);
    setSelected();
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
      <div className="hidden lg:block mb-[0px]">
        {!_.isEmpty(followingTopicsState) && (
          <div className="flex items-center gap-4 mb-10">
            <span className="text-slate-500 text-sm tracking-sm whitespace-nowrap uppercase">
              Your Topics
            </span>
            <div className="flex gap-2">
              {followingTopicsState?.map((topic) => (
                <Topic
                  onClick={() =>
                    router.push(`/tag/${topic.replaceAll(' ', '-')}`)
                  }
                  key={topic}
                  title={topic}
                />
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
              <Button primaryColor onClick={unfollowTopic}>
                Unfollow
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
                <Topic
                  onClick={() =>
                    router.push(`/tag/${topic.replaceAll(' ', '-')}`)
                  }
                  key={topic}
                  title={topic}
                />
              ))}
            </div>
          </div>
          {selected && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100">
                  <GlobeAltIcon className="w-6" />
                </span>
                <h1 className="text-slate-700 text-2xl md:text-3xl lg:text-5xl font-bold tracking-md">
                  {Tag}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  Unfollow
                </Button>
                <Button className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  Start writing
                </Button>
              </div>
            </>
          )}
          
        </div>
      )}
    </>
  );
}
