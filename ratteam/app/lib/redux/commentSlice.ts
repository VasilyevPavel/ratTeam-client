import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CommentState {
  showReplayWindow: number | null;
}

const initialState: CommentState = {
  showReplayWindow: null,
};

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    setShowReplayWindow: (state, action: PayloadAction<number | null>) => {
      console.log('action.payload', action.payload);
      console.log('state.showReplayWindow', state.showReplayWindow);
      console.log('check', action.payload === state.showReplayWindow);

      if (state.showReplayWindow === action.payload) {
        state.showReplayWindow = null;
      } else {
        state.showReplayWindow = action.payload;
      }
    },
  },
});

export const { setShowReplayWindow } = commentSlice.actions;
export default commentSlice.reducer;