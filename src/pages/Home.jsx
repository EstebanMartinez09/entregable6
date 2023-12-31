import { useEffect, useState } from "react"
import { LoadingIcon, SearchIcon } from "../components/icons/Svgs"
import { Header } from "../components/shared/Header"
import { axiosMusic } from "../utils/ConfigAxios"
import { TrackList } from "../components/shared/TrackList"

export const Home = () => {
  //? Estados
  //? Canciones recomendadas
  const [trackRecommendations, setTrackRecommendations] = useState([])
  //? Canciones de busqueda
  const [searchTracks, setSearchTracks] = useState([])
  //? Cargando la busqueda
  const [isLoading, setIsLoading] = useState(false)

  //? Funcion para enviar el formulario y obtener las canciones 
  const handleSubmit = (e) => {
    e.preventDefault()
    const query = e.target.query.value
    const limit = e.target.limit.value
    //? si la busqueda esta vacia obtengo las recomendaciones
    if (query === "") return setSearchTracks([])
    //? Obtener las canciones recomendadas
    setIsLoading(true)
    axiosMusic
      .get(`/api/tracks?limit=${limit}&q=${query}`)
      .then(({ data }) => {
        setSearchTracks(data.tracks.items)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  //? Obtener recomendaciones
  useEffect(() => {
    axiosMusic
      .get("/api/tracks/recommendations?seed_genres=reggae,rock,spanish")
      .then(({ data }) => {
        setTrackRecommendations(data.tracks)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <section
      className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr] ">
      {/* //? Encabezado */}
      <Header />

      {/* //? Contenido */}
      <section
        className="p-2 mt-12 max-w-[562px] mx-auto">

        <main
          className="bg-primary-dark p-8 px-4 rounded-3xl sm:px-16">
          {/* //? Buscador */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white/20 p-2 px-4 rounded-xl"
            size={10}>
            {/* //? Icono buscador */}
            <button>
              <SearchIcon />
            </button>
            {/* //? Input buscador */}
            <input
              autoComplete="off"
              name="query"
              type="text"
              placeholder="Buscar"
              className="bg-transparent outline-none flex-1" />
            {/* //? Loading icon */}
            <LoadingIcon isLoading={isLoading} />
            {/* //? Cantidad resultados */}
            <select
              className="bg-transparent outline-none [&>option]:text-black"
              name="limit">
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>

            </select>
          </form>
          {/* //? Canciones condicionadas a la busqueda */}
          <section className="mt-10">
            <TrackList
              trackList={
                searchTracks.length === 0
                  ? trackRecommendations
                  : searchTracks} />
          </section>
        </main>
      </section>


    </section>
  )
}