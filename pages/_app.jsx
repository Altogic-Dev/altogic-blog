import { useRouter } from 'next/router';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { cssTransition, ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-svg-core/styles.css';
import _, { isNil } from 'lodash';
import 'highlight.js/styles/tokyo-night-dark.css';
import { DateTime } from 'luxon';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
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
  const [isMounted, setIsMounted] = useState(false);
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp',
  });
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
      publicationActions.getPublicationRequest(publicationName.toLowerCase())
    );
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

  useEffect(() => {
    if (sessionUser && !isMounted) {
      setIsMounted(true);
      checkFollowing();
    }
  }, [sessionUser]);

  useEffect(() => {
    if (publicationName) {
      visitPublication(publicationName);
      getPublication(publicationName);
    }
  }, [publicationName]);

  useEffect(() => {
    if (_.isEmpty(publications) && !_.isEmpty(sessionUser?.publications)) {
      dispatch(
        publicationActions.setPublicationsRequest(sessionUser?.publications)
      );
    }
  }, [publications]);

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
