import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { generalActions } from '@/redux/general/generalSlice';
import { storyActions } from '@/redux/story/storySlice';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import CreateBookmarkList from '../bookmarks/CreateBookmarkList';
import StoryContent from '../StoryContent';

function PublicationTabStory({ tab, publication }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const story = useSelector((state) => state.story.story);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const isFollowing = useSelector(
    (state) => state.followerConnection.isFollowing
  );
  const isMuted = useSelector((state) => state.blockConnection.isBlocked);
  const isReported = useSelector((state) => state.report.isReported);

  const [createNewList, setCreateNewList] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const toggleFollow = () => {
    if (isFollowing) {
      return dispatch(
        followerConnectionActions.unfollowRequest({
          userId: _.get(user, '_id'),
          followingUserId: _.get(story, 'user._id'),
          followingUsername: _.get(story, 'username'),
        })
      );
    }
    return dispatch(
      followerConnectionActions.followRequest({
        followerUser: user,
        followingUser: {
          followingUser: _.get(story, 'user._id'),
          followingName: _.get(story, 'user.name'),
          followingUserProfilePicture: _.get(story, 'user.profilePicture'),
          followingUsername: _.get(story, 'user.username'),
        },
      })
    );
  };

  useEffect(() => {
    if (publication) {
      dispatch(storyActions.getStoryRequest(tab.story));
    }
  }, [publication._id]);

  useEffect(() => {
    if (!_.isNil(story) && didMount) {
      dispatch(
        generalActions.getConnectInformationStoryRequest({
          storyId: _.get(story, '_id'),
          authorId: _.get(story, 'user._id'),
        })
      );
      setDidMount(false);
    }
  }, [story]);

  return (
    <div className="md:w-[100vw] max-w-screen-xl w-full mx-auto">
      {!story ? (
        <div className='w-full flex justify-center'>
          <ClipLoader color="#9333ea" size={80} />
        </div>
      ) : (
        <StoryContent
          bookmarkLists={bookmarkLists}
          setCreateNewList={setCreateNewList}
          bookmarks={bookmarks}
          toggleFollow={toggleFollow}
          isFollowing={isFollowing}
          isMuted={isMuted}
          isReported={isReported}
          hideButtons
          story={story}
        />
      )}
      {createNewList && (
        <CreateBookmarkList setCreateNewList={setCreateNewList} story={story} />
      )}
    </div>
  );
}

export default PublicationTabStory;
