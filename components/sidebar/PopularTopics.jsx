/* eslint-disable no-param-reassign */
import { topicsActions } from '@/redux/topics/topicsSlice';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarTitle from '../SidebarTitle';

export default function PopularTopics({ isRelatedTopics }) {
  const popularTopics = useSelector((state) => state.topics.popularTopics);
  const relatedTopics = useSelector((state) => state.topics.relatedTopics);

  const router = useRouter();
  const { tag } = router.query;

  const [topics, setTopics] = useState([]);
  const dispatch = useDispatch();
  const getPopularTopics = () => {
    dispatch(topicsActions.getPopularTopicsRequest());
  };
  const getRelatedTopics = () => {
    dispatch(topicsActions.getRelatedTopicsRequest(tag));
  };

  useEffect(() => {
    if (isRelatedTopics && tag) {
      getRelatedTopics();
    } else {
      getPopularTopics();
    }
  }, [tag]);

  useEffect(() => {
    if (isRelatedTopics) {
      relatedTopics.map((topic) => ({
        name: topic.topicA === tag ? topic.topicB : topic.topicA,
        test: 'test',
        ...topic,
      }));
      setTopics(relatedTopics);
    } else {
      setTopics(popularTopics);
    }
  }, [relatedTopics, popularTopics]);


  return (
    <div>
      <SidebarTitle
        title={isRelatedTopics ? 'Related Topics' : 'Popular Topics'}
        spacing="mb-4"
      />
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {topics?.map((topic) => (
          <a
            key={topic.id ?? topic._id}
            href={`tag/${topic.name}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            {topic.name}
          </a>
        ))}
      </div>
    </div>
  );
}
