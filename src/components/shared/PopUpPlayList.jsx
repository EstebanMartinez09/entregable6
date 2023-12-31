import { useState } from "react"
import { ChangeIcon, EditIcon } from "../icons/Svgs"
import "./PopUpPlayList.css"

const PopUpPlayList = ({ isShowPlayList }) => {
    //? State para mostrar el cassette de playlist
    const [isShowFront, setIsShowFront] = useState(true)

    const handleToggleCassette = () => {
        setIsShowFront(!isShowFront)
    }

    return (
        <form
            className={`absolute right-4 -bottom-4  translate-y-full bg-primary-light grid gap-2 p-4 rounded-xl ${isShowPlayList ? "block" : "hidden"}`}>
            {/* cassette */}
            <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
                {/* Frontal */}
                <div
                    className="relative front">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    <label
                        className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[15px] left-[19px]  h-[32px] text-sm">
                        <input
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
                            className="outline-none bg-transparent text-black font-semibold w-[162px]"
                            placeholder="Para:"
                            type="text" />
                        <EditIcon />
                    </label>
                    {/* Mensaje */}
                    <label
                        className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[50px] left-[19px] text-sm  ">
                        <textarea
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
                    ?"B"
                    :"A"
                }
                <ChangeIcon />
            </button>
        </form>
    )
}
export default PopUpPlayList