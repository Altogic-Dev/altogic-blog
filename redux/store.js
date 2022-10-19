import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootSaga from './rootSaga';
import { authSlice } from './auth/authSlice';
import { followerConnectionSlice } from './followerConnection/followerConnectionSlice';
import { storySlice } from './story/storySlice';
import { reportSlice } from './report/reportSlice';
import { recommendationsSlice } from './recommendations/recommendationsSlice';
import { subscribeConnectionSlice } from './subscribeConnection/subscribeConnectionSlice';
import { storyLikesSlice } from './storyLikes/storyLikesSlice';
import { topicsSlice } from './topics/topicsSlice';
import { subscribeSlice } from './subscribe/subscribeSlice';
import { publicationSlice } from './publication/publicationSlice';
import { generalSlice } from './general/generalSlice';
import { fileSlice } from './file/fileSlice';
import { bookmarkSlice } from './bookmarks/bookmarkSlice';
import { notificationsSlice } from './notifications/notificationsSlice';
import { statsSlice } from './stats/statsSlice';
import { paymentSlice } from './payment/paymentSlice';
import { blockConnectionSlice } from './blockConnection/blockConnectionSlice';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
};
const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [followerConnectionSlice.name]: followerConnectionSlice.reducer,
      [storySlice.name]: storySlice.reducer,
      [reportSlice.name]: reportSlice.reducer,
      [recommendationsSlice.name]: recommendationsSlice.reducer,
      [subscribeConnectionSlice.name]: subscribeConnectionSlice.reducer,
      [storyLikesSlice.name]: persistReducer(
        persistConfig,
        storyLikesSlice.reducer
      ),
      [topicsSlice.name]: topicsSlice.reducer,
      [subscribeSlice.name]: subscribeSlice.reducer,
      [publicationSlice.name]: publicationSlice.reducer,
      [generalSlice.name]: generalSlice.reducer,
      [fileSlice.name]: fileSlice.reducer,
      [bookmarkSlice.name]: bookmarkSlice.reducer,
      [notificationsSlice.name]: notificationsSlice.reducer,
      [statsSlice.name]: statsSlice.reducer,
      [paymentSlice.name]: persistReducer(persistConfig, paymentSlice.reducer),
      [blockConnectionSlice.name]: blockConnectionSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: true, serializableCheck: false }).prepend(
        sagaMiddleware
      ),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// eslint-disable-next-line import/prefer-default-export
export const wrapper = createWrapper(makeStore);
