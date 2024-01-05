// Importa los módulos necesarios
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddIcon, ChangeIcon, DeletePlayListIcon, EditIcon, SharePlayList } from "../components/icons/Svgs";
import "../components/shared/Cassette.css"; // Importa los estilos CSS para el cassette
import { Header } from "../components/shared/Header";
import { TrackList } from "../components/shared/TrackList";
import "../pages/PlayListsDetail.css";
import { setEditing, updatePlayListInfo, updatePlaylistThunk } from "../store/slices/createPlayList.slice";
import { axiosMusic } from "../utils/ConfigAxios";
import { setPlayListsUser } from "../store/slices/playListsUser.slice";
// Define el componente PlayListsDetail

export const PlayListsDetail = () => {
  // Estado para controlar la visibilidad del lado frontal o trasero del cassette
  const [isShowFront, setIsShowFront] = useState(true);

  // dispatch
  const dispatch = useDispatch();

  //navigate
  const navigate = useNavigate();

  // Encuentra la playlist correspondiente al ID proporcionado
  const playList = useSelector((store) => store.createPlayList.playListEditing);

  const [toValue, setToValue] = useState(playList?.to || '');
  const [titleValue, setTitleValue] = useState(playList?.title || '');
  const [messageValue, setMessageValue] = useState(playList?.message || '');

  const handleBackToTop = () => {
    dispatch(setEditing(false));
    navigate('/playlists')
  }

  // Función para alternar entre el lado frontal y trasero del cassette
  const handleToggleCassette = () => {
    setIsShowFront(!isShowFront);
  };

  const handleToChange = (event) => {
    const newTo = event.target.value;
    setToValue(newTo);
    dispatch(updatePlayListInfo({ field: "to", value: newTo }));
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitleValue(newTitle);
    dispatch(updatePlayListInfo({ field: "title", value: newTitle }));
  };

  const handleMessageChange = (event) => {
    const newMessage = event.target.value;
    setMessageValue(newMessage);
    dispatch(updatePlayListInfo({ field: "message", value: newMessage }));
  };

  const handleUpdatePlaylist = (e) => {
    e.preventDefault();
    dispatch(updatePlaylistThunk(false, navigate))
  }

  const handleDeletePlaylist = (e) => {
    e.preventDefault();
    axiosMusic
      .delete(`/api/playlists/${playList.id}`)
      .then(() => {
        dispatch(setPlayListsUser())
        alert("Playlist Eliminada");
        navigate('/playlists');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCopyPlaylistLink = () => {
    const playlistLink = `https://entregable6-jlkq.vercel.app/playlists/public/${playList.id}`; // Reemplaza con la URL real de tu aplicación
    navigator.clipboard.writeText(playlistLink)
      .then(() => {
        alert("Enlace de playlist copiado al portapapeles");
      })
      .catch((error) => {
        console.error("Error al copiar el enlace:", error);
      });
  };

  // Renderiza la interfaz del componente
  return (
    <section className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom text-white min-h-screen  font-urbanist grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Encabezado del componente */}
      <Header />
      <section className="p-2">
        {/* Contenido principal del componente */}
        <main className="bg-primary-dark p-8 px-4 rounded-3xl sm:px-8 mt-12 max-w-[562px] mx-auto w-full">
          {/* Enlace para volver a la lista de playlists */}
          <button onClick={handleBackToTop} className=" text-yellow-300 text-sm font-semibold font-['Urbanist'] border-b border-yellow-300 leading-tight tracking-tight">
            {"<"} Atrás
          </button>

          {/* Renderiza el contenido si la playlist existe */}
          {playList && (
            <>
              {/* Componente del cassette con lados frontal y trasero */}
              <div className={`relative cassette ${isShowFront ? "front" : "back"} mt-5 left-[calc(50%-118px)] max-w-[562px] mx-2`}>
                {/* Lado frontal del cassette */}

                <div className="relative  front max-w-[562px]">
                  <img src="/images/frontalCaset.png" alt="caset" />
                  {/* Campo de entrada para el título de la playlist */}
                  <label className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[15px] left-[19px] h-[32px] text-sm">
                    <input
                      onChange={handleTitleChange}
                      value={titleValue}
                      required
                      name="title"
                      className="outline-none bg-transparent text-black font-semibold w-[162px]"
                      placeholder="Titulo"
                      type="text"
                    />
                    <EditIcon />
                  </label>
                  <div className="flex items-center max-w-[230px] w-full justify-around absolute bottom-[15px] left-0  text-sm">
                    <button
                      onClick={handleDeletePlaylist}>
                      <DeletePlayListIcon />
                    </button>
                    <button
                      onClick={handleCopyPlaylistLink}>
                      <SharePlayList />
                    </button>
                  </div>
                </div>

                {/* Lado trasero del cassette */}
                <div className="absolute top-0 back">
                  <img src="/images/frontalCaset.png" alt="caset" />
                  {/* Campo de entrada para el destinatario de la playlist */}
                  <label className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[15px] left-[19px] h-[32px] text-sm">
                    <input
                      onChange={handleToChange}
                      value={toValue}
                      required
                      name="to"
                      className="outline-none bg-transparent text-black font-semibold w-[162px]"
                      placeholder="Para:"
                      type="text"
                    />
                    <EditIcon />
                  </label>

                  {/* Área de texto para el mensaje de la playlist */}
                  <label className="flex items-center bg-white p-2 rounded-lg border-[2px] border-[#1C1C1C] absolute top-[50px] left-[19px] text-sm">
                    <textarea
                      onChange={handleMessageChange}
                      value={messageValue}
                      required
                      name="message"
                      className="outline-none bg-transparent text-black font-semibold resize-none w-[180px]"
                      placeholder="Mensaje"
                      type="text"
                      rows={4}
                    />
                  </label>
                </div>
              </div>

              {/* Botón para alternar entre el lado frontal y trasero del cassette */}
              <button
                className="flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full mb-4 mt-4 hover:bg-primary-light transition-colors"
                type="button"
                onClick={handleToggleCassette}
              >
                Lado {isShowFront ? "B" : "A"}
                <ChangeIcon />
              </button>

              {/* Lista de pistas de la playlist */}
              <TrackList trackList={playList.tracks} />

              {/* Botón para agregar tracks a la playlist */}
              <button
                onClick={() => {
                  navigate("/")
                }}
                className=" flex gap-4 mt-4 mx-auto rounded-full border border-white p-2 hover:bg-primary-light transition-colors">
                <AddIcon />
                Agregar track
              </button>

              {/* Botón para actualizar a la playlist */}
              <button
                onClick={handleUpdatePlaylist}
                type="submit"
                className="mt-4 flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full hover:bg-primary-light transition-colors">
                Actulizar
              </button>
            </>
          )}
        </main>
      </section>

    </section>
  );
};
