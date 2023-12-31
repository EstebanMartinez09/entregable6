import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/ConfigAxios";

const initialState = {
  email: "",
  name: "",
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user")) 
  : initialState,
  reducers: {
    setLoginData(state, action) {
      const loginData = action.payload;
      // state.email = action.payload.email
      // state.name = action.payload.name
      // state.token = action.payload.token
      const newState = { ...state, ...loginData };
      localStorage.setItem("user", JSON.stringify(newState));
      return newState;
    },
    logout() {
      localStorage.removeItem("user");
      return initialState
    }
  },
});

export const { setLoginData, logout } = userSlice.actions;

export default userSlice.reducer;

export const loginThunk = (data, navigate) => (dispatch) => {
  //? Enviar los datos al servidor
  axiosMusic
    .post("/api/auth/login", data)
    .then(({ data }) => {
      dispatch(setLoginData(data));
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      alert("Credenciales incorrectas");
    });
};
