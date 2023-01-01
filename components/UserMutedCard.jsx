import Link from 'next/link';
import { useEffect ,useState } from 'react';
import { useSelector } from 'react-redux';
import Button from './basic/button';
import Avatar from './profile/Avatar';

export default function UserMutedCard({ user, unmuteAuthor }) {
  const isLoadingMute = useSelector((state) => state.blockConnection.isLoading);
  const [mutedUserLoading, setMutedUserLoading] = useState(false);

  useEffect(() => {
    if (!mutedUserLoading) setMutedUserLoading(false);
  }, [mutedUserLoading]);
  return (
    <li key={user?._id} className="flex items-start justify-between gap-3 py-4">
      <Link href={`/${user?.username}`}>
        <a className="flex items-center gap-3">
          <div className="flex gap-3">
            <Avatar
              width={40}
              height={40}
              className="w-10 h-10 rounded-full "
              placeholderName={user?.name}
              src={user?.profilePicture}
              alt={user?.name}
            />
            <div className="flex flex-col">
              <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                {user?.name}
              </span>
              {user?.about && (
                <span
                  className="text-slate-500 text-xs tracking-sm"
                  dangerouslySetInnerHTML={{ __html: user?.about }}
                />
              )}
            </div>
          </div>
        </a>
      </Link>
      <Button
        loading={isLoadingMute && mutedUserLoading}
        disabled={isLoadingMute}
        onClick={unmuteAuthor}
        className="inline-flex items-center px-4 py-2 border gap-2 border-transparent text-sm font-medium rounded-full tracking-sm  transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 text-slate-700 bg-slate-100"
      >
        Unmute
      </Button>
    </li>
  );
}
