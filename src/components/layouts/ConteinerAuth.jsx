export const ConteinerAuth = ({ children }) => {
    return (
        //? Contenedor padre
        <section
            className="bg-dark bg-[url('/bagraund/mancha-mobile.png')] md:bg-[url('/bagraund/mancha-desk.png')] bg-no-repeat bg-right-bottom text-white h-screen overflow-auto font-urbanist p-4 flex justify-center items-center">
            {/* //? Contenedor secundario */}
            <article
                className="md:grid md:grid-cols-2 gap-10 items-center">
                    {children}
            </article>
        </section>
    )
}