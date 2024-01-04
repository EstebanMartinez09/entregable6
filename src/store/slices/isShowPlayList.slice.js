import { createSlice } from "@reduxjs/toolkit";

const isShowPlayListSlice = createSlice({
    name: "isShowPlayList",
    initialState: false,
    reducers: {
        setIsShowPlayList(state, action) {
            return action.payload;
        },
    },
})

export const { setIsShowPlayList } = isShowPlayListSlice.actions;

export default isShowPlayListSlice.reducer