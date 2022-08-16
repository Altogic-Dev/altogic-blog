import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga"

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    },
  });
  sagaMiddleware.run(rootSaga);
  return store
}
  



export const wrapper = createWrapper(makeStore);