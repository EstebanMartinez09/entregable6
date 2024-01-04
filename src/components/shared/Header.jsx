import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEditing } from "../../store/slices/createPlayList.slice"
import { setPlayListsUser } from "../../store/slices/playListsUser.slice"
import { logout } from "../../store/slices/user.slice"
import { LogouthIncon, PlayIcon, PlayListIcon } from "../icons/Svgs"
import PopUpPlayList from "./PopUpPlayList"

export const Header = () => {
    //? State para mostrar el popup de auth
    const [isShowAuth, setIsShowAuth] = useState(false)
    //? State para mostrar el popup de playlist
    const [isShowPlayList, setIsShowPlayList] = useState(false)
    //? navigacion
    const navigate = useNavigate()

    const playList = useSelector(store => store.createPlayList.playListEditing.tracks)

    // ? Obtener el dispatch
    const dispatch = useDispatch()

    // ? Funcion para redirigir al home
    const handleHome = () => {
        dispatch(setEditing(false))
        navigate("/")
    }

    const handleClickPlaylist = () => {
        dispatch(setPlayListsUser())
        navigate("/playlists")
    }

    // ? Funcion para cerrar sesion
    const andleLogout = () => {
        dispatch(logout())
    }

    // ? Funcion para mostrar el popup de auth
    const handleToggleAuth = () => {
        setIsShowAuth(!isShowAuth)
    }

    // ? Funcion para mostrar el popup de playlist
    const handleTogglePlayList = () => {
        setIsShowPlayList(!isShowPlayList)
    }

    // ? Efecto para cerrar el popup auth cuando playlist este abierto
    useEffect(() => {
        if (isShowPlayList) {
            setIsShowAuth(false);
        }
    }, [isShowPlayList]);

    //? Efecto para cerrar el popup auth cuando auth este abierto
    useEffect(() => {
        if (isShowAuth) {
            setIsShowPlayList(false);
        }
    }, [isShowAuth]);



    return (
        <header
            className="bg-primary-dark relative">
            <div
                className="max-w-[1920px] w-full mx-auto flex justify-between p-4">
                {/* //? Logo */}
                <button
                    className="uppercase font-semibold text-2xl"
                    onClick={handleHome}>
                    GIFT MUSICS
                </button>
                {/* //? Botones */}
                <div
                    className="flex gap-2">
                    {/* //? Boton Cuenta */}
                    <button
                        className="uppercase hover:bg-primary-light p-1 px-4 rounded-full border border-secondary font-semibold"
                        onClick={handleToggleAuth}>
                        Mi Cuenta
                    </button>
                    {/* //? Boton Playlist */}
                    <button
                        className="uppercase hover:bg-primary-light p-1 px-4 rounded-full border border-secondary flex items-center gap-2 font-semibold"
                        onClick={handleTogglePlayList}>
                        <PlayListIcon />
                        <span
                            className="hidden md:block">
                            Grabando
                        </span>
                        {
                            playList?.length 
                        }
                    </button>
                    {/* //?Popup Auth */}
                    <div
                        className={`absolute right-4 -bottom-4 lg:right-[180px] translate-y-full bg-primary-light grid gap-2 p-4 rounded-xl ${isShowAuth ? "block" : "hidden"}`}>
                        <button
                            onClick={handleClickPlaylist}
                            className="flex items-center gap-2 hover:text-[#3E14B5] transition-colors">
                            <PlayIcon />
                            Mis Grabaciones
                        </button>
                        {/* //? Boton cerrar secion */}
                        <button
                            className="flex items-center gap-2 hover:text-[#3E14B5] transition-color"
                            onClick={andleLogout}>
                            <LogouthIncon />
                            cerrar secion
                        </button>
                    </div>

                    {/* //? Popup playList */}
                    <PopUpPlayList setIsShowPlayList={setIsShowPlayList} isShowPlayList={isShowPlayList} />
                </div>
            </div>
        </header>
    )
}