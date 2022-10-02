import { publicationActions } from '@/redux/publication/publicationSlice';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../basic/button';
import FollowButton from '../basic/followbutton';
import SocialIcons from '../publication/SocialIcons';

export default function PublicationProfile() {
  const publication = useSelector((state) => state.publication.publication);
  const isLoading = useSelector((state) => state.publication.isLoading);
  const userFollowingPublication = useSelector(
    (state) => state.publication.userFollowingPublication
  );
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState();
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
      publicationLogo: _.get(publication, 'logo'),
    };

    if (isFollowing && publication) {
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

  useEffect(() => {
    if (publication) {
      setIsFollowing(
        userFollowingPublication.some(
          (publicationFollowing) => publicationFollowing === publication._id
        )
      );
    }
  }, [userFollowingPublication, publication]);

  return (
    <div className="space-y-6">
      <img className="w-[200px]" src={publication?.logo} alt="HiThemes" />
      <p className="text-slate-500 text-sm tracking-sm">
        {publication?.description}
      </p>
      <Button className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700">
        More information
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
      </Button>
      <div>
        <div className="my-5">
          <FollowButton
            isLoading={isLoading}
            isFollowing={isFollowing}
            onClick={handleFollowButton}
          />
        </div>
        <h2 className="text-slate-600 mb-2 text-base tracking-sm">Followers</h2>
        <span className="text-slate-500 text-sm tracking-sm">
          {publication?.followerCount}
        </span>
      </div>
      <div>
        <h2 className="text-slate-600 mb-2 text-base tracking-sm">Elsewhere</h2>
        <SocialIcons />
      </div>
    </div>
  );
}
