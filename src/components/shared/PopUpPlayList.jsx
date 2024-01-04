import { useState } from "react"
import { ChangeIcon, EditIcon } from "../icons/Svgs"
import "./PopUpPlayList.css"
import { TrackList } from "./TrackList"
import { useDispatch, useSelector } from "react-redux"
import { createPlayListThunk, updatePlayListInfo, updatePlaylistThunk } from "../../store/slices/createPlayList.slice"
import { useNavigate } from "react-router-dom"

const PopUpPlayList = ({ isShowPlayList, setIsShowPlayList }) => {
    //? State para mostrar el cassette de playlist
    const [isShowFront, setIsShowFront] = useState(true)

    // Encuentra la playlist correspondiente al ID proporcionado
    const playList = useSelector((store) => store.createPlayList.playListEditing);

    const [toValue, setToValue] = useState(playList?.to || '');
    const [titleValue, setTitleValue] = useState(playList?.title || '');
    const [messageValue, setMessageValue] = useState(playList?.message || '');

    //? Dispatch
    const dispatch = useDispatch()

    //?Navigate
    const navigate = useNavigate()

    const editMode = useSelector(store => store.createPlayList.editing)
    //? estado global de playlist
    const { tracks: newPlayList, } = useSelector(store => store.createPlayList.playListEditing)

    const handleToChange = (event) => {
        const newTo = event.target.value;
        setToValue(newTo);
        dispatch(updatePlayListInfo({ field: "to", value: newTo }));
    };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitleValue(newTitle);
        dispatch(updatePlayListInfo({ field: "title", value: newTitle }));
    };

    const handleMessageChange = (event) => {
        const newMessage = event.target.value;
        setMessageValue(newMessage);
        dispatch(updatePlayListInfo({ field: "message", value: newMessage }));
    };

    //? Funcion para girar el cassette de playlist
    const handleToggleCassette = () => {
        setIsShowFront(!isShowFront)
    }

    //? Funcion para crear playlist usando el dispatch para enviar la newData
    const handelCreatePlayList = (e) => {
        if (editMode) {
            e.preventDefault()
            dispatch(updatePlaylistThunk(  setIsShowPlayList, navigate))
        } else {
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

    }

    return (
        <form
            onSubmit={handelCreatePlayList}
            className={`absolute right-4 -bottom-4  translate-y-full bg-primary-light grid gap-2 p-4 rounded-xl ${isShowPlayList ? "block" : "hidden"} z-50`}>
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
                            onChange={handleTitleChange}
                            value={titleValue}
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
                            onChange={handleToChange}
                            value={toValue}
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
                            onChange={handleMessageChange}
                            value={messageValue}
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
            {/* trackList */}
            {
                newPlayList && <TrackList trackList={newPlayList} />
            }
            {/* boton para crear */}

            {
                editMode
                    ? (<button
                        type="submit"
                        className="flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full">
                        Actulizar
                    </button>)
                    : (<button
                        type="submit"
                        className="flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full">
                        Crear
                    </button>)
            }

        </form>
    )
}
export default PopUpPlayList