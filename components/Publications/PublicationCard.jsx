import React from 'react';
import Link from 'next/link';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import FollowButton from '../basic/followbutton';
import Button from '../basic/button';

export default function PublicationCard({
  publication,
  isFollow,
  user,
  isStaff,
}) {
  const isLoading = useSelector((state) => state.publication.isLoading);
  const sessionUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleFollowButton = () => {
    const user = {
      _id: sessionUser._id,
      userName: sessionUser.username,
      userAbout: sessionUser.about,
      userProfilePicture: sessionUser.profilePicture,
    };
    const publicationReq = {
      publication: _.get(publication, '_id'),
      publicationName: _.get(publication, 'name'),
      publicationDescription: _.get(publication, 'description'),
      publicationProfilePicture: _.get(publication, 'profilePicture'),
    };

    if (publication.isFollowing && publication) {
      dispatch(
        publicationActions.unfollowPublicationRequest({
          publication: _.get(publication, '_id'),
          user,
        })
      );
    } else if (publication) {
      dispatch(
        publicationActions.followPublicationRequest({
          publication: {
            ...publicationReq,
          },
          user,
        })
      );
    }
  };

  const handleSelectPublication = () => {
    dispatch(publicationActions.selectPublicationRequest(publication));
  };

  return (
    <div className="my-12">
      <div className="flex items-center justify-between w-full mb-4">
        <Link href={`/publication/${publication.name}`}>
          <a className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={publication.logo}
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
          </a>
        </Link>
        {isFollow && (
          <FollowButton
            isFollowing={publication?.isFollowing}
            isLoading={isLoading}
            onClick={handleFollowButton}
          />
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
            <Button
              loading={isLoading}
              extraClasses="gap-2 px-[14px] "
              onClick={handleSelectPublication}
            >
              Select
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
