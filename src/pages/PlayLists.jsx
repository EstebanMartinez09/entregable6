import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { SearchIcon } from "../components/icons/Svgs"
import { CassetteList } from "../components/shared/CassetteList"
import { Header } from "../components/shared/Header"

export const PlayLists = () => {
  //? useState para el input de busqueda
  const [query, setQuery] = useState("")

  //? traigo el estado global
  const playListsUser = useSelector(store => store.playListsUser)

  //? funcion para el input de busqueda
  const handleChange = (e) => {
    e.preventDefault()
    const query = e.target.value
    setQuery(query)
  }

  //? filtro la busqueda
  const playListFilter = playListsUser.filter((playlist) => {
    return playlist.title.toLowerCase().includes(query.toLowerCase())
  })


  return (
    <section
      className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom text-white min-h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr] ">
      {/* //? Encabezado */}
      <Header />
      {/* //? Contenido */}
      <section
        className="p-2 mt-12 max-w-[562px] w-full mx-auto">
        <main
          className="bg-primary-dark p-8 pb-2 px-4 rounded-3xl sm:px-16">

          {/* Enlace para volver al home */}
          <Link to="/" className="text-yellow-300 text-sm font-semibold font-['Urbanist'] border-b border-yellow-300 leading-tight tracking-tight">
            {"<"} Atrás
          </Link>

          <div
            className="flex items-center gap-2 bg-white/20 p-2 px-4 rounded-xl w-full max-w-[419px] mt-4"
          >
            <SearchIcon />
            <input
              onChange={handleChange}
              autoComplete="off"
              name="query"
              type="text"
              placeholder="Buscar"
              className="bg-transparent outline-none flex-1 " />

          </div>


          {/* //? Lista de playlists */}

          <CassetteList playlists={playListFilter} />

        </main>
      </section>
    </section>
  )
}