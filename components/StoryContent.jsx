import { notificationsActions } from '@/redux/notifications/notificationsSlice';
import { reportActions } from '@/redux/report/reportSlice';
import { Menu, Transition } from '@headlessui/react';
import { storyActions } from '@/redux/story/storySlice';
import { blockConnectionActions } from '@/redux/blockConnection/blockConnectionSlice';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { HeartIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { getLicenseTitle } from '@/utils/utils';
import Button from './basic/button';
import BookmarkLists from './bookmarks/BookmarkLists';
import ShareButtons from './ShareButtons';
import DeleteStoryModal from './DeleteStoryModal';
import Avatar from './profile/Avatar';
import Topic from './basic/topic';

const Replies = dynamic(() => import('@/components/story/Replies'), {
  ssr: false,
});

function StoryContent(props) {
  const {
    bookmarkLists,
    setCreateNewList,
    bookmarks,
    toggleFollow,
    isFollowing,
    isMuted,
    isReported,
    forwardedRef,
    hideButtons,
    story,
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const isLiked = _.some(
    useSelector((state) => state.story.likedStories),
    (like) => story._id === like
  );
  const sessionUser = useSelector((state) => state.auth.user);
  // const replyCount = useSelector((state) => state.story.replyCount);
  const likeLoading = useSelector((state) => state.story.likeLoading);

  const isLoadingFollow = useSelector(
    (state) => state.followerConnection.followingUserLoading
  );
  const isLoadingMute = useSelector((state) => state.blockConnection.isLoading);

  const isMyProfile = _.get(sessionUser, '_id') === _.get(story, 'user._id');

  const [slideOvers, setSlideOvers] = useState(false);
  const [deleteStoryModal, setDeleteStoryModal] = useState(false);
  const [user, setUser] = useState();

  const sendNotification = (type) => {
    if (user._id !== story.user._id) {
      dispatch(
        notificationsActions.createNotificationRequest({
          targetId: story._id,
          targetTitle: story.title,
          sentUsername: user.username,
          sentUser: user._id,
          type,
          targetSlug: story.storySlug,
          sentUserProfilePicture: user.profilePicture,
          user: story.user._id,
        })
      );
    }
  };
  const handleLikeStory = () => {
    if (isLiked) {
      dispatch(
        storyActions.unlikeStoryRequest({
          userId: _.get(user, '_id'),
          storyId: _.get(story, '_id'),
        })
      );
    } else {
      dispatch(
        storyActions.likeStoryRequest({
          userId: _.get(user, '_id'),
          storyId: _.get(story, '_id'),
          authorId: _.get(story, 'user._id'),
          publicationId: _.get(story, 'publication._id'),
          categoryNames: _.get(story, 'categoryNames'),
          onSuccess: () => sendNotification('story_like'),
        })
      );
    }
  };
  const getMenuItems = (isBottom) => {
    if (isMyProfile) {
      return (
        <Menu.Items
          className={`${
            isBottom ? '-top-60 ' : ''
          }absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none`}
        >
          <Menu.Item>
            <Button
              className="w-full px-6 py-4 text-slate-600 text-base tracking-sm text-start hover:bg-slate-50 hover:text-purple-700"
              onClick={() => {
                router.push(`/write-a-story?id=${story._id}`);
              }}
            >
              Edit Story
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button
              className="w-full px-6 py-4 text-slate-600 text-base tracking-sm text-start hover:bg-slate-50 hover:text-purple-700"
              onClick={() => {
                router.push(`/write-a-story-settings?id=${story._id}`);
              }}
            >
              Story Settings
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button
              className="w-full px-6 py-4 text-slate-600 text-base tracking-sm text-start hover:bg-slate-50 hover:text-purple-700"
              onClick={() => {
                router.push(`/story/${story.storySlug}/stats`);
              }}
            >
              Story Stats
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Button
              className="flex items-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-start hover:bg-slate-50 hover:text-purple-700"
              onClick={() => {
                setDeleteStoryModal(true);
              }}
            >
              Delete Story
            </Button>
          </Menu.Item>
        </Menu.Items>
      );
    }
    return (
      <Menu.Items
        className={`${
          isBottom ? '-top-40 ' : ''
        }absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none`}
      >
        {' '}
        <Menu.Item>
          <Button
            className="w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
            onClick={toggleFollow}
            disabled={isLoadingFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'} this author
          </Button>
        </Menu.Item>
        {!isMuted && (
          <Menu.Item>
            <Button
              className="w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
              disabled={isLoadingMute}
              onClick={() =>
                dispatch(
                  blockConnectionActions.blockUserRequest({
                    blockedUserId: story.user?._id || story.user,
                    blockedUsername: story.user?.username || story.username,
                    blockedUserProfilePicture:
                      story.user?.profilePicture || story.userProfilePicture,
                  })
                )
              }
            >
              Mute this author
            </Button>
          </Menu.Item>
        )}
        {!isReported && (
          <Menu.Item>
            <Button
              className="w-full px-6 py-3 text-slate-600 text-base tracking-sm text-start transform transition ease-out duration-200 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"
              onClick={() =>
                dispatch(
                  reportActions.reportStoryRequest({
                    userId: _.get(user, '_id'),
                    storyId: _.get(story, '_id'),
                    reportedUserId: _.get(story, 'user._id'),
                  })
                )
              }
            >
              Report
            </Button>
          </Menu.Item>
        )}
      </Menu.Items>
    );
  };
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

  return (
    <div ref={forwardedRef}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4 mb-8 ">
        <div className="flex items-center gap-3">
          <Link href={`/${story?.user.username}?tab=about`}>
            <a className="flex items-center gap-2">
              <Avatar
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
                src={_.get(story, 'user.profilePicture')}
                alt=""
              />
            </a>
          </Link>
          <div>
            <Link href={`/${story?.user.username}?tab=about`}>
              <a className="text-slate-700  text-base font-medium tracking-sm">
                {_.get(story, 'user.name')}
              </a>
            </Link>
            <div className="flex items-center gap-2 text-slate-500 tracking-sm">
              <span>
                {DateTime.fromISO(_.get(story, 'createdAt')).toLocaleString({
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <svg
                className="h-1 w-1 text-slate-500"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx={4} cy={4} r={3} />
              </svg>
              <span>{_.get(story, 'estimatedReadingTime')} Minutes</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 border-y sm:border-0 border-gray-200">
          {!hideButtons && (
            <ShareButtons
              backgroundColor="purple"
              customLink={`/story/${_.get(story, 'storySlug')}`}
            />
          )}

          {user && !hideButtons && (
            <div className="flex items-center relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
              <Menu as="div" className="relative inline-block text-left ml-4">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-purple-50 focus:outline-none">
                    {_.some(
                      bookmarks,
                      (bk) =>
                        bk?.story?._id === story?._id ||
                        bk?.story === story?._id
                    ) ? (
                      <svg
                        className="w-6 h-6 text-purple-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 10.5L11 12.5L15.5 8M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 21L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21H19ZM5 21H4C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L5 21ZM12 17L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L12 17ZM17.362 3.32698L17.816 2.43597L17.362 3.32698ZM18.673 4.63803L19.564 4.18404L18.673 4.63803ZM6.63803 3.32698L6.18404 2.43597L6.63803 3.32698ZM5.32698 4.63803L4.43597 4.18404L5.32698 4.63803ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7H13ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM9.8 4H14.2V2H9.8V4ZM18 7.8V21H20V7.8H18ZM6 21V7.8H4V21H6ZM19.4961 20.1318L12.4961 16.1318L11.5039 17.8682L18.5039 21.8682L19.4961 20.1318ZM11.5039 16.1318L4.50386 20.1318L5.49614 21.8682L12.4961 17.8682L11.5039 16.1318ZM14.2 4C15.0566 4 15.6389 4.00078 16.089 4.03755C16.5274 4.07337 16.7516 4.1383 16.908 4.21799L17.816 2.43597C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7014 1.99922 15.0236 2 14.2 2V4ZM20 7.8C20 6.97642 20.0008 6.2986 19.9558 5.74817C19.9099 5.18608 19.8113 4.66937 19.564 4.18404L17.782 5.09202C17.8617 5.24842 17.9266 5.47262 17.9624 5.91104C17.9992 6.36113 18 6.94342 18 7.8H20ZM16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202L19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43597L16.908 4.21799ZM9.8 2C8.97642 2 8.2986 1.99922 7.74817 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43597L7.09202 4.21799C7.24842 4.1383 7.47262 4.07337 7.91104 4.03755C8.36113 4.00078 8.94342 4 9.8 4V2ZM6 7.8C6 6.94342 6.00078 6.36113 6.03755 5.91104C6.07337 5.47262 6.1383 5.24842 6.21799 5.09202L4.43597 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74817C3.99922 6.2986 4 6.97642 4 7.8H6ZM6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404L6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799L6.18404 2.43597ZM13 13V7H11V13H13ZM9 11H15V9H9V11Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </Menu.Button>
                </div>
                <BookmarkLists
                  bookmarkLists={bookmarkLists}
                  setCreateNewList={setCreateNewList}
                  story={story}
                  bookmarks={bookmarks}
                />
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-purple-50">
                    <svg
                      className="w-6 h-6 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8955 10 12H12ZM12 12H14C14 10.8955 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8955 17 12H19ZM19 12H21C21 10.8955 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8955 3 12H5ZM5 12H7C7 10.8955 6.10457 10 5 10V12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {getMenuItems()}
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex flex-col justify-center items-center flex-wrap">
        <div className="prose prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:text-slate-800 prose-h1:font-bold prose-h1:tracking-md self-start mt-4">
          <h1>{story?.title}</h1>
        </div>
        <article
          className="break-words w-[90vw] prose self-baseline prose-img:rounded-none prose-figcaption:mt-0 prose-blockquote:text-2xl prose-blockquote:md:text-3xl prose-blockquote:pl-5 prose-blockquote:md:pl-6 prose-blockquote:not-italic prose-blockquote:border-purple-700 prose-blockquote:border-l-2 prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:text-slate-800 prose-h1:font-bold prose-h1:tracking-md prose-h2:text-xl prose-h2:font-semibold prose-p:text-base prose-p:text-slate-500 prose-p:tracking-sm my-10 sm:mb-24"
          dangerouslySetInnerHTML={{ __html: story?.content }}
        />
        <span className="text-slate-700 text-sm font-semibold mb-2">
          License:{' '}
          <span className="text-slate-500 text-sm tracking-sm">
            {getLicenseTitle(story?.license)}
          </span>
        </span>

        {/* Post sticky menu */}
        {!hideButtons && (
          <div className="fixed bottom-24 max-w-[287px] min-w-[100px]">
            <div className="flex items-center justify-center gap-7 max-w-[287px] bg-white px-4 py-2 rounded-[200px] shadow-md">
              <div className="flex items-center gap-8">
                <div className="flex gap-3 justify-end items-center ">
                  <Button
                    className="flex items-center gap-3 text-slate-400 text-sm tracking-sm hover transition ease-in-out duration-200 hover:text-slate-700"
                    disabled={likeLoading}
                    onClick={
                      user
                        ? handleLikeStory
                        : () => {
                            router.push('/login');
                          }
                    }
                  >
                    <HeartIcon
                      className={`w-6 ${isLiked ? 'text-red-500' : ''}`}
                    />
                  </Button>
                  <p className="text-slate-400 text-sm ">{story?.likeCount}</p>
                </div>
                {!_.get(story, 'isRestrictedComments') && (
                  <Button
                    onClick={() => setSlideOvers(!slideOvers)}
                    className="group flex items-center gap-3 text-slate-400 text-sm tracking-sm transition ease-in-out duration-200 hover:text-slate-700"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 22L18.4292 22.8211C18.7348 23.0336 19.1333 23.0587 19.4632 22.8862C19.7932 22.7138 20 22.3723 20 22H19ZM19 19.9143V18.9143C18.4477 18.9143 18 19.362 18 19.9143H19ZM15.7356 19.9474L15.9168 18.964L15.7356 19.9474ZM16.8236 20.4869L16.2528 21.3079L16.8236 20.4869ZM16.1982 20.0924L15.7856 21.0034L16.1982 20.0924ZM10.218 18.8223L11.109 18.3683L10.218 18.8223ZM11.092 19.6963L11.546 18.8053L11.092 19.6963ZM11.092 11.218L11.546 12.109L11.092 11.218ZM10.218 12.092L11.109 12.546L10.218 12.092ZM21.8478 18.6797L20.9239 18.297L21.8478 18.6797ZM20.908 11.218L20.454 12.109L20.908 11.218ZM21.782 12.092L20.891 12.546L21.782 12.092ZM10.7115 15.7027C11.0996 15.3098 11.0956 14.6766 10.7027 14.2885C10.3098 13.9004 9.67661 13.9044 9.28852 14.2973L10.7115 15.7027ZM6.92474 18.1137L6.21326 17.411L6.92474 18.1137ZM18 11C18 11.5523 18.4477 12 19 12C19.5523 12 20 11.5523 20 11H18ZM5.67596 18.6076L6.43515 17.9568L6.43515 17.9568L5.67596 18.6076ZM6.09695 18.7805L6.01416 17.7839L6.01415 17.7839L6.09695 18.7805ZM2.03168 12.4348L1.04223 12.5797L2.03168 12.4348ZM17.362 2.32698L17.816 1.43597V1.43597L17.362 2.32698ZM18.673 3.63803L19.564 3.18404V3.18404L18.673 3.63803ZM3.63803 2.32698L4.09202 3.21799L3.63803 2.32698ZM2.32698 3.63803L3.21799 4.09202L2.32698 3.63803ZM18.8 10H13.2V12H18.8V10ZM9 14.2V16.7143H11V14.2H9ZM13.2 20.9143H14.9969V18.9143H13.2V20.9143ZM16.2528 21.3079L18.4292 22.8211L19.5708 21.1789L17.3944 19.6658L16.2528 21.3079ZM23 16.9143V14.2H21V16.9143H23ZM20 22V19.9143H18V22H20ZM14.9969 20.9143C15.4052 20.9143 15.4851 20.9181 15.5543 20.9308L15.9168 18.964C15.6265 18.9105 15.3339 18.9143 14.9969 18.9143V20.9143ZM17.3944 19.6658C17.1178 19.4735 16.8797 19.3033 16.6108 19.1815L15.7856 21.0034C15.8497 21.0324 15.9175 21.0749 16.2528 21.3079L17.3944 19.6658ZM15.5543 20.9308C15.6341 20.9455 15.7118 20.9699 15.7856 21.0034L16.6108 19.1815C16.3891 19.0811 16.1561 19.0081 15.9168 18.964L15.5543 20.9308ZM9 16.7143C9 17.2578 8.99922 17.7256 9.03057 18.1093C9.06287 18.5047 9.13419 18.8979 9.32698 19.2763L11.109 18.3683C11.0838 18.3188 11.0461 18.2181 11.0239 17.9465C11.0008 17.6631 11 17.2908 11 16.7143H9ZM13.2 18.9143C12.6234 18.9143 12.2512 18.9135 11.9678 18.8904C11.6962 18.8682 11.5955 18.8305 11.546 18.8053L10.638 20.5873C11.0164 20.7801 11.4096 20.8514 11.805 20.8837C12.1886 20.9151 12.6564 20.9143 13.2 20.9143V18.9143ZM9.32698 19.2763C9.6146 19.8407 10.0735 20.2997 10.638 20.5873L11.546 18.8053C11.3578 18.7094 11.2049 18.5564 11.109 18.3683L9.32698 19.2763ZM13.2 10C12.6564 10 12.1886 9.99922 11.805 10.0306C11.4096 10.0629 11.0164 10.1342 10.638 10.327L11.546 12.109C11.5955 12.0838 11.6962 12.0461 11.9678 12.0239C12.2512 12.0008 12.6234 12 13.2 12V10ZM11 14.2C11 13.6234 11.0008 13.2512 11.0239 12.9678C11.0461 12.6962 11.0838 12.5955 11.109 12.546L9.32698 11.638C9.13419 12.0164 9.06287 12.4096 9.03057 12.805C8.99922 13.1886 9 13.6564 9 14.2H11ZM10.638 10.327C10.0735 10.6146 9.6146 11.0735 9.32698 11.638L11.109 12.546C11.2049 12.3578 11.3578 12.2049 11.546 12.109L10.638 10.327ZM21 16.9143C21 17.3939 20.9995 17.7035 20.9833 17.9405C20.9677 18.1685 20.9411 18.2554 20.9239 18.297L22.7716 19.0623C22.9066 18.7364 22.9561 18.4065 22.9787 18.0767C23.0005 17.7558 23 17.3665 23 16.9143H21ZM19 20.9143C19.4523 20.9143 19.8415 20.9148 20.1624 20.8929C20.4922 20.8704 20.8221 20.8209 21.1481 20.6859L20.3827 18.8382C20.3411 18.8554 20.2542 18.882 20.0262 18.8976C19.7893 18.9137 19.4796 18.9143 19 18.9143V20.9143ZM20.9239 18.297C20.8224 18.542 20.6277 18.7367 20.3827 18.8382L21.1481 20.6859C21.8831 20.3814 22.4672 19.7974 22.7716 19.0623L20.9239 18.297ZM18.8 12C19.3766 12 19.7488 12.0008 20.0322 12.0239C20.3038 12.0461 20.4045 12.0838 20.454 12.109L21.362 10.327C20.9836 10.1342 20.5904 10.0629 20.195 10.0306C19.8114 9.99922 19.3436 10 18.8 10V12ZM23 14.2C23 13.6564 23.0008 13.1886 22.9694 12.805C22.9371 12.4096 22.8658 12.0164 22.673 11.638L20.891 12.546C20.9162 12.5955 20.9539 12.6962 20.9761 12.9678C20.9992 13.2512 21 13.6234 21 14.2H23ZM20.454 12.109C20.6422 12.2049 20.7951 12.3578 20.891 12.546L22.673 11.638C22.3854 11.0735 21.9265 10.6146 21.362 10.327L20.454 12.109ZM6.8 3H14.2V1H6.8V3ZM3 11.4444V6.8H1V11.4444H3ZM6.55556 17.5515V15.9916H4.55556V17.5515H6.55556ZM9.28852 14.2973L6.21326 17.411L7.63623 18.8164L10.7115 15.7027L9.28852 14.2973ZM18 6.8V11H20V6.8H18ZM4.55556 17.5515C4.55556 17.837 4.55461 18.1191 4.57449 18.3439C4.59139 18.5349 4.63564 18.9306 4.91677 19.2585L6.43515 17.9568C6.52357 18.0599 6.55632 18.1549 6.56616 18.1886C6.57498 18.2187 6.57138 18.2204 6.56672 18.1677C6.56232 18.118 6.55905 18.046 6.55731 17.9382C6.55558 17.8313 6.55556 17.7066 6.55556 17.5515H4.55556ZM6.21326 17.411C6.10432 17.5213 6.01666 17.61 5.9403 17.6849C5.8633 17.7604 5.81036 17.8093 5.77231 17.8416C5.73198 17.8758 5.7306 17.872 5.75808 17.8568C5.78873 17.8397 5.87877 17.7952 6.01416 17.7839L6.17975 19.7771C6.61018 19.7413 6.91969 19.4909 7.06593 19.3669C7.23809 19.2209 7.43564 19.0195 7.63623 18.8164L6.21326 17.411ZM4.91676 19.2585C5.23013 19.624 5.69992 19.8169 6.17975 19.7771L6.01415 17.7839C6.1741 17.7706 6.3307 17.8349 6.43515 17.9568L4.91676 19.2585ZM1 11.4444C1 11.9252 0.997339 12.2732 1.04223 12.5797L3.02112 12.2899C3.00266 12.1639 3 11.9959 3 11.4444H1ZM1.04223 12.5797C1.29837 14.3283 2.67166 15.7016 4.42027 15.9578L4.71014 13.9789C3.83583 13.8508 3.14918 13.1642 3.02112 12.2899L1.04223 12.5797ZM14.2 3C15.0566 3 15.6389 3.00078 16.089 3.03755C16.5274 3.07337 16.7516 3.1383 16.908 3.21799L17.816 1.43597C17.3306 1.18868 16.8139 1.09012 16.2518 1.04419C15.7014 0.999222 15.0236 1 14.2 1V3ZM20 6.8C20 5.97642 20.0008 5.2986 19.9558 4.74817C19.9099 4.18608 19.8113 3.66937 19.564 3.18404L17.782 4.09202C17.8617 4.24842 17.9266 4.47262 17.9624 4.91104C17.9992 5.36113 18 5.94342 18 6.8H20ZM16.908 3.21799C17.2843 3.40973 17.5903 3.71569 17.782 4.09202L19.564 3.18404C19.1805 2.43139 18.5686 1.81947 17.816 1.43597L16.908 3.21799ZM6.8 1C5.97642 1 5.2986 0.999222 4.74817 1.04419C4.18608 1.09012 3.66937 1.18868 3.18404 1.43597L4.09202 3.21799C4.24842 3.1383 4.47262 3.07337 4.91104 3.03755C5.36113 3.00078 5.94342 3 6.8 3V1ZM3 6.8C3 5.94342 3.00078 5.36113 3.03755 4.91104C3.07337 4.47262 3.1383 4.24842 3.21799 4.09202L1.43597 3.18404C1.18868 3.66937 1.09012 4.18608 1.04419 4.74817C0.999222 5.2986 1 5.97642 1 6.8H3ZM3.18404 1.43597C2.43139 1.81947 1.81947 2.43139 1.43597 3.18404L3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799L3.18404 1.43597ZM6.55556 15.9916C6.55556 14.8142 5.59828 14.109 4.71014 13.9789L4.42027 15.9578C4.50012 15.9695 4.54639 16.0016 4.56126 16.0162C4.56721 16.0221 4.56476 16.0216 4.56092 16.0128C4.5591 16.0086 4.55758 16.004 4.55659 15.9993C4.55613 15.997 4.55585 15.9952 4.5557 15.9937C4.55555 15.9923 4.55556 15.9915 4.55556 15.9916H6.55556Z"
                        fill="currentColor"
                      />
                    </svg>
                    {story?.commentCount}
                  </Button>
                )}
              </div>
              {user && (
                <div>
                  <div className="flex items-center relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
                    <Menu
                      as="div"
                      className="relative inline-block text-left ml-4"
                    >
                      <div>
                        <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none">
                          {_.some(
                            bookmarks,
                            (bk) =>
                              bk?.story?._id === story?._id ||
                              bk?.story === story?._id
                          ) ? (
                            <svg
                              className="w-6 h-6 text-purple-700"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 10.5L11 12.5L15.5 8M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 21L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21H19ZM5 21H4C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L5 21ZM12 17L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L12 17ZM17.362 3.32698L17.816 2.43597L17.362 3.32698ZM18.673 4.63803L19.564 4.18404L18.673 4.63803ZM6.63803 3.32698L6.18404 2.43597L6.63803 3.32698ZM5.32698 4.63803L4.43597 4.18404L5.32698 4.63803ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7H13ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM9.8 4H14.2V2H9.8V4ZM18 7.8V21H20V7.8H18ZM6 21V7.8H4V21H6ZM19.4961 20.1318L12.4961 16.1318L11.5039 17.8682L18.5039 21.8682L19.4961 20.1318ZM11.5039 16.1318L4.50386 20.1318L5.49614 21.8682L12.4961 17.8682L11.5039 16.1318ZM14.2 4C15.0566 4 15.6389 4.00078 16.089 4.03755C16.5274 4.07337 16.7516 4.1383 16.908 4.21799L17.816 2.43597C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7014 1.99922 15.0236 2 14.2 2V4ZM20 7.8C20 6.97642 20.0008 6.2986 19.9558 5.74817C19.9099 5.18608 19.8113 4.66937 19.564 4.18404L17.782 5.09202C17.8617 5.24842 17.9266 5.47262 17.9624 5.91104C17.9992 6.36113 18 6.94342 18 7.8H20ZM16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202L19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43597L16.908 4.21799ZM9.8 2C8.97642 2 8.2986 1.99922 7.74817 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43597L7.09202 4.21799C7.24842 4.1383 7.47262 4.07337 7.91104 4.03755C8.36113 4.00078 8.94342 4 9.8 4V2ZM6 7.8C6 6.94342 6.00078 6.36113 6.03755 5.91104C6.07337 5.47262 6.1383 5.24842 6.21799 5.09202L4.43597 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74817C3.99922 6.2986 4 6.97642 4 7.8H6ZM6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404L6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799L6.18404 2.43597ZM13 13V7H11V13H13ZM9 11H15V9H9V11Z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </Menu.Button>
                      </div>

                      <BookmarkLists
                        bookmarkLists={bookmarkLists}
                        setCreateNewList={setCreateNewList}
                        className="fixed bottom-14"
                        story={story}
                        bookmarks={bookmarks}
                      />
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none">
                          <svg
                            className="w-6 h-6 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8955 10 12H12ZM12 12H14C14 10.8955 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8955 17 12H19ZM19 12H21C21 10.8955 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8955 3 12H5ZM5 12H7C7 10.8955 6.10457 10 5 10V12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        {getMenuItems(true)}
                      </Transition>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <Replies
          slideOvers={slideOvers}
          setSlideOvers={setSlideOvers}
          story={story}
        />
      </div>
      <div className="flex items-center gap-4">
        {story?.categoryNames.map((category) => (
          <Topic key={category} title={category} />
        ))}
      </div>
      {deleteStoryModal && (
        <DeleteStoryModal
          setDeleteStoryModal={setDeleteStoryModal}
          clickDelete={() => {
            dispatch(
              storyActions.deleteStoryRequest({
                storyId: _.get(story, '_id'),
                categoryNames: _.get(story, 'categoryNames'),
                isPublished: story.isPublished,
                onSuccess: () => router.push('/my-stories'),
              })
            );
          }}
        />
      )}
    </div>
  );
}

export default StoryContent;
