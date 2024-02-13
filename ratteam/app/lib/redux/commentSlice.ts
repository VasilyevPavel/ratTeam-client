import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CommentState {
  showReplayWindow: number | null;
  replyCommentId?: number;
}

const initialState: CommentState = {
  showReplayWindow: null,
};

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    setShowReplayWindow: (state, action: PayloadAction<number | null>) => {
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
