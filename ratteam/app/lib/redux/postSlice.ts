import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PostBody } from '../types/types';

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
    setCursorPosition(state, action) {
      state.cursorPosition = action.payload;
    },
    setImageLoading(state, action) {
      state.images = [...state.images, action.payload];
    },
    removeMockImage(state) {
      state.images.pop();
    },
    setImages(state, action) {
      state.images = [...state.images, ...action.payload];
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

    // deleteImage(state, action: PayloadAction<string>) {
    //   const imageName = action.payload;
    //   const escapedImageName = imageName.replaceAll(
    //     /[.*+?^${}()|[\]\\]/g,
    //     '\\$&'
    //   );
    //   const imagesRegex = new RegExp(
    //     `<p class="ql-align-center">(<img src="${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${escapedImageName}"[^>]*>(?:<\/p>)?(?:<p class="ql-align-center">)?(?:<em>[^<]*<\/em>)?(?:<\/p>)?(?:<p class="ql-align-center"><br><\/p>)?)<\/p>`,
    //     'g'
    //   );
    //   state.body = state.body.replace(imagesRegex, '');
    // },

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
