import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga"

import { authSlice } from "./auth/authSlice";
import {followerConnectionSlice} from "./followerConnection/followerConnectionSlice";

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [followerConnectionSlice.name]: followerConnectionSlice.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware)),
  });
  sagaMiddleware.run(rootSaga);
  return store
}
  



export const wrapper = createWrapper(makeStore);