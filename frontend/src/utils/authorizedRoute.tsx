import { Navigate, Outlet } from "react-router-dom";


function AuthorizedRoute() {
    let token = localStorage.getItem('accessToken');
    return (

        token ? <Outlet />
            :
            <Navigate
                to={{
                    pathname: "/login",
                }}
            />
    )



}

export default AuthorizedRoute;