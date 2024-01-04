import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { setPlayListsUser } from "../../store/slices/playListsUser.slice"

export const PrivateRoutes = () => {
   //? dispatch
   const dispatch = useDispatch()

    //? estado global del usuario
    const user = useSelector(store => store.user)

    if (user.token === "") {
        return <Navigate to="/login" />
    } else {
      dispatch(setPlayListsUser())
      return  <Outlet />
    }

    
    
}