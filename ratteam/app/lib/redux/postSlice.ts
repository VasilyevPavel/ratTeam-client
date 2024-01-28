import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PostBody } from '../types/types';

const initialUserState: PostBody = {
  posts: [],
  header: '',
  body: '',
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialUserState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      console.log('action', action.payload);
      console.log('state', state.posts);

      state.posts.unshift(action.payload);
    },
    setPostHeader(state, action) {
      state.header = action.payload;
    },
    setPostBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    addImage(state, action: PayloadAction<string>) {
      state.body = state.body + action.payload;
    },
    deleteImage(state, action: PayloadAction<string>) {
      const imageName = action.payload;
      const escapedImageName = imageName.replaceAll(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      );
      const imagesRegex = new RegExp(
        `<p class="ql-align-center">(<img src="${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${escapedImageName}"[^>]*>(?:<\/p>)?(?:<p class="ql-align-center">)?(?:<em>[^<]*<\/em>)?(?:<\/p>)?(?:<p class="ql-align-center"><br><\/p>)?)<\/p>`,
        'g'
      );
      state.body = state.body.replace(imagesRegex, '');
    },

    resetPostData(state) {
      state.header = '';
      state.body = '';
    },
  },
});

export default postSlice.reducer;
export const {
  setPostHeader,
  setPostBody,
  resetPostData,
  addImage,
  deleteImage,
  setPosts,
  addPost,
} = postSlice.actions;
