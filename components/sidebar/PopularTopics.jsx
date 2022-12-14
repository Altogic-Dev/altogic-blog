/* eslint-disable no-param-reassign */
import { topicsActions } from '@/redux/topics/topicsSlice';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import usePrevious from '@/hooks/usePrevious';
import Topic from '../basic/topic';
import SidebarTitle from '../SidebarTitle';

export default function PopularTopics({
  isRelatedTopics,
  isFollowingTopics,
  isPopularTopics,
  userTopics,
}) {
  const popularTopics = useSelector((state) => state.topics.popularTopics);
  const relatedTopics = useSelector((state) => state.topics.relatedTopics);
  const followingTopics = useSelector((state) =>
    _.get(state.auth.user, 'followingTopics')
  );

  const [title, setTitle] = useState();
  const router = useRouter();
  const { tag } = router.query;
  const previousTag = usePrevious(tag);
  const [topics, setTopics] = useState([]);
  const dispatch = useDispatch();
  const getPopularTopics = () => {
    dispatch(topicsActions.getPopularTopicsRequest());
  };
  const getRelatedTopics = () => {
    dispatch(topicsActions.getRelatedTopicsRequest(tag));
  };

  useEffect(() => {
    if (isPopularTopics) {
      getPopularTopics();
      setTitle('Popular Categories');
    } else if (tag && isRelatedTopics && previousTag !== tag) {
      getRelatedTopics();
      setTitle('Related Categories');
    } else if (isFollowingTopics) {
      setTitle('Following Categories');
    } else if (userTopics) {
      setTitle('Your Categories');
    }
  }, [tag]);

  useEffect(() => {
    if (relatedTopics && isRelatedTopics) {
      setTopics(
        relatedTopics.map((topic) => ({
          name: topic.topicA === tag ? topic.topicB : topic.topicA,

          ...topic,
        }))
      );
    } else if (popularTopics && isPopularTopics) {
      setTopics(popularTopics);
    } else if (followingTopics && isFollowingTopics) {
      setTopics(
        followingTopics.map((topic) => ({
          name: topic,
        }))
      );
    } else if (userTopics) {
      setTopics(
        userTopics.map((topic, index) => ({ _id: index, name: topic }))
      );
    }
  }, [relatedTopics, popularTopics, followingTopics]);
  if (topics.length > 0)
    return (
      <div>
        <SidebarTitle title={title} spacing="mb-4" />
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          {topics?.map((topic) => (
            <Topic
              key={topic._id}
              title={topic.name}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              {topic.name}
            </Topic>
          ))}
        </div>
      </div>
    );
}
