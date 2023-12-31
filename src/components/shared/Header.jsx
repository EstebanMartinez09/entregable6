import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../store/slices/User.slice"
import { LogouthIncon, PlayIcon, PlayListIcon } from "../icons/Svgs"
import PopUpPlayList from "./PopUpPlayList"

export const Header = () => {
    //? State para mostrar el popup de auth
    const [isShowAuth, setIsShowAuth] = useState(false)
    //? State para mostrar el popup de playlist
    const [isShowPlayList, setIsShowPlayList] = useState(false)

    // ? Obtener el dispatch
    const dispatch = useDispatch()

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
            className="flex justify-between p-4 bg-primary-dark relative">
            {/* //? Logo */}
            <Link
                className="uppercase font-semibold text-2xl"
                to="/">
                GIFT MUSICS
            </Link>
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
                    1
                </button>
                {/* //?Popup Auth */}
                <div
                    className={`absolute right-4 -bottom-4 lg:right-[180px] translate-y-full bg-primary-light grid gap-2 p-4 rounded-xl ${isShowAuth ? "block" : "hidden"}`}>
                    <Link
                        to={"/playlists"}
                        className="flex items-center gap-2">
                        <PlayIcon />
                        Mis Grabaciones
                    </Link>
                    {/* //? Boton cerrar secion */}
                    <button
                        className="flex items-center gap-2"
                        onClick={andleLogout}>
                        <LogouthIncon />
                        cerrar secion
                    </button>
                </div>

                {/* //? Popup playList */}
                <PopUpPlayList isShowPlayList={isShowPlayList} />
            </div>
        </header>
    )
}