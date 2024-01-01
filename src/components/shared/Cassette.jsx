import { Link } from "react-router-dom"
import { EditIcon } from "../icons/Svgs"
import { useState } from "react";

export const Cassette = ({ playlist, index }) => {
    //? useState para el hover 
    const [hover, setHover] = useState(false);

    return (
        //? Cassette
        <div
            style={{
                transform: `translateY(${index * 50}px)`,
                zIndex: hover ? 1 : 0,
            }}
            className="absolute left-[calc(50%-119px)] w-[238px]">
                {/* Link para ir al detail de la playlist */}
            <Link
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="relative"
                to={`/playlists/${playlist.id}`}>
                <div
                    className=" hover:-translate-y-[25px] transition-all">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    <div
                        className="absolute top-7 left-5 w-[200px] flex justify-between items-center p-1 bg-white rounded-md border-[2px] border-[#1C1C1C] ">
                        <p
                            className="text-black">
                            {playlist.title}
                        </p>
                        <EditIcon />
                    </div>
                </div>
            </Link>
        </div>
    )
}