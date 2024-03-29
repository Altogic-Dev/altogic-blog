import LocalStorageUtil from '@/utils/localStorageUtil';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { cssTransition, ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-svg-core/styles.css';
import _, { isNil } from 'lodash';
import { storyActions } from '@/redux/story/storySlice';
import 'highlight.js/styles/tokyo-night-dark.css';
import { DateTime } from 'luxon';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import {
  getUserBookmarkListsRequest,
  getMyBookmarksRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import AuthService from '@/services/auth';
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/react';
import { wrapper } from '../redux/store';
import '@icon-park/react/styles/index.css';
import 'animate.css/animate.min.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { publicationName } = router.query;
  const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: 'icon' };
  const sessionUser = useSelector((state) => state.auth.user);
  const publications = useSelector((state) => state.publication.publications);
  const bookmarkLists = _.get(
    _.get(
      useSelector((state) => state.bookmark.bookmarkLists),
      sessionUser?.username
    ),
    'bookmarkLists'
  );

  const [isMounted, setIsMounted] = useState(false);
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp',
  });

  const getBookmarksAndLists = (user) => {
    dispatch(
      getUserBookmarkListsRequest({
        username: user.username,
        includePrivates: true,
        myLists: true,
      })
    );
    dispatch(
      getMyBookmarksRequest({
        userId: _.get(user, '_id'),
        username: _.get(user, 'username'),
      })
    );
  };

  const visitPublicationRequest = (publicationName) => {
    dispatch(
      publicationActions.visitPublicationRequest({
        publicationName,
        user: _.get(sessionUser, '_id'),
      })
    );
  };
  const checkFollowing = () => {
    dispatch(
      publicationActions.checkPublicationFollowingRequest({
        user: _.get(sessionUser, '_id'),
      })
    );
  };
  const getPublication = (publicationName) => {
    dispatch(
      publicationActions.getPublicationRequest({
        publicationName: publicationName.toLowerCase(),
        user: sessionUser?._id,
      })
    );
  };

  const setSelectedPublicationIfIsExist = () => {
    const selectedPublication = LocalStorageUtil.get(
      LocalStorageUtil.SELECTED_PUBLICATION
    );
    if (!_.isNil(selectedPublication)) {
      dispatch(
        publicationActions.selectPublicationRequest(selectedPublication)
      );
    }
  };

  const visitPublication = (publicationName) => {
    const visitedPublications = JSON.parse(
      localStorage.getItem('visitedPublications')
    );

    if (
      isNil(_.get(visitedPublications, publicationName)) ||
      DateTime.now().diff(
        DateTime.fromISO(_.get(visitedPublications, publicationName)),
        'days'
      ).days > 1
    ) {
      localStorage.setItem(
        'visitedPublications',
        JSON.stringify({
          ...visitedPublications,
          [router.query.publicationName]: DateTime.now(),
        })
      );
      visitPublicationRequest(publicationName);
    }
  };

  const getMutedUsers = (user) => {
    dispatch(storyActions.getMutedUsersRequest({ user }));
  };

  useEffect(() => {
    if (sessionUser?.username && !isMounted) {
      AuthService.getUserFromDb();
      checkFollowing();
      setIsMounted(true);
      getMutedUsers(sessionUser);
      dispatch(publicationActions.getUserPublicationsRequest());
    }
  }, [sessionUser]);

  useEffect(() => {
    if (_.isEmpty(bookmarkLists) && sessionUser) {
      getBookmarksAndLists(sessionUser);
    }
  }, [sessionUser]);

  useEffect(() => {
    if (publicationName) {
      visitPublication(publicationName);
      getPublication(publicationName);
    }
  }, [publicationName]);

  useEffect(() => {
    if (!_.isEmpty(sessionUser?.publications)) {
      setSelectedPublicationIfIsExist();
    } else if (sessionUser) {
      LocalStorageUtil.set(LocalStorageUtil.SELECTED_PUBLICATION, null);
      dispatch(publicationActions.selectPublicationRequest(null));
    }
  }, [sessionUser, publications]);

  useEffect(() => {
    if (
      sessionUser &&
      (router.asPath === '/login' ||
        router.asPath === '/create-an-account' ||
        router.asPath === '/forgot-password' ||
        router.asPath === '/forgot-password-email')
    )
      router.push('/');
    else if (!sessionUser && router.asPath === '/my-stories')
      router.push('/login');
  }, [router.asPath]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={toastTransition}
        theme="dark"
        width="500px"
      />
      <IconProvider value={IconConfig}>
        <Component {...pageProps} />
      </IconProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
