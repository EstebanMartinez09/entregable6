import { useEffect, useState } from "react"
import { axiosMusic } from "../utils/ConfigAxios"
import { Header } from "../components/shared/Header"
import { LoadingIcon, SearchIcon } from "../components/icons/Svgs"
import { CassetteList } from "../components/shared/CassetteList"

export const PlayLists = () => {
  //? playlists
  const [playlists, setPlaylists] = useState([])

  //? Obtener las playlists
  useEffect(() => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({ data }) => {
        setPlaylists(data)
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
          className="bg-primary-dark p-8 pb-2 px-4 rounded-3xl sm:px-16">

          <form
            onSubmit={""}
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
            <LoadingIcon isLoading={""} />
          </form>

          {/* //? Lista de playlists */}
          <CassetteList playlists={playlists} />

        </main>
      </section>
    </section>
  )
}