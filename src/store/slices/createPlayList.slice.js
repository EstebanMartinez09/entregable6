import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playList: []  
};

const createPlayListSlice = createSlice({
  name: "createPlayList",
  initialState: initialState,
  reducers: {
    setPlayList(state, action) {
      state.playList = [...state.playList, action.payload];
    },
    deleteSongPlayList(state, action) {
      const newPlayList = state.playList.filter((song) => song.id !== action.payload);
      state.playList = newPlayList;
    }
  },
});

export const { setPlayList, deleteSongPlayList } = createPlayListSlice.actions;
export default createPlayListSlice.reducer;