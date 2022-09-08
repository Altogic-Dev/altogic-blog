import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer } from 'react-toastify';
import { wrapper } from '../redux/store';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'highlight.js/styles/tokyo-night-dark.css';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
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
