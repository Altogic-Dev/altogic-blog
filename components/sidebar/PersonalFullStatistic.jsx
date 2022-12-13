import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function PersonalFullStatistic() {
  const topicAnalytics = useSelector((state) => state.topics.topicAnalytics);

  return (
    <div className="pb-10 border-b border-gray-200">
      <div className="flex items-center justify-between pr-10 mb-8">
        <span className="flex flex-col text-slate-700">
          <span className="text-3xl font-bold tracking-md">
            {topicAnalytics?.storyCount}

          </span>
          <span className="text-xl tracking-md">
            {topicAnalytics?.storyCount > 1 ? 'Stories' : 'Story'}
          </span>
        </span>
        <span className="flex flex-col text-slate-700">
          <span className="text-3xl font-bold tracking-md">
            {_.size(topicAnalytics?.profilePictures)}
          </span>
          <span className="text-xl tracking-md">
            {_.size(topicAnalytics?.profilePictures) > 1 ? 'Writers' : 'Writer'}
          </span>
        </span>
      </div>
      <div className="flex items-center -space-x-2">
        {_.map(topicAnalytics?.profilePictures, (picture, index) => (
          <span
            key={picture + index}
            className="inline-flex w-9 h-9 flex-shrink-0 rounded-full ring-4 ring-white relative"
          >
            <img
              className="w-9 h-9 rounded-full"
              src={picture}
              alt="Olivia Rhye"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
