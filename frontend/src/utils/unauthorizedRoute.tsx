import { Navigate, Outlet } from "react-router-dom";


function UnauthorizedRoute() {
    const token = localStorage.getItem('accessToken');
    return (

        !token ? <Outlet />
            :
            <Navigate
                to={{
                    pathname: "/profile",
                }}
            />
    )


}

export default UnauthorizedRoute;