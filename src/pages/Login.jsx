import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { ConteinerAuth } from "../components/layouts/ConteinerAuth"
import { loginThunk } from "../store/slices/User.slice"

export const Login = () => {

  //? Obtener el dispatch
  const dispatch = useDispatch()
  //? obtener navegacion
  const navigate = useNavigate()

  //? Funcion para enviar el formulario e iniciar sesion
  const handleSubmit = (e) => {
    e.preventDefault()
    //? Obtener los datos del formulario
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    //? Enviar los datos al servidor y iniciar sesion ataraves del dispatch
    dispatch(loginThunk(data, navigate))
  }

  return (
    <ConteinerAuth>
      {/* //? Imagen de login */}
      <div
        className="hidden md:block overflow-hidden rounded-[3rem]">
        <img
          className="max-w-[350px]"
          src="/login/login.png" alt="" />
      </div>

      <main>
        {/* //? Formulario */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 [&>label]:grid [&>label]:gap-10 [&>label>span]:text-white/60 [&>label>span]:text-sm [&>label>span]:capitalize [&>label>input]:bg-transparent [&>label>input]:border-b [&>label>input]:border-secondary [&>label>input]:outline-none  [&>label>input]:text-lg">
          <h2
            className="text-[40px]  uppercase font-semibold">
            Iniciar sesión
          </h2>
          <label>
            <span>
              E-mail
            </span>
            <input
              name="email"
              required
              type="email" />
          </label>
          <label>
            <span>
              contraseña
            </span>
            <input
              name="password"
              required
              type="password" />
          </label>
          {/* //? Boton */}
          <button
            type="submit"
            className="bg-primary-light uppercase font-semibold p-1 px-8 max-w-max rounded-full mx-auto mt-8 shadow-lg shadow-purple-800/50 hover:shadow-xl hover:shadow-purple-800/75 hover:scale-125 transition-all duration-300"
          >
            Entrar
          </button>
          {/* //? Link para iniciar sesion */}
          <Link
            className="max-w-max mx-auto mt-4 text-sm underline"
            to="/register">
            O crear una cuenta nueva
          </Link>
        </form>
      </main>
    </ConteinerAuth>
  )
}




