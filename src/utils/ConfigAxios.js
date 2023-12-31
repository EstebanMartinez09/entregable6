import axios from "axios";

const axiosMusic = axios.create({
    baseURL : "https://music-apiv2.2.us-1.fl0.io"
})

axiosMusic.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: "JWT " + JSON.parse(localStorage.getItem("user"))?.token
    }
    return config
})

export {axiosMusic}