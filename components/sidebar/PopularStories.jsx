import SidebarTitle from '../SidebarTitle';

export default function PopularStories() {
    const stories = [
        {
          id: 0,
          image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          name: 'Marley Rhiel Madsen',
          desc: 'Lorem Ipsum Dolor Sit Amet',
          intermediateText: 'published',
          time: '1 hour ago',
        },
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          name: 'Omar Lipshutz',
          desc: 'Sed ullamcorper neque et nisl efficitur, eget molestie dolor ultrices.',
          intermediateText: 'clapped for',
          time: '3 days ago',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          name: 'Marley Rhiel Madsen',
          desc: 'Lorem Ipsum Dolor Sit Amet',
          intermediateText: 'published',
          time: '1 hour ago',
        },
        {
          id: 3,
          image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          name: 'Marley Rhiel Madsen',
          desc: 'Lorem Ipsum Dolor Sit Amet',
          intermediateText: 'published',
          time: '1 hour ago',
        },
        {
          id: 4,
          image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          name: 'Marley Rhiel Madsen',
          desc: 'Lorem Ipsum Dolor Sit Amet',
          intermediateText: 'published',
          time: '1 hour ago',
        },
      ];
  return (
    <div>
      <SidebarTitle title="Popular Stories" spacing="mb-4" />
      <ul className="space-y-3">
        {stories.map((story) => (
          <li key={story.id} className="flex gap-3">
            <img
              className="rounded-full w-[30px] h-[30px]"
              src={story.image}
              alt={story.name}
            />
            <span className="text-sm font-light tracking-sm text-slate-500">
              <strong className="text-slate-600 font-semibold">
                {story.name}
              </strong>{' '}
              {story.intermediateText}{' '}
              <strong className="text-slate-600 font-semibold">
                {story.desc}
              </strong>{' '}
              <span className="text-slate-400 text-xs">{story.time}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
