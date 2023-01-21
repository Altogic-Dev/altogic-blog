import { publicationActions } from '@/redux/publication/publicationSlice';
import { classNames, RGBAToHexA } from '@/utils/utils';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './basic/button';
import FollowButton from './basic/followbutton';
import SocialIcons from './publication/SocialIcons';

export default function AligmentPublicationLayout({
  layout,
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
  preview,
  bgColor,
  bottomColor,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { publicationName, tabName } = router.query;
  const isLoading = useSelector((state) => state.publication.isLoading);
  const publication = useSelector((state) => state.publication.publication);
  const sessionUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  const handleFollowButton = () => {
    const followerUser = {
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
          user: followerUser,
        })
      );
    } else if (publication) {
      dispatch(
        publicationActions.followPublicationRequest({
          publication: {
            ...publicationReq,
          },
          user: followerUser,
        })
      );
    }
  };

  useEffect(() => {
    if (!user) setUser(sessionUser);
  }, [user]);

  return (
    <>
      <div
        style={
          _.isNil(bgImage)
            ? {
                backgroundColor: RGBAToHexA(bgColor),
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
          'flex-col h-[449px] justify-center items-center hidden md:flex',
          isCentered ? '' : null
        )}
      >
        {['title', 'both'].includes(layout) ? (
          <div
            className={classNames(
              'flex flex-col max-w-screen-xl px-auto px-4 lg:px-8 overflow-hidden',
              isCentered ? 'justify-center items-center' : null,
              layout === 'both' ? 'mt-[-50px]' : null
            )}
          >
            {layout === 'both' && (
              <img className="w-[250px] text-center" src={logo} alt="" />
            )}
            <h1
              className="text-slate-600 max-w-4xl text-5xl tracking-md mt-2 break-words  w-60 md:w-full"
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
      <div className="h-auto flex flex-col md:hidden justify-start items-start mt-5 mb-10 gap-6">
        <div className="w-full flex justify-center">
          <div
            style={{
              position: 'relative',
              width: '250px',
              paddingBottom: '40%',
            }}
          >
            <Image
              alt="Image Alt"
              src={logo}
              layout="fill"
              objectFit="contain" // Scale your image down to fit into the container
            />
          </div>
        </div>
        <div className="w-full p-6" style={{ color, backgroundColor: bgColor }}>
          <h1
            style={{ color }}
            className="text-purple-600 font-bold w-full text-5xl tracking-md mt-2 break-words  "
          >
            {title}
          </h1>
          <h2
            className="text-slate-600 max-w-4xl text-2xl tracking-md mt-2"
            style={{ color }}
          >
            {content}
          </h2>
          <div className="flex justify-between w-full py-6 ">
            <SocialIcons
              twitter={twitter}
              facebook={facebook}
              linkedin={linkedin}
              color={color}
            />
            {user && (
              <FollowButton
                isFollowing={publication?.isFollowing}
                isLoading={!preview && isLoading}
                onClick={!preview ? handleFollowButton : null}
              />
            )}
          </div>
          <ul className="flex items-center gap-4 w-11/12 overflow-y-auto px-6 md:hidden">
            {_.map(navigations, (nav, index) => (
              <li
                key={`${_.get(nav, 'tabName')}-${index}`}
                className="flex items-center justify-center"
              >
                {nav?.tabType !== 'link' ? (
                  <Button
                    onClick={() =>
                      router.push(
                        `/publication/${publicationName}/${nav.tabName}`,
                        undefined,
                        { scroll: false }
                      )
                    }
                    className={`inline-block p-3 text-base tracking-sm rounded-md uppercase hover:text-purple-500 ${
                      tabName === nav?.tabName
                        ? 'text-purple-500'
                        : 'text-slate-500'
                    }`}
                    style={{ color }}
                  >
                    {_.get(nav, 'tabName')}
                  </Button>
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
        </div>
      </div>
      <div className="relative w-[100vw] h-[64px] bg-no-repeat bg-cover bg-center hidden md:flex">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 max-w-screen-xl w-full mx-auto px-4 lg:px-8 mb-16">
          <div
            style={{
              backgroundColor: RGBAToHexA(bottomColor),
              borderRadius: '10px 10px 0px 0px',
            }}
            className=" flex items-center justify-between gap-4 py-3 border-b border-gray-200"
          >
            <ul className="flex items-center gap-4 w-full overflow-y-auto">
              {_.map(navigations, (nav, index) => (
                <li
                  key={`${_.get(nav, 'tabName')}-${index}`}
                  className="flex items-center justify-center"
                >
                  {nav?.tabType !== 'link' ? (
                    <Button
                      onClick={() =>
                        router.push(
                          `/publication/${publicationName}/${nav.tabName}`,
                          undefined,
                          { scroll: false }
                        )
                      }
                      className={`inline-block p-3 text-base tracking-sm rounded-md uppercase hover:text-purple-500 ${
                        tabName === nav?.tabName
                          ? 'text-purple-500'
                          : 'text-slate-500'
                      }`}
                      style={{ color }}
                    >
                      {_.get(nav, 'tabName')}
                    </Button>
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
            <div className="flex gap-8 justify-between pr-5">
              <SocialIcons
                twitter={twitter}
                facebook={facebook}
                linkedin={linkedin}
                color={color}
              />

              {user && (
                <FollowButton
                  isFollowing={publication?.isFollowing}
                  isLoading={!preview && isLoading}
                  onClick={!preview ? handleFollowButton : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
