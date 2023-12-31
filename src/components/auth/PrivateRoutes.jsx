import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {

    //? estado global del usuario
    const user = useSelector(store => store.user)

    if (user.token === "") {
        return <Navigate to="/login" />
    } else {
      return  <Outlet />
    }

    
    
}