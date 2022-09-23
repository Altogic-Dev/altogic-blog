import { useRouter } from 'next/router';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-svg-core/styles.css';
import _, { isNil } from 'lodash';
import 'highlight.js/styles/tokyo-night-dark.css';
import { DateTime } from 'luxon';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import { wrapper } from '../redux/store';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.auth.user);
  const visitPublication = (publicationName) => {
    dispatch(
      publicationActions.visitPublicationRequest({
        publicationName,
        user: _.get(sessionUser, '_id'),
      })
    );
  };

  useEffect(() => {
    const visitedPublications = JSON.parse(
      localStorage.getItem('visitedPublications')
    );
    const { publicationName } = router.query;

    if (
      router.pathname.includes('publication') &&
      publicationName &&
      (isNil(_.get(visitedPublications, publicationName)) ||
        DateTime.now().diff(
          DateTime.fromISO(_.get(visitedPublications, publicationName)),
          'days'
        ).days > 1)
    ) {
      localStorage.setItem(
        'visitedPublications',
        JSON.stringify({
          ...visitedPublications,
          [router.query.publicationName]: DateTime.now(),
        })
      );
      visitPublication(publicationName);
    }
  }, [router,sessionUser]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition="slide"
        theme="dark"
        width="500px"
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
