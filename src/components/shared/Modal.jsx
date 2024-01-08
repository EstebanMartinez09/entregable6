import { Link } from "react-router-dom";


const Modal = ({ showModal, onCloseModal }) => {
    return (
        <section
            className={`fixed bg-black/60 top-0 left-0 right-0 h-screen flex justify-center items-center transition-all p-2 ${showModal ? "visible opacity-100" : "invisible opacity-0"
                }`}
        >
            <section>

                <div className=" font-urbanist font-bold max-w-[300px] mx-auto grid gap-6 bg-[#A284F6] p-4 rounded-md relative">
                    <div className="text-center p-3 ">
                        <span>QUIERES CREAR UNA PLAYLIST PARA COMPARTIR?</span>
                    </div>
                    <div className="flex justify-self-center gap-2">
                        <button
                            onClick={onCloseModal}
                            className="border-2 border-white px-4 py-2 rounded-full">
                            <span className="text-white">NO</span></button>
                        <Link
                            to={"/register"}>
                            <button
                                className="border-2 border-white px-4 py-2 rounded-full">
                                <span className="text-white">SI, CREAR CUENTA</span></button>
                        </Link>

                    </div>

                </div>

            </section>

        </section>
    )
}
export { Modal };