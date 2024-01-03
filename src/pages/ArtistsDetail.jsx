import { Link, useParams } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { axiosMusic } from "../utils/ConfigAxios";
import { useEffect, useState } from "react";
import usePopularityRange from "../utils/usePopularityRange";
import { IconUserHexagon } from "@tabler/icons-react";
import "keen-slider/keen-slider.min.css";
import Slider from "../utils/Slider";
import "../styles/Scroll.css";

export const ArtistsDetail = () => {
  const { id } = useParams();
  

  const [artistData, setArtistData] = useState(null);
  const [loader, setLoader] = useState(true);


  useEffect(() => {
    axiosMusic
      .get(`/api/artists/${id}`)
      .then(({ data }) => {
        setArtistData(data);
        console.log(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [id]);
  const popularityRange = usePopularityRange(artistData?.popularity);

  const followers = () => {
    const totalFollowers = artistData?.followers?.total;

    if (typeof totalFollowers !== "number") {
      return "N/A"; // o cualquier valor predeterminado que desees si totalFollowers no es un número
    }

    if (totalFollowers < 1000) {
      return totalFollowers.toString(); // Mostrar tal cual si es menor a 1k
    } else if (totalFollowers < 1000000) {
      return `${(totalFollowers / 1000).toFixed(1)}k`; // Convertir a k si es entre 1k y 1M
    } else {
      return `${(totalFollowers / 1000000).toFixed(1)}M`; // Convertir a M si es mayor a 1M
    }
  };

  return (
    <main className="overflow-hidden">
        <section
        className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom
        text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr]"
      >
        <Header />
        <div className="mt-12 mb-6  overflow-hidden " >

        <div className="scrollbar max-w-[562px] mx-auto  rounded-3xl">
        <section className=" max-w-[562px] mx-5 ">
          <section className="flex flex-col gap-y-12  bg-primary-dark p-8 px-4  rounded-3xl sm:px-16 ">
            <div>
              <Link
                to="/"
                className="text-yellow-300 text-sm font-semibold 
                font-['Urbanist'] underline leading-tight tracking-tight
               "
              >
                {"<"} Atrás
              </Link>
            </div>

            <div>
              {loader ? (
                <div className="loader grid p-2 "></div>
              ) : (
                <>
                  {/* artista */}
                  <header className="flex max-sm:flex-col justify-center items-center gap-4">
                    <div className="">
                      {artistData.images[2].url ? (
                        <img
                          className="rounded-full max-sm:w-[150px] max-sm:h-[150px] "
                          src={artistData.images[0].url}
                          alt=""
                        />
                      ) : (
                        <IconUserHexagon size={100} />
                      )}
                    </div>

                    <div
                      className="flex flex-col gap-2 text-white
                       font-bold font-['Urbanist']"
                    >
                      <span className="mb-2  text-white text-xl font-bold font-['Urbanist'] leading-7 tracking-tight">
                        {artistData.name}
                      </span>
                      <span className="text-white text-sm font-bold font-['Urbanist'] leading-tight tracking-tight">seguidores: {followers()} </span>
                      <span className="flex">
                        Popularidad: {" "} {popularityRange}
                      </span>

                      <ul className="grid row-auto max-h-[200px]">
                        <span className="">generos:</span>
                        <span className="flex flex-wrap ml-1">
                          {artistData.genres.map((genre, index) => (
                            <li
                              className=" text-xs m-1 p-1 
                              rounded-full border border-primary-light"
                              key={index}
                            >
                              {genre}
                            </li>
                          ))}
                        </span>
                      </ul>
                    </div>
                  </header>

                  {/* discos */}
                  <section className="my-8">
                    <p className="mb-4">Otros discos del artista</p>
                    <Slider artistData={artistData} />
                  </section>
                  {/* songs */}
                  <section className="my-8">
                    <p className="mb-4 ">Canciones relacionadas</p>
                    <div className=" gap-4">
                    {artistData.songsTop.map((songsTop) => (
                      <div
                        className="flex flex-col justify-center"
                        key={songsTop.id}
                      >
                        <div
                          className=" flex  rounded my-2"
                          key={songsTop.id}
                        >
                          <img
                            className="w-[53.88px] h-[57.56px] rounded-[16px]"
                            src={songsTop.album.images[0].url}
                            alt=""
                          />
                          <div className="flex flex-col justify-center ml-3">
                          <p className="text-[12px] font-semibold truncate mb-2">
                            {" "}
                            {songsTop.album.name}{" "}
                          </p>
                          <Link  to={`/artists/${songsTop.id}`} className="hover:text-secondary text-[11px] text-white/60 truncate ">
                            {songsTop.album.artists.length > 2
                              ? `${songsTop.album.artists[0].name} , ${songsTop.album.artists[1].name}`
                              : `${songsTop.album.artists[0].name}`}
                          </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  </section>
                </>
              )}
            </div>
          </section>
        </section>
      </div>
      </div>
        </section>
    </main>
  );
};
