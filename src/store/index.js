import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/User.slice";
import createPlayListSlice from "./slices/createPlayList.slice";

export default configureStore({
    reducer: {
        user: UserSlice,
        createPlayList: createPlayListSlice
    },
})