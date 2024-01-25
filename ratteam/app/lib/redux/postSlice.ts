import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PostBody } from '../types/types';

const initialUserState: PostBody = {
  header: '',
  body: '',
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialUserState,
  reducers: {
    setPostHeader(state, action) {
      state.header = action.payload;
    },
    setPostBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    addImage(state, action: PayloadAction<string>) {
      state.body = state.body + action.payload;
    },
    resetPostData(state) {
      state.header = '';
      state.body = '';
    },
  },
});

export default postSlice.reducer;
export const { setPostHeader, setPostBody, resetPostData, addImage } =
  postSlice.actions;
