import Topic from '@/components/basic/topic';
import SidebarTitle from '../SidebarTitle';

export default function TopicMatch({ topics, query }) {
  return (
    <div>
      <SidebarTitle title={`Categories matching ${query}`} spacing="mb-4" />
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {topics?.map((topic) => (
          <Topic
            key={topic._id}
            title={topic.name}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-200 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          />
        ))}
      </div>
    </div>
  );
}
