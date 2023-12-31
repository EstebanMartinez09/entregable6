import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"
import { PlayLists } from "./pages/PlayLists"
import { PlayListsDetail } from "./pages/PlayListsDetail"
import { TracksDetail } from "./pages/TracksDetail"
import { ArtistsDetail } from "./pages/ArtistsDetail"
import { PlayListsPublic } from "./pages/PlayListsPublic"
import { PrivateRoutes } from "./components/auth/PrivateRoutes"
import { Page404 } from "./pages/Page404"

function App() {

  return (
    <>
      {/* Rutas */}
      <Routes>
        {/* Rutas publicas */}
        {/* Ruta para iniciar sesion */}
        <Route path="/login" element={<Login />} />
        {/* Ruta para registrar usuario */}
        <Route path="/register" element={<Register />} />
        {/* Ruta para ver playlists publicas */}
        <Route path="/playlists/public/:id" element={<PlayListsPublic />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}>
          {/* Ruta principal Home */}
          <Route path="/" element={<Home />} />
          {/* Ruta para playlists */}
          <Route path="/playlists" element={<PlayLists />} />
          {/* Ruta para ver detalles de una playlist */}
          <Route path="/playlists/:id" element={<PlayListsDetail />} />
          {/* Ruta para ver detalles de un track */}
          <Route path="/tracks/:id" element={<TracksDetail />} />
          {/* Ruta para ver detalles de un artista */}
          <Route path="/artists/:id" element={<ArtistsDetail />} />
        </Route>

        {/* Ruta para error 404 */}
        <Route path="*" element={<Page404 />} />

      </Routes>
    </>
  )
}

export default App
