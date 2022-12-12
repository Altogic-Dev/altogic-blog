import { publicationActions } from '@/redux/publication/publicationSlice';
import { classNames } from '@/utils/utils';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import FollowButton from './basic/followbutton';
import SocialIcons from './publication/SocialIcons';

export default function AligmentPublicationLayout({
  layout,
  bgColor,
  color,
  logo,
  isCentered,
  title,
  content,
  bgImage,
  twitter,
  facebook,
  linkedin,
  navigations,
  setSelectedTabIndex,
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.publication.isLoading);
  const publication = useSelector((state) => state.publication.publication);
  const sessionUser = useSelector((state) => state.auth.user);
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
      publicationLogo: _.get(publication, 'logo'),
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

  return (
    <>
      <div
        style={
          _.isNil(bgImage)
            ? {
                backgroundColor: bgColor,
              }
            : {
                backgroundImage: `url(${bgImage})`,
                backgroundColor: '#cccccc',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
              }
        }
        className={classNames(
          'flex flex-col h-[449px] justify-center items-center',
          isCentered ? '' : null
        )}
      >
        {['title', 'both'].includes(layout) ? (
          <div
            className={classNames(
              'flex flex-col max-w-screen-xl px-auto px-4 lg:px-8',
              isCentered ? 'justify-center items-center' : null,
              layout === 'both' ? 'mt-[-50px]' : null
            )}
          >
            {layout === 'both' && (
              <img className="w-[250px] text-center" src={logo} alt="" />
            )}
            <h1
              className="text-slate-600 max-w-4xl text-5xl tracking-md mt-2"
              style={{ color }}
            >
              {title}
            </h1>
            <h2
              className="text-slate-600 max-w-4xl text-2xl tracking-md mt-2"
              style={{ color }}
            >
              {content}
            </h2>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
            <img className="mb-[60px] w-[300px] " src={logo} alt="" />
          </div>
        )}
      </div>
      <div>
        <div className="relative w-full h-[64px] bg-no-repeat bg-cover bg-center">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 max-w-screen-xl w-full mx-auto px-4 lg:px-8 mb-16">
            <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-200">
              <ul className="flex items-center gap-4">
                {_.map(navigations, (nav, index) => (
                  <li
                    key={`${_.get(nav, 'tabName')}-${index}`}
                    className="flex items-center justify-center"
                  >
                    {nav?.tabType !== 'link' ? (
                      <button
                        type="button"
                        onClick={() =>
                          _.isFunction(setSelectedTabIndex)
                            ? setSelectedTabIndex(index)
                            : null
                        }
                        className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-700"
                        style={{ color }}
                      >
                        {_.get(nav, 'tabName')}
                      </button>
                    ) : (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={_.get(nav, 'externalLink')}
                        style={{ color }}
                        className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-700"
                      >
                        {_.get(nav, 'tabName')}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <SocialIcons
                twitter={twitter}
                facebook={facebook}
                linkedin={linkedin}
                color={color}
              />

              {sessionUser && (
                <FollowButton
                  isFollowing={publication?.isFollowing}
                  isLoading={isLoading}
                  onClick={handleFollowButton}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
