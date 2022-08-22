import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';


import { authSlice } from "./auth/authSlice";
import { followerConnectionSlice } from "./followerConnection/followerConnectionSlice";
import { storySlice } from "./story/storySlice";
import { reportSlice } from "./report/reportSlice";
import { recommendationsSlice } from './recommendations/recommendationsSlice';
import { topicsSlice } from './topics/topicsSlice';

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [followerConnectionSlice.name]: followerConnectionSlice.reducer,
      [storySlice.name]: storySlice.reducer,
      [reportSlice.name]: reportSlice.reducer,
      [recommendationsSlice.name]: followerConnectionSlice.reducer
      [topicsSlice.name]: followerConnectionSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// eslint-disable-next-line import/prefer-default-export
export const wrapper = createWrapper(makeStore);
