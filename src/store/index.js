import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/User.slice";

export default configureStore({
    reducer: {
        user: UserSlice,
    },
})