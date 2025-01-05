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
    addImageAtCursor(
      state,
      action: PayloadAction<{ cursorPosition: number; image: string }>
    ) {
      const { cursorPosition, image } = action.payload;

      if (cursorPosition !== null) {
        // Вставляем изображение в нужную позицию в теле текста
        state.body =
          state.body.slice(0, cursorPosition) +
          image +
          state.body.slice(cursorPosition);
      }
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
      const cursorPosition = state.cursorPosition;
      const newImageWithNewline = '\n' + action.payload + ' ';
      state.body =
        state.body.slice(0, cursorPosition) +
        newImageWithNewline + // Вставляем разрыв строки и изображение
        state.body.slice(cursorPosition);

      state.cursorPosition = cursorPosition + newImageWithNewline.length;
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
  addImageAtCursor,
} = postSlice.actions;
