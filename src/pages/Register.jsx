import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ConteinerAuth } from "../components/layouts/ConteinerAuth"

const BASE_URL = "https://backend-final-project-dev-hpaf.3.us-1.fl0.io"

export const Register = () => {

  //? Navigacion para redireccionar
  const navigate = useNavigate()

  //? Funcion para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    //? Obtener los datos del formulario
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    //? Enviar los datos al servidor
    axios
      .post(`${BASE_URL}/api/auth/register`, data)
      .then(() => {
        alert("Usuario creado con exito")
        navigate("/login")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    //? Contenedor padre
    <ConteinerAuth>
      {/* //? Imagen de login */}
      <div
        className="hidden md:block overflow-hidden rounded-[3rem]">
        <img
          className="max-w-[350px]"
          src="/register/login.png" alt="" />
      </div>

      <main>
        {/* //? Formulario */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 [&>label]:grid [&>label]:gap-10 [&>label>span]:text-white/60 [&>label>span]:text-sm [&>label>span]:capitalize [&>label>input]:bg-transparent [&>label>input]:border-b [&>label>input]:border-secondary [&>label>input]:outline-none  [&>label>input]:text-lg">
          <h2
            className="text-[40px]  uppercase font-semibold">
            Cuenta Nueva
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
              Nombre de usuario
            </span>
            <input
              name="name"
              required
              type="text" />
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
            crear
          </button>
          {/* //? Link para iniciar sesion */}
          <Link
            className="max-w-max mx-auto mt-4 text-sm underline"
            to="/login">
            O iniciar sesion
          </Link>
        </form>
      </main>
    </ConteinerAuth>
  )
}