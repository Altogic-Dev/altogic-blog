import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarTitle from '../SidebarTitle';

export default function Followings() {
  const followings = [
    {
      id: 0,
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Emilia Gates',
    },
    {
      id: 1,
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Marley Rhiel Madsen',
    },
    {
      id: 2,
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Omar Lipshutz',
    },
    {
      id: 3,
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Emma Laurden',
    },
    {
      id: 4,
      href: '#',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Olivia Rhye',
    },
  ];

  const sessionUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getFollowings = () => {
    dispatch(followerConnectionActions.getFollowingUsers(sessionUser));
  };

  useEffect(() => {
    getFollowings()
  }, [sessionUser]);

  return (
    <div>
      <SidebarTitle title="Following" spacing="mb-4" />
      <div className="flex flex-col gap-3">
        {followings.map((person) => (
          <a
            key={person.id}
            href={person.href}
            className="inline-flex items-center gap-2 text-slate-700 text-sm font-medium tracking-sm hover:text-purple-700"
          >
            <img
              className="w-6 h-6 rounded-full"
              src={person.image}
              alt={person.name}
            />
            <span>{person.name}</span>
          </a>
        ))}
        <Link href="#">
          <a className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700">
            See all (221)
            <svg
              className="w-5 h-5 text-purple-700"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}
