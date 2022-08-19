import Link from 'next/link';
import Avatar from '../profile/Avatar';
import SidebarTitle from '../SidebarTitle';

export default function StoriesYouFollow() {
  const storiesFollows = [
    {
      id: 0,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
      badge: 3,
    },
    {
      id: 1,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
      badge: 5,
    },
    {
      id: 2,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
      badge: 7,
    },
    {
      id: 3,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 4,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 5,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 6,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 7,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 8,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 9,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      id: 10,
      name: 'Oliva Rhy',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
  ];


  return (
    <div className="overflow-y-visible">
      <SidebarTitle title="Stories you follow" spacing="mb-4" />
      <div className="flex items-center gap-3 overflow-x-auto overflow-y-visible">
        {storiesFollows.map((storiesFollow) => (
          <div
            key={storiesFollow.id}
            className="group relative z-[5] flex w-14 h-14 flex-shrink-0"
          >
            <a href={storiesFollow.href}>
              <Avatar
                className="rounded-full"
                src={storiesFollow.image}
                alt={storiesFollow.name}
              />
              {storiesFollow.badge && (
                <span className="inline-flex items-center justify-center absolute bottom-0 right-0 w-[18px] h-[18px] bg-purple-500 text-white text-xs tracking-sm rounded-full ring-2 ring-white">
                  {storiesFollow.badge}
                </span>
              )}
            </a>
            <div className="absolute right-11 top-[100px] shadow bg-white w-24 border border-gray-200 z-10 rounded-lg hidden group-hover:block">
              <div className="w-full flex flex-col justify-between p-6">
                <div className="relative rounded-lg flex items-center gap-6 mb-6">
                  <div className="flex-shrink-0 w-12">
                    <Avatar
                      className="rounded-full"
                      src={storiesFollow.image}
                      alt={storiesFollow.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href="/">
                      <a className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true">
                          hey
                        </span>
                        <p className="text-sm font-medium text-slate-800">d</p>
                        <p className="text-sm text-slate-400 truncate">d</p>
                      </a>
                    </Link>
                  </div>
                </div>
                <div>
                  <h6 className="text-slate-800 mb-2 text-sm font-semibold leading-5 tracking-[-0.4px]">
                    About
                  </h6>
                  <p className="text-slate-600 text-sm leading-5 tracking-[-0.4px]">
                    Hello my name is is
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex border-t border-gray-200 divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <Link href="/">
                      <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm tracking-[-0.4px] text-slate-500 font-medium border border-transparent rounded-bl-lg hover:bg-gray-50">
                        <svg
                          xmlns="http:www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="ml-3">View Profile</span>
                      </a>
                    </Link>
                  </div>

                  <div className="-ml-px w-0 flex-1 flex">
                    <button type="button"> Follow</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
