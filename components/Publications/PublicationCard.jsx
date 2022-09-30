import React from 'react';
import Link from 'next/link';
import _ from 'lodash';
import Button from '../basic/button';

export default function PublicationCard({
  publication,
  isFollow,
  user,
  isStaff,
}) {
  return (
    <div className="my-12">
      <Link href={`/publication/${publication.name}`}>
        <a className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={publication.profilePicture}
                alt={publication.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h2 className="text-slate-700 text-lg font-medium">
                {publication.name}
              </h2>
              <h3 className="text-slate-500 text-sm font-medium line-clamp-3">
                {publication.description}
              </h3>
            </div>
          </div>
          {isFollow && (
            <Button className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Unfollow
            </Button>
          )}
          {isStaff && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm font-medium">
                  {_.capitalize(
                    publication?.users.find((pb) => pb.user === user._id)?.role
                  ) || 'Owner'}
                </span>
              </div>
            </div>
          )}
        </a>
      </Link>
    </div>
  );
}
