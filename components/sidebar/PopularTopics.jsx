import SidebarTitle from '../SidebarTitle';

export default function PopularTopics() {
    const topics = [
        {
          id: 0,
          name: 'Technology',
          href: '#',
        },
        {
          id: 1,
          name: 'Money',
          href: '#',
        },
        {
          id: 2,
          name: 'App',
          href: '#',
        },
        {
          id: 3,
          name: 'Mindfulness',
          href: '#',
        },
        {
          id: 4,
          name: 'Art',
          href: '#',
        },
        {
          id: 5,
          name: 'Yoga',
          href: '#',
        },
        {
          id: 6,
          name: 'Caravan Camping',
          href: '#',
        },
      ];
      
  return (
    <div>
      <SidebarTitle title="Popular Topics" spacing="mb-4" />
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {topics.map((topic) => (
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
