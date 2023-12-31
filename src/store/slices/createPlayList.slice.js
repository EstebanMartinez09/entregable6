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
  },
});

export const { setPlayList } = createPlayListSlice.actions;
export default createPlayListSlice.reducer;