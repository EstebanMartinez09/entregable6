import { Link, useParams } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { axiosMusic } from "../utils/ConfigAxios";
import { useEffect, useState } from "react";
import usePopularityRange from "../utils/usePopularityRange";
import { IconUserHexagon } from "@tabler/icons-react";
import "keen-slider/keen-slider.min.css";
import Slider from "../utils/Slider";

export const ArtistsDetail = () => {
  const { id } = useParams();
  console.log(id);

  const [artistData, setArtistData] = useState(null);
  const [loader, setLoader] = useState(true);


  console.log(artistData);

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
    <main>
      <section
        className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom
       text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr]"
      >
        <Header />

        <section className="p-2  mt-12 max-w-[562px] mx-auto">
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
                  <header className="flex gap-4">
                    <div className="rounded-full overflow-hidden">
                      {artistData.images[2].url ? (
                        <img
                          className=""
                          src={artistData.images[2].url}
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
                      <span className="text-3xl mb-2  leading-7 tracking-tight">
                        {artistData.name}
                      </span>
                      <span>seguidores: {followers()} </span>
                      <span className="flex ">
                        Popularidad: {popularityRange}{" "}
                      </span>

                      <ul className="grid row-auto gap-2 ">
                        <span className="">generos:</span>
                        <span className="flex flex-wrap gap-1">
                          {artistData.genres.map((genre, index) => (
                            <li
                              className="my-2 rounded-full border border-primary-light p-1"
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
                    <p className="mb-4">Canciones relacionadas</p>
                    {artistData.songsTop.map((songsTop) => (
                      <div
                        className="flex flex-col justify-center"
                        key={songsTop.id}
                      >
                        <div
                          className="w-[132px] flex flex-col justify-center rounded"
                          key={songsTop.id}
                        >
                          <img
                            className="size-[123px] rounded-[16px]"
                            src={songsTop.album.images[1].url}
                            alt=""
                          />
                          <p className="text-[12px] font-semibold truncate">
                            {" "}
                            {songsTop.album.name}{" "}
                          </p>
                          <p className="text-[11px] text-white/60 truncate">
                            {songsTop.album.artists.length > 1
                              ? `${songsTop.album.artists[0].name},${songsTop.album.artists[1].name}`
                              : `${songsTop.album.artists[0].name}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </section>
                </>
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
};
