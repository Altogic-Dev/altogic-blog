import { recommendationsActions } from '@/redux/recommendations/recommendationsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarTitle from '../SidebarTitle';

export default function PopularTopics() {
  const popularTopics = useSelector(
    (state) => state.recommendations.popularTopics
  );




  const dispatch = useDispatch();
  const getPopularTopics = () => {
    dispatch(recommendationsActions.getPopularTopicsRequest());
  };

  useEffect(() => {
    getPopularTopics();
  }, []);

  return (
    <div>
      <SidebarTitle title="Popular Topics" spacing="mb-4" />
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {popularTopics?.map((topic) => (
          <a
            key={topic.id}
            href={topic.href}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            {topic.name}
          </a>
        ))}
      </div>
    </div>
  );
}