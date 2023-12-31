import { Link } from "react-router-dom"
import { AddIcon, DeleteIcon } from "../icons/Svgs"
import { useDispatch, useSelector } from "react-redux"
import { deleteSongPlayList, setPlayList } from "../../store/slices/createPlayList.slice"

export const TrackCard = ({ track }) => {

    //? traer el estado global para verificar si el track ya se encuentra en la lista
    const playList = useSelector(store => store.createPlayList.playList)

    //? Dispath para agregar tracks a la lista de reproducción
    const dispatch = useDispatch()

    //? funcion para agregar tracks a la playlist verificando si ya se encuentra
    const handleAddTrack = (track) => {
        if (playList.find(item => item.id === track.id)) {
            alert("Ya esta en la lista")
        } else {
            return dispatch(setPlayList(track))
        }
    }

    //? funcion para eliminar tracks de la playlist
    const handleDeleteTrack = (track) => {
        dispatch(deleteSongPlayList(track.id))
    }

    return (
        // ? Tarjeta
        <article
            className="flex gap-4 items-center hover:bg-white/20 p-1 rounded-md transition-all group">
            {/* //? Imagen */}
            <header
                className="overflow-hidden rounded-xl group-hover:shadow-lg group-hover:shadow-black/40">
                <img
                    className="size-[50px] "
                    src={`${track.album.images[2]?.url}`}
                    alt="image track" />
            </header>
            {/* //? Contenido */}
            <div
                className="flex-1 grid gap-2">
                {/* //? Nombre del track */}
                <Link
                    to={`/tracks/${track.id}`}
                    className="text-sm font-bold hover:text-secondary transition-colors line-clamp-1 ">
                    {track.name}
                </Link>
                {/* //? Artistas del track */}
                <ul
                    className="flex flex-wrap gap-2">
                    {
                        track.artists.slice(0, 2).map((artist) => (
                            <li
                                key={artist.id}>
                                <Link
                                    className="text-white/40 text-sm hover:text-secondary transition-colors"
                                    to={`/artists/${artist.id}`}>
                                    {artist.name}
                                    {artist.name !== track.artists[track.artists.slice(0, 2).length - 1].name ? "," : ""}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div
                className="flex gap-2 items-center">
                {/* //? Boton de agregar al carrito */}
                {
                    playList.find(item => item.id === track.id)
                        ? <button onClick={() => handleDeleteTrack(track)}><DeleteIcon /></button>
                        : <button onClick={() => handleAddTrack(track)}><AddIcon /></button>
                }
            </div>
        </article>
    )
}