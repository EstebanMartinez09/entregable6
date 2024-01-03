import { useEffect, useState } from "react"
import { Header } from "../components/shared/Header"
import { axiosMusic } from "../utils/ConfigAxios"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { TrackList } from "../components/shared/TrackList";


export const TracksDetail = () => {
 
  const [trackInfo, setTrackInfo] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    axiosMusic
    .get(`/api/tracks/${id}`)
    .then(({data}) => {setTrackInfo(data)})
    .catch((err) => {console.log(err)})
  }, [id]);
  return (
    <main>
      <section
        className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom
       text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr]"
      >
        <Header />
        <section
        className="p-2 mt-12 max-w-[562px] mx-auto">
          <main
          className="bg-primary-dark p-8 px-4 rounded-3xl sm:px-16">
            <Link
                to="/"
                className="text-yellow-300 text-sm font-semibold 
                font-['Urbanist'] underline leading-tight tracking-tight
               " 
              >
                {"<"} Atrás
              </Link>
             
            <div className="pt-4 grid gap-7 grid-cols-2">
              <div className="overflow-hidden rounded-xl">
                <img src={trackInfo?.album?.images[1].url} alt="" />
              </div>
              <div className="flex flex-col justify-center">
                <ul className="grid text-white/40 text-sm gap-3">
                  <li><span className="text-white">{trackInfo?.name}</span></li>
                  <li>{trackInfo?.album?.artists[0].name}</li>
                  <li><span className="text-white">Disco: </span>{trackInfo?.album?.name}</li>
                  <li><span className="text-white">Año de salida: </span>{trackInfo?.album?.release_date}</li>
                </ul>
              </div>
            </div>
            <section className="pt-5 pl-1">
              <h3>Recomendaciones</h3>
              <br />
             <TrackList trackList={trackInfo?.relatedSongs} />
            </section>

          </main>
        </section>


      </section>
    </main>
  )
}