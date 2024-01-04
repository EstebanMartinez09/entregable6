import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/ConfigAxios";

const initialState = {
  editing: false,
  playListEditing: {
    title: "",
    to: "",
    message: "",
    tracks: [],
  },
};

const createPlayListSlice = createSlice({
  name: "createPlayList",
  initialState: initialState,
  reducers: {
    setPlayList(state, action) {
      const newData = action.payload;
      state.playListEditing.tracks = [...state.playListEditing.tracks, newData];
    },
    deleteSongPlayList(state, action) {
      const newPlayList = state.playListEditing.tracks.filter(
        (song) => song.id !== action.payload
      );
      state.playListEditing.tracks = newPlayList;
    },
    setEditing(state, action) {
      const editMode = action.payload;
      if (editMode) {
        state.editing = true;
      } else {
        state.editing = false;
        state.playListEditing = initialState.playListEditing;
      }
    },
    setPlayListEditing(state, action) {
      state.playListEditing = action.payload;
    },
    updatePlayListInfo(state, action) {
      const { field, value } = action.payload;
      state.playListEditing[field] = value;
    },
    reset(state) {
      state.playListEditing = initialState.playListEditing;
    },
  },
});

export const {
  reset,
  setPlayList,
  deleteSongPlayList,
  setEditing,
  setPlayListEditing,
  updatePlayListInfo,
} = createPlayListSlice.actions;
export default createPlayListSlice.reducer;

export const createPlayListThunk =
  (data, e, setIsShowPlayList) => (dispatch) => {
    axiosMusic
      .post("/api/playlists", data)
      .then(() => {
        alert("Playlist Creada");
        e.target.reset();
        setIsShowPlayList(false);
        dispatch(reset());
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const updatePlaylistThunk =
  ( setIsShowPlayList, navigate) => (dispatch, getState) => {
    const data = getState().createPlayList.playListEditing;
    const newTracks = data.tracks.map((track) => track.id); 
    const newData = { ...data, tracks: newTracks };
    axiosMusic
      .patch(`/api/playlists/${data.id}`, newData)
      .then(() => {
        if (setIsShowPlayList) {
          setIsShowPlayList(false);
        }
        alert("Playlist Actualizada");
        dispatch(reset());
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error al actualizar la playlist");
      });
  };
