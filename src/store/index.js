import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/User.slice";
import playListSlice from "./slices/playList.slice";

export default configureStore({
    reducer: {
        user: UserSlice,
        playList: playListSlice
    },
})