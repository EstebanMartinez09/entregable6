import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/ConfigAxios";

const initialState = []

const createPlayListSlice = createSlice({
  name: "createPlayList",
  initialState: initialState,
  reducers: {
    setPlayList(state, action) {
      const newData = action.payload
      return [...state, newData]
    },
    deleteSongPlayList(state, action) {
      const newPlayList = state.filter((song) => song.id !== action.payload);
      return newPlayList;
    },
    resetPlayList(){
      return initialState
    }
  },
});

export const { setPlayList, deleteSongPlayList, resetPlayList } = createPlayListSlice.actions;
export default createPlayListSlice.reducer;

export const createPlayListThunk = (data, e, setIsShowPlayList) => (dispatch) => {
  axiosMusic
    .post("/api/playlists", data) 
    .then(() => {
      alert("Playlist Creada")
      dispatch(resetPlayList())
      e.target.reset()
      setIsShowPlayList(false)
    })
    .catch((err) => {
      console.log(err);
    })
}


