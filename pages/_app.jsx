import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { wrapper } from '../redux/store';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'highlight.js/styles/tokyo-night-dark.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
