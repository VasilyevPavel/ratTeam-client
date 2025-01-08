import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IImage, PostBody } from '../types/types';

const initialUserState: PostBody = {
  cursorPosition: null,
  posts: [],
  images: [],
  id: 0,
  header: '',
  body: '',
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialUserState,
  reducers: {
    setCursorPosition(state, action: PayloadAction<number | null>) {
      state.cursorPosition = action.payload;
    },

    setImageLoading(state, action) {
      state.images = [...state.images, action.payload];
    },
    removeMockImage(state) {
      state.images.pop();
    },
    setImages(state, action) {
      const newImages = action.payload;

      const uniqueImages = newImages.filter(
        (newImage: IImage) =>
          !state.images.some((image) => image.id === newImage.id)
      );

      state.images = [...state.images, ...uniqueImages];
    },
    deleteImage(state, action) {
      const filteredImages = state.images.filter(
        (el) => el.id !== action.payload
      );
      let index = 0;
      state.images.forEach((image, i) => {
        if (image.id === action.payload) {
          index = i + 1;
        }
      });
      state.images = filteredImages;
      const imagesRegex = new RegExp(
        `\\[image\\s+src=${index}\\s+title=(\\w+)\\]`,
        'g'
      );
      state.body = state.body.replace(imagesRegex, '');
      console.log('state.body', state.body);
    },
    setPostId(state, action) {
      state.id = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
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

    resetPostData(state) {
      state.header = '';
      state.body = '';
      state.images = [];
    },
  },
});

export default postSlice.reducer;
export const {
  setCursorPosition,
  setImageLoading,
  removeMockImage,
  setImages,
  setPostId,
  setPostHeader,
  setPostBody,
  resetPostData,
  addImage,
  deleteImage,
  setPosts,
  addPost,
} = postSlice.actions;
