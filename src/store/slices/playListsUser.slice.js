import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/ConfigAxios";

const initialState = []

const playListsUserSlice = createSlice({
    name: "playListsUser",
    initialState: initialState,
    reducers: {
        setUserPlaylists(state, action ) {
            state = action.payload
            return state
        },
    }
})

export default playListsUserSlice.reducer

export const { setUserPlaylists } = playListsUserSlice.actions

export const setPlayListsUser = () => (dispatch) => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({ data }) => {
        dispatch(setUserPlaylists(data))
      })
      .catch((err) => {
        console.log(err)
      })
}