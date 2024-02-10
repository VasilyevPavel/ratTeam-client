'use client';
/* Core */
import {
  configureStore,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import modalSlice from './modalSlice';
import userSlice from './userSlice';
import postSlice from './postSlice';
import commentSlice from './commentSlice';
/* Instruments */

export const reduxStore = configureStore({
  reducer: {
    modalSlice: modalSlice,
    userSlice: userSlice,
    postSlice: postSlice,
    commentSlice: commentSlice,
  },
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
