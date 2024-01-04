import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditing, setPlayListEditing } from "../../store/slices/createPlayList.slice";
import { EditIcon } from "../icons/Svgs";

export const Cassette = ({ playlist, index }) => {
    //? useState para el hover 
    const [hover, setHover] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setEditing(true));
        dispatch(setPlayListEditing(playlist));
        navigate(`/playlists/${playlist.id}`)
    }

    return (
        //? Cassette
        <div
            style={{
                transform: `translateY(${index * 50}px)`,
                
                zIndex: hover ? 1 : 0,
            }}
            className="absolute left-[calc(50%-119px)] w-[238px] h-[180px]">
                {/* Link para ir al detail de la playlist */}
            <button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleClick}>
                <div
                    className="relative hover:-translate-y-[25px] transition-all w-full h-full">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    <div
                        className="absolute top-[8%] left-5 w-[200px] flex justify-between items-center p-1 bg-white rounded-md border-[2px] border-[#1C1C1C] ">
                        <p
                            className="text-black">
                            {playlist.title}
                        </p>
                        <EditIcon />
                    </div>
                </div>
            </button>
        </div>
    )
}