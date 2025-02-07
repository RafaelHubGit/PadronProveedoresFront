import { Navigate, Outlet, useLocation } from "react-router-dom"
import "antd/dist/reset.css";



export const Root = () => {

    const { pathname } = useLocation();

    if ( pathname === '/' ){
        return <Navigate to ="inicio" />;
    }

    return (
        <main>
            <Outlet />
        </main>
    )
}