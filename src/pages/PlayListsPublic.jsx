import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { axiosMusic } from "../utils/ConfigAxios"
import { TrackList } from "../components/shared/TrackList"
import { AddIcon, ChangeIcon, EditIcon, ShareIcon } from "../components/icons/Svgs"

export const PlayListsPublic = () => {
  const [playlistInfo, setPlaylistInfo] = useState(null)  
  const {id} = useParams();
  const [isShowFront, setIsShowFront] = useState(true)
  const handleToggleCassette = () => {
    setIsShowFront(!isShowFront)
}
  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => {
        setPlaylistInfo(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
 
  return (
    <section
    className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom
    text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr]">
      <header
            className="flex justify-center p-4 bg-primary-dark relative">
            {/* //? Logo */}
            <Link
                className="uppercase font-semibold text-2xl"
                to="/">
                GIFT MUSIC
            </Link>
        </header>
      <section
      className="p-2 mt-12 max-w-[562px] mx-auto">
      <main
      className="grid grid-rows-[auto_1fr] gap-5 bg-primary-dark  h-auto p-8 px-4 rounded-3xl sm:px-16 ">
      {
        playlistInfo?  
        (
          <section className="flex flex-col gap-3" >
          <div className="flex h-[183px] justify-self-center ">
            {/* cassette */}
            <div className={`relative cassette ${isShowFront ? "front" : "back"} mx-auto`}>
                {/* Frontal */}
                <div
                    className="relative front">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    {/* Titulo */}
                    <div
                        className="absolute top-[8%] left-5 w-[200px] flex justify-between items-center p-1 bg-white rounded-md border-[2px] border-[#1C1C1C] ">
                        <p
                            className="text-black">
                            {playlistInfo.title}
                        </p>
                        <Link
                        to={"/register"}>
                        
                        <EditIcon />
                        </Link>
                        
                    </div>
                    <div className="absolute bottom-[10%] right-5">
                    <AddIcon />
                    </div>
                    <div className="absolute bottom-[10%] right-12">
                    <ShareIcon />
                    
                    </div>

                    
                </div>
                {/* Trasera */}
                <div
                    className="absolute top-0 back">
                    <img
                        src="/images/frontalCaset.png"
                        alt="caset" />
                    {/* Para */}
                    <div
                        className="absolute top-[8%] left-5 w-[200px] flex justify-between items-center p-1 bg-white rounded-md border-[2px] border-[#1C1C1C] ">
                        <p
                            className="text-black">
                            {playlistInfo.to}
                        </p>
                        <Link
                        to={"/register"}>
                        
                        <EditIcon />
                        </Link>
                    </div>
                    {/* Mensaje */}
                    <div
                        className="h-[75px] absolute top-[30%] left-5 w-[200px] flex justify-between  p-1 bg-white rounded-md border-[2px] border-[#1C1C1C] ">
                        <p
                            className="text-black">
                            {playlistInfo.message}
                        </p>
                        <Link
                        to={"/register"}>
                        
                        <EditIcon />
                        </Link>
                    </div>
                </div>
            </div>
          </div> 
          <div className="flex justify-center items-center content-center">
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
          </div>
          
          </section>
          
          )
        :
        (<p>Cargando...</p>)
      }
      <section>
        <TrackList trackList={playlistInfo?.tracks}/>
      </section>
      </main>
      </section>
    </section>
  )
}