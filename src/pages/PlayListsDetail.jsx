import { Header } from "../components/shared/Header"

export const PlayListsDetail = () => {
  return (
    <section
      className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom
       text-white h-screen overflow-auto font-urbanist grid grid-rows-[auto_1fr]">
      {/* //? Encabezado */}
      <Header />

      {/* //? Contenido */}
      <section
        className="p-2 mt-12 max-w-[562px] mx-auto">

        <main
          className="bg-primary-dark p-8 px-4 rounded-3xl sm:px-16">
        </main>
      </section>
    </section>
  )
}