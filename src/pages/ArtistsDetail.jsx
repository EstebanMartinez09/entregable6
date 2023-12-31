import { Link } from "react-router-dom";
import { Header } from "../components/shared/Header";

export const ArtistsDetail = () => {
  return (
    <main>
      <section
        className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom
       text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr]"
      >
        <Header />

        <section className="p-2 mt-12 max-w-[562px] mx-auto ">
          
          <section  className="bg-primary-dark p-8 px-4 rounded-3xl sm:px-16" >
          <Link
                to="/"
                className="text-yellow-300 text-sm font-semibold 
                font-['Urbanist'] underline leading-tight tracking-tight
               " 
              >
                {"<"} Atrás
              </Link>
              
            {/* artista */}  
            <section className=" relative top-0 left-0">
              
            </section>
            {/* discos */}
            <section></section>
            {/* songs */}
            <section></section>
          </section>
        </section>
      </section>
    </main>
  );
};
