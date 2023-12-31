import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playList: []
};

const playListSlice = createSlice({
  name: "playList",
  initialState: initialState,
  reducers: {
    setPlayList(state, action) {
      state.playList = action.payload;
    },
  },
});

export const { setPlayList } = playListSlice.actions;
export default playListSlice.reducer;