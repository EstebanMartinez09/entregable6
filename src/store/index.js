import { configureStore } from "@reduxjs/toolkit";
import createPlayListSlice from "./slices/createPlayList.slice";
import playListsUserSlice from "./slices/playListsUser.slice";
import UserSlice from "./slices/user.slice";
import isShowPlayListSlice from "./slices/isShowPlayList.slice";


export default configureStore({
    reducer: {
        user: UserSlice,
        createPlayList: createPlayListSlice,
        playListsUser: playListsUserSlice,
        isShowPlayList: isShowPlayListSlice
    },
})