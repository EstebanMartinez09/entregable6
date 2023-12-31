import { useState } from "react"
import { ChangeIcon, EditIcon } from "../icons/Svgs"
import "./PopUpPlayList.css"
import { TrackList } from "./TrackList"
import { useDispatch, useSelector } from "react-redux"
import { createPlayListThunk } from "../../store/slices/createPlayList.slice"

const PopUpPlayList = ({ isShowPlayList, setIsShowPlayList }) => {
    //? State para mostrar el cassette de playlist
    const [isShowFront, setIsShowFront] = useState(true)

    //? Dispatch
    const dispatch = useDispatch()

    //?Navigate

    //? estado global de playlist
    const newPlayList = useSelector(store => store.createPlayList)

    //? Funcion para girar el cassette de playlist
    const handleToggleCassette = () => {
        setIsShowFront(!isShowFront)
    }

    //? Funcion para crear playlist usando el dispatch para enviar la newData
    const handelCreatePlayList = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        const tracks = newPlayList.map((track) => ({ "id": track.id }))
        const newData = {
            ...data,
            tracks
        }
        dispatch(createPlayListThunk(newData, e, setIsShowPlayList))
    }

    return (
        <form
            onSubmit={handelCreatePlayList}
            className={`absolute right-4 -bottom-4  translate-y-full bg-primary-light grid gap-2 p-4 rounded-xl ${isShowPlayList ? "block" : "hidden"}`}>
            {/* cassette */}
            <div className={`relative cassette ${isShowFront ? "front" : "back"} mx-auto`}>
                {/* Frontal */}
                <div
                    className="relative front">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    {/* Titulo */}
                    <label
                        className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[15px] left-[19px]  h-[32px] text-sm">
                        <input
                            required
                            name="title"
                            className="outline-none bg-transparent text-black font-semibold w-[162px]"
                            placeholder="Titulo"
                            type="text" />
                        <EditIcon />
                    </label>
                </div>
                {/* Trasera */}
                <div
                    className="absolute top-0 back">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    {/* Para */}
                    <label
                        className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[15px] left-[19px]  h-[32px] text-sm">
                        <input
                            required
                            name="to"
                            className="outline-none bg-transparent text-black font-semibold w-[162px]"
                            placeholder="Para:"
                            type="text" />
                        <EditIcon />
                    </label>
                    {/* Mensaje */}
                    <label
                        className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[50px] left-[19px] text-sm  ">
                        <textarea
                            required
                            name="message"
                            className="outline-none bg-transparent text-black font-semibold resize-none w-[180px]"
                            placeholder="Mensaje"
                            type="text"
                            rows={4} />
                    </label>
                </div>
            </div>
            <button
                className="flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full"
                type="button"
                onClick={handleToggleCassette}>
                Lado {
                    isShowFront
                        ? "B"
                        : "A"
                }
                <ChangeIcon />
            </button>
            <TrackList trackList={newPlayList} />
            <button
                type="submit"
                className="flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full">
                Crear
            </button>
        </form>
    )
}
export default PopUpPlayList