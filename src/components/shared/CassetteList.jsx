import { useEffect } from "react"
import { Cassette } from "./Cassette"

export const CassetteList = ({ playlists }) => {

    //? totalHeight calcula el total de elementos en playlists y los suma a 150px para el espacio del contenedor
    const totalHeight = () => {
        const length = playlists.length
        const hTotal = 150 + (length * 50)
        return hTotal
    }

    //? useEffect totalHeight escucha cambios en playlists
    useEffect(() => {
        totalHeight()
    }, [playlists])
    
    return (
        <section
            style={{ height: `${totalHeight()}px` }}
            className="relative mt-10">
            {
                playlists.map((playlist, index) => (
                    <Cassette
                        index={index}
                        key={playlist.id}
                        playlist={playlist} />
                ))
            }
        </section>
    )
}