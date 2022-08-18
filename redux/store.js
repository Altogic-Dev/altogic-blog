import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga"

import { authSlice } from "./auth/authSlice";
import { followerConnectionSlice } from "./followerConnection/followerConnectionSlice";
import { storySlice } from "./story/storySlice";
import { reportSlice } from "./report/reportSlice";

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [followerConnectionSlice.name]: followerConnectionSlice.reducer,
      [storySlice.name]: storySlice.reducer,
      [reportSlice.name]: reportSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware)),
  });
  sagaMiddleware.run(rootSaga);
  return store
}
  



export const wrapper = createWrapper(makeStore);