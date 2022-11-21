import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function PostList({
  url,
  title,
  storiesNumber,
  images,
  badges,
}) {
  return (
    <div className="bg-slate-50 rounded-[10px] p-6 mb-4">
      <div className="flex justify-between gap-8 sm:gap-4">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-col items-start gap-2">
            <Link href={url}>
              <a className="text-slate-800 text-2xl md:text-3xl font-bold tracking-md">
                <h2>{title}</h2>
              </a>
            </Link>

            {badges ? (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                <LockClosedIcon className="w-3 h-3 mr-1" />
                Private
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <LockOpenIcon className="w-3 h-3 mr-1" />
                Public
              </span>
            )}
            <span className="text-slate-500 text-base tracking-sm">
              {storiesNumber} Stories
            </span>
          </div>
          <Link href={url}>
            <a className="inline-flex items-center px-5 py-3 text-base font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              View List
            </a>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-1">
          <div className="group inline-flex w-[120px] h-[120px] overflow-hidden">
            <img
              className="w-[120px] h-[120px] transform transition-transform ease-in-out duration-300 hover:scale-125"
              src={images[0]}
              alt=""
            />
          </div>
          <div className="group inline-flex w-[120px] h-[120px] overflow-hidden">
            <img
              className="w-[120px] h-[120px] transform transition-transform ease-in-out duration-300 hover:scale-125"
              src={images[1]}
              alt=""
            />
          </div>
          <div className="group hidden sm:inline-flex w-[120px] h-[120px] overflow-hidden">
            <img
              className="w-[120px] h-[120px] transform transition-transform ease-in-out duration-300 hover:scale-125"
              src={images[2]}
              alt=""
            />
          </div>
          <div className="group hidden sm:inline-flex w-[120px] h-[120px] overflow-hidden">
            <img
              className="w-[120px] h-[120px] transform transition-transform ease-in-out duration-300 hover:scale-125"
              src={images[3]}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
